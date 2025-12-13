import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { Stock } from '../types';

interface StockWidgetProps {
    stocks: Stock[];
    onTickerClick: (symbol: string) => void;
}

const StockWidget: React.FC<StockWidgetProps> = ({ stocks, onTickerClick }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden
                      dark:bg-slate-900 dark:border-slate-800 dark:shadow-none transition-colors duration-200">
            
            <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex justify-between items-center
                        dark:bg-slate-800 dark:border-slate-700">
                <h3 className="text-slate-700 font-bold text-sm dark:text-slate-200 flex items-center gap-2">
                    <Zap size={14} className="text-amber-500 fill-amber-500" />
                    本集相關個股
                </h3>
                <span className="text-xs text-slate-400 dark:text-slate-500">延遲 15 分鐘</span>
            </div>
            
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {stocks.map((stock, idx) => {
                    const isUp = stock.change > 0;
                    const colorClass = isUp ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
                    
                    // Sparkline styling
                    const strokeClass = isUp ? 'stroke-red-500 dark:stroke-red-400' : 'stroke-green-500 dark:stroke-green-400';
                    const pathD = isUp 
                        ? "M0 15 L10 12 L20 16 L30 8 L40 10 L50 4 L60 2" 
                        : "M0 5 L10 8 L20 4 L30 12 L40 10 L50 16 L60 18";

                    // Mock mentions count
                    const mentions = idx === 0 ? 3 : 1;

                    return (
                        <div 
                            key={stock.symbol} 
                            onClick={() => onTickerClick(stock.symbol)}
                            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer group"
                        >
                            <div className="flex items-center justify-between gap-4">
                                {/* Left: Badge & Info */}
                                <div className="flex items-center gap-3 min-w-0">
                                    <div className="w-12 h-10 rounded bg-slate-200 dark:bg-slate-700 flex flex-col items-center justify-center flex-shrink-0">
                                        <span className="font-bold text-slate-600 dark:text-slate-300 text-xs font-mono">
                                            {stock.symbol.split('.')[0]}
                                        </span>
                                    </div>
                                    <div className="min-w-0">
                                        <div className="text-slate-900 dark:text-slate-100 font-bold text-sm group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors truncate">
                                            {stock.name}
                                        </div>
                                        <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                                            <Zap size={10} className="fill-amber-500 text-amber-500 dark:text-amber-400" />
                                            {mentions} 集提及
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Middle: Sparkline */}
                                <div className="h-8 flex-1 max-w-[80px] flex items-center opacity-80">
                                    <svg viewBox="0 0 60 20" className={`fill-none stroke-2 ${strokeClass}`} width="100%" height="100%">
                                        <path d={pathD} strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                                
                                {/* Right: Price */}
                                <div className="text-right flex-shrink-0">
                                    <div className="font-bold font-mono text-sm text-slate-900 dark:text-white leading-tight">
                                        {stock.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                                    </div>
                                    <div className={`${colorClass} text-xs font-mono font-bold mt-0.5`}>
                                        {isUp ? '+' : ''}{Math.abs(stock.changePercent).toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="bg-slate-50 px-4 py-2 border-t border-slate-200 text-center dark:bg-slate-800 dark:border-slate-700">
                <button className="text-xs text-amber-600 dark:text-amber-500 hover:text-amber-700 font-medium flex items-center justify-center gap-1 w-full h-full">
                    查看完整 K 線圖 <ArrowRight size={12} />
                </button>
            </div>
        </div>
    );
};

export default StockWidget;