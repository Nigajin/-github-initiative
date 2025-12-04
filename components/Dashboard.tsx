import React, { useEffect, useState } from 'react';
import { UserStats, DailyQuote } from '../types';
import { getDailyEncouragement } from '../services/geminiService';
import { LEVEL_THRESHOLDS } from '../constants';

interface DashboardProps {
    stats: UserStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
    const [quote, setQuote] = useState<DailyQuote | null>(null);
    const [loadingQuote, setLoadingQuote] = useState(true);

    useEffect(() => {
        const fetchQuote = async () => {
            const data = await getDailyEncouragement();
            setQuote(data);
            setLoadingQuote(false);
        };
        fetchQuote();
    }, []);

    const progressPercent = Math.min(
        100,
        ((stats.points - LEVEL_THRESHOLDS[stats.level - 1]) /
            (LEVEL_THRESHOLDS[stats.level] - LEVEL_THRESHOLDS[stats.level - 1])) *
            100
    );

    return (
        <div className="space-y-6 pb-20 animate-fade-in">
            {/* Header Greeting */}
            <div className="bg-gradient-to-r from-soft-green to-soft-blue p-6 rounded-3xl shadow-sm">
                <h1 className="text-2xl font-bold text-calm-text mb-2">
                    반가워요! <br />오늘도 작은 걸음을 내딛어볼까요?
                </h1>
                <p className="text-gray-500 text-sm">연속 {stats.streak}일째 함께하고 있어요 🔥</p>
            </div>

            {/* Level & Progress */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-end mb-2">
                    <span className="text-lg font-bold text-calm-text">Lv. {stats.level} 새싹</span>
                    <span className="text-xs text-gray-400">{stats.points} / {LEVEL_THRESHOLDS[stats.level]} XP</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-accent-teal h-3 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${progressPercent}%` }}
                    ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">
                    다음 레벨까지 {LEVEL_THRESHOLDS[stats.level] - stats.points} 포인트 남았어요!
                </p>
            </div>

            {/* AI Quote Card */}
            <div className="bg-warm-beige p-6 rounded-3xl relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-4 -translate-y-4">
                    <svg width="100" height="100" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.55228 16 10 15.5523 10 15V9C10 8.44772 9.55228 8 9 8H5C4.44772 8 4 8.44772 4 9V18C4 19.6569 5.34315 21 7 21H14.017ZM21 21L21 18C21 16.8954 20.1046 16 19 16H15.9999C16.5522 16 16.9999 15.5523 16.9999 15V9C16.9999 8.44772 16.5522 8 16 8H12C11.4477 8 11 8.44772 11 9V18C11 19.6569 12.3431 21 14 21H21Z" />
                    </svg>
                </div>
                <h3 className="font-semibold text-gray-700 mb-3">오늘의 한 마디</h3>
                {loadingQuote ? (
                    <div className="animate-pulse space-y-2">
                        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    </div>
                ) : (
                    <>
                        <p className="text-gray-600 italic leading-relaxed mb-4">"{quote?.text}"</p>
                        <p className="text-right text-sm text-gray-500">- {quote?.author}</p>
                    </>
                )}
            </div>

             {/* Quick Actions */}
             <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl mb-2">🧘</span>
                    <span className="text-sm font-medium text-gray-600">마음 챙김</span>
                </div>
                <div className="bg-green-50 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
                    <span className="text-2xl mb-2">📒</span>
                    <span className="text-sm font-medium text-gray-600">감정 일기</span>
                </div>
             </div>
        </div>
    );
};