import React from 'react'
import "./Home.css"
import { images } from '../../Components/Images/Images'

export const Home = () => {
  return (
    <div className='homeBody'>
      <div className='torches'>
        <img src={images.Torch}/>
      </div>
      <div>
        <img src={images.Home}/>
      </div>
      <div className='torches'>
        <img src={images.Torch}/>
      </div>
    </div>
  )
}
