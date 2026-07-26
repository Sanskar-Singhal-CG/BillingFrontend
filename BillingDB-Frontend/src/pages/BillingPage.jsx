import { useEffect, useState } from "react";
import { getPartiesIdAndName } from "../api/partyApi"; 
import { getProductsIdAndName } from "../api/ProductApi"
import BillingForm from '../components/Billing/BillingForm'

function BillingPage() {
    const[parties, setparties] = useState([])
    const[products, setproducts] = useState([])
    
    useEffect(function(){
        getPartiesIdAndName().then(function(partiesData){ setparties(partiesData);} );
        getProductsIdAndName().then(function(productsData){ setproducts(productsData);} );
    }, [])

    return (
        <>
        <div>
            Billing
        </div>
        <BillingForm parties = {parties} products = { products }/>
        </>
    );
}

export default BillingPage;
