import React from 'react';

export const Footer: React.FC = () => {
    return (
        <footer className="footer-gradient text-white py-8 mt-auto">
            <div className="container mx-auto text-center">
                <p>&copy; {new Date().getFullYear()} Все права защищены.</p>
            </div>
        </footer>
    );
};
