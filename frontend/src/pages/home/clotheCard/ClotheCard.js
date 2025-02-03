
import React, { useState } from 'react'
import './ClotheCard.css'

export const ClotheCard = ({ clothes }) => {

  return (
    <div className='datos'>
        {
        clothes.map(clothe => (
            <article key={clothe.id}>
                <h3>{clothe.nombre}</h3>
                <h3>{clothe.tag}</h3>
            </article>
        ))
        }
    </div>
  )
}
