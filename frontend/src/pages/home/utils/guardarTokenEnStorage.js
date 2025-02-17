
export const GuardarTokenEnStorage = (token) => {
    let elemento = JSON.parse(localStorage.getItem("token"))

    if(elemento === null){
      localStorage.setItem("token", token)
    }

    return token
  }