import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EpisodeCard from './components/EpisodeCard';
import StockWidget from './components/StockWidget';
import { MOCK_EPISODES, MOCK_STOCKS, TICKER_DATA } from './constants';
import { Mic, Wifi, Star, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Zap, Filter, ChevronRight, Hash, Tag, User, Mail, Calendar, Shield, Bell, Smartphone, Save } from 'lucide-react';

type ViewType = 'home' | 'podcaster' | 'ticker' | 'tag' | 'profile' | 'settings';

const App: React.FC = () => {
    // Theme state
    const [isDark, setIsDark] = useState<boolean>(false);

    // Navigation state
    const [view, setView] = useState<ViewType>('home');
    const [viewId, setViewId] = useState<string>(''); // Stores podcaster name, ticker symbol, or tag name

    // Filter state (for Home view)
    const [filter, setFilter] = useState<string>('All');

    // Theme initialization
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme');
        const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && systemDark)) {
            setIsDark(true);
            document.documentElement.classList.add('dark');
        } else {
            setIsDark(false);
            document.documentElement.classList.remove('dark');
        }
    }, []);

    const toggleTheme = () => {
        if (isDark) {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
            setIsDark(false);
        } else {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
            setIsDark(true);
        }
    };

    // Navigation Handlers
    const navigateHome = () => {
        setView('home');
        setViewId('');
        window.scrollTo(0, 0);
    };

    const navigateToPodcaster = (name: string) => {
        setView('podcaster');
        setViewId(name);
        window.scrollTo(0, 0);
    };

    const navigateToTicker = (symbol: string) => {
        setView('ticker');
        setViewId(symbol);
        window.scrollTo(0, 0);
    };

    const navigateToTag = (tag: string) => {
        setView('tag');
        setViewId(tag);
        window.scrollTo(0, 0);
    };

    const navigateToProfile = () => {
        setView('profile');
        setViewId('');
        window.scrollTo(0, 0);
    }

    const navigateToSettings = () => {
        setView('settings');
        setViewId('');
        window.scrollTo(0, 0);
    }

    // Helper to determine layout constraints
    const isHome = view === 'home';
    const isSettings = view === 'settings';
    const isProfile = view === 'profile';
    const useFullWidth = isHome || isSettings || isProfile;

    // --- VIEW: HOME CONTENT ---
    const renderHome = () => {
        const homeEpisodes = filter === 'All' 
            ? MOCK_EPISODES 
            : MOCK_EPISODES.filter(ep => ep.showName.includes(filter));

        // Extract unique podcasters for filter pills
        const uniquePodcasters = Array.from(new Set(MOCK_EPISODES.map(ep => ep.showName))).map(name => {
            const ep = MOCK_EPISODES.find(e => e.showName === name);
            return {
                name: name,
                avatar: ep?.showAvatar || name[0],
                color: ep?.showColorClass || 'bg-slate-500'
            };
        });

        return (
            <div className="space-y-8">
                {/* Hero Section: Trending Lists */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Trending Tickers */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                            <TrendingUp size={16} className="text-red-500" /> 熱門標的提及
                        </h3>
                        <div className="space-y-2">
                            {MOCK_STOCKS.map((stock, idx) => (
                                <div 
                                    key={stock.symbol}
                                    onClick={() => navigateToTicker(stock.symbol)}
                                    className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400 group-hover:bg-white dark:group-hover:bg-slate-700 shadow-sm transition-colors text-xs">
                                            {stock.symbol.split('.')[0]}
                                        </div>
                                        <div>
                                            <div className="font-bold text-slate-900 dark:text-slate-100 text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                                {stock.name}
                                            </div>
                                            <div className="text-xs text-slate-400 flex items-center gap-1">
                                                <Zap size={10} className="fill-amber-400 text-amber-400" />
                                                {idx === 0 ? '3' : '1'} 集提及
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className={`font-mono font-bold text-sm ${stock.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {stock.price}
                                        </div>
                                        <div className={`text-xs ${stock.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                            {stock.change > 0 ? '+' : ''}{stock.changePercent}%
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Trending Podcasters */}
                    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                        <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-4 flex items-center gap-2 uppercase tracking-wider">
                            <Mic size={16} className="text-amber-500" /> 活躍頻道
                        </h3>
                         <div className="space-y-2">
                            {uniquePodcasters.map(podcaster => {
                                const latestEp = MOCK_EPISODES.find(e => e.showName === podcaster.name);
                                return (
                                    <div 
                                        key={podcaster.name}
                                        onClick={() => navigateToPodcaster(podcaster.name)}
                                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition cursor-pointer group border border-transparent hover:border-slate-100 dark:hover:border-slate-700"
                                    >
                                        <div className="flex items-center gap-3 overflow-hidden">
                                            <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${podcaster.color}`}>
                                                {podcaster.avatar}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-bold text-slate-900 dark:text-slate-100 text-sm">{podcaster.name}</div>
                                                <div className="text-xs text-slate-400 truncate pr-2">
                                                    最新: {latestEp?.title}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-slate-300 dark:text-slate-600 group-hover:text-amber-500 transition-colors">
                                            <ChevronRight size={16} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Styled Filters */}
                <div className="sticky top-16 z-30 bg-slate-50/95 dark:bg-slate-950/95 backdrop-blur-sm py-2 -mx-4 px-4 border-b border-transparent dark:border-slate-800/50 transition-colors">
                    <div className="flex gap-3 overflow-x-auto no-scrollbar items-center">
                        <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider mr-2">
                            <Filter size={12} /> 篩選
                        </div>
                        
                        <button 
                            onClick={() => setFilter('All')}
                            className={`flex items-center gap-2 pl-1 pr-4 py-1 rounded-full text-sm font-medium transition shadow-sm border
                                      ${filter === 'All' 
                                        ? 'bg-slate-800 text-white border-slate-800 dark:bg-amber-500 dark:text-slate-900 dark:border-amber-500' 
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'}`}
                        >
                            <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] 
                                ${filter === 'All' ? 'bg-slate-600 text-slate-200 dark:bg-amber-600/50 dark:text-amber-900' : 'bg-slate-100 text-slate-500 dark:bg-slate-800'}`}>
                                All
                            </span>
                            全部
                        </button>

                        {uniquePodcasters.map(p => (
                            <button 
                                key={p.name}
                                onClick={() => setFilter(p.name)}
                                className={`flex items-center gap-2 pl-1 pr-4 py-1 rounded-full text-sm font-medium transition shadow-sm border
                                          ${filter === p.name 
                                            ? 'bg-slate-800 text-white border-slate-800 dark:bg-amber-500 dark:text-slate-900 dark:border-amber-500' 
                                            : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 dark:bg-slate-900 dark:text-slate-300 dark:border-slate-700'}`}
                            >
                                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${p.color}`}>
                                    {p.avatar}
                                </span>
                                {p.name}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feed Section - 2 Column Grid */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <Mic size={20} className="text-amber-500" /> 最新摘要
                        </h2>
                        <span className="text-xs text-slate-500">
                             顯示 {homeEpisodes.length} 個結果
                        </span>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {homeEpisodes.map(episode => (
                            <EpisodeCard 
                                key={episode.id} 
                                episode={episode} 
                                onPodcasterClick={navigateToPodcaster}
                                onTickerClick={navigateToTicker}
                                onTagClick={navigateToTag}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // --- VIEW: PODCASTER PROFILE ---
    const renderPodcasterView = () => {
        const podcasterEpisodes = MOCK_EPISODES.filter(ep => ep.showName === viewId);
        // Find avatar/color from first episode
        const meta = podcasterEpisodes[0] || { showAvatar: viewId.charAt(0), showColorClass: 'bg-slate-500' };

        return (
            <div className="space-y-8">
                {/* Podcaster Header */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                    <div className={`w-24 h-24 md:w-32 md:h-32 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg ${meta.showColorClass}`}>
                        {meta.showAvatar}
                    </div>
                    <div className="flex-1 space-y-3">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{viewId}</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-1 flex items-center justify-center md:justify-start gap-2">
                                    <Mic size={16} /> 財經 • 投資 • 科技
                                </p>
                            </div>
                            <button className="bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-900 px-6 py-2 rounded-full font-bold hover:opacity-90 transition flex items-center gap-2">
                                <Wifi size={18} /> 訂閱
                            </button>
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                            這裡是 {viewId} 的節目列表。透過深入淺出的方式，帶你了解最新的市場動態與投資趨勢。
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-6 pt-2">
                            <div className="text-center md:text-left">
                                <div className="font-bold text-xl text-slate-900 dark:text-white font-mono">{podcasterEpisodes.length}</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">集數</div>
                            </div>
                            <div className="text-center md:text-left">
                                <div className="font-bold text-xl text-slate-900 dark:text-white font-mono">4.9</div>
                                <div className="text-xs text-slate-500 uppercase tracking-wider">評分</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">所有集數</h2>
                    <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                </div>

                <div className="space-y-6">
                    {podcasterEpisodes.map(episode => (
                        <EpisodeCard 
                            key={episode.id} 
                            episode={episode} 
                            onPodcasterClick={navigateToPodcaster}
                            onTickerClick={navigateToTicker}
                            onTagClick={navigateToTag}
                        />
                    ))}
                    {podcasterEpisodes.length === 0 && (
                        <div className="text-center py-12 text-slate-500">此 Podcaster 目前沒有相關集數。</div>
                    )}
                </div>
            </div>
        );
    };

    // --- VIEW: TICKER PROFILE ---
    const renderTickerView = () => {
        // Find episodes that mention this ticker either in tags or summary highlights
        const relatedEpisodes = MOCK_EPISODES.filter(ep => {
            // Check highlights
            const hasHighlight = ep.summary.some(s => 
                s.highlights?.some(h => h.symbol?.includes(viewId) || h.text.includes(viewId))
            );
            // Check tags (simple check)
            const hasTag = ep.tags.some(t => t.includes(viewId));
            
            return hasHighlight || hasTag;
        });

        // Try to find stock data
        const stockData = MOCK_STOCKS.find(s => s.symbol.includes(viewId) || s.name.includes(viewId));
        // Fallback or data from ticker constants
        const tickerData = TICKER_DATA.find(t => t.name === viewId);

        const displayName = stockData?.name || tickerData?.name || viewId;
        const displaySymbol = stockData?.symbol || (tickerData ? '' : viewId); // Don't show symbol if it's an index like "加權"
        
        // Mock price data if not found in MOCK_STOCKS (reusing ticker data or random fallback for demo)
        const price = stockData?.price.toLocaleString() || tickerData?.value.split(' ')[0] || '---';
        const isUp = stockData ? stockData.change > 0 : (tickerData?.change === 'up');
        const changePercent = stockData ? `${Math.abs(stockData.changePercent).toFixed(2)}%` : '';
        const changeVal = stockData ? Math.abs(stockData.change) : '';
        
        const colorClass = isUp ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
        const bgClass = isUp ? 'bg-red-50 dark:bg-red-900/20' : 'bg-green-50 dark:bg-green-900/20';

        return (
            <div className="space-y-8">
                {/* Stock Header */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div>
                            <div className="flex items-center gap-3">
                                <h1 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight">{displayName}</h1>
                                {displaySymbol && (
                                    <span className="text-xl text-slate-500 font-mono bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                                        {displaySymbol}
                                    </span>
                                )}
                            </div>
                            <div className="mt-2 flex items-baseline gap-4">
                                <span className={`text-5xl font-bold font-mono ${colorClass}`}>{price}</span>
                                <span className={`flex items-center gap-1 font-bold text-lg px-2 py-1 rounded ${bgClass} ${colorClass}`}>
                                    {isUp ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
                                    {changeVal} ({changePercent})
                                </span>
                            </div>
                            <p className="text-slate-500 mt-2 text-sm">即時行情 • 延遲 15 分鐘</p>
                        </div>
                        
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 md:flex-none bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-6 py-3 rounded-lg font-bold hover:opacity-90 transition flex items-center justify-center gap-2">
                                <Star size={18} /> 加入自選
                            </button>
                            <button className="flex-1 md:flex-none border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 px-6 py-3 rounded-lg font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition">
                                設定警示
                            </button>
                        </div>
                    </div>
                </div>

                {/* Related Episodes */}
                <div>
                     <div className="flex items-center gap-2 mb-4">
                        <Activity className="text-amber-500" size={24} />
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">相關集數提及</h2>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{relatedEpisodes.length} 集</span>
                    </div>

                    <div className="space-y-6">
                        {relatedEpisodes.map(episode => (
                            <EpisodeCard 
                                key={episode.id} 
                                episode={episode} 
                                onPodcasterClick={navigateToPodcaster}
                                onTickerClick={navigateToTicker}
                                onTagClick={navigateToTag}
                            />
                        ))}
                        {relatedEpisodes.length === 0 && (
                            <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-12 text-center border border-dashed border-slate-300 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400">目前沒有 Podcast 提到此標的。</p>
                                <button 
                                    onClick={navigateHome}
                                    className="mt-4 text-amber-600 dark:text-amber-500 font-medium hover:underline"
                                >
                                    回到首頁探索更多
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    // --- VIEW: TAG PROFILE ---
    const renderTagView = () => {
        const tagEpisodes = MOCK_EPISODES.filter(ep => ep.tags.includes(viewId));

        return (
            <div className="space-y-8">
                {/* Tag Header */}
                <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6 text-center md:text-left">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 dark:text-slate-500">
                        <Hash size={40} />
                    </div>
                    <div className="flex-1">
                        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
                             <div>
                                <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{viewId}</h1>
                                <p className="text-slate-500 dark:text-slate-400 mt-2 flex items-center justify-center md:justify-start gap-2">
                                    <Tag size={16} /> 相關主題探索
                                </p>
                            </div>
                            <button className="bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-900 px-6 py-2 rounded-full font-bold hover:opacity-90 transition flex items-center gap-2">
                                <Wifi size={18} /> 追蹤話題
                            </button>
                        </div>
                        
                        <p className="text-slate-600 dark:text-slate-300 mt-4 leading-relaxed max-w-2xl">
                            瀏覽所有關於「{viewId}」的 Podcast 摘要與市場討論。
                        </p>
                    </div>
                </div>

                {/* Episodes List */}
                <div>
                     <div className="flex items-center gap-2 mb-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-200">相關集數</h2>
                        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800"></div>
                        <span className="text-sm text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-full">{tagEpisodes.length} 集</span>
                    </div>

                    <div className="space-y-6">
                        {tagEpisodes.map(episode => (
                            <EpisodeCard 
                                key={episode.id} 
                                episode={episode} 
                                onPodcasterClick={navigateToPodcaster}
                                onTickerClick={navigateToTicker}
                                onTagClick={navigateToTag}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    // --- VIEW: PERSONAL PROFILE ---
    const renderProfileView = () => {
        // Mock Saved Stocks for the profile view
        const savedStocks = MOCK_STOCKS.slice(0, 2); 
        const savedEpisodes = MOCK_EPISODES;

        return (
            <div className="space-y-8">
                 {/* User Header */}
                 <div className="bg-gradient-to-r from-slate-900 to-slate-800 dark:from-slate-800 dark:to-slate-900 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
                    
                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="w-24 h-24 rounded-full border-4 border-white/20 shadow-xl bg-gradient-to-tr from-amber-500 to-purple-600 flex items-center justify-center text-2xl font-bold">
                            AC
                        </div>
                        <div className="flex-1 text-center md:text-left space-y-2">
                            <h1 className="text-3xl font-bold">Alex Chen</h1>
                            <div className="flex flex-col md:flex-row items-center gap-4 text-slate-300 text-sm">
                                <span className="flex items-center gap-1"><Mail size={14}/> alex.chen@trendbrief.com</span>
                                <span className="hidden md:inline">•</span>
                                <span className="flex items-center gap-1"><Calendar size={14}/> 2023年 10月 加入</span>
                            </div>
                        </div>
                    </div>
                 </div>

                 {/* Saved Stocks Grid */}
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Star size={18} className="text-amber-500" /> 自選清單
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {savedStocks.map(stock => (
                            <div 
                                key={stock.symbol}
                                onClick={() => navigateToTicker(stock.symbol)}
                                className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:shadow-md transition cursor-pointer"
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <div className="font-bold text-slate-900 dark:text-slate-100">{stock.name}</div>
                                        <div className="text-xs text-slate-400">{stock.symbol}</div>
                                    </div>
                                    <div className={`text-right ${stock.change > 0 ? 'text-red-500' : 'text-green-500'}`}>
                                        <div className="font-bold font-mono">{stock.price}</div>
                                        <div className="text-xs">{stock.change > 0 ? '▲' : '▼'} {stock.changePercent}%</div>
                                    </div>
                                </div>
                                <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                    <div className={`h-full ${stock.change > 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: '60%' }}></div>
                                </div>
                            </div>
                        ))}
                        <button 
                            onClick={() => {}} 
                            className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition group"
                        >
                            <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                                <Star size={20} />
                            </div>
                            <span className="text-sm font-medium">新增自選</span>
                        </button>
                    </div>
                 </div>

                 {/* Saved Episodes */}
                 <div>
                    <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                        <Save size={18} className="text-indigo-500" /> 收藏集數
                    </h3>
                    <div className="space-y-4">
                        {savedEpisodes.map(episode => (
                            <EpisodeCard 
                                key={episode.id} 
                                episode={episode} 
                                onPodcasterClick={navigateToPodcaster}
                                onTickerClick={navigateToTicker}
                                onTagClick={navigateToTag}
                            />
                        ))}
                    </div>
                 </div>
            </div>
        );
    }

    // --- VIEW: SETTINGS ---
    const renderSettingsView = () => {
        return (
            <div className="max-w-3xl mx-auto space-y-8 pb-12">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">帳號設定</h1>
                    <p className="text-slate-500 dark:text-slate-400 mt-2">管理您的個人資料、通知偏好與訂閱方案。</p>
                </div>

                {/* Profile Section */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center gap-2">
                        <User size={18} className="text-slate-500" />
                        <h2 className="font-bold text-slate-800 dark:text-slate-200">基本資料</h2>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex flex-col md:flex-row gap-6 items-start">
                            <div className="flex flex-col items-center gap-3">
                                <div className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-2xl font-bold text-slate-500">
                                    AC
                                </div>
                                <button className="text-xs text-amber-600 dark:text-amber-500 font-bold hover:underline">變更頭像</button>
                            </div>
                            <div className="flex-1 space-y-4 w-full">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">顯示名稱</label>
                                        <input type="text" defaultValue="Alex Chen" className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none dark:text-white" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                                        <input type="email" defaultValue="alex.chen@trendbrief.com" className="w-full px-3 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-500 cursor-not-allowed" disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Notifications */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center gap-2">
                        <Bell size={18} className="text-slate-500" />
                        <h2 className="font-bold text-slate-800 dark:text-slate-200">通知設定</h2>
                    </div>
                    <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">每日市場摘要</h3>
                                <p className="text-xs text-slate-500">每天早上 8:00 發送昨日市場重點整理。</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                            </label>
                        </div>
                        <div className="h-px bg-slate-100 dark:bg-slate-800"></div>
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">追蹤標的警示</h3>
                                <p className="text-xs text-slate-500">當自選股被提及時發送通知。</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 dark:peer-focus:ring-amber-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-amber-500"></div>
                            </label>
                        </div>
                    </div>
                </section>

                {/* Security */}
                <section className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center gap-2">
                        <Shield size={18} className="text-slate-500" />
                        <h2 className="font-bold text-slate-800 dark:text-slate-200">登入與安全</h2>
                    </div>
                    <div className="p-6">
                         <button className="text-slate-600 dark:text-slate-400 font-medium hover:text-slate-900 dark:hover:text-white flex items-center gap-2 transition">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            變更密碼
                        </button>
                    </div>
                </section>

                <div className="flex justify-end gap-4">
                    <button 
                        onClick={navigateHome}
                        className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                        取消
                    </button>
                    <button className="px-6 py-2 rounded-lg bg-amber-500 text-slate-900 font-bold hover:bg-amber-400 transition shadow-lg shadow-amber-500/20">
                        儲存變更
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pb-12 bg-slate-50 dark:bg-slate-950 transition-colors duration-200">
            <Header 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                onHomeClick={navigateHome}
                onTickerClick={navigateToTicker}
                onProfileClick={navigateToProfile}
                onSettingsClick={navigateToSettings}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Content Area: Full width on Home/Settings/Profile, 8 cols otherwise */}
                    <main className={useFullWidth ? 'lg:col-span-12' : 'lg:col-span-8'}>
                        {view === 'home' && renderHome()}
                        {view === 'podcaster' && renderPodcasterView()}
                        {view === 'ticker' && renderTickerView()}
                        {view === 'tag' && renderTagView()}
                        {view === 'profile' && renderProfileView()}
                        {view === 'settings' && renderSettingsView()}
                    </main>

                    {/* Sidebar: Only visible when NOT on Home or Settings or Profile */}
                    {!useFullWidth && (
                        <aside className="hidden lg:block lg:col-span-4 space-y-6">
                            <div className="sticky top-24 space-y-6">
                                
                                <StockWidget stocks={MOCK_STOCKS} onTickerClick={navigateToTicker} />

                            </div>
                        </aside>
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;