import '../../styles/common/table.css'

function ProductTable( { products , onEdit, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Model Number</th>
                    <th>Hsn Code</th>
                    <th>Base Price</th>
                    <th>GST Rate</th>
                    <th>Category</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                { products.length === 0 ? (
                    <tr>
                        <td colSpan="7">No products found</td>
                    </tr>
                ) : (
                    products.map(function(products) {
                        return(
                            <tr key = {products.id}>
                                <td>{products.name}</td>
                                <td>{products.modelNumber}</td>
                                <td>{products.hsnCode}</td>
                                <td>{products.basePrice}</td>
                                <td>{products.gstRate}</td>
                                <td>{products.category.name}</td>
                                <td className="action-col">
                                    <button type="button" onClick={function(){
                                        onEdit(products);
                                    }}>Edit</button>
                                    <button type="button" onClick={function(){
                                        onDelete(products.id);
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

export default ProductTable;