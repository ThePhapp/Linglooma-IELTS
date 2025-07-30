import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import axios from "@/utils/axios.customize";

const PageRegister = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const togglePasswordView = () => setShowPassword(!showPassword);
    const toggleConfirmPasswordView = () => setShowConfirmPassword(!showConfirmPassword);

    // validate
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleRegister = async () => {
        if (!email || !password || !confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        // validate
        const isvaliEmail = validateEmail(email);
        if (!isvaliEmail) {
            toast.error('Invlid email address');
            return;
        }

        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            const res = await axios.post(`/api/register`, { email, password });
            if (res.success) {
                toast.success("Create new user success");
                navigate("/login");
            } else {
                toast.error(res.data.msg || "Register failed");
            }
        } catch (err) {
            // xử lý lỗi trả về từ backend
            if (err.response && err.response.data && err.response.data.msg) {
                toast.error(err.response.data.msg);
                console.log(">>> Error", err.response.data.msg);
            } else {
                toast.error("Register failed");
            }
        }
    };

    return (
        <div className="w-full h-screen flex items-center justify-center" style={{ background: "#FFFBEF" }}>
            <div className="w-[95%] max-w-xl p-6 bg-gray-100 flex-col flex items-center gap-6 rounded-2xl shadow-slate-500 shadow-2xl">
                <h1 className="text-3xl md:text-5xl font-bold">Linglooma</h1>
                <p className="text-lg md:text-xl text-gray-600 text-center">
                    hello
                </p>

                <div className="w-full flex flex-col gap-6">
                    <div className="w-full flex items-center gap-2 bg-white p-2 rounded-xl">
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                        />
                    </div>

                    <div className="w-full flex items-center gap-2 p-2 bg-white rounded-xl relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                        />
                        {showPassword ? (
                            <FaRegEyeSlash
                                className="absolute right-5 cursor-pointer"
                                onClick={togglePasswordView}
                            />
                        ) : (
                            <FaRegEye
                                className="absolute right-5 cursor-pointer"
                                onClick={togglePasswordView}
                            />
                        )}
                    </div>

                    <div className="w-full flex items-center gap-2 p-2 bg-white rounded-xl relative">
                        <input
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="bg-transparent border-0 w-full outline-none text-base md:text-lg"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") handleRegister();
                            }}
                        />
                        {showConfirmPassword ? (
                            <FaRegEyeSlash
                                className="absolute right-5 cursor-pointer"
                                onClick={toggleConfirmPasswordView}
                            />
                        ) : (
                            <FaRegEye
                                className="absolute right-5 cursor-pointer"
                                onClick={toggleConfirmPasswordView}
                            />
                        )}
                    </div>

                    {/* {error && <p className="text-red-500 text-sm">{error}</p>} */}
                </div>

                <button
                    className="w-full p-3 bg-[#71da90] rounded-xl mt-2 hover:bg-[#0FC446] text-base md:text-sm text-white font-bold"
                    onClick={handleRegister}
                >
                    Create new account
                </button>

                <h3
                    onClick={() => navigate("/")}
                    className="cursor-pointer text-sm md:text-base mt-2"
                >
                    Go to home page
                </h3>
            </div>
        </div>
    );
};

export default PageRegister;
