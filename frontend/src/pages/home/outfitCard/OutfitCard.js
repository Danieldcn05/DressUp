import './OutfitCard.css'
import { IoTrash } from "react-icons/io5";
import { fetcher } from '../../fetcher/fetcher.js';

export const OutfitCard = ({ outfit, fetchOutfits }) => {

    const deleteOutfits = async () => {
        const response = await fetcher(`outfit/delete/${outfit.id}`, 'DELETE');
        console.log(response);
        fetchOutfits();
    }
    return (
        <div className='outfit-card'>
            <h3>{outfit.id}</h3>
            <IoTrash className='trash' onClick={deleteOutfits}/>
        </div>
    )
}