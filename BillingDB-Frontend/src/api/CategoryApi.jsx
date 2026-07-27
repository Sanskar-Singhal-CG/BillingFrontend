import apiClient from "./ApiClient";

async function getAllCategory(){
    const response = await apiClient.get('api/Category');
    return response.data;
}

async function createCategory(category){
    const response = await apiClient.post('api/Category', category);
    return response.data;
}

async function updateCategory(id, category){
    const response = await apiClient.patch(`api/Category/${id}`, category);
    return response.data;
}

async function deleteCategory(id){
    const response = await apiClient.delete(`api/Category/${id}`);
    return response.data;
}

export { getAllCategory, createCategory, updateCategory, deleteCategory}