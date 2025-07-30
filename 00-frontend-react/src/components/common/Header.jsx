import React from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-[#e5fdff] py-4 w-full">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="flex items-center">
          <img src="/images/img_logo.png" alt="Linglooma Logo" className="h-[100px]" />
        </div>
        <div className="flex space-x-4">
          <Button
            className="bg-[#71cdcd] text-black font-bold py-2 px-6 rounded-[24px]"
            onClick={() => navigate("/login")}
          >
            Login
          </Button>
          <Button
            className="bg-[#537bd1] text-black font-bold py-2 px-6 rounded-[24px]"
            onClick={() => navigate("/register")}
          >
            Sign up
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;