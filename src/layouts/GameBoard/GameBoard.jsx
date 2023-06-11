import React from 'react'
import './GameBoard.css'

export const GameBoard = () => {
  return (
    <div className='gameBody'>

      <div className='charaSection'>
        <div>chara data</div>
        <div>map</div>
      </div>
      <div className='gameSection'>
        <div>turns left</div>
        <div>arrow up</div>
        <div>
          <div>arrow left</div>
          <div>game screen</div>
          <div>arrow right</div>
        </div>
        <div>arrow down</div>
      </div>
      <div className='itemSection'>
        <div>inventory</div>
        <div>item description</div>
      </div>

    </div>
  )
}
