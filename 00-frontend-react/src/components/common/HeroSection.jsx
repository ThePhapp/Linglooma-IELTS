import React from 'react';
import Button from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative">
      <img
        src="/images/img_banner.png"
        alt="IELTS Preparation Banner"
        className="w-full h-[632px] object-cover"
      />
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src="/images/img_mimage.png"
              alt="Student studying for IELTS"
              className="w-full max-w-[654px] h-auto"
            />
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0 md:pl-8">
            <h1 className="text-3xl font-bold text-black mb-4">
              Unlock Your IELTS Potential with Linglooma!
            </h1>
            <p className="text-lg text-black mb-6">
              Join us in mastering the Reading skill for the IELTS exam. Our platform offers comprehensive resources and tools tailored for your success.
            </p>
            <Button
              className="bg-[#2463eb] text-white font-semibold py-2 px-4 rounded-xl"
              onClick={() => navigate("/login")}
            >
              Get Started Now
            </Button>

            <div className="mt-8 bg-[#fcfcfc] border border-[#b3b3b3] rounded-lg p-5">
              <div className="flex items-center mb-4">
                <img src="/images/img_star_1.svg" alt="Star" className="w-7 h-7" />
                <img src="/images/img_star_1.svg" alt="Star" className="w-7 h-7" />
                <img src="/images/img_star_1.svg" alt="Star" className="w-7 h-7" />
                <img src="/images/img_star_1.svg" alt="Star" className="w-7 h-7" />
                <img src="/images/img_star_1.svg" alt="Star" className="w-7 h-7" />
                <span className="ml-2 text-lg font-semibold text-[#0c0c0c]">5.0</span>
              </div>
              <p className="text-lg text-[#0c0c0c] mb-4">
                Linglooma transformed my reading skills!
              </p>
              <div className="flex items-center">
                <img
                  src="/images/img_auseravatar.png"
                  alt="Emily Johnson"
                  className="w-8 h-8 rounded-full"
                />
                <span className="ml-3 text-lg font-medium text-black">
                  Emily Johnson
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;