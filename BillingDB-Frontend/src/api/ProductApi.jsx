import apiClient from "./ApiClient";

async function getAllProducts() {
    const response = await apiClient.get('api/Product');
    return response.data;
}

async function getProduct(id){
    const response = await apiClient.get(`api/Product/${id}`);
    return response.data;
}

async function createProduct(product){
    const response = await apiClient.post('api/Product', product);
    return response.data;
}

async function updateProduct(id, product){
    const response = await apiClient.patch(`api/Product/${id}`, product);
    return response.data;
}

async function deleteProduct(id){
    const response = await apiClient.delete(`api/Product/${id}`);
    return response.data;
}

export { getAllProducts, getProduct, createProduct, updateProduct, deleteProduct}