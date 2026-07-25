import Sidebar from "./Sidebar";
import { useState } from 'react';
import '../../styles/layout/layout.css';
import { Outlet } from "react-router-dom";

function Layout(){

    const[sidebarOpen, setSidebarOpen] = useState(false);

    function openSidebar() {
        setSidebarOpen(true);
    }

    function closeSidebar(){
        setSidebarOpen(false);
    }

    return(
        <div className="layout">
            <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
            <div className="content">
                <div>
                    <button className="menu-button" onClick={openSidebar}> = </button>
                </div>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;