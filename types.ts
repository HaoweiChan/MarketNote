export interface Stock {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    strength: number; // 0-100 for the bar visualization
}

export interface SummaryPoint {
    text: string;
    highlights?: {
        text: string;
        type: 'stock' | 'bold';
        symbol?: string; // e.g., '2330'
    }[];
}

export interface Episode {
    id: string;
    showName: string;
    showAvatar: string; // Using placeholder text/initials for now
    showColorClass: string; // Tailwind class for avatar background
    title: string;
    timeAgo: string;
    isHot?: boolean;
    summary: SummaryPoint[];
    tags: string[];
}

export interface TickerItem {
    name: string;
    value: string;
    change: 'up' | 'down' | 'neutral';
}