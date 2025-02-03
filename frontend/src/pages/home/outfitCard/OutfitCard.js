
import React, { useState } from 'react'
import './OutfitCard.css'

export const OutfitCard = () => {

    const [outfits, setOutfits] = useState([
        { 'id': 1, 'nombre': 'outfit 1' },
        { 'id': 2, 'nombre': 'outfit 2' },
        { 'id': 3, 'nombre': 'outfit 3' },
        { 'id': 4, 'nombre': 'outfit 4' },
        { 'id': 5, 'nombre': 'outfit 5' }
      ])

  return (
    <div className='datos'>
        {
        outfits.map(outfit => (
            <article key={outfit.id}>
                <h3>{outfit.nombre}</h3>
            </article>
        ))
        }
    </div>
  )
}
