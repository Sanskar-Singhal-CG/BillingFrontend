import { useState } from 'react';
import '../../styles/settings/settingsform.css'


function SettingsForm({ onSave, companyDetails }) {
    const [formData, setFormData] = useState({
        name: companyDetails.name,
        address: companyDetails.address,
        gstin : companyDetails.gstin,
        phone: companyDetails.phone,
        email: companyDetails.email,
        bankName: companyDetails.bankName,
        bankAccount: companyDetails.bankAccount,
        bankIFSC: companyDetails.bankIFSC,
        signatureFile: ''
    });
    
    const [signaturePreview, setSignaturePreview] = useState('');

    function resetForm() {
        setFormData({
            ...companyDetails,
            signatureFile: ''
        });
        setSignaturePreview('');
    }

    function handleChange(event) {
        const inputName = event.target.name;
        let inputValue = event.target.value;

        if (event.target.files != null && event.target.files[0] != null) {
            const fileReader = new FileReader();

            fileReader.onload = function () {
                setSignaturePreview(String(fileReader.result).split(',')[1]);
                setFormData({
                    ...formData,
                    [inputName] : event.target.files[0]
                });
            };

            fileReader.readAsDataURL(event.target.files[0]);
            return;
        }

        setFormData({
            ...formData,
            [inputName] : inputValue
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        const company = { ...formData };

        if(company.signatureFile === '') {
            delete company.signatureFile;
        }

        onSave(company);
    }

    function handleCancel() {
        resetForm();
    }

    return (
        <form className="form settingsForm" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                />
            </div>


            <div>
                <label htmlFor="address">Address</label>
                <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                ></textarea>
            </div>

            <div>
                <label htmlFor="gstin">GSTIN</label>
                <input
                    id="gstin"
                    name="gstin"
                    type="text"
                    value={formData.gstin}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="phone">Phone</label>
                <input
                    id="phone"
                    name="phone"
                    type="text"
                    value={formData.phone}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="bankName">Bank Name</label>
                <input
                    id="bankName"
                    name="bankName"
                    type="text"
                    value={formData.bankName}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="bankAccount">Bank Account</label>
                <input
                    id="bankAccount"
                    name="bankAccount"
                    type="text"
                    value={formData.bankAccount}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="bankIFSC">Bank IFSC</label>
                <input
                    id="bankIFSC"
                    name="bankIFSC"
                    type="text"
                    value={formData.bankIFSC}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="signatureFile">Signature (Remove background using <a href="https://www.remove.bg" target='_blank'>www.remove.bg</a>)</label>
                <input
                    id="signatureFile"
                    name="signatureFile"
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                />

                {(signaturePreview || companyDetails.signatureFile) && (
                    <img
                        className="signatureImage"
                        src={`data:image/png;base64,${signaturePreview || companyDetails.signatureFile}`}
                        alt="signature"
                    />
                )}
            </div>

            <button type="submit">
                Update
            </button>

            <button type="button" onClick={handleCancel}>
                Cancel
            </button>
        </form>
    );
}

export default SettingsForm;
