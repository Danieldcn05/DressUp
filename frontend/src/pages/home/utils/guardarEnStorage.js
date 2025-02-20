
export const GuardarEnStorage = (clave, elemento) => {



  localStorage.removeItem(clave);

  localStorage.setItem(clave, JSON.stringify(elemento))

  return elemento
}