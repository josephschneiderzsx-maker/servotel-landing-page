import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Rooms from './components/Rooms';
import Amenities from './components/Amenities';
import Shuttle from './components/Shuttle';
import Testimonials from './components/Testimonials';
import Location from './components/Location';
import Footer from './components/Footer';
import ModalManager from './components/ModalManager';
import { LanguageProvider } from './context/LanguageContext';
import { ModalProvider } from './context/ModalContext';

function App() {
  return (
    <LanguageProvider>
        <ModalProvider>
            <div className="flex flex-col w-full min-h-screen font-sans">
                <Navbar />
                <main className="flex-grow">
                    <Hero />
                    <About />
                    <Rooms />
                    <Amenities />
                    <Shuttle />
                    <Testimonials />
                    <Location />
                </main>
                <Footer />
                <ModalManager />
            </div>
        </ModalProvider>
    </LanguageProvider>
  );
}

export default App;