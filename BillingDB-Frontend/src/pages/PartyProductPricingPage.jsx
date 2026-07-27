import { useEffect, useState } from "react";
import { getPartiesIdAndName } from "../api/PartyApi";
import { getProductsIdAndName } from "../api/ProductApi"
import { getProductPricing, createProductPricing, updateProductPricing, deleteProductPricing } from "../api/PartyProductPricingApi";
import PartyProductTable from "../components/PartyProductPricing/PartyProductTable";
import PartyProductEditForm from "../components/PartyProductPricing/PartyProductEditForm";
import PartyProductForm from "../components/PartyProductPricing/PartyProductForm"
import '../styles/partyProductPage/page.css'

function PartyProductPricingPage(){

    const[parties, setparties] = useState([]);
    const[partyProducts, setPartyProducts] = useState([]);

    const[showform, setshowform] = useState(false);

    const[showfield, setshowfield] = useState(false);
    const[Products, setProducts] = useState([]);

    const [selectedPartyId, setSelectedPartyId] = useState("");
    const [selectedPartyProductId, setSelectedPartyProductId] = useState("");

    async function openCreatePartyProductForm(){
        await getAllProducts();
        setshowform(true);
    }

    function openEditPartyProductForm(PartyProductId) {
        setSelectedPartyProductId(PartyProductId);
        setshowfield(true);
    }

    function closeEditPartyProductform(){
        setSelectedPartyProductId(null);
        setshowfield(false);
    }

    function closePartyProductForm(){
        setshowform(false);
    }

    useEffect(() => {
        console.log("partyProducts updated", partyProducts);
    }, [partyProducts]);

    async function getAllProducts(){
        try{
            const productsData = await getProductsIdAndName();
            setProducts(productsData);
        } catch(e) { console.log(e) }
    }

    async function handlePartyChange(event) {
        const partyId = event.target.value;

        setSelectedPartyId(partyId);

        if (!partyId) {
            setPartyProducts([]);
            return;
        }

        await getAllPartyProducts(partyId);
    }

    async function getAllPartyProducts(partyId){
        try{
            const PartyProductsData = await getProductPricing(Number(partyId));
            setPartyProducts(PartyProductsData);
        } catch(e) { console.error(e) }
    }

    async function savePartyProduct(PartyProduct){
        const Payload = {
            ...PartyProduct,
            PartyId: selectedPartyId
        };

        try{
            await createProductPricing(Payload);

            await getAllPartyProducts(selectedPartyId);
            closePartyProductForm();

        } catch(e) { console.log(e) }
    }

    async function updateParty(customPrice){
        try{
            await updateProductPricing(Number(selectedPartyProductId), Number(customPrice) );
            await getAllPartyProducts(selectedPartyId);
            closeEditPartyProductform();
        } catch(e) { console.log(e); }

    }

    async function removePartyProduct(id){
        const shouldDelete = window.confirm('Are you Sure?');
        
        if(!shouldDelete) return;
        try{
            await deleteProductPricing(id);
            await getAllPartyProducts(selectedPartyId)
        } catch(e) { console.log(e); }
    }

    useEffect(() => {
        getPartiesIdAndName().then(function(partiesData){ setparties(partiesData);});
    }, []);

    return(
        <>
        <div>
            <h1>Party Custom Prices</h1>
            <div className="customPricePageOptions">
                <div className="select">
                    <select
                        id="partySelect"
                        value={selectedPartyId}
                        onChange={handlePartyChange}
                    >
                        <option value="">Select a party</option>

                        {parties.map((party) => (
                            <option key={party.id} value={party.id}>
                                {party.name}
                            </option>
                        ))}
                    </select>
                </div>
                {
                    selectedPartyId && !showform && (
                        <button type="button" onClick={openCreatePartyProductForm}>Add Custom Price</button>
                    )
                }
                
            </div>

            { selectedPartyId && showform && <PartyProductForm onCancel={closePartyProductForm} onSave={savePartyProduct} Products = { Products } /> }
            { selectedPartyId && showfield && <PartyProductEditForm onCancel={closeEditPartyProductform} onSave={updateParty} /> }
            <PartyProductTable partyProducts={ partyProducts } onEdit={openEditPartyProductForm} onDelete={removePartyProduct} />
        </div>
        </>
    )
}

export default PartyProductPricingPage;