import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../i18n';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'uz');
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([1, 8, 9]);

  const t = translations[lang];

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('lang', lang);
  }, [lang]);

  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const login = (userData) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AppContext.Provider value={{ theme, toggleTheme, lang, setLang, t, user, login, logout, favorites, toggleFavorite }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
