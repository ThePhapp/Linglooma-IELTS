import { User, Clock, FileText, Headphones, BookOpen, Pen, Mic, FileSignature, Volume2 } from "lucide-react"

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: "user",
            title: "New User Registered",
            time: "3 minutes ago",
            icon: <User className="h-4 w-4 text-green-500" />,
        },
        {
            id: 2,
            type: "question",
            title: "New Question Added",
            time: "10 minutes ago",
            icon: <Clock className="h-4 w-4 text-green-500" />,
        },
        {
            id: 3,
            type: "exam",
            title: "Exam Completed",
            time: "3 hours ago",
            icon: <FileText className="h-4 w-4 text-green-500" />,
        },
        {
            id: 4,
            type: "listening",
            title: "Listening Practice Completed",
            time: "5 hours ago",
            icon: <Headphones className="h-4 w-4 text-green-500" />,
        },
        {
            id: 5,
            type: "reading",
            title: "Reading Section Submitted",
            time: "6 hours ago",
            icon: <BookOpen className="h-4 w-4 text-green-500" />,
        },
        {
            id: 6,
            type: "writing",
            title: "Writing Task Reviewed",
            time: "8 hours ago",
            icon: <Pen className="h-4 w-4 text-green-500" />,
        },
        {
            id: 7,
            type: "speaking",
            title: "Speaking Test Scheduled",
            time: "10 hours ago",
            icon: <Mic className="h-4 w-4 text-green-500" />,
        },
        {
            id: 8,
            type: "writing",
            title: "Writing Task 2 Submitted",
            time: "1 day ago",
            icon: <FileSignature className="h-4 w-4 text-green-500" />,
        },
        {
            id: 9,
            type: "listening",
            title: "Listening Test Evaluated",
            time: "2 days ago",
            icon: <Volume2 className="h-4 w-4 text-green-500" />,
        },
    ]
    // max-h-[650px] overflow-y-auto pr-2 hide-scrollbar 
    return (
        <div className="bg-white rounded-lg shadow p-4 max-w-[500px] max-h-[300px] ml-6 mt-5  overflow-y-auto pr-2 hide-scrollbar">
            <h3 className="font-semibold text-lg mb-4">Recent Activity</h3>
            <div className="space-y-3">
                {activities.map((activity) => (
                    <div key={activity.id} className="flex items-start p-2 bg-blue-50 rounded-lg">
                        <div className="flex-shrink-0 mr-3 bg-white p-2 rounded-full">{activity.icon}</div>
                        <div>
                            <p className="font-medium text-sm">{activity.title}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentActivity;