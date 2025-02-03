
export const GuardarEnStorage = (clave, elemento) => {
    let elementos = JSON.parse(localStorage.getItem(clave))

    if(Array.isArray(elementos)){
      elementos.push(elemento)
    }else {
      elementos = [elemento]
    }

    localStorage.setItem(clave, JSON.stringify(elementos))

    return elemento
  }