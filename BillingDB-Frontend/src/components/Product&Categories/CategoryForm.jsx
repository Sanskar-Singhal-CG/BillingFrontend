import { useState } from 'react';
import '../../styles/common/form.css'

function CategoryForm({ onCancel, onSave, categoryToEdit }) {
    const [category, setCategory] = useState({
        name: categoryToEdit ? categoryToEdit.name : '',
    });

    function handleChange(event) {
        const inputName = event.target.name;
        const inputValue = event.target.value;

        setCategory({
            ...category,
            [inputName]: inputValue
        });
    }

    function handleSubmit(event) {
        event.preventDefault();

        onSave(category);
    }

    return (
        <form className="form" onSubmit={handleSubmit}>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    value={category.name}
                    onChange={handleChange}
                />
            </div>

            <button type="submit">
                {categoryToEdit ? 'Update Category' : 'Add Category'}
            </button>

            <button type="button" onClick={onCancel}>
                Cancel
            </button>
        </form>
    );
}

export default CategoryForm;