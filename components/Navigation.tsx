import React from 'react';
import { ViewState } from '../types';

interface NavigationProps {
    currentView: ViewState;
    setView: (view: ViewState) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, setView }) => {
    const navItems = [
        { id: ViewState.DASHBOARD, label: '홈', icon: '🏠' },
        { id: ViewState.TASKS, label: '습관', icon: '🌱' },
        { id: ViewState.CHALLENGE, label: '도전', icon: '🏆' },
        { id: ViewState.TIMER, label: '집중', icon: '⏳' },
    ];

    return (
        <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] pb-safe pt-2 px-4 z-50">
            <div className="flex justify-around items-center max-w-md mx-auto pb-2">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setView(item.id)}
                        className={`flex flex-col items-center p-2 transition-colors duration-200 ${
                            currentView === item.id ? 'text-accent-teal' : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        <span className="text-2xl mb-1">{item.icon}</span>
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};