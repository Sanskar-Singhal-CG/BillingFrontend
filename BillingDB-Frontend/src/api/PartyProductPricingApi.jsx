import apiClient from "./ApiClient";

async function getProductPricing(partyId){
    const response = await apiClient.get(`api/PartyProductPrice/${partyId}`);

    return response.data;
}

async function createProductPricing(PartyProductPricingRequest) {
    const response = await apiClient.post('/api/PartyProductPrice', PartyProductPricingRequest);

    return response.data;
}

async function updateProductPricing(id, customPrice){
    const response = await apiClient.patch(`api/PartyProductPrice/${id}/${customPrice}`);

    return response.data;
}

async function deleteProductPricing(id){
    const response = await apiClient.delete(`api/PartyProductPrice/${id}`);
    return response.data;
}

export { getProductPricing, createProductPricing, updateProductPricing, deleteProductPricing };