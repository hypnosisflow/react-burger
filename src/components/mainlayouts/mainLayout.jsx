import React from 'react';
import './mainLayout.css'

const MainLayout = (props) => {
    return (
        <div className="main-layout">
            {props.children}
        </div>
    )
}

export default MainLayout; 