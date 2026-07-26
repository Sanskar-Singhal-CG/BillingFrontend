import { useState } from 'react';
import '../../styles/common/form.css'

function PartyProductForm({ onCancel, onSave, Products }) {
    const [partyProduct, setPartyProduct] = useState({
        ProductId : '',
        CustomPrice : ''        
    });

    function handleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setPartyProduct({
            ...partyProduct,
            [inputName]: inputValue
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave({
            ...partyProduct,
            ProductId: Number(partyProduct.ProductId),
            CustomPrice: Number(partyProduct.CustomPrice)
        });
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="productSelect">Select Product</label>

                <select
                    id="ProductId"
                    name="ProductId"
                    value={partyProduct.ProductId}
                    onChange={handleChange}
                >
                    <option value="">Select a product</option>

                    {Products.map((product) => (
                        <option key={product.id} value={product.id}>
                            {product.name}
                        </option>
                    ))}
                </select>
            </div>

            <div>
                <label htmlFor="CustomPrice">Custom Price</label>
                <input
                    id="CustomPrice"
                    name="CustomPrice"
                    type="number"
                    min="0"
                    value={partyProduct.CustomPrice}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                Add Custom Price 
            </button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default PartyProductForm;