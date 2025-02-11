import { useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import './Modal.css'

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

  /*
  const handleAddClothe = () => {
    if (files.length > 0) {
      const newClothe = {
        nombre: files[0].name,
        tag: selectedTags
      };
      addClothe(newClothe);
      setIsModalOpen(false);
    }
  };
  */

  
  const handleAddClothe = async () => {
    if (files.length > 0) {
      const formData = new FormData();
      formData.append("name", files[0].name); 
      formData.append("img", files[0]); 
      selectedTags.forEach(tag => formData.append("tags", tag)); 
  
      try {
        const response = await fetch("https://localhost:8000/clothes/create/", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, 
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
                  value="T-shirt" 
                  onChange={handleTagChange} 
                  id="tshirt-checkbox"
                />
                <label htmlFor="tshirt-checkbox">T-Shirt</label>
            </li>
            <li className="tag">
                <input 
                  type="checkbox" 
                  value="Pant" 
                  onChange={handleTagChange} 
                  id="pant-checkbox"
                />
                <label htmlFor="pant-checkbox">Pant</label>
            </li>
            <li className="tag">
                <input 
                  type="checkbox" 
                  value="Shoe" 
                  onChange={handleTagChange} 
                  id="shoe-checkbox"
                />
                <label htmlFor="shoe-checkbox">Shoe</label>
            </li>
            <li className="tag">
                <input 
                  type="checkbox" 
                  value="Hat" 
                  onChange={handleTagChange} 
                  id="hat-checkbox"
                />
                <label htmlFor="hat-checkbox">Hat</label>
            </li>
            <li className="tag">
              <div>
                <input 
                  type="checkbox" 
                  value="Bag" 
                  onChange={handleTagChange} 
                  id="bag-checkbox"
                />
                <label htmlFor="bag-checkbox">Bag</label>
              </div>
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
