import React from 'react'
import "./Home.css"
import { images } from '../../Components/Images/Images'

import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const userRdxData = useSelector(userData);
  const navigate = useNavigate();
  
  return (
    <div className='homeBody'>
      <div className='torches'>
        <img src={images.Torch}/>
      </div>
      <div className='homeBG'>
        <img src={images.Home}/>
      </div>
      <div className='startButton'>
          {userRdxData.credentials.token && (
            <img onClick={() => navigate("/gameboard")} src="https://see.fontimg.com/api/renderfont4/YzP8o/eyJyIjoiZnMiLCJoIjoyMDAsInciOjEwMDAsImZzIjoyMDAsImZnYyI6IiNFNEMyM0UiLCJiZ2MiOiIjMUUxRTFFIiwidCI6MX0/RW1iYXJr/hardinge-free-trial.png"/>
          )}
        </div>
      <div className='torches'>
        <img src={images.Torch}/>
      </div>
    </div>
  )
}
