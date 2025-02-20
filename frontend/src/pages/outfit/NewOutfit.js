import React, { useState, useEffect } from 'react';
import { IoIosArrowBack } from "react-icons/io";
import { NavLink, useNavigate } from 'react-router-dom';
import './NewOutfit.css';
import Carousel from './carousel/Carousel';
import { fetcher } from '../fetcher/fetcher';
import { WiStars } from "react-icons/wi";

export const NewOutfit = () => {
  const [userClothes, setUserClothes] = useState([]);
  const [selectedItems, setSelectedItems] = useState({
    "Parte de arriba": null,
    "Parte de abajo": null,
    "Zapatillas": null,
    "Complemento": null
  });

  const navigate = useNavigate();

  const getId = async () => {
    const response = await fetcher("users/me", "GET")
      .then(response => response.json())
      .then(data => {
        return data.id;
      })
      .catch(error => {
        console.error("Error fetching user ID:", error);
      });
    return response;
  }


  useEffect(() => {
    fetcher("clothes", "GET")
      .then(response => response.json())
      .then(async data => {
        const userId = await getId();
        const filteredClothes = data.filter(item => item.user === userId);
        setUserClothes(filteredClothes);
        console.log(filteredClothes);
      });
  }, []);

  const handleItemSelected = (id, tag) => {
    setSelectedItems(prevSelectedItems => ({
      ...prevSelectedItems,
      [tag]: id
    }));
  };

  useEffect(() => {
    console.log("Selected items:", selectedItems);
  }, [selectedItems]);


  const saveOutfit = async () => {

    const userId = await getId();
    const outfit = {
      "Garments": [
        selectedItems["Parte de arriba"],
        selectedItems["Parte de abajo"],
        selectedItems["Zapatillas"],
        selectedItems["Complemento"]
      ],
      "user": userId
    }


    fetcher("outfit/create/", "POST", outfit)
      .then(response => response.json())
      .then(data => {
        console.log(data);
      })



    navigate('/home');

  }


  const randomizeOutfit = () => {
    const categories = ["Parte de arriba", "Parte de abajo", "Zapatillas", "Complemento"];
    const newSelectedItems = {};

    categories.forEach(category => {

      const randomItem = userClothes[Math.floor(Math.random() * userClothes.length)];
      newSelectedItems[category] = randomItem.id;

    });

    setSelectedItems(newSelectedItems);
  };


  return (
    <>
      <NavLink to="/home" className="back-link">
        <IoIosArrowBack className='back' />
      </NavLink>
      <div className="carousel-cont">
        {userClothes.length > 0 ? (
          <>
            <Carousel items={userClothes} onItemSelected={(id) => handleItemSelected(id, "Parte de arriba")} />
            <Carousel items={userClothes} onItemSelected={(id) => handleItemSelected(id, "Parte de abajo")} />
            <Carousel items={userClothes} onItemSelected={(id) => handleItemSelected(id, "Zapatillas")} />
            <Carousel items={userClothes} onItemSelected={(id) => handleItemSelected(id, "Complemento")} />
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>

      <div className='but-cont'>

        <button className='boton-save' onClick={saveOutfit}>Guardar Outfit</button>

        <WiStars onClick={randomizeOutfit} className='random' />
      </div>
    </>
  );
}