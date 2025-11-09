import { cn } from "@/components/lib/utils"
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { useState } from "react"

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const today = new Date().getDate();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();

    // Days of the week
    const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    // Get first day of month and total days
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Adjust first day (0 = Sunday -> 6, 1 = Monday -> 0)
    const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

    // Generate days array
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    // Sample study days (you can replace with real data)
    const studyDays = [3, 5, 9, 12, 15, 18, 20, 23, 25];

    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
    };

    const goToNextMonth = () => {
        setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
    };

    const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-purple-100">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-lg">
                        <CalendarIcon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="font-bold text-lg text-gray-800">{monthName}</h3>
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={goToPreviousMonth}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                        <ChevronLeft className="h-5 w-5 text-purple-600" />
                    </button>
                    <button 
                        onClick={goToNextMonth}
                        className="p-2 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                        <ChevronRight className="h-5 w-5 text-purple-600" />
                    </button>
                </div>
            </div>

            {/* Days of week */}
            <div className="grid grid-cols-7 gap-2 mb-3">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={index}
                        className={cn(
                            "text-center text-xs font-bold py-2",
                            index >= 5 ? "text-red-500" : "text-gray-600"
                        )}
                    >
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-2">
                {/* Empty cells for days before month starts */}
                {Array.from({ length: adjustedFirstDay }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-10"></div>
                ))}

                {/* Actual days */}
                {days.map((day) => {
                    const isToday = day === today && 
                                   currentMonth === new Date().getMonth() && 
                                   currentYear === new Date().getFullYear();
                    const hasStudy = studyDays.includes(day);
                    const dayOfWeek = (adjustedFirstDay + day - 1) % 7;
                    const isWeekend = dayOfWeek >= 5;

                    return (
                        <button
                            key={day}
                            className={cn(
                                "relative h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-200 hover:scale-110",
                                isToday
                                    ? "bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg scale-110"
                                    : hasStudy
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : isWeekend
                                    ? "text-red-500 hover:bg-red-50"
                                    : "text-gray-700 hover:bg-purple-50"
                            )}
                        >
                            {day}
                            {hasStudy && !isToday && (
                                <span className="absolute bottom-1 w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Legend */}
            <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-purple-100">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-br from-purple-600 to-pink-600"></div>
                    <span className="text-xs text-gray-600">Today</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs text-gray-600">Study Day</span>
                </div>
            </div>
        </div>
    )
}

export default Calendar;