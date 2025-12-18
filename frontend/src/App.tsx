import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from '@/layouts/NavBar';
import { Footer } from '@/layouts/Footer';
import { Home, AuthPage, Post, Posts, PostForm } from "@/pages";
import { Login } from "@/components/Login";
import { Register } from "@/components/Register";
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
                            <Route path="/articles" element={<Posts/>}/>
                            <Route path="/posts/:id" element={<Post/>}/>
                            <Route path="/post" element={<PostForm/>}/>
                            <Route path="/post/:id/edit" element={<PostForm/>}/>

                            <Route path="/auth" element={<AuthPage/>}>
                                <Route index element={<Navigate to="login" replace/>}/>
                                <Route path="login" element={<Login/>}/>
                                <Route path="register" element={<Register/>}/>
                            </Route>
                            <Route path="/login" element={<Navigate to="/auth/login" replace/>}/>

                            <Route path="*" element={<NotFound/>}/>
                        </Routes>
                    </div>
                </main>
                <Footer/>
            </div>
        </Router>
    );
};
