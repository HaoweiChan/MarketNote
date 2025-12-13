import React, { useState, useRef, useEffect } from 'react';
import { Search, Sun, Moon, Bell, User, Settings, LogOut } from 'lucide-react';
import { TICKER_DATA } from '../constants';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
    onHomeClick: () => void;
    onTickerClick: (tickerName: string) => void;
    onProfileClick: () => void;
    onSettingsClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
    isDark, 
    toggleTheme, 
    onHomeClick, 
    onTickerClick,
    onProfileClick,
    onSettingsClick
}) => {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef<HTMLDivElement>(null);

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleProfileNav = (action: () => void) => {
        action();
        setIsProfileOpen(false);
    }

    return (
        <header className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white sticky top-0 z-50 shadow-sm border-b border-slate-200 dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Area */}
                    <div 
                        className="flex items-center cursor-pointer select-none hover:opacity-90 transition-opacity"
                        onClick={onHomeClick}
                    >
                        <span className="font-bold text-2xl tracking-tighter text-amber-600 dark:text-amber-500">Trend</span>
                        <span className="font-bold text-2xl tracking-tighter text-slate-700 dark:text-slate-200">Brief</span>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-amber-500 transition-colors">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-md leading-5 
                                  bg-slate-100 text-slate-900 placeholder-slate-500 
                                  focus:outline-none focus:bg-white focus:border-amber-500 focus:text-slate-900
                                  dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300 dark:focus:bg-slate-700 dark:focus:text-white
                                  sm:text-sm transition duration-150 ease-in-out"
                            placeholder="搜尋節目、代號 (2330)..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-amber-500 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-amber-400 flex items-center justify-center transition focus:outline-none ring-1 ring-slate-200 dark:ring-slate-700"
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        <div className="h-8 w-1 border-r border-slate-200 dark:border-slate-700 mx-1 hidden sm:block"></div>

                        <button className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-white dark:ring-slate-900 bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
                        </button>
                        
                        {/* Profile Dropdown */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 border-2 border-slate-200 dark:border-slate-700 cursor-pointer hover:ring-2 hover:ring-slate-200 dark:hover:ring-slate-600 transition ring-offset-2 ring-offset-white dark:ring-offset-slate-900 focus:outline-none"
                            ></button>

                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-800 py-1 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
                                    <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                                        <p className="text-sm font-bold text-slate-900 dark:text-white">Alex Chen</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">alex.chen@trendbrief.com</p>
                                    </div>
                                    
                                    <div className="p-1">
                                        <button 
                                            onClick={() => handleProfileNav(onProfileClick)}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <User size={16} className="text-slate-400" /> 
                                            個人檔案
                                        </button>
                                        <button 
                                            onClick={() => handleProfileNav(onSettingsClick)}
                                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                                        >
                                            <Settings size={16} className="text-slate-400" /> 
                                            帳號設定
                                        </button>
                                    </div>

                                    <div className="p-1 border-t border-slate-100 dark:border-slate-800">
                                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                                            <LogOut size={16} /> 登出
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Ticker */}
            <div className="bg-slate-50 dark:bg-black text-xs py-1 overflow-hidden border-t border-slate-200 dark:border-slate-800">
                <div className="max-w-7xl mx-auto px-4 flex gap-6 font-mono text-slate-600 dark:text-slate-400 whitespace-nowrap overflow-x-auto no-scrollbar">
                    {TICKER_DATA.map((item, index) => (
                        <React.Fragment key={index}>
                            <button 
                                onClick={() => onTickerClick(item.name)}
                                className="flex items-center gap-1 hover:bg-slate-200 dark:hover:bg-slate-800 px-1 rounded transition"
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-300">{item.name}</span>
                                <span className={
                                    item.change === 'up' ? 'text-red-600 dark:text-red-400' : 
                                    item.change === 'down' ? 'text-green-600 dark:text-green-400' : 'text-slate-500'
                                }>
                                    {item.value}
                                </span>
                            </button>
                            {index < TICKER_DATA.length - 1 && <span className="text-slate-300 dark:text-slate-600">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;