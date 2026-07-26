import { useEffect, useState } from "react";
import SettingsForm from "../components/Settings/SettingsForm";
import { getCompanyDetails, updateCompanyDetails } from "../api/CompanyApi";

function SettingsPage(){
    const[companyDetails, setCompanyDetails] = useState(null);

    async function getCompany() {
        try{
            const companyData = await getCompanyDetails();
            setCompanyDetails(companyData);
        } catch(e) { console.error(e) }
    }

    async function saveCompany(company){
        try{
            await updateCompanyDetails(company);
            await getCompany();

        } catch(e) { console.log(e) }
    }

    useEffect( function() {
            getCompanyDetails().then(function(companyData) {setCompanyDetails(companyData)});
        }, []);

    return(
        <>
        <div>
            <h1>Settings</h1>
        </div>

        { companyDetails && <SettingsForm onSave={saveCompany} companyDetails={companyDetails} /> }
        </>
    )
}

export default SettingsPage;
