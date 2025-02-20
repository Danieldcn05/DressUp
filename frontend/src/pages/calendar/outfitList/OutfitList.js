import { fetcher } from '../../fetcher/fetcher.js';
import { IoCloseOutline } from "react-icons/io5";
import { OutfitCard } from '../../home/outfitCard/OutfitCard.js';

const OutfitList = ({ isOpen, onClose, selectedDate, date }) => {
    if (!isOpen) return null;

    const outfits = JSON.parse(localStorage.getItem("outfits")) || [];
    console.log(outfits);

    const addOutfitToDate = (id) => {
        console.log("Añadir outfit " + id  +  " a la fecha " + selectedDate);

        const data = {
            "outfit":id,
            "date":date,
            "user": parseInt(localStorage.getItem("idUser"))
        }

        console.log(data);

        fetcher("outfit_planner/create/","POST", data);
        onClose();
    }
    

    return (
        <div className="outfit-list-overlay">
            <div className="outfit-list-content">
                < IoCloseOutline className='close-cross' onClick={onClose}/>
                <h2>Añadir outfit al {selectedDate}</h2>
                <div className="outfit-list">
                    {outfits.map(outfit => (
                        <div key={outfit.id} onClick={() => addOutfitToDate(outfit.id)}>
                            <OutfitCard  outfit={outfit}  />
                        </div>
                        
                    ))}

                    

                </div>
        
            </div>
        </div>
    );
};


export default OutfitList;