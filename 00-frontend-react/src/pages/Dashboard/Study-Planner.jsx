import { cn } from "@/components/lib/utils";
import { Clock, Star, CheckCircle2 } from "lucide-react";
import { useState } from "react";

const StudyPlanner = () => {
    const [completedTasks, setCompletedTasks] = useState([]);

    const tasks = [
        {
            id: 1,
            category: "Listening",
            title: "Cambridge IELTS 12",
            subtitle: "Test 1 Listening (Section 1 & 2)",
            time: "8:00 AM",
            color: "from-pink-400 to-rose-500",
            bgColor: "bg-pink-50",
            textColor: "text-pink-800",
            emoji: "🎧"
        },
        {
            id: 2,
            category: "Reading",
            title: "Cambridge IELTS 12",
            subtitle: "Test 1 Reading (Passage 1 & 2)",
            time: "9:30 AM",
            color: "from-blue-400 to-cyan-500",
            bgColor: "bg-blue-50",
            textColor: "text-blue-800",
            emoji: "📖"
        },
        {
            id: 3,
            category: "Writing Task 1",
            title: "Bar Chart Writing",
            subtitle: "Topic: Environmental Trends",
            time: "10:30 AM",
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-50",
            textColor: "text-green-800",
            emoji: "✍️"
        },
        {
            id: 4,
            category: "Speaking",
            title: "Lesson 1",
            subtitle: "Topic - Technology (Part 1 & 2 Practice)",
            time: "08:00 PM",
            color: "from-purple-400 to-violet-500",
            bgColor: "bg-purple-50",
            textColor: "text-purple-800",
            important: true,
            emoji: "🎤"
        },
        {
            id: 5,
            category: "Writing Task 2",
            title: "Opinion Essay",
            subtitle: "Topic: Education systems in modern society",
            time: "09:30 PM",
            color: "from-green-400 to-teal-500",
            bgColor: "bg-green-50",
            textColor: "text-green-800",
            emoji: "📝"
        },
        {
            id: 6,
            category: "Vocabulary",
            title: "Academic Words",
            subtitle: "List 1: Science & Technology",
            time: "07:00 AM",
            color: "from-red-400 to-orange-500",
            bgColor: "bg-red-50",
            textColor: "text-red-800",
            emoji: "📚"
        }
    ];

    const toggleComplete = (taskId) => {
        setCompletedTasks(prev => 
            prev.includes(taskId) 
                ? prev.filter(id => id !== taskId)
                : [...prev, taskId]
        );
    };

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
            <div className="flex items-center justify-between mb-5">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">📋</span>
                    <span>Study Planner</span>
                </h2>
                <div className="flex items-center gap-2 bg-purple-100 px-4 py-2 rounded-full">
                    <span className="text-sm font-semibold text-purple-700">
                        {completedTasks.length}/{tasks.length} Completed
                    </span>
                </div>
            </div>

            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 hide-scrollbar">
                {tasks.map((task) => {
                    const isCompleted = completedTasks.includes(task.id);
                    
                    return (
                        <div 
                            key={task.id} 
                            className={cn(
                                "relative p-5 rounded-xl transition-all duration-300 cursor-pointer group hover:shadow-lg border-2",
                                task.bgColor,
                                isCompleted ? "opacity-60 border-gray-300" : "border-transparent hover:scale-[1.02]"
                            )}
                            onClick={() => toggleComplete(task.id)}
                        >
                            {/* Gradient Accent Bar */}
                            <div className={cn(
                                "absolute left-0 top-0 bottom-0 w-1.5 rounded-l-xl bg-gradient-to-b",
                                task.color
                            )} />

                            <div className="flex justify-between items-start">
                                <div className="flex-1 ml-3">
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-2xl">{task.emoji}</span>
                                        <p className={cn(
                                            "font-bold text-base",
                                            task.textColor,
                                            isCompleted && "line-through"
                                        )}>
                                            {task.category}
                                        </p>
                                        {task.important && !isCompleted && (
                                            <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 animate-pulse" />
                                        )}
                                    </div>
                                    <p className={cn(
                                        "font-semibold text-gray-800 mb-1",
                                        isCompleted && "line-through text-gray-500"
                                    )}>
                                        {task.title}
                                    </p>
                                    <p className={cn(
                                        "text-sm text-gray-600",
                                        isCompleted && "line-through text-gray-400"
                                    )}>
                                        {task.subtitle}
                                    </p>
                                </div>

                                <div className="flex flex-col items-end gap-2">
                                    <div className={cn(
                                        "flex items-center gap-1 px-3 py-1.5 rounded-lg",
                                        task.bgColor
                                    )}>
                                        <Clock className={cn("h-4 w-4", task.textColor)} />
                                        <span className={cn("font-semibold text-sm", task.textColor)}>
                                            {task.time}
                                        </span>
                                    </div>

                                    {/* Checkbox */}
                                    <button 
                                        className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200",
                                            isCompleted 
                                                ? "bg-green-500 scale-110" 
                                                : "bg-gray-200 group-hover:bg-gray-300"
                                        )}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleComplete(task.id);
                                        }}
                                    >
                                        {isCompleted && (
                                            <CheckCircle2 className="h-5 w-5 text-white" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default StudyPlanner;