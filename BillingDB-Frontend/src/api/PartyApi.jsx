import apiClient from "./ApiClient";

async function getAllParty() {
    const response = await apiClient.get('api/Party');

    return response.data;
}

async function getParty(id){
    const response = await apiClient.get(`api/Party/${id}`);

    return response.data;
}
async function createParty(party) {
    const response = await apiClient.post('/api/Party', party);

    return response.data;
}

async function updateParty(id, party){
    const response = await apiClient.patch(`api/Party/${id}`, party);

    return response.data;
}

async function deleteParty(id){
    const response = await apiClient.delete(`api/Party/${id}`);
    return response.data;
}
export { getAllParty, getParty, createParty, updateParty, deleteParty};