import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {Navbar} from '@/widgets/NavBar';
import {Footer} from '@/widgets/Footer';
import {
    Home,
    AuthPage,
    Post,
    Posts,
    PostForm,
    Videos,
    Form,
    Project,
    Users,
    Feedbacks,
    Profile,
    Diary,
    NotFound
} from "@/pages";
import {LoginForm} from "@/features/auth/login/ui/LoginForm"
import {RegisterForm} from "@/features/auth/register/ui/RegisterForm";


export const App: React.FC = () => {
    return (
        <div className="flex flex-col h-screen text-foreground overflow-hidden">
            <Navbar/>
            <main className="flex-1 content-gradient overflow-hidden flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto hide-scrollbar">
                    <Routes>
                        <Route path="/" element={<Home/>}/>
                        <Route path="/posts" element={<Posts/>}/>
                        <Route path="/posts/:id" element={<Post/>}/>
                        <Route path="/post" element={<PostForm/>}/>
                        <Route path="/post/:id/edit" element={<PostForm/>}/>
                        <Route path="/videos" element={<Videos/>}/>
                        <Route path="/project" element={<Project/>}/>
                        <Route path="/form" element={<Form/>}/>
                        <Route path="/users" element={<Users/>}/>
                        <Route path="/feedback" element={<Feedbacks/>}/>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/diary" element={<Diary/>}/>
                        <Route path="/auth" element={<AuthPage/>}>
                            <Route index element={<Navigate to="login" replace/>}/>
                            <Route path="login" element={<LoginForm/>}/>
                            <Route path="register" element={<RegisterForm/>}/>
                        </Route>
                        <Route path="/login" element={<Navigate to="/auth/login" replace/>}/>
                        <Route path="*" element={<NotFound/>}/>
                    </Routes>
                </div>
            </main>
            <Footer/>
        </div>
    );
};
