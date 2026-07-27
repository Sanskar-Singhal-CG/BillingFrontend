import '../../styles/common/table.css'

function CategoryTable( { categories, onEdit, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                { categories.length === 0 ? (
                    <tr>
                        <td colSpan="2">No categories found</td>
                    </tr>
                ) : (
                    categories.map(function(category) {
                        return(
                            <tr key = {category.id}>
                                <td>{category.name}</td>
                                <td>
                                    <div className="action-col">
                                        <button type="button" onClick={function(){
                                            onEdit(category);
                                        }}>Edit</button>
                                        <button type="button" onClick={function(){
                                            onDelete(category.id);
                                        }}>Delete</button>
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

export default CategoryTable;