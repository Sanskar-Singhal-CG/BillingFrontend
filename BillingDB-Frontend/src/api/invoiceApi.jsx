import apiClient from "./ApiClient";

async function getProductPriceAndGst(payload){
    const response = await apiClient.get('api/Invoice/getProdPG', payload);
    return response.data;
}

export { getProductPriceAndGst }