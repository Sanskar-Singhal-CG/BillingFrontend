import apiClient from "./ApiClient";

async function getAllParty() {
    const response = await apiClient.get('api/Party');

    return response.data;
}

async function getParty(id){
    const response = await apiClient.get(`api/Party/${id}`);

    return response.data;
}

async function getPartiesIdAndName(){
    const response = await apiClient.get('api/Party/idn');
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

export { getAllParty, getParty, getPartiesIdAndName, createParty, updateParty};