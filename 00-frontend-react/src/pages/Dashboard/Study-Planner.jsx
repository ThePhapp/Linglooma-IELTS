import { cn } from "@/components/lib/utils";
import { Clock } from "lucide-react"

const StudyPlanner = () => {
    const tasks = [
        {
            id: 1,
            category: "Listening",
            title: "Cambridge IELTS 12",
            subtitle: "Test 1 Listening (Section 1 & 2)",
            time: "8:00 AM",
            color: "bg-pink-100 text-pink-800",
        },
        {
            id: 2,
            category: "Reading",
            title: "Cambridge IELTS 12",
            subtitle: "Test 1 Reading (Passage 1 & 2)",
            time: "9:30 AM",
            color: "bg-blue-100 text-blue-800",
        },
        {
            id: 3,
            category: "Writing Task 1",
            title: "Bar Chart Writing",
            subtitle: "Topic: Environmental Trends",
            time: "10:30 AM",
            color: "bg-green-100 text-green-800",
        },
        {
            id: 4,
            category: "Speaking",
            title: "Lesson 1",
            subtitle: "Topic - Technology (Part 1 & 2 Practice)",
            time: "08:00 PM",
            color: "bg-purple-100 text-purple-800",
            important: true,
        },
        {
            id: 5,
            category: "Writing Task 2",
            title: "Opinion Essay",
            subtitle: "Topic: Education systems in modern society",
            time: "09:30 PM",
            color: "bg-green-100 text-green-800",
        },
        {
            id: 6,
            category: "Vocabulary",
            title: "Academic Words",
            subtitle: "List 1: Science & Technology",
            time: "07:00 AM",
            color: "bg-red-100 text-red-800",
        },
        {
            id: 7,
            category: "Grammar",
            title: "Tenses Practice",
            subtitle: "Present Perfect vs Past Simple",
            time: "12:00 PM",
            color: "bg-orange-100 text-orange-800",
        },
        {
            id: 8,
            category: "Listening",
            title: "BBC Learning English",
            subtitle: "Daily News Practice",
            time: "03:00 PM",
            color: "bg-pink-100 text-pink-800",
        },
        {
            id: 9,
            category: "Reading",
            title: "NY Times Article",
            subtitle: "Science & Nature Section",
            time: "04:30 PM",
            color: "bg-blue-100 text-blue-800",
        },
        {
            id: 10,
            category: "Speaking",
            title: "Mock Interview",
            subtitle: "Topic - Environment & Global Warming",
            time: "06:00 PM",
            color: "bg-purple-100 text-purple-800",
            important: true,
        },
        {
            id: 11,
            category: "Writing Task 1",
            title: "Map Description",
            subtitle: "Topic: City Transformation",
            time: "11:00 AM",
            color: "bg-green-100 text-green-800",
        },
        {
            id: 12,
            category: "Writing Task 2",
            title: "Problem-Solution Essay",
            subtitle: "Topic: Traffic Congestion",
            time: "01:30 PM",
            color: "bg-green-100 text-green-800",
        }
    ]

    return (
        <div className="mt-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">English Study Planner</h2>
            <div className="space-y-3 max-h-[650px] overflow-y-auto pr-2 hide-scrollbar ">
                {tasks.map((task) => (
                    <div key={task.id} className={cn("p-4 rounded-lg", task.color)}>
                        <div className="flex justify-between">
                            <div>
                                <p className="font-medium">{task.category}</p>
                                <p className="font-medium">{task.title}</p>
                                <p className="text-sm">{task.subtitle}</p>
                            </div>
                            <div className="text-right">
                                <div className="flex items-center justify-end">
                                    <Clock className="h-4 w-4 mr-1" />
                                    <span className="font-medium">{task.time}</span>
                                </div>
                                {task.important && <span className="text-pink-600 text-sm">Important</span>}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default StudyPlanner;