
export const GuardarTokenEnStorage = (token) => {
    let elemento = JSON.parse(localStorage.getItem("authToken"))

    if(elemento === null){
      localStorage.setItem("authToken", token)
    }

    return token
  }