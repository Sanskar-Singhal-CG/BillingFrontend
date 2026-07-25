import { useState } from 'react';
import '../../styles/common/form.css'
function ProductForm({ onCancel, onSave, productToEdit, categories }) {
    const [product, setProduct] = useState({
        name: productToEdit ? productToEdit.name : '',
        modelNumber: productToEdit ? productToEdit.modelNumber : '',
        hsnCode: productToEdit ? productToEdit.hsnCode : '',
        basePrice: productToEdit ? productToEdit.basePrice : '',
        gstRate: productToEdit ? productToEdit.gstRate : '',
        categoryId: productToEdit ? productToEdit.category.id : '',
    });

    function handleChange(event) {
        const inputName = event.target.name;
        let inputValue = event.target.value;

        if(inputName === 'basePrice' || inputName === 'gstRate' || inputName === 'categoryId'){
            inputValue = Number(inputValue);
        }

        setProduct({
            ...product,
            [inputName]: inputValue
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave(product);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={product.name}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="modelNumber">Model Number</label>
                <input
                    id="modelNumber"
                    name="modelNumber"
                    type="text"
                    value={product.modelNumber}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="hsnCode">hsnCode</label>
                <input
                    id="hsnCode"
                    name="hsnCode"
                    type="text"
                    value={product.hsnCode}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="basePrice">basePrice</label>
                <input
                    id="basePrice"
                    name="basePrice"
                    type="number"
                    min="0"
                    value={product.basePrice}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="gstRate">GST Rate in (%)</label>
                <input
                    id="gstRate"
                    name="gstRate"
                    type="number"
                    min="0"
                    value={product.gstRate}
                    onChange={handleChange}
                />
            </div>

            <div>
                <label htmlFor="categoryId">Category</label>
                <select
                    id="categoryId"
                    name="categoryId"
                    value={product.categoryId}
                    onChange={handleChange}
                    required >
                    <option value="">Select Category</option>

                    {categories.map(function(category) {
                        return (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        );
                    })}
                </select>
            </div>

            <button type="submit">
                {productToEdit ? 'Update product' : 'Add product'}
            </button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default ProductForm;