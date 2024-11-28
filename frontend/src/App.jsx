import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import ImageRestore from './components/ImageRestore';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Header from './components/Header';


function App() {
  

  return (
    <div>
      <Navbar />
     <main className='main-content'>
        <ImageRestore />
      </main>
      <Footer />
    </div>
  );
}

export default App;
