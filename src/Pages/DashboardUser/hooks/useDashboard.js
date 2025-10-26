import { useState, useEffect, useCallback, useMemo } from 'react';
import { DEFAULT_SETTINGS } from '../constants';

export const useDashboard = () => {
  const [activeNav, setActiveNav] = useState('dashboard');
  const [userType, setUserType] = useState('player');
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [currentGame, setCurrentGame] = useState('CS2');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isGameDropdownOpen, setIsGameDropdownOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleSetting = useCallback((key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  const handleNavClick = useCallback((navItem) => {
    setActiveNav(navItem);
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const toggleGameDropdown = useCallback(() => {
    setIsGameDropdownOpen(prev => !prev);
  }, []);

  const selectGame = useCallback((game) => {
    setCurrentGame(game);
    setIsGameDropdownOpen(false);
  }, []);

  const toggleCollapse = useCallback(() => {
    setIsCollapsed(prev => !prev);
  }, []);

  // Memoized values for performance
  const dashboardState = useMemo(() => ({
    activeNav,
    userType,
    settings,
    isLoading,
    currentGame,
    isMobileMenuOpen,
    isGameDropdownOpen,
    isCollapsed
  }), [activeNav, userType, settings, isLoading, currentGame, isMobileMenuOpen, isGameDropdownOpen, isCollapsed]);

  const dashboardActions = useMemo(() => ({
    setUserType,
    toggleSetting,
    handleNavClick,
    toggleMobileMenu,
    toggleGameDropdown,
    selectGame,
    toggleCollapse
  }), [setUserType, toggleSetting, handleNavClick, toggleMobileMenu, toggleGameDropdown, selectGame, toggleCollapse]);

  return {
    ...dashboardState,
    ...dashboardActions
  };
};
