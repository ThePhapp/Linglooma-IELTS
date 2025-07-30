import Calendar from "./Calendar";
import DashboardHeader from "./Dashboard-header";
import DaySelector from "./Day-Selector";
import RecentActivity from "./Recent-activity";
import StudyPlanner from "./Study-Planner";


const Dashboard = () => {
    return (
        <div className="flex h-screen bg-gray-50">
            <div className="flex-1 overflow-y-auto">
                <div className="container mx-auto p-6">
                    <DashboardHeader />
                    <div className="flex flex-col lg:flex-row gap-6 mt-6">
                        <div className="w-full lg:basis-[60%]">
                            <DaySelector />
                            <StudyPlanner />
                        </div>
                        <div className="w-full lg:basis-[40%]">
                            <Calendar />
                            <RecentActivity />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;