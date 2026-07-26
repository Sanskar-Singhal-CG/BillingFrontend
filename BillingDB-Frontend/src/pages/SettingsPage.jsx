import { getCompanyDetails, updateCompanyDetails } from "../api/CompanyApi"

function SettingsPage(){

    return(
        <>
        <div>
            Settings
        </div>

        <SettingsForm />
        </>
    )
}

export default SettingsPage;