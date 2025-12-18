import React from 'react';
import { Outlet } from 'react-router-dom';

export const AuthPage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-[calc(100vh-160px)] py-8">
            <Outlet/>
        </div>
    );
};
