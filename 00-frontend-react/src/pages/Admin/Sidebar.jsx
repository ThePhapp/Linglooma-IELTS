import { useNavigate } from "react-router-dom";
import SidebarLink from "./Sidebar-link";
import { Home, BookOpen, BarChart2, Settings, ClipboardList, MessageSquare, LogOut, Activity, X } from "lucide-react";
import { useContext } from "react";
import { AuthContext } from "@/components/context/auth.context";

const Sidebar = ({ isOpen, onClose }) => {
    const navigate = useNavigate();
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setAuth({
            isAuthenticated: false,
            user: {
                email: "",
                username: "",
            },
        });
        navigate("/");
    };

    return (
        <div className="w-72 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 text-white flex flex-col h-full shadow-2xl border-r border-slate-700">
            {/* Header with Close Button for Mobile */}
            <div className="p-6 border-b border-slate-700/50">
                <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-3 rounded-xl shadow-lg">
                            <BookOpen className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Linglooma
                            </h2>
                            <p className="text-xs text-slate-400">English Learning Platform</p>
                        </div>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 hover:bg-slate-800 rounded-lg transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* User Profile Card */}
            <div className="px-4 py-5 border-b border-slate-700/50">
                <div className="bg-gradient-to-br from-slate-800 to-slate-700 rounded-xl p-4 border border-slate-600/50">
                    <div className="flex items-center gap-3">
                        <div className="relative">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                {auth?.user?.username?.charAt(0).toUpperCase() || 'U'}
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-800 rounded-full"></div>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">
                                {auth?.user?.username || 'Student'}
                            </p>
                            <p className="text-xs text-slate-400 truncate">
                                {auth?.user?.email || 'student@linglooma.com'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-6 px-3">
                <div className="mb-4 px-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Main Menu</p>
                </div>
                <ul className="space-y-2">
                    <SidebarLink href="/admin/dashboard" icon={<Home className="h-5 w-5" />}>
                        Dashboard
                    </SidebarLink>
                    <SidebarLink
                        href="/admin/features"
                        icon={<ClipboardList className="h-5 w-5" />}
                        matchPaths={["/admin/lesson", "/admin/features"]}
                    >
                        Features
                    </SidebarLink>
                    <SidebarLink href="/admin/ai-chat" icon={<MessageSquare className="h-5 w-5" />}>
                        AI Chat
                    </SidebarLink>
                    <SidebarLink href="/admin/analytics" icon={<Activity className="h-5 w-5" />}>
                        Smart Analytics
                    </SidebarLink>
                </ul>

                <div className="my-6 px-3">
                    <div className="h-px bg-slate-700/50"></div>
                </div>

                <div className="mb-4 px-3">
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Account</p>
                </div>
                <ul className="space-y-2">
                    <SidebarLink href="/admin/settings" icon={<Settings className="h-5 w-5" />}>
                        Settings
                    </SidebarLink>
                </ul>
            </nav>

            {/* Footer - Logo & Logout */}
            <div className="p-4 border-t border-slate-700/50 space-y-4">
                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                    <LogOut className="h-5 w-5" />
                    <span className="font-semibold">Logout</span>
                </button>

                {/* Logo */}
                <button 
                    className="w-full flex items-center justify-center p-3 hover:bg-slate-800/50 rounded-xl transition-colors"
                    onClick={() => navigate("/")}
                >
                    <div className="text-center">
                        <div className="flex justify-center mb-2">
                            <img 
                                src="/images/img_logo_140x196.png" 
                                alt="Linglooma Logo" 
                                className="h-20 w-auto opacity-80 hover:opacity-100 transition-opacity" 
                            />
                        </div>
                        <p className="text-xs text-slate-400">© 2025 Linglooma</p>
                    </div>
                </button>
            </div>
        </div>
    )
}

export default Sidebar;