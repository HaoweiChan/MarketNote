import React from 'react';
import { Search, Sun, Moon, Bell } from 'lucide-react';
import { TICKER_DATA } from '../constants';

interface HeaderProps {
    isDark: boolean;
    toggleTheme: () => void;
    onHomeClick: () => void;
    onTickerClick: (tickerName: string) => void;
}

const Header: React.FC<HeaderProps> = ({ isDark, toggleTheme, onHomeClick, onTickerClick }) => {
    return (
        <header className="bg-slate-900 text-white sticky top-0 z-50 shadow-lg dark:bg-slate-900 dark:border-b dark:border-slate-800 transition-colors duration-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    {/* Logo Area */}
                    <div 
                        className="flex items-center gap-3 cursor-pointer group"
                        onClick={onHomeClick}
                    >
                        <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center font-bold text-slate-900 shadow-amber-500/50 shadow-lg select-none group-hover:scale-105 transition-transform">
                            T
                        </div>
                        <span className="font-bold text-xl tracking-wide hidden sm:block group-hover:text-amber-400 transition-colors">TrendBrief</span>
                    </div>

                    {/* Search Bar */}
                    <div className="hidden md:flex flex-1 max-w-lg mx-8 relative group">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 group-focus-within:text-amber-500 transition-colors">
                            <Search size={16} />
                        </span>
                        <input
                            type="text"
                            className="block w-full pl-10 pr-3 py-2 border border-slate-700 rounded-md leading-5 
                                  bg-slate-800 text-slate-300 placeholder-slate-500 
                                  focus:outline-none focus:bg-slate-700 focus:border-amber-500 focus:text-white
                                  dark:bg-slate-950 dark:border-slate-800
                                  sm:text-sm transition duration-150 ease-in-out"
                            placeholder="搜尋節目、代號 (2330)..."
                        />
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleTheme}
                            className="w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-400 flex items-center justify-center transition focus:outline-none ring-1 ring-slate-700"
                            aria-label="Toggle Theme"
                        >
                            {isDark ? <Moon size={18} /> : <Sun size={18} />}
                        </button>

                        <div className="h-8 w-1 border-r border-slate-700 mx-1 hidden sm:block"></div>

                        <button className="text-slate-400 hover:text-white transition relative">
                            <Bell size={20} />
                            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full ring-2 ring-slate-900 bg-red-500 transform translate-x-1/4 -translate-y-1/4"></span>
                        </button>
                        
                        <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-amber-500 to-purple-600 border-2 border-slate-700 cursor-pointer"></div>
                    </div>
                </div>
            </div>

            {/* Ticker */}
            <div className="bg-black text-xs py-1 overflow-hidden border-t border-slate-800">
                <div className="max-w-7xl mx-auto px-4 flex gap-6 font-mono text-slate-400 whitespace-nowrap overflow-x-auto no-scrollbar">
                    {TICKER_DATA.map((item, index) => (
                        <React.Fragment key={index}>
                            <button 
                                onClick={() => onTickerClick(item.name)}
                                className="flex items-center gap-1 hover:bg-slate-800 px-1 rounded transition"
                            >
                                {item.name} 
                                <span className={
                                    item.change === 'up' ? 'text-red-500 dark:text-red-400' : 
                                    item.change === 'down' ? 'text-green-500 dark:text-green-400' : 'text-slate-200'
                                }>
                                    {item.value}
                                </span>
                            </button>
                            {index < TICKER_DATA.length - 1 && <span className="text-slate-600">|</span>}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;