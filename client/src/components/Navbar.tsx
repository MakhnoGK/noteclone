import React from 'react';
import { RiQuillPenLine } from 'react-icons/ri';

const Navbar = () => {
    return (
        <nav className="navbar">
            <button className="button button--primary" style={{minWidth: 'auto', padding: '1rem'}}>
                <RiQuillPenLine />
            </button>
        </nav>
    );
};

export default Navbar;
