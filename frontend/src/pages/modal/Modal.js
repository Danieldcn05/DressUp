import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import "./Modal.css";
import { fetcher } from "../fetcher/fetcher";
import { IoCloseOutline } from "react-icons/io5";

export const Modal = ({ setIsModalOpen, fetchClothes }) => {
    const [files, setFiles] = useState([]);
    const [selectedTag, setSelectedTag] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleTagChange = (event) => {
        setSelectedTag(event.target.value);
    };

    const onDrop = useCallback((acceptedFiles) => {
        setFiles(acceptedFiles);
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    const handleAddClothe = async () => {
        if (files.length > 0 && selectedTag) {
            setIsLoading(true);
            const userId = await fetcher("users/me", "GET")
                .then((response) => response.json())
                .then((data) => {
                    return data.id;
                });

            const formData = new FormData();
            formData.append("name", files[0].name);
            formData.append("img", files[0]);
            formData.append("isActive", "true");
            formData.append("user", userId);
            formData.append("tags", selectedTag);

            try {
                const url = `http://localhost:8000/clothes/create/`;
                const authToken = localStorage.getItem("authToken");

                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                    body: formData,
                });

                if (response.ok) {
                    console.log("Prenda subida correctamente");
                    fetchClothes();
                    setIsModalOpen(false);
                } else {
                    console.error(
                        "Error al subir la prenda:",
                        await response.text()
                    );
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
            } finally {
                setIsLoading(false);
            }
        } else {
            console.error(
                "Debe seleccionar al menos un archivo y una etiqueta."
            );
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Agregar Nueva Prenda</h2>
                <div {...getRootProps()} className="dropzone">
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p className="drop-text">Suelta los archivos aquí...</p>
                    ) : (
                        <p className="drop-text">
                            Arrastra y suelta imágenes aquí, o haz clic para
                            seleccionar archivos
                        </p>
                    )}
                </div>
                {files.length > 0 && (
                    <div className="file-list">
                        {files.map((file, index) => (
                            <p key={index}>{file.name}</p>
                        ))}
                    </div>
                )}
                <div className="tags">
                    <h3>Tags</h3>
                    <div className="divTags">
                        <ul>
                            <li className="tag">
                                <input
                                    type="radio"
                                    name="tag"
                                    value="1"
                                    onChange={handleTagChange}
                                    id="tshirt-radio"
                                />
                                <label htmlFor="tshirt-radio">
                                    Parte de Arriba
                                </label>
                            </li>
                            <li className="tag">
                                <input
                                    type="radio"
                                    name="tag"
                                    value="2"
                                    onChange={handleTagChange}
                                    id="pant-radio"
                                />
                                <label htmlFor="pant-radio">
                                    Parte de Abajo
                                </label>
                            </li>
                            <li className="tag">
                                <input
                                    type="radio"
                                    name="tag"
                                    value="3"
                                    onChange={handleTagChange}
                                    id="shoe-radio"
                                />
                                <label htmlFor="shoe-radio">Zapatillas</label>
                            </li>
                            <li className="tag">
                                <input
                                    type="radio"
                                    name="tag"
                                    value="4"
                                    onChange={handleTagChange}
                                    id="hat-radio"
                                />
                                <label htmlFor="hat-radio">Complemento</label>
                            </li>
                        </ul>
                    </div>
                </div>
                <button className="add-btn" onClick={handleAddClothe}>
                    Añadir
                </button>
                <IoCloseOutline
                    className="close-cross-modal"
                    onClick={() => setIsModalOpen(false)}
                />
            </div>
            {isLoading && (
                <div className="loader-overlay">
                    <div className="loader">
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    );
};
