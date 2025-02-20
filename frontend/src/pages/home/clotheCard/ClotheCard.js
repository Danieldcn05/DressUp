
import './ClotheCard.css';
import { IoTrash } from "react-icons/io5";
import { fetcher } from '../../fetcher/fetcher.js';

export const ClotheCard = ({ clothe, fetchClothes }) => {

  const deleteClothe = async () => {
    const response = await fetcher(`clothes/delete/${clothe.id}`, 'DELETE');
    console.log(response);
    fetchClothes();
  }

  return (
    <div className='clothe-card'>
      <img src={clothe.img} className='clothe-img'></img>
      <IoTrash className='trash' onClick={deleteClothe}/>
    </div >
  );
};

