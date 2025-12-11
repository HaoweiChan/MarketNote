import React from 'react';
import { PlayCircle, Circle } from 'lucide-react';
import { Episode } from '../types';

interface EpisodeCardProps {
    episode: Episode;
    onPodcasterClick: (name: string) => void;
    onTickerClick: (symbol: string) => void;
}

const EpisodeCard: React.FC<EpisodeCardProps> = ({ episode, onPodcasterClick, onTickerClick }) => {
    // Helper to render summary text with stock highlights
    const renderSummaryText = (text: string, highlights?: Episode['summary'][0]['highlights']) => {
        if (!highlights || highlights.length === 0) return text;

        let result: (string | React.ReactElement)[] = [];
        let lastIndex = 0;

        highlights.forEach((highlight, idx) => {
             const foundIndex = text.indexOf(highlight.text, lastIndex);
             if (foundIndex !== -1) {
                 // Push text before highlight
                 if (foundIndex > lastIndex) {
                     result.push(text.substring(lastIndex, foundIndex));
                 }
                 // Push highlighted element
                 result.push(
                     <button 
                        key={idx}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (highlight.symbol) onTickerClick(highlight.symbol);
                        }}
                        className="inline-block mx-1 bg-red-50 text-red-700 border-b border-red-200 hover:bg-red-100 
                                   dark:bg-red-900/20 dark:text-red-300 dark:border-red-800 dark:hover:bg-red-900/40
                                   px-1.5 py-0.5 rounded cursor-pointer font-medium transition"
                     >
                        {highlight.text}
                     </button>
                 );
                 lastIndex = foundIndex + highlight.text.length;
             }
        });

        if (lastIndex < text.length) {
            result.push(text.substring(lastIndex));
        }

        return result;
    };

    return (
        <article className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition duration-200
                          dark:bg-slate-900 dark:border-slate-800 dark:shadow-none">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-3">
                        <button 
                            onClick={() => onPodcasterClick(episode.showName)}
                            className={`w-12 h-12 rounded flex items-center justify-center text-xs font-bold ${episode.showColorClass} hover:opacity-80 transition`}
                        >
                            {episode.showAvatar}
                        </button>
                        <div>
                            <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 leading-tight">
                                {episode.title}
                            </h2>
                            <div className="flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 mt-1">
                                <button 
                                    onClick={() => onPodcasterClick(episode.showName)}
                                    className="hover:text-amber-600 dark:hover:text-amber-400 transition"
                                >
                                    {episode.showName}
                                </button>
                                <span>•</span>
                                <span>{episode.timeAgo}</span>
                            </div>
                        </div>
                    </div>
                    {episode.isHot && (
                        <span className="bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-semibold px-2.5 py-0.5 rounded border border-amber-100 dark:border-amber-900">
                            熱門
                        </span>
                    )}
                </div>

                {/* Summary Section */}
                {episode.summary.length > 0 && (
                     <div className="space-y-3 mb-6">
                        {/* Only show "Key Points" header if there are bullet points with highlights for visual balance */}
                        {episode.summary.some(s => s.highlights && s.highlights.length > 0) && (
                            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider">重點摘要</h3>
                        )}
                        
                        <ul className="space-y-3 text-slate-700 dark:text-slate-300 leading-relaxed">
                            {episode.summary.map((point, index) => (
                                <li key={index} className="flex gap-3">
                                    {point.highlights && point.highlights.length > 0 ? (
                                         <span className="text-amber-500 mt-1.5 flex-shrink-0">
                                            <Circle size={6} fill="currentColor" />
                                         </span>
                                    ) : null}
                                   
                                    <span className={point.highlights && point.highlights.length > 0 ? '' : 'line-clamp-2 text-slate-600 dark:text-slate-400'}>
                                        {renderSummaryText(point.text, point.highlights)}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-100 dark:border-slate-800 pt-4">
                    <div className="flex gap-2">
                        {episode.tags.map(tag => (
                            <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded dark:bg-slate-800 dark:text-slate-400">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <button className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-medium hover:text-amber-700 dark:hover:text-amber-300 transition group">
                        <PlayCircle size={20} className="group-hover:scale-110 transition-transform" /> 收聽
                    </button>
                </div>
            </div>
        </article>
    );
};

export default EpisodeCard;