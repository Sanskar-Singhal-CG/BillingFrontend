import '../../styles/common/table.css'

function InvoiceTable( { Invoices }) {
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
                                <td className="action-col">
                                    <button type="button">Print</button>
                                    <button type="button">Download</button>
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
