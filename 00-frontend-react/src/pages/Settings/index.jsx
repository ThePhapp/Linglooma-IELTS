import React, { useContext } from "react";
import ProfileSettingsForm from "./ProfileSettingsForm";
import PasswordSettingsForm from "./PasswordSettingsForm";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@/components/context/auth.context";

const SettingsPage = () => {
  const navigate = useNavigate();
  const { auth, setAuth } = useContext(AuthContext);
  const username = auth?.user?.username;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <main className="bg-emerald-50 min-h-[screen]">
        <div className="flex">
          <div className="flex-1 p-8">
            <header className="flex justify-between items-center mb-4">
              <div>
                <h1 className="text-xl font-semibold leading-7">Welcome, {username}</h1>
                <p className="text-gray-600">{new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  day: "numeric",
                  month: "short",
                  year: "numeric"
                })}</p>
              </div>
              <div className="flex gap-4 items-center">
                <Button
                  className="px-4 py-2 rounded-lg bg-[pink-100]"
                  onClick={() => {
                    setAuth({
                      isAuthenticated: false,
                      user: {
                        email: "",
                        username: "",
                        phonenumber: "",
                        gender: "",
                        nationality: ""
                      }
                    })
                    localStorage.clear();
                    navigate('/')
                  }}
                >
                  Đăng xuất
                </Button>
                <div className="overflow-hidden w-10 h-10 rounded-full">
                  <img
                    src="/images/Profile1.png"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </header>
            <div className="flex gap-8">
              <ProfileSettingsForm />
              <PasswordSettingsForm />
            </div>
          </div>
        </div>
      </main>

    </>
  );
};

export default SettingsPage;
