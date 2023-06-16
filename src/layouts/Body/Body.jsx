import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from '../Home/Home';
import { Login } from '../Login/Login';
import { SignUp } from '../Sign Up/SignUp';
import { Profile } from '../Profile/Profile';
import { Characters } from '../Characters/Characters';
import { GameBoard } from '../GameBoard/GameBoard';

export const Body = () => {
  return (
    <div>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/characters" element={<Characters />} />
      <Route path="/gameboard" element={<GameBoard />} />
      {/* <Route path="/admin" element={<Admin />} /> */}
    </Routes>
  </div>
  )
}
