import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom";

import { Home } from '../Home/home';


export const Body = () => {
  return (
    <div>
    <Routes>
      <Route path="*" element={<Navigate to="/" />} />
      <Route path="/" element={<Home />} />
      {/* <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<Admin />} /> */}
    </Routes>
  </div>
  )
}
