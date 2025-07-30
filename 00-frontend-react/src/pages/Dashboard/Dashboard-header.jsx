import { AuthContext } from "@/components/context/auth.context";
import { useContext } from "react";


const DashboardHeader = () => {
    const { auth } = useContext(AuthContext);
    const name = auth?.user?.username;
    return (
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard Student</h1>
            <div className="flex justify-content-center items-center gap-3  ">
                <div>
                    <img src="/images/img_animenamngau001fotor20250511114918_1.png" alt="" height={"40"} width={"40"} />
                </div>
                <label htmlFor="" className="mr-4">{name}</label>
            </div>
        </div>
    )
}

export default DashboardHeader;