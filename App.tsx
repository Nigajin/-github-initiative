import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { TaskBoard } from './components/TaskBoard';
import { ChallengeBoard } from './components/ChallengeBoard'; // New Component
import { FocusTimer } from './components/FocusTimer';
import { ViewState, Task, Challenge, UserStats } from './types';
import { INITIAL_TASKS, INITIAL_CHALLENGES } from './constants';

const App: React.FC = () => {
    const [currentView, setCurrentView] = useState<ViewState>(ViewState.DASHBOARD);
    
    // State for Micro Tasks (Habits)
    const [tasks, setTasks] = useState<Task[]>(() => {
        const saved = localStorage.getItem('didim_tasks');
        return saved ? JSON.parse(saved) : INITIAL_TASKS;
    });

    // State for Challenges (Bigger Goals)
    const [challenges, setChallenges] = useState<Challenge[]>(() => {
        const saved = localStorage.getItem('didim_challenges');
        return saved ? JSON.parse(saved) : INITIAL_CHALLENGES;
    });
    
    const [stats, setStats] = useState<UserStats>(() => {
        const saved = localStorage.getItem('didim_stats');
        return saved ? JSON.parse(saved) : {
            streak: 1,
            points: 0,
            level: 1,
            lastLogin: new Date().toDateString()
        };
    });

    // Save data to local storage on change
    useEffect(() => {
        localStorage.setItem('didim_tasks', JSON.stringify(tasks));
    }, [tasks]);

    useEffect(() => {
        localStorage.setItem('didim_challenges', JSON.stringify(challenges));
    }, [challenges]);

    useEffect(() => {
        localStorage.setItem('didim_stats', JSON.stringify(stats));
    }, [stats]);

    const createConfetti = () => {
        const colors = ['#4FD1C5', '#F6E05E', '#F687B3', '#63B3ED'];
        for(let i=0; i<30; i++) {
            const div = document.createElement('div');
            div.style.position = 'fixed';
            div.style.left = Math.random() * 100 + 'vw';
            div.style.top = '-10px';
            div.style.width = Math.random() * 10 + 5 + 'px';
            div.style.height = Math.random() * 10 + 5 + 'px';
            div.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            div.style.transition = 'top 1.5s ease-in, transform 1.5s ease-out';
            div.style.zIndex = '9999';
            div.style.borderRadius = '2px';
            document.body.appendChild(div);
            
            setTimeout(() => {
                div.style.top = '110vh';
                div.style.transform = `rotate(${Math.random() * 720}deg) translateX(${Math.random() * 100 - 50}px)`;
            }, 50);
            
            setTimeout(() => {
                document.body.removeChild(div);
            }, 1500);
        }
    };

    const updateStats = (xp: number) => {
        setStats(prev => {
            const newPoints = prev.points + xp;
            // Simple level up logic: every 100 points roughly
            const newLevel = Math.floor(newPoints / 100) + 1;
            
            if (newLevel > prev.level) {
                alert(`축하합니다! 레벨 ${newLevel}로 성장했어요! 🌱`);
            }
            
            return {
                ...prev,
                points: newPoints,
                level: newLevel
            };
        });
        createConfetti();
    };

    const handleCompleteTask = (id: string) => {
        setTasks(prev => prev.map(t => 
            t.id === id ? { ...t, completed: true } : t
        ));
        updateStats(10); // Small XP for habits
    };

    const handleCompleteChallenge = (id: string) => {
        const challenge = challenges.find(c => c.id === id);
        if (!challenge || challenge.completed) return;

        setChallenges(prev => prev.map(c => 
            c.id === id ? { ...c, completed: true } : c
        ));
        
        // Challenges give more XP
        updateStats(challenge.xp);
        alert(`'${challenge.title}' 달성! 대단해요! +${challenge.xp} XP`);
    };

    const renderContent = () => {
        switch (currentView) {
            case ViewState.DASHBOARD:
                return <Dashboard stats={stats} />;
            case ViewState.TASKS:
                return <TaskBoard tasks={tasks} setTasks={setTasks} onCompleteTask={handleCompleteTask} />;
            case ViewState.CHALLENGE:
                return <ChallengeBoard challenges={challenges} onCompleteChallenge={handleCompleteChallenge} />;
            case ViewState.TIMER:
                return <FocusTimer />;
            default:
                return <Dashboard stats={stats} />;
        }
    };

    return (
        <div className="bg-[#F7FAFC] min-h-screen text-gray-800 font-sans">
            <div className="max-w-md mx-auto bg-white min-h-screen shadow-2xl relative overflow-hidden flex flex-col">
                {/* Top Bar */}
                <div className="px-6 py-4 flex justify-between items-center bg-white z-10 sticky top-0 border-b border-gray-50">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 bg-accent-teal rounded-full"></span>
                        <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">Didim</h1>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-accent-teal bg-teal-50 px-2 py-1 rounded-full">Lv.{stats.level}</span>
                        <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm border border-gray-200">
                            👤
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="flex-1 p-6 overflow-hidden relative">
                    {renderContent()}
                </main>

                {/* Navigation */}
                <Navigation currentView={currentView} setView={setCurrentView} />
            </div>
        </div>
    );
};

export default App;