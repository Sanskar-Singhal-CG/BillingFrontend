import { useEffect, useState } from "react";
import PartyTable from "../components/party/PartyTable";
import { createParty , getAllParty, updateParty, removeParty } from "../api/PartyApi";
import PartyForm from "../components/party/PartyForm";
import '../styles/common/button.css'

function PartyPage(){

    const[parties, setparties] = useState([]);
    const[showform, setshowform] = useState(false);
    const[partyToEdit, setpartyToEdit] = useState(null);

    function openCreatePartyForm(){
        setpartyToEdit(null);
        setshowform(true);
    }

    function openEditPartyForm(party) {
        setpartyToEdit(party);
        setshowform(true);
    }

    function closePartyForm(){
        setpartyToEdit(null);
        setshowform(false);
    }

    async function getAllParties() {
        try{
            const partiesData = await getAllParty();
            setparties(partiesData);
        } catch(e) { console.error(e) }
    }

    async function saveParty(party){
        try{
            if(partyToEdit){
                await updateParty(partyToEdit.id, party);
            }
            else { await createParty(party); }

            await getAllParties();
            closePartyForm();

        } catch(e) { console.log(e) }
    }

    async function deleteParty(id){
        const confirmation = window.confirm('Are you Sure?');

        if(!confirmation) return;
        
        try{
            await removeParty(id);
            await getAllParties();
        } catch(e) { console.log(e); }
    }

    useEffect( function() {
            getAllParty().then(function(partiesData) {setparties(partiesData)});
        }, []);
        

    return(
        <>
        <div>
            <div>
                <h1>Party</h1>
                {
                    !showform && (
                        <button className="custom-button" type="button" onClick={openCreatePartyForm}>Add Party</button>
                    )
                }
            </div>

            { showform && <PartyForm onCancel={closePartyForm} onSave={saveParty} partyToEdit={partyToEdit} /> }
            <PartyTable parties={parties} onEdit={openEditPartyForm} onDelete={deleteParty}/>
        </div>
        </>
    )
}

export default PartyPage;