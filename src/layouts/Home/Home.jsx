import React from 'react'
import "./Home.css"
import { images } from '../../Components/Images/Images'

export const Home = () => {
  return (
    <div className='homeBody'>
      <div>
        <img src={images.Home}/>
      </div>
    </div>
  )
}
