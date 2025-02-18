import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import './Modal.css';
import { fetcher } from '../fetcher/fetcher';

export const Modal = ({ setIsModalOpen, addClothe }) => {

  const [files, setFiles] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagChange = (event) => {
    const tag = event.target.value;
    setSelectedTags(prevTags =>
      prevTags.includes(tag)
        ? prevTags.filter(t => t !== tag)
        : [...prevTags, tag]
    );
  };

  const onDrop = useCallback(acceptedFiles => {
    setFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const handleAddClothe = async () => {
    if (files.length > 0 && selectedTags.length > 0) {
      const formData = new FormData();
      formData.append("name", files[0].name);
      formData.append("img", files[0]);
      formData.append("user", "1");
      //selectedTags.forEach(tag => formData.append("tags", tag));
  
      // Log form data for debugging
      for (let [key, value] of formData.entries()) {
        console.log(`${key}: ${value}`);
      }
  
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
          const data = await response.json();
          addClothe(data);
          setIsModalOpen(false);
        } else {
          console.error("Error al subir la prenda:", await response.text());
        }
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    } else {
      console.error("Debe seleccionar al menos un archivo y una etiqueta.");
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
            <p className="drop-text">Arrastra y suelta imágenes aquí, o haz clic para seleccionar archivos</p>
          )}
        </div>
        {files.length > 0 && (
          <div className="file-list">
            {files.map((file, index) => <p key={index}>{file.name}</p>)}
          </div>
        )}
        <div className="tags">
          <h3>Tags</h3>
          <div className="divTags">
            <ul>
              <li className="tag">
                <input
                  type="checkbox"
                  value="Parte de Arriba"
                  onChange={handleTagChange}
                  id="tshirt-checkbox"
                />
                <label htmlFor="tshirt-checkbox">Parte de Arriba</label>
              </li>
              <li className="tag">
                <input
                  type="checkbox"
                  value="Parte de Abajo"
                  onChange={handleTagChange}
                  id="pant-checkbox"
                />
                <label htmlFor="pant-checkbox">Parte de Abajo</label>
              </li>
              <li className="tag">
                <input
                  type="checkbox"
                  value="Zapatillas"
                  onChange={handleTagChange}
                  id="shoe-checkbox"
                />
                <label htmlFor="shoe-checkbox">Zapatillas</label>
              </li>
              <li className="tag">
                <input
                  type="checkbox"
                  value="Complemento"
                  onChange={handleTagChange}
                  id="hat-checkbox"
                />
                <label htmlFor="hat-checkbox">Complemento</label>
              </li>

            </ul>
          </div>
        </div>
        <button className="close-btn" onClick={() => setIsModalOpen(false)}>Cerrar</button>
        <button className="add-btn" onClick={handleAddClothe}>Añadir</button>
      </div>
    </div>
  );
};