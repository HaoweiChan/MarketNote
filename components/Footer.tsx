import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans mt-auto">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                
                <div className="flex justify-center mb-6 items-center select-none">
                     <span className="font-bold text-3xl tracking-tighter text-amber-600">Trend</span>
                     <span className="font-bold text-3xl tracking-tighter text-slate-100">Brief</span>
                </div>

                <h3 className="text-sm text-slate-400 font-medium tracking-widest mb-8">
                    聽見市場聲音，看見財富趨勢
                </h3>

                <div className="flex justify-center gap-6 mb-10">
                    <a href="mailto:contact@trendbrief.com" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-amber-600 hover:text-white transition shadow-sm group" title="Email">
                        <i className="fas fa-envelope text-lg"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-black hover:text-white transition shadow-sm" title="Threads">
                        <i className="fa-brands fa-threads text-lg"></i>
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-[#06C755] hover:text-white transition shadow-sm" title="Line">
                        <i className="fa-brands fa-line text-lg"></i>
                    </a>
                </div>

                <div className="flex justify-center gap-6 text-xs font-medium text-slate-500 mb-8">
                    <a href="#" className="hover:text-amber-500 transition">關於我們</a>
                    <a href="#" className="hover:text-amber-500 transition">免責聲明</a>
                </div>

                <div className="border-t border-slate-800 pt-8">
                    <p className="text-[11px] text-slate-600 leading-relaxed max-w-lg mx-auto mb-2">
                        免責聲明：本網站內容整理自各大財經 Podcast，僅供資訊參考與學習使用，不代表任何投資建議。
                    </p>
                    <p className="text-xs text-slate-600">
                        &copy; 2025 TrendBrief 版權所有
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;