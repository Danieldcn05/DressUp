import React from 'react'
import { Link } from 'react-router-dom'

export const Error = () => {
  return (
    <div>
        <h1>Error 404</h1>
        <h3>La ruta indicada no existe</h3>
        <button><Link to='/home'>Volver</Link></button>
    </div>
  )
}
