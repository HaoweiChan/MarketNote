import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import EpisodeCard from './components/EpisodeCard';
import StockWidget from './components/StockWidget';
import { MOCK_EPISODES, MOCK_STOCKS, TICKER_DATA } from './constants';
import { Mic, Wifi, Star, ArrowUpRight, ArrowDownRight, Activity, TrendingUp, Zap, BarChart3, Filter } from 'lucide-react';

type ViewType = 'home' | 'podcaster' | 'ticker';

const App: React.FC = () => {
    // Theme state
    const [isDark, setIsDark] = useState<boolean>(false);

    // Navigation state
    const [view, setView] = useState<ViewType>('home');
    const [viewId, setViewId] = useState<string>(''); // Stores podcaster name or ticker symbol

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
                {/* Hero Section: Market Pulse */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Market Sentiment */}
                    <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group hover:shadow-md transition">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition">
                            <BarChart3 size={64} className="text-amber-500" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2">
                            <Activity size={14} /> 市場情緒
                        </h3>
                        <div className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                            貪婪 <span className="text-green-500 text-lg ml-1">75</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-2">AI 伺服器與散熱族群持續領漲，市場信心強勁。</p>
                        <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 mt-3 rounded-full overflow-hidden">
                            <div className="bg-gradient-to-r from-green-400 to-green-600 h-full w-3/4"></div>
                        </div>
                    </div>

                    {/* Card 2: Hot Topic */}
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-5 rounded-2xl shadow-md text-white relative overflow-hidden group hover:shadow-lg transition cursor-pointer" onClick={() => setFilter('All')}>
                        <div className="absolute -bottom-4 -right-4 bg-white/10 w-24 h-24 rounded-full blur-xl group-hover:blur-2xl transition"></div>
                        <h3 className="text-sm font-medium text-indigo-100 mb-1 flex items-center gap-2">
                            <Zap size={14} className="text-amber-300" /> 本週熱議
                        </h3>
                        <div className="text-2xl font-bold mb-1">#AI供應鏈</div>
                        <div className="flex gap-2 mt-3">
                            <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">奇鋐</span>
                            <span className="text-xs bg-white/20 px-2 py-1 rounded backdrop-blur-sm">廣達</span>
                        </div>
                    </div>

                    {/* Card 3: Most Mentioned Stock */}
                    <div 
                        className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm group hover:shadow-md transition cursor-pointer hover:border-amber-200 dark:hover:border-amber-900"
                        onClick={() => navigateToTicker('2330')}
                    >
                         <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1 flex items-center gap-2">
                            <TrendingUp size={14} className="text-red-500" /> 關注焦點
                        </h3>
                        <div className="flex justify-between items-end">
                            <div>
                                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">台積電</div>
                                <div className="text-xs text-slate-400">2330.TW</div>
                            </div>
                            <div className="text-right">
                                <div className="text-red-500 font-mono font-bold">950.0</div>
                                <div className="text-xs text-red-500 bg-red-50 dark:bg-red-900/20 px-1 rounded">▲ 2.5%</div>
                            </div>
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

                {/* Feed Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
                            <Mic size={20} className="text-amber-500" /> 最新摘要
                        </h2>
                        <span className="text-xs text-slate-500">
                             顯示 {homeEpisodes.length} 個結果
                        </span>
                    </div>

                    <div className="space-y-5">
                        {homeEpisodes.map(episode => (
                            <EpisodeCard 
                                key={episode.id} 
                                episode={episode} 
                                onPodcasterClick={navigateToPodcaster}
                                onTickerClick={navigateToTicker}
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

    return (
        <div className="min-h-screen pb-12">
            <Header 
                isDark={isDark} 
                toggleTheme={toggleTheme} 
                onHomeClick={navigateHome}
                onTickerClick={navigateToTicker}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    
                    {/* Main Content Area */}
                    <main className="lg:col-span-8">
                        {view === 'home' && renderHome()}
                        {view === 'podcaster' && renderPodcasterView()}
                        {view === 'ticker' && renderTickerView()}
                    </main>

                    {/* Sidebar - Always visible, but static data for now */}
                    <aside className="hidden lg:block lg:col-span-4 space-y-6">
                        <div className="sticky top-24 space-y-6">
                            
                            <StockWidget stocks={MOCK_STOCKS} onTickerClick={navigateToTicker} />

                            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-xl p-6 text-white text-center shadow-lg dark:from-indigo-900 dark:to-purple-900">
                                <p className="font-bold text-lg mb-2">TrendBrief Pro</p>
                                <p className="text-indigo-100 text-sm mb-4">解鎖 AI 自動逐字稿與深度分析。</p>
                                <button className="bg-white text-indigo-600 px-4 py-2 rounded-lg text-sm font-bold shadow hover:bg-indigo-50 transition transform hover:scale-105 active:scale-95">
                                    立即升級
                                </button>
                            </div>

                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default App;