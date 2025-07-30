import { cn } from "@/components/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"
// import { useState } from "react"


const Calendar = () => {
    // const [selectedDay, setSelectedDay] = useState(17);
    const today = new Date().getDate();

    // Days of the week
    const daysOfWeek = ["M", "T", "W", "T", "F", "S", "S"]

    // Generate days for May 2025
    const days = Array.from({ length: 31 }, (_, i) => i + 1)

    return (
        <div className="bg-white rounded-lg shadow p-4 w-full max-w-[500px] mx-auto">
            <div className="flex justify-between items-center mb-4">
                <button className="p-1">
                    <ChevronLeft className="h-5 w-5" />
                </button>
                <h3 className="font-semibold text-lg">May 2025</h3>
                <button className="p-1">
                    <ChevronRight className="h-5 w-5" />
                </button>
            </div>

            <div className="grid grid-cols-7 gap-1 mb-2 justify-end">
                {daysOfWeek.map((day, index) => (
                    <div
                        key={index}
                        className={cn("text-center text-sm font-medium py-1 aspect-square flex items-center justify-center",
                            index >= 5 ? "text-red-500" : "text-gray-700")}
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-1 justify-end">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div key={`empty-${index}`} className="h-8"></div>
                ))}

                {days.map((day) => (
                    <button
                        key={day}
                        // onClick={() => setSelectedDay(day)}
                        className={cn(
                            "aspect-square rounded-full flex items-center justify-center text-sm",
                            day === today
                                ? "bg-indigo-950 text-white font-semibold"
                                : "text-gray-500"
                        )}
                    >
                        {day}
                    </button>
                ))}
            </div>
        </div>
    )
}
export default Calendar;