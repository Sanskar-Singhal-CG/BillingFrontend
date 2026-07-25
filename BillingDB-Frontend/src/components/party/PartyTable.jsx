import '../../styles/common/table.css'

function PartyTable( { parties, onEdit, onDelete }) {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Billing Address</th>
                    <th>GSTIN</th>
                    <th>Actions</th>
                </tr>
            </thead>

            <tbody>
                { parties.length === 0 ? (
                    <tr>
                        <td colSpan="5">No parties found</td>
                    </tr>
                ) : (
                    parties.map(function(party) {
                        return(
                            <tr key = {party.id}>
                                <td>{party.name}</td>
                                <td>{party.phone}</td>
                                <td>{party.billingAddress}</td>
                                <td>{party.gstin}</td>
                                <td className="action-col">
                                    <button type="button" onClick={function(){
                                        onEdit(party);
                                    }}>Edit</button>
                                    <button type="button" onClick={function(){
                                        onDelete(party.id);
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

export default PartyTable;