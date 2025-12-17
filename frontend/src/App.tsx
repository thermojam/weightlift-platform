import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from '@/layouts/NavBar';
import { Footer } from '@/layouts/Footer';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';


export const App: React.FC = () => {
    return (
        <Router>
            <div className="flex flex-col h-screen bg-background text-foreground overflow-hidden">
                <Navbar/>
                <main className="flex-1 content-gradient overflow-hidden flex flex-col min-h-0">
                    <div className="flex-1 overflow-y-auto hide-scrollbar">
                        <Routes>
                            <Route path="/" element={<Home/>}/>
                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </main>
                <Footer/>
            </div>
        </Router>
    );
};
