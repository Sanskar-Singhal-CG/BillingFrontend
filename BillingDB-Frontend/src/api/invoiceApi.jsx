import apiClient from "./ApiClient";

async function getProductPriceAndGst(payload){
    const response = await apiClient.post('api/BillingInvoice/getProdPG', payload);
    return response.data;
}

export { getProductPriceAndGst }