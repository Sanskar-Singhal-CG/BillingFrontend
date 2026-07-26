import { useState } from 'react';
import '../../styles/common/form.css'

function PartyProductEditForm({ onCancel, onSave }) {
    const [customPrice, setCustomPrice] = useState('');

    function handleChange(event) {
        const inputValue = Number(event.target.value);

        setCustomPrice(inputValue);
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave(customPrice);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="customPrice">Custom Price</label>
                <input
                    id="customPrice"
                    name="customPrice"
                    type="number"
                    min="0"
                    value={customPrice}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                Update Custom Price
            </button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default PartyProductEditForm;