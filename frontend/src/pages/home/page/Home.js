import React, { useEffect, useState } from "react";
import { FaUser, FaCalendar } from "react-icons/fa";
import { IoAddOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import { ClotheCard } from "../clotheCard/ClotheCard";
import { OutfitCard } from "../outfitCard/OutfitCard";
import { Modal } from "../../modal/Modal";
import "./Home.css";
import "../../modal/Modal.css";
import { fetcher } from "../../fetcher/fetcher.js";
import { Searcher } from "../searcher/Searcher";
import { GuardarEnStorage } from "../utils/guardarEnStorage.js";

export const Home = () => {
    const [showClothes, setShowClothes] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [name, setName] = useState("");
    const [idUser, setIdUser] = useState("");

    const [outfits, setOutfits] = useState([]);
    const [clothes, setClothes] = useState([]);

    const [avatarUrl, setAvatarUrl] = useState("");

    // Fetch de nombre de usuario
    const getUserInfo = async () => {
        try {
            const response = await fetcher("users/me", "GET");
            const data = await response.json();
            setName(data.name);
            setIdUser(data.id);
            GuardarEnStorage("idUser", data.id);
<<<<<<< HEAD
            setAvatarUrl(data.avatar);
=======
            setAvatarUrl(data.picture);

>>>>>>> 58e6aea76696ef892bbd2564ab68be220b60604b
        } catch (error) {
            console.error("Error fetching name:", error);
        }
    };
    useEffect(() => {
        getUserInfo();
    }, []);

    // Fetch de outfits
    const fetchOutfits = async () => {
        try {
            const response = await fetcher("outfit/", "GET");
            if (!response.ok) {
                throw new Error("Error al obtener los outfits");
            }
            let data = await response.json();

            setOutfits(data);
            GuardarEnStorage("outfits", data);
        } catch (error) {
            console.error("Error al obtener los outfits:", error);
        }
    };

    useEffect(() => {
        fetchOutfits();
    }, []);

    // Ejecuta fetchOutfits solo cuando idUser haya sido establecido
    useEffect(() => {
        if (idUser) {
            fetchOutfits();
            fetchClothes();
        }
    }, [idUser]);

    // Fetch de prendas
    const fetchClothes = async () => {
        localStorage.removeItem("clothes");
        try {
            const response = await fetcher("clothes/", "GET");
            if (!response.ok) {
                throw new Error("Error al obtener las prendas");
            }
            let data = await response.json();

            setClothes(data);
            GuardarEnStorage("clothes", data);
        } catch (error) {
            console.error("Error al obtener las prendas:", error);
        }
    };

    useEffect(() => {
        fetchClothes();
    }, []);

    const filterClothes = async (selectedTags) => {
        try {
            const response = await fetcher("clothes/", "GET");
            if (!response.ok) {
                throw new Error("Error al obtener las prendas");
            }
            let data = await response.json();
            GuardarEnStorage("clothes", data);
        } catch (error) {
            console.error("Error al obtener las prendas:", error);
        }
        const clothesToFilter = JSON.parse(localStorage.getItem("clothes"));

        const filteredClothes = clothesToFilter.filter((clothe) =>
            clothe.tags.some((tag) => selectedTags.includes(tag))
        );
        setClothes(filteredClothes);
    };

    const tags = [
        { value: 1, label: "Parte de Arriba" },
        { value: 2, label: "Parte de Abajo" },
        { value: 3, label: "Zapatillas" },
        { value: 4, label: "Complemento" },
    ];

    return (
        <div className="home">
            <header>
                <div className="user">
                    {avatarUrl ? (
                        <img
                            src={avatarUrl}
                            alt="User Avatar"
                            className="userAvatar"
                        />
                    ) : (
                        <FaUser className="userIcon" />
                    )}
                    <h1>{name}</h1>
                    <NavLink to="/calendar">
                        <FaCalendar className="calendarIcon" />
                    </NavLink>
                </div>
                <div className="info">
                    <p
                        className={showClothes ? "selected" : ""}
                        onClick={() => setShowClothes(true)}
                    >
                        {clothes.length} Prendas
                    </p>
                    <p
                        className={!showClothes ? "selected" : ""}
                        onClick={() => setShowClothes(false)}
                    >
                        {outfits.length} Outfits
                    </p>
                </div>
            </header>
            <section>
                {showClothes ? (
                    <Searcher
                        tagsCategory={tags}
                        filterClothes={filterClothes}
                    />
                ) : (
                    <h2 className="text-lg font-semibold mb-2">DressUp</h2>
                )}
                {showClothes ? (
                    <div className="clothes-cont">
                        {clothes.map((clothe) => (
                            <ClotheCard
                                key={clothe.id}
                                clothe={clothe}
                                fetchClothes={fetchClothes}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="outfits-cont">
                        {outfits.map((outfit) => (
                            <OutfitCard
                                key={outfit.id}
                                outfit={outfit}
                                fetchOutfits={fetchOutfits}
                            />
                        ))}
                    </div>
                )}
            </section>
            <div className="add">
                {!showClothes ? (
                    <NavLink to="/newoutfit">
                        <IoAddOutline className="addIcon" />
                    </NavLink>
                ) : (
                    <IoAddOutline
                        className="addIcon"
                        onClick={() => setIsModalOpen(true)}
                    />
                )}
                {isModalOpen && (
                    <Modal
                        setIsModalOpen={setIsModalOpen}
                        fetchClothes={fetchClothes}
                    />
                )}
            </div>
        </div>
    );
};
