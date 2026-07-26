import apiClient from "./ApiClient";

async function getCompanyDetails(){
    const response = await apiClient.get('/api/Company');
    return response.data;
}

async function updateCompanyDetails(CompanyDto){
    const response = await apiClient.patch('/api/Company', CompanyDto);

    return response.data;
}


export { getCompanyDetails, updateCompanyDetails }