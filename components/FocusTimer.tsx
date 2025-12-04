import React, { useState, useEffect, useRef } from 'react';

export const FocusTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'focus' | 'rest'>('focus');
    const intervalRef = useRef<number | undefined>(undefined);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'focus' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode: 'focus' | 'rest') => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'focus' ? 25 * 60 : 5 * 60);
    };

    useEffect(() => {
        if (isActive && timeLeft > 0) {
            intervalRef.current = window.setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            if(intervalRef.current) window.clearInterval(intervalRef.current);
            alert(mode === 'focus' ? "집중 시간이 끝났어요! 잠시 쉴까요?" : "휴식 끝! 다시 시작해볼까요?");
        }

        return () => {
            if (intervalRef.current) window.clearInterval(intervalRef.current);
        };
    }, [isActive, timeLeft, mode]);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const totalTime = mode === 'focus' ? 25 * 60 : 5 * 60;
    // Calculate progress for "depleting" bar (starts full, goes to empty)
    // When timeLeft == totalTime, progress = 1.
    // When timeLeft == 0, progress = 0.
    const progress = timeLeft / totalTime;
    
    // Circumference = 2 * PI * r
    const radius = 120;
    const circumference = 2 * Math.PI * radius;
    // Stroke offset: 0 = full, circumference = empty
    const strokeDashoffset = circumference * (1 - progress);

    return (
        <div className="flex flex-col items-center justify-center h-full pb-20 space-y-8 animate-fade-in px-4">
            <div className="text-center">
                <h2 className="text-2xl font-bold text-calm-text mb-2">
                    {mode === 'focus' ? '오롯이 집중하기' : '편안하게 쉬기'}
                </h2>
                <p className="text-gray-500 text-sm">
                    {mode === 'focus' ? '지금 이 순간에만 집중해보세요.' : '휴식도 성장의 일부입니다.'}
                </p>
            </div>

            {/* Circular Timer Visual - Responsive Container */}
            <div className="relative w-full max-w-[280px] aspect-square flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 256 256">
                    {/* Background Circle */}
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        className="text-gray-100"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx="128"
                        cy="128"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="12"
                        fill="transparent"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        className={`${mode === 'focus' ? 'text-accent-teal' : 'text-blue-400'} transition-all duration-1000 ease-linear`}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute flex flex-col items-center">
                    <span className="text-5xl font-mono font-bold text-gray-700 tracking-tighter">
                        {formatTime(timeLeft)}
                    </span>
                    <span className="text-sm text-gray-400 mt-2 font-medium">
                        {isActive ? '진행 중' : '대기 중'}
                    </span>
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col w-full max-w-xs gap-3">
                <div className="flex gap-3">
                     <button
                        onClick={toggleTimer}
                        className={`flex-1 py-4 rounded-2xl font-bold text-white shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                            isActive ? 'bg-orange-400' : 'bg-accent-teal'
                        }`}
                    >
                        {isActive ? '잠시 멈춤' : '시작하기'}
                    </button>
                    <button
                        onClick={resetTimer}
                        className="px-6 py-4 rounded-2xl bg-white text-gray-500 border border-gray-200 hover:bg-gray-50 font-medium"
                    >
                        ↺
                    </button>
                </div>
                
                {/* Mode Switcher */}
                 <div className="flex bg-gray-100 p-1 rounded-2xl">
                    <button
                        onClick={() => switchMode('focus')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                            mode === 'focus' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        🔥 집중 모드
                    </button>
                    <button
                        onClick={() => switchMode('rest')}
                        className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${
                            mode === 'rest' ? 'bg-white text-gray-800 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        ☕️ 휴식 모드
                    </button>
                </div>
            </div>
        </div>
    );
};