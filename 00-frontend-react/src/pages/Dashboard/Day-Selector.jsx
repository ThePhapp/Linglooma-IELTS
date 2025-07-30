import { cn } from "@/components/lib/utils";
import { useState } from "react";

const DaySelector = () => {
    // const [selectedDay, setSelectedDay] = useState(17);
    const today = new Date().getDate();

    const days = [
        { number: 12, day: "Mon" },
        { number: 13, day: "Tue" },
        { number: 14, day: "Wed" },
        { number: 15, day: "Thu" },
        { number: 16, day: "Fri" },
        { number: 17, day: "Sat" },
        { number: 18, day: "Sun" },
        { number: 19, day: "Mon" },
        { number: 20, day: "Tue" },
        { number: 21, day: "Wed" },
        { number: 22, day: "Thu" },
        { number: 23, day: "Fri" },
    ]

    return (
        <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
            {days.map((day) => (
                <button
                    key={day.number}
                    // onClick={() => setSelectedDay(day.number)}
                    className={cn(
                        "flex flex-col items-center justify-center min-w-[60px] h-[80px] rounded-lg p-2 transition-colors",
                        today === day.number ? "bg-indigo-950 text-white" : "bg-white text-gray-700 hover:bg-gray-100",
                    )}
                >
                    <span className="text-lg font-semibold">{day.number}</span>
                    <span className="text-xs">{day.day}</span>
                </button>
            ))}
        </div>
    )
}

export default DaySelector;