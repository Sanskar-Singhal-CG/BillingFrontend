//for css of the template, i used AI

import '../../styles/common/table.css'
import '../../styles/invoices/invoiceTemplate.css'

function InvoiceTemplate({ invoice, includeSignature }) {
    function formatAmount(amount) {
        return Number(amount || 0).toFixed(2);
    }

    function formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    return (
        <div className="invoice-template">
            <div className="invoice-header">
                <div>
                    <h1>{invoice.companyName}</h1>
                    <p>{invoice.companyAddress}</p>
                    <p>GSTIN: {invoice.companyGSTIN}</p>
                    <p>Phone: {invoice.companyPhone}</p>
                    <p>Email: {invoice.companyEmail}</p>
                </div>

                <div className="invoice-title">
                    <h2>INVOICE</h2>
                    <p>Invoice No: {invoice.invoiceNumber}</p>
                    <p>Date: {formatDate(invoice.invoiceDate)}</p>
                </div>
            </div>

            <div className="invoice-customer">
                <h3>Bill To</h3>
                <p>{invoice.customerName}</p>
                <p>{invoice.customerAddress}</p>
                <p>Phone: {invoice.customerPhone}</p>
                <p>GSTIN: {invoice.customerGSTIN}</p>
            </div>

            <table className="table invoice-items-table">
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>GST Rate</th>
                        <th>Sub Amount</th>
                        <th>GST Amount</th>
                        <th>Total</th>
                    </tr>
                </thead>

                <tbody>
                    {invoice.items.map(function(item, index) {
                        return (
                            <tr key={`${item.productId}-${index}`}>
                                <td>{item.productName}</td>
                                <td>{formatAmount(item.rate)}</td>
                                <td>{item.quantity}</td>
                                <td>{item.gstRate}%</td>
                                <td>{formatAmount(item.subTotal)}</td>
                                <td>{formatAmount(item.gstAmount)}</td>
                                <td>{formatAmount(item.total)}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <div className="invoice-footer">
                <div className="invoice-bank-details">
                    <h3>Bank Details</h3>
                    <p>Bank Name: {invoice.companyBankName}</p>
                    <p>Account No: {invoice.companyBankAccount}</p>
                    <p>IFSC: {invoice.companyBankIFSC}</p>
                </div>

                <div className="invoice-totals">
                    <p><span>Sub Total</span><span>{formatAmount(invoice.subTotal)}</span></p>
                    <p><span>Total GST</span><span>{formatAmount(invoice.totalGst)}</span></p>
                    <p className="invoice-grand-total"><span>Grand Total</span><span>{formatAmount(invoice.grandTotal)}</span></p>

                    <div className="invoice-signature">
                        {includeSignature && invoice.signatureFile ? (
                            <img src={`data:image/png;base64,${invoice.signatureFile}`} alt="Company signature" />
                        ) : (
                            <div className="invoice-signature-line"></div>
                        )}
                        <p>Signature</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InvoiceTemplate;
