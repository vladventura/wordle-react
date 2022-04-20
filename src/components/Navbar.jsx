import React, { useContext } from 'react';
import { ThemeContext } from '../context/themeContext';
import { DarkThemeIcon } from './DarkThemeIcon';
import { LightThemeIcon } from './LightThemeIcon';

export const Navbar = () => {
    const { flipTheme, theme } = useContext(ThemeContext);
    return <nav className="navbar">
        <h1 className="navbar-title">Wordle</h1>
        <div className="navbar-icon-container" onClick={flipTheme}>
            {theme === "light" ? <LightThemeIcon /> : <DarkThemeIcon />}
        </div>
    </nav>
};