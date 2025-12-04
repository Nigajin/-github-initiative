import React, { useState } from 'react';
import { Task } from '../types';
import { suggestTasks } from '../services/geminiService';

interface TaskBoardProps {
    tasks: Task[];
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
    onCompleteTask: (id: string) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({ tasks, setTasks, onCompleteTask }) => {
    const [newTaskText, setNewTaskText] = useState('');
    const [isSuggesting, setIsSuggesting] = useState(false);

    const handleAddTask = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTaskText.trim()) return;
        const newTask: Task = {
            id: Date.now().toString(),
            text: newTaskText,
            completed: false,
            difficulty: 'easy'
        };
        setTasks(prev => [...prev, newTask]);
        setNewTaskText('');
    };

    const handleGetSuggestions = async () => {
        setIsSuggesting(true);
        const suggestions = await suggestTasks("무기력함"); // Default mood context
        const newTasks = suggestions.map((text, idx) => ({
            id: Date.now().toString() + idx,
            text,
            completed: false,
            difficulty: 'easy' as const
        }));
        setTasks(prev => [...prev, ...newTasks]);
        setIsSuggesting(false);
    };

    return (
        <div className="pb-20 h-full flex flex-col">
            <header className="mb-6">
                <h2 className="text-2xl font-bold text-calm-text">오늘의 작은 습관</h2>
                <p className="text-sm text-gray-500">아주 작은 것부터 시작해요. 부담 갖지 마세요.</p>
            </header>

            <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {tasks.length === 0 && (
                    <div className="text-center py-10 text-gray-400">
                        <p>할 일이 없네요!<br/>아래 버튼을 눌러 추천을 받아보세요.</p>
                    </div>
                )}
                
                {tasks.map(task => (
                    <div
                        key={task.id}
                        onClick={() => !task.completed && onCompleteTask(task.id)}
                        className={`group flex items-center p-4 rounded-2xl transition-all duration-300 border cursor-pointer ${
                            task.completed
                                ? 'bg-gray-50 border-gray-100 opacity-60'
                                : 'bg-white border-gray-100 shadow-sm hover:shadow-md hover:border-accent-teal'
                        }`}
                    >
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 transition-colors ${
                            task.completed ? 'bg-accent-teal border-accent-teal' : 'border-gray-300 group-hover:border-accent-teal'
                        }`}>
                            {task.completed && <span className="text-white text-sm">✓</span>}
                        </div>
                        <span className={`text-base ${task.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                            {task.text}
                        </span>
                    </div>
                ))}
            </div>

            <div className="mt-4 space-y-3">
                <form onSubmit={handleAddTask} className="flex gap-2">
                    <input
                        type="text"
                        value={newTaskText}
                        onChange={(e) => setNewTaskText(e.target.value)}
                        placeholder="나만의 작은 목표 입력..."
                        className="flex-1 p-4 rounded-2xl bg-white border border-gray-200 focus:outline-none focus:ring-2 focus:ring-accent-teal focus:border-transparent shadow-sm"
                    />
                    <button
                        type="submit"
                        className="p-4 bg-accent-teal text-white rounded-2xl shadow-sm hover:bg-teal-600 transition-colors"
                    >
                        +
                    </button>
                </form>
                
                <button
                    onClick={handleGetSuggestions}
                    disabled={isSuggesting}
                    className="w-full py-3 px-4 rounded-2xl border-2 border-dashed border-accent-teal text-accent-teal text-sm font-medium hover:bg-teal-50 transition-colors flex items-center justify-center gap-2"
                >
                    {isSuggesting ? (
                        <span>디디가 고민중... ✨</span>
                    ) : (
                        <>
                            <span>🪄 AI에게 할 일 추천받기</span>
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};