import { useEffect, useState } from "react";

import CategoryForm from "../components/Product&Categories/CategoryForm";
import CategoryTable from "../components/Product&Categories/CategoryTable"
import ProductForm from "../components/Product&Categories/ProductForm";
import ProductTable from "../components/Product&Categories/ProductTable"

import { getAllCategory, createCategory, updateCategory, deleteCategory} from "../api/CategoryApi"
import { getAllProducts, createProduct, updateProduct, deleteProduct } from "../api/ProductApi"

function ProductCategoriesPage(){

    const[products, setproducts] = useState([]);
    const[categories, setcategories] = useState([]);

    const[showProductform, setshowProductform] = useState(false);
    const[showCategoryform, setshowCategoryform] = useState(false);

    const[productToEdit, setproductToEdit] = useState(null);
    const[categoryToEdit, setcategoryToEdit] = useState(null);

    function openCreateCategoryform(){
        setcategoryToEdit(null);
        setshowCategoryform(true);
    }

    function openEditCategoryForm(category){
        setcategoryToEdit(category);
        setshowCategoryform(true);
    }

    function closeCategoryform(){
        setcategoryToEdit(null);
        setshowCategoryform(false);
    }

    async function getCategories(){
        try{
            const categoriesData = await getAllCategory();
            setcategories(categoriesData);
        } catch(e) { console.log(e) }
    }

    async function saveCategory(category){
        if(categoryToEdit){
            await updateCategory(categoryToEdit.id, category);
        }
        else { await createCategory(category); }

        await getCategories();
        closeCategoryform();

    }

    async function removeCategory(id){
        const confirmDelete = window.confirm('Are you Sure?');
        if(!confirmDelete) return;
        try{
            await deleteCategory(id);
            await getCategories();
        } catch(e) { console.log(e); }

    }

    function openCreateProductform(){
        setproductToEdit(null);
        setshowProductform(true);
    }

    function openEditProductForm(product){
        setproductToEdit(product);
        setshowProductform(true);
    }

    function closeProductform(){
        setproductToEdit(null);
        setshowProductform(false);
    }

    async function getProducts(){
        try{
            const productsData = await getAllProducts();
            setproducts(productsData);
        } catch(e) { console.log(e) }
    }

    async function saveProduct(product){
        if(productToEdit){
            await updateProduct(productToEdit.id, product);
        }
        else { await createProduct(product); }

        await getProducts();
        closeProductform();

    }

    async function removeProduct(id){
        const confirmDelete = window.confirm('Are you Sure?');
        if(!confirmDelete) return;
        try{
            await deleteProduct(id);
            await getProducts();
        } catch(e) { console.log(e); }

    }

    useEffect( function(){
        getAllCategory().then(function(categories) { setcategories(categories) });
        getAllProducts().then(function(products) { setproducts(products) }); 
    }, []);

    return (
        <div>
            <h1>Products and Categories</h1>
            <div>
                {
                !showCategoryform && <button type="button" onClick={openCreateCategoryform}>Add Category</button>
                }
            </div>

            {showCategoryform && <CategoryForm onCancel={closeCategoryform} onSave={saveCategory} categoryToEdit={ categoryToEdit }/>}
            <CategoryTable categories={ categories } onEdit={openEditCategoryForm} onDelete={removeCategory}/>
            
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            
            <div>
                {
                !showProductform && <button type="button" onClick={openCreateProductform}>Add Product</button>
                }
            </div>
            {showProductform && <ProductForm onCancel={closeProductform} onSave={saveProduct} productToEdit={ productToEdit } categories={ categories }/>}
            <ProductTable products={ products } onEdit={openEditProductForm} onDelete={removeProduct} />

        </div>
    );
}

export default ProductCategoriesPage;