import { Episode, Stock, TickerItem } from './types';

export const TICKER_DATA: TickerItem[] = [
    { name: '加權', value: '21,850 ▲', change: 'up' },
    { name: '櫃買', value: '250.3 ▼', change: 'down' },
    { name: 'NVDA', value: '118.5 ▲', change: 'up' },
    { name: 'TSM', value: '172.0 ▲', change: 'up' },
    { name: 'AAPL', value: '216.4 ▼', change: 'down' },
];

export const MOCK_STOCKS: Stock[] = [
    {
        name: '廣達',
        symbol: '2382.TW',
        price: 285.5,
        change: 12.0,
        changePercent: 4.38,
        strength: 75,
    },
    {
        name: '奇鋐',
        symbol: '3017.TW',
        price: 620.0,
        change: 35.0,
        changePercent: 5.98,
        strength: 85,
    },
    {
        name: '大立光',
        symbol: '3008.TW',
        price: 2450.0,
        change: -20.0,
        changePercent: -0.81,
        strength: 25,
    },
];

export const MOCK_EPISODES: Episode[] = [
    {
        id: '1',
        showName: '股癌 Gooaye',
        showAvatar: 'IMG',
        showColorClass: 'bg-slate-200 dark:bg-slate-800 text-slate-500',
        title: 'EP452 輝達供應鏈大風吹？散熱族群怎麼看',
        timeAgo: '2小時前',
        isHot: true,
        tags: ['#AI伺服器', '#散熱'],
        summary: [
            {
                text: '提到奇鋐 (3017) 近期營收表現優於預期，主要受惠於 3D VC 需求強勁。',
                highlights: [
                    { text: '奇鋐 (3017)', type: 'stock', symbol: '3017' }
                ]
            },
            {
                text: '針對廣達 (2382) 看法正向，認為 AI 伺服器訂單能見度高。',
                highlights: [
                    { text: '廣達 (2382)', type: 'stock', symbol: '2382' }
                ]
            }
        ]
    },
    {
        id: '2',
        showName: '財報狗',
        showAvatar: '狗',
        showColorClass: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
        title: '航運股還有戲嗎？紅海危機解析',
        timeAgo: '昨天',
        isHot: false,
        tags: ['#航運', '#宏觀'],
        summary: [
            {
                text: '針對近期紅海危機造成的運價上漲進行分析，是否為短期現象？長榮、陽明操作策略分享...',
                highlights: []
            }
        ]
    }
];