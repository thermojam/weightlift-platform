import React, { useState } from 'react';
import { Sidebar } from '@/layouts/Sidebar';

interface AdminLayoutProps {
    children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);

    const toggleSidebar = () => {
        setSidebarCollapsed(prevState => !prevState);
    };

    return (
        <div className="flex min-h-[calc(100vh-160px)] bg-slate-900">
            <Sidebar isCollapsed={isSidebarCollapsed} onToggleCollapse={toggleSidebar} />
            <main className="flex-1 p-8 w-full overflow-auto">
                {children}
            </main>
        </div>
    );
};
