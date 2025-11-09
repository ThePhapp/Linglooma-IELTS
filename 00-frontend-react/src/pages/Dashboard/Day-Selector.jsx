import { cn } from "@/components/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const DaySelector = () => {
    const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
    const today = new Date().getDate();
    const currentMonth = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    // Generate dynamic days based on current date and offset
    const generateDays = (offset) => {
        const baseDate = new Date();
        baseDate.setDate(baseDate.getDate() + (offset * 7));
        
        const days = [];
        for (let i = -3; i <= 8; i++) {
            const date = new Date(baseDate);
            date.setDate(date.getDate() + i);
            days.push({
                number: date.getDate(),
                day: date.toLocaleDateString('en-US', { weekday: 'short' }),
                fullDate: date,
            });
        }
        return days;
    };

    const days = generateDays(currentWeekOffset);

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-6 border border-purple-100">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-2xl">📅</span>
                    <span>{currentMonth}</span>
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={() => setCurrentWeekOffset(currentWeekOffset - 1)}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                        aria-label="Previous week"
                    >
                        <ChevronLeft className="h-5 w-5 text-purple-600" />
                    </button>
                    <button
                        onClick={() => setCurrentWeekOffset(currentWeekOffset + 1)}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                        aria-label="Next week"
                    >
                        <ChevronRight className="h-5 w-5 text-purple-600" />
                    </button>
                </div>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto pb-2 hide-scrollbar">
                {days.map((day, index) => {
                    const isToday = today === day.number && day.fullDate.getMonth() === new Date().getMonth();
                    const isWeekend = day.day === 'Sat' || day.day === 'Sun';
                    
                    return (
                        <button
                            key={index}
                            className={cn(
                                "flex flex-col items-center justify-center min-w-[70px] h-[90px] rounded-xl p-3 transition-all duration-200 transform hover:scale-105",
                                isToday 
                                    ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-105" 
                                    : isWeekend
                                    ? "bg-red-50 text-red-700 hover:bg-red-100 border-2 border-red-200"
                                    : "bg-gray-50 text-gray-700 hover:bg-purple-50 border-2 border-gray-200"
                            )}
                        >
                            <span className={cn(
                                "text-2xl font-bold mb-1",
                                isToday && "animate-pulse"
                            )}>
                                {day.number}
                            </span>
                            <span className="text-xs font-medium">{day.day}</span>
                            {isToday && (
                                <span className="text-[10px] mt-1 bg-white/20 px-2 py-0.5 rounded-full">
                                    Today
                                </span>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    )
}

export default DaySelector;