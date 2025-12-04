import React from 'react';
import { Challenge } from '../types';

interface ChallengeBoardProps {
    challenges: Challenge[];
    onCompleteChallenge: (id: string) => void;
}

export const ChallengeBoard: React.FC<ChallengeBoardProps> = ({ challenges, onCompleteChallenge }) => {
    // Filter active categories
    const categories = [
        { id: 'study', label: '공부/자기계발', color: 'bg-blue-100 text-blue-600' },
        { id: 'outdoor', label: '외출/사회활동', color: 'bg-green-100 text-green-600' },
        { id: 'life', label: '생활 루틴', color: 'bg-orange-100 text-orange-600' },
    ] as const;

    return (
        <div className="pb-20 h-full flex flex-col animate-fade-in">
            <header className="mb-6">
                <h2 className="text-2xl font-bold text-calm-text">오늘의 도전</h2>
                <p className="text-sm text-gray-500">조금 더 용기를 내어 세상과 연결되어 볼까요?</p>
            </header>

            <div className="flex-1 overflow-y-auto space-y-6 pr-1">
                {categories.map((cat) => {
                    const catChallenges = challenges.filter(c => c.category === cat.id);
                    if (catChallenges.length === 0) return null;

                    return (
                        <div key={cat.id}>
                            <h3 className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 ${cat.color}`}>
                                {cat.label}
                            </h3>
                            <div className="grid gap-3">
                                {catChallenges.map(challenge => (
                                    <div
                                        key={challenge.id}
                                        className={`relative p-5 rounded-2xl transition-all duration-300 border ${
                                            challenge.completed
                                                ? 'bg-gray-50 border-gray-100 opacity-60'
                                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-accent-teal'
                                        }`}
                                    >
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl bg-gray-50 p-2 rounded-xl">{challenge.icon}</span>
                                                <div>
                                                    <h4 className={`font-bold text-lg ${challenge.completed ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                                                        {challenge.title}
                                                    </h4>
                                                    <span className="text-xs font-bold text-accent-teal">+{challenge.xp} XP</span>
                                                </div>
                                            </div>
                                            {!challenge.completed && (
                                                <button
                                                    onClick={() => onCompleteChallenge(challenge.id)}
                                                    className="bg-accent-teal text-white px-4 py-2 rounded-xl text-sm font-bold shadow-sm hover:bg-teal-600 active:scale-95 transition-all"
                                                >
                                                    완료
                                                </button>
                                            )}
                                        </div>
                                        <p className="text-sm text-gray-500 leading-relaxed pl-[3.25rem]">
                                            {challenge.description}
                                        </p>
                                        
                                        {challenge.completed && (
                                            <div className="absolute top-4 right-4">
                                                <span className="text-green-500 font-bold text-sm bg-green-50 px-2 py-1 rounded-lg">완료됨 ✓</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-4 bg-blue-50 p-4 rounded-2xl flex items-center gap-3">
                <span className="text-2xl">💡</span>
                <p className="text-xs text-blue-800 leading-tight">
                    <strong>작은 팁:</strong> 무리하지 마세요. <br/>
                    오늘 하나만 성공해도 충분히 멋진 하루입니다.
                </p>
            </div>
        </div>
    );
};