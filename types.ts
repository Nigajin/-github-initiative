export enum ViewState {
    DASHBOARD = 'DASHBOARD',
    TASKS = 'TASKS',
    CHALLENGE = 'CHALLENGE',
    TIMER = 'TIMER'
}

export interface Task {
    id: string;
    text: string;
    completed: boolean;
    difficulty: 'easy' | 'medium' | 'hard';
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    category: 'study' | 'outdoor' | 'life';
    xp: number;
    completed: boolean;
    icon: string;
}

export interface UserStats {
    streak: number;
    points: number;
    level: number;
    lastLogin: string;
}

export interface DailyQuote {
    text: string;
    author: string;
}