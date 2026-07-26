import apiClient from "./ApiClient";

async function getProductPriceAndGst(payload){
    const response = await apiClient.post('api/BillingInvoice/getProdPG', payload);
    return response.data;
}

async function createInvoice(payload){
    const response = await apiClient.post('api/BillingInvoice', payload);
    return response.data;
}

async function getInvoicesByParty(partyId){
    const response = await apiClient.get(`api/BillingInvoice/getInvoiceIdNameAndDate/${partyId}`);
    return response.data;
}

async function getInvoice(invoiceId){
    const response = await apiClient.get(`api/BillingInvoice/${invoiceId}`);
    return response.data;
}

export { getProductPriceAndGst, createInvoice, getInvoicesByParty, getInvoice }
