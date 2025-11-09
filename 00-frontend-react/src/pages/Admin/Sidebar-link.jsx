import { Link, useLocation } from "react-router-dom"

export default function SidebarLink({ href, icon, children, matchPaths = [] }) {
    const location = useLocation();
    const allPaths = [href, ...matchPaths];
    const isActive = allPaths.some((path) => location.pathname.startsWith(path));

    return (
        <li>
            <Link
                to={href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                        ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30 scale-105"
                        : "text-slate-300 hover:bg-slate-700/50 hover:text-white hover:translate-x-1"
                }`}
            >
                <span className={isActive ? "animate-pulse" : ""}>{icon}</span>
                <span>{children}</span>
                {isActive && (
                    <span className="ml-auto">
                        <div className="w-2 h-2 rounded-full bg-white animate-pulse"></div>
                    </span>
                )}
            </Link>
        </li>
    )
}
