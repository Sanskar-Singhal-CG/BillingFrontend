import '../../styles/common/table.css'

function InvoiceTable( { Invoices, onPrint, onDownload }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Invoice Number</th>
                    <th>Invoice Date</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                { Invoices.length === 0 ? (
                    <tr>
                        <td colSpan="3">No invoices found</td>
                    </tr>
                ) : (
                    Invoices.map(function(Invoice) {
                        return(
                            <tr key = {Invoice.id}>
                                <td>{Invoice.invoiceNumber}</td>
                                <td>{new Date(Invoice.invoiceDate).toLocaleDateString()}</td>
                                <td>
                                    <div className='action-col'>
                                        <button type="button" onClick={function(){
                                            onPrint(Invoice.id);
                                        }}>Print</button>
                                        <button type="button" onClick={function(){
                                            onDownload(Invoice.id);
                                        }}>Download</button>
                                    </div>
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}

export default InvoiceTable;
