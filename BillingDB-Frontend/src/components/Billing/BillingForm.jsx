import { useState } from "react";
import '../../styles/common/form.css'

function BillingForm({ parties, products }){
    const[selectedPartyId, setselectedPartyId] = useState('');
    const[selectedProductId, setselectedProductId] = useState('');

    function handlePartyChange(event){
        setselectedPartyId(event.target.value);
        setselectedProductId('');
    }

    function handleProductChange(event){
        setselectedProductId(event.target.value);
    }

    return (
        <div className="form">
            <div>
                <label htmlFor="partySelect">Select Party</label>

                <select
                    id="partySelect"
                    name="partySelect"
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

            {selectedPartyId && (
                <div>
                    <label htmlFor="productSelect">Select Product</label>

                    <select
                        id="productSelect"
                        name="productSelect"
                        value={selectedProductId}
                        onChange={handleProductChange}
                    >
                        <option value="">Select a product</option>

                        {products.map((product) => (
                            <option key={product.id} value={product.id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    );
}

export default BillingForm;
