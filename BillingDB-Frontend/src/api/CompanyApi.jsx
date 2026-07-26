import apiClient from "./ApiClient";

async function getCompanyDetails(){
    const response = await apiClient.get('/api/Company');
    return response.data;
}

async function updateCompanyDetails(company){
    const formData = new FormData();

    formData.append('Name', company.name);
    formData.append('Address', company.address);
    formData.append('GSTIN', company.gstin);
    formData.append('Phone', company.phone);
    formData.append('Email', company.email);
    formData.append('BankName', company.bankName);
    formData.append('BankAccount', company.bankAccount);
    formData.append('BankIFSC', company.bankIFSC);

    if(company.signatureFile) {
        formData.append('SignatureFile', company.signatureFile);
    }

    const response = await apiClient.patch('/api/Company', formData);

    return response.data;
}


export { getCompanyDetails, updateCompanyDetails }
