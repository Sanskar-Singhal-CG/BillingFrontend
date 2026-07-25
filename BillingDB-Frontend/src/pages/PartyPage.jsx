import { useEffect, useState } from "react";
import PartyTable from "../components/party/PartyTable";
import { createParty , getAllParty, updateParty, deleteParty } from "../api/partyApi";
import PartyForm from "../components/party/PartyForm";

function PartyPage(){

    const[parties, setparties] = useState([]);
    const[showform, setshowform] = useState(false);
    const[partyToEdit, setpartyToEdit] = useState(null);

    function openCreatePartyForm(){
        setpartyToEdit(null);
        setshowform(true);
    }

    function closeCreatePartyForm(){
        setpartyToEdit(null);
        setshowform(false);
    }

    function openEditPartyForm(party) {
        setpartyToEdit(party);
        setshowform(true);
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
            closeCreatePartyForm();

        } catch(e) { console.log(e) }
    }

    async function removeParty(id){
        const shouldDelete = window.confirm('Are you Sure?');
        
        if(!shouldDelete) return;
        try{
            await deleteParty(id);
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
                        <button type="button" onClick={openCreatePartyForm}>Add Party</button>
                    )
                }
            </div>
            { showform ? <PartyForm onCancel={closeCreatePartyForm} onSave={saveParty} partyToEdit={partyToEdit} /> : <PartyTable parties={ parties } onEdit={openEditPartyForm} onDelete={removeParty}/> }
        </div>
        </>
    )
}

export default PartyPage;