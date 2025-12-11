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
                {stocks.map((stock) => {
                    const isUp = stock.change > 0;
                    const colorClass = isUp ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400';
                    const bgClass = isUp ? 'bg-red-50 dark:bg-transparent' : 'bg-green-50 dark:bg-transparent';
                    const barColorClass = isUp ? 'bg-red-500' : 'bg-green-500';

                    return (
                        <div 
                            key={stock.symbol} 
                            onClick={() => onTickerClick(stock.symbol)}
                            className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer group"
                        >
                            <div className="flex justify-between items-center mb-1">
                                <div>
                                    <div className="text-slate-900 dark:text-slate-100 font-bold text-lg group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                                        {stock.name}
                                    </div>
                                    <div className="text-xs text-slate-400">{stock.symbol}</div>
                                </div>
                                <div className="text-right">
                                    <div className={`${colorClass} font-bold font-mono text-lg`}>
                                        {stock.price.toLocaleString(undefined, { minimumFractionDigits: 1 })}
                                    </div>
                                    <div className={`${colorClass} text-xs font-mono ${bgClass} px-1 rounded inline-block`}>
                                        {isUp ? '▲' : '▼'} {Math.abs(stock.changePercent).toFixed(2)}%
                                    </div>
                                </div>
                            </div>
                            <div className="h-1 w-full bg-slate-100 dark:bg-slate-700 rounded-full mt-2 overflow-hidden">
                                <div 
                                    className={`h-full ${barColorClass}`} 
                                    style={{ width: `${stock.strength}%` }}
                                ></div>
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