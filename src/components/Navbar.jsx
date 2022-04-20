import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { LightThemeIcon } from './LightThemeIcon';

export const Navbar = () => {
    const { flipTheme, theme } = useContext(ThemeContext);
    return <nav className="navbar">
        <h1 className="navbar-title" onClick={flipTheme}>Wordle</h1>
        <div className="navbar-icon-container">
            <LightThemeIcon />
        </div>
    </nav>
};