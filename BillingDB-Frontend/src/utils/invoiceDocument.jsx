//I used ai for this file

import { jsPDF } from 'jspdf'
import { renderToStaticMarkup } from 'react-dom/server'
import { getInvoice } from '../api/invoiceApi'
import InvoiceTemplate from '../components/invoices/InvoiceTemplate'

function getInvoiceHtml(invoice, includeSignature) {
    return renderToStaticMarkup(
        <InvoiceTemplate invoice={invoice} includeSignature={includeSignature} />
    );
}

function getPageStyles() {
    return Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(function(style) {
            return style.outerHTML;
        })
        .join('');
}

function createTemporaryInvoiceFrame(invoice, includeSignature) {
    return new Promise(function(resolve) {
        const frame = document.createElement('iframe');
        const invoiceHtml = getInvoiceHtml(invoice, includeSignature);
        const pageStyles = getPageStyles();

        frame.style.position = 'fixed';
        frame.style.top = '0';
        frame.style.left = '-10000px';
        frame.style.width = '900px';
        frame.style.height = '1200px';
        frame.style.border = '0';
        frame.onload = function() {
            resolve(frame);
        };

        frame.srcdoc = `
            <html>
                <head>${pageStyles}</head>
                <body>${invoiceHtml}</body>
            </html>
        `;

        document.body.appendChild(frame);
    });
}

async function printInvoice(invoiceId) {
    const invoice = await getInvoice(invoiceId);
    const invoiceHtml = getInvoiceHtml(invoice, false);
    const pageStyles = getPageStyles();
    const printFrame = document.createElement('iframe');

    printFrame.style.display = 'none';
    document.body.appendChild(printFrame);

    printFrame.onload = function() {
        printFrame.contentWindow.focus();
        printFrame.contentWindow.print();
        setTimeout(function() {
            printFrame.remove();
        }, 1000);
    };

    printFrame.srcdoc = `
        <html>
            <head>
                <title>${invoice.invoiceNumber}</title>
                ${pageStyles}
            </head>
            <body>
                ${invoiceHtml}
            </body>
        </html>
    `;
}

async function downloadInvoice(invoiceId) {
    const invoice = await getInvoice(invoiceId);
    const frame = await createTemporaryInvoiceFrame(invoice, true);
    const invoiceElement = frame.contentDocument.querySelector('.invoice-template');
    const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
    });

    return new Promise(function(resolve, reject) {
        try {
            pdf.html(invoiceElement, {
                x: 10,
                y: 10,
                width: 190,
                windowWidth: 900,
                autoPaging: 'text',
                callback: function(createdPdf) {
                    createdPdf.save(`${invoice.invoiceNumber}.pdf`);
                    frame.remove();
                    resolve();
                }
            });
        } catch (error) {
            frame.remove();
            reject(error);
        }
    });
}

export { printInvoice, downloadInvoice }
