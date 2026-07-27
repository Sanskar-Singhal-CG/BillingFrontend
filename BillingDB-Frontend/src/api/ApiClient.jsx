import axios from 'axios';

const apiClient = axios.create({
    baseURL: "https://billingdb-backend20260727154930-hzh8f0hadnekgdcm.centralindia-01.azurewebsites.net"
});

export default apiClient;