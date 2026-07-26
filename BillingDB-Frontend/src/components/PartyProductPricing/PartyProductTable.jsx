import '../../styles/common/table.css'

function PartyProductTable( { partyProducts, onEdit, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>ModelNumber</th>
                    <th>HsnCode</th>
                    <th>CategoryName</th>
                    <th>BasePrice</th>
                    <th>CustomPrice</th>
                    <th>GstRate</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                { partyProducts.length === 0 ? (
                    <tr>
                        <td colSpan="8">No Custom Prices Found</td>
                    </tr>
                ) : (
                    partyProducts.map(function(partyProduct) {
                        return(
                            <tr key = {partyProduct.id}>
                                <td>{partyProduct.productName}</td>
                                <td>{partyProduct.modelNumber}</td>
                                <td>{partyProduct.hsnCode}</td>
                                <td>{partyProduct.categoryName}</td>
                                <td>{partyProduct.basePrice}</td>
                                <td>{partyProduct.customPrice}</td>
                                <td>{partyProduct.gstRate}</td>
                                <td className="action-col">
                                    <button type="button" onClick={function(){
                                        onEdit(partyProduct.Id);
                                    }}>Edit</button>
                                    <button type="button" onClick={function(){
                                        onDelete(partyProduct.id);
                                    }}>Delete</button>
                                </td>
                            </tr>
                        );
                    })
                )}
            </tbody>
        </table>
    );
}

export default PartyProductTable;