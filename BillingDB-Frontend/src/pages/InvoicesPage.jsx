import { getPartiesIdAndName } from "../api/partyApi";
import { getInvoicesByParty } from "../api/invoiceApi";
import { useEffect, useState } from "react";
import InvoiceTable from "../components/invoices/InvoiceTable"
import '../styles/partyProductPage/page.css'
import { printInvoice, downloadInvoice } from '../utils/invoiceDocument'

function InvoicesPage() {
    const [selectedPartyId, setselectedPartyId] = useState('');
    const [parties, setparties] = useState([])
    const [Invoices, setInvoices] = useState([]);

    useEffect(() => {
            getPartiesIdAndName().then(function(partiesData){ setparties(partiesData);});
        }, []);
    
    async function handlePartyChange(event) {
        const partyId = event.target.value;

        setselectedPartyId(partyId);

        if (!partyId) {
            setInvoices([]);
            return;
        }

        await getAllInvoices(partyId);
    }

    async function getAllInvoices(partyId){
        try{
            const InvoicesData = await getInvoicesByParty(Number(partyId));
            setInvoices(InvoicesData);
        } catch(e) { console.log(e); }
    }

    async function handlePrint(invoiceId){
        try{
            await printInvoice(invoiceId);
        } catch(e) { console.log(e); }
    }

    async function handleDownload(invoiceId){
        try{
            await downloadInvoice(invoiceId);
        } catch(e) { console.log(e); }
    }

    return (
        <>
        <div>
            Invoices
        </div>
        <div className="customPricePageOptions">
                <div className="select">
                    <select
                        id="partySelect"
                        value={selectedPartyId}
                        onChange={handlePartyChange}
                    >
                        <option value="">Select a party</option>

                        {parties.map((party) => (
                            <option key={party.id} value={party.id}>
                                {party.name}
                            </option>
                        ))}
                    </select>
                </div>
                <InvoiceTable Invoices={Invoices} onPrint={handlePrint} onDownload={handleDownload} />
            </div>
            </>
    );
}

export default InvoicesPage;
