import { User, Clock, FileText, Headphones, BookOpen, Pen, Mic, FileSignature, Volume2, Activity } from "lucide-react"

const RecentActivity = () => {
    const activities = [
        {
            id: 1,
            type: "user",
            title: "New User Registered",
            time: "3 minutes ago",
            icon: <User className="h-5 w-5" />,
            color: "from-green-400 to-emerald-500",
            bgColor: "bg-green-50",
        },
        {
            id: 2,
            type: "question",
            title: "New Question Added",
            time: "10 minutes ago",
            icon: <Clock className="h-5 w-5" />,
            color: "from-blue-400 to-cyan-500",
            bgColor: "bg-blue-50",
        },
        {
            id: 3,
            type: "exam",
            title: "Exam Completed",
            time: "3 hours ago",
            icon: <FileText className="h-5 w-5" />,
            color: "from-purple-400 to-violet-500",
            bgColor: "bg-purple-50",
        },
        {
            id: 4,
            type: "listening",
            title: "Listening Practice Completed",
            time: "5 hours ago",
            icon: <Headphones className="h-5 w-5" />,
            color: "from-pink-400 to-rose-500",
            bgColor: "bg-pink-50",
        },
        {
            id: 5,
            type: "reading",
            title: "Reading Section Submitted",
            time: "6 hours ago",
            icon: <BookOpen className="h-5 w-5" />,
            color: "from-orange-400 to-amber-500",
            bgColor: "bg-orange-50",
        },
        {
            id: 6,
            type: "writing",
            title: "Writing Task Reviewed",
            time: "8 hours ago",
            icon: <Pen className="h-5 w-5" />,
            color: "from-teal-400 to-cyan-500",
            bgColor: "bg-teal-50",
        },
        {
            id: 7,
            type: "speaking",
            title: "Speaking Test Scheduled",
            time: "10 hours ago",
            icon: <Mic className="h-5 w-5" />,
            color: "from-indigo-400 to-blue-500",
            bgColor: "bg-indigo-50",
        },
        {
            id: 8,
            type: "writing",
            title: "Writing Task 2 Submitted",
            time: "1 day ago",
            icon: <FileSignature className="h-5 w-5" />,
            color: "from-green-400 to-teal-500",
            bgColor: "bg-green-50",
        },
        {
            id: 9,
            type: "listening",
            title: "Listening Test Evaluated",
            time: "2 days ago",
            icon: <Volume2 className="h-5 w-5" />,
            color: "from-red-400 to-pink-500",
            bgColor: "bg-red-50",
        },
    ]

    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mt-6 border border-purple-100">
            <div className="flex items-center gap-2 mb-5">
                <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-2 rounded-lg">
                    <Activity className="h-5 w-5 text-white" />
                </div>
                <h3 className="font-bold text-lg text-gray-800">Recent Activity</h3>
            </div>
            
            <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2 hide-scrollbar">
                {activities.map((activity) => (
                    <div 
                        key={activity.id} 
                        className={`relative p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] cursor-pointer group border-2 border-transparent hover:border-purple-200 ${activity.bgColor}`}
                    >
                        {/* Gradient Accent */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-xl bg-gradient-to-b ${activity.color}`} />
                        
                        <div className="flex items-start gap-3 ml-2">
                            <div className={`flex-shrink-0 p-2.5 rounded-lg bg-gradient-to-br ${activity.color} shadow-md`}>
                                <div className="text-white">
                                    {activity.icon}
                                </div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-gray-800 text-sm mb-1 group-hover:text-purple-700 transition-colors">
                                    {activity.title}
                                </p>
                                <div className="flex items-center gap-1 text-xs text-gray-500">
                                    <Clock className="h-3 w-3" />
                                    <span>{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RecentActivity;