import { useState } from 'react';
import '../../styles/party/party-form.css'
function PartyForm({ onCancel, onSave, partyToEdit }) {
    const [party, setParty] = useState({
        name: partyToEdit ? partyToEdit.name : '',
        phone: partyToEdit ? partyToEdit.phone : '',
        billingAddress: partyToEdit ? partyToEdit.billingAddress : '',
        gstin: partyToEdit ? partyToEdit.gstin : ''
    });

    function handleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setParty({
            ...party,
            [inputName]: inputValue
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave(party);
    }

    return (
        <form className="party-form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={party.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={party.phone}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="billingAddress">Billing Address</label>
                <textarea
                    id="billingAddress"
                    name="billingAddress"
                    value={party.billingAddress}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div>
                <label htmlFor="gstin">GSTIN</label>
                <input
                    id="gstin"
                    name="gstin"
                    type="text"
                    value={party.gstin}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                {partyToEdit ? 'Update Party' : 'Add Party'}
            </button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default PartyForm;