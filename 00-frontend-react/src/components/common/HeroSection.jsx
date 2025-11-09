import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Star, BookOpen, TrendingUp, Award, Users } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  const stats = [
    { icon: Users, value: '10K+', label: 'Active Learners' },
    { icon: BookOpen, value: '500+', label: 'Practice Tests' },
    { icon: Award, value: '8.5', label: 'Avg Band Score' },
    { icon: TrendingUp, value: '95%', label: 'Success Rate' }
  ];

  return (
    <section className="relative bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
      <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-sm font-semibold text-gray-700">🎯 Your Path to IELTS Success</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Master IELTS
              </span>
              <br />
              <span className="text-gray-800">with Confidence</span>
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed">
              Join thousands of students achieving their dream IELTS scores. 
              Practice all 4 skills with AI-powered feedback and personalized learning paths.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => navigate("/register")}
              >
                <span>Start Free Trial</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button
                className="flex items-center gap-2 px-8 py-4 rounded-xl bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:border-purple-400 font-semibold text-gray-700 hover:text-purple-600 transition-all duration-300"
                onClick={() => navigate("/login")}
              >
                <span>Sign In</span>
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                    <Icon className="w-6 h-6 text-purple-600 mb-2" />
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Content - Testimonial Card */}
          <div className="relative">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="ml-2 text-2xl font-bold text-gray-800">5.0</span>
              </div>

              <p className="text-xl text-gray-700 italic leading-relaxed">
                "Linglooma transformed my IELTS preparation! The AI feedback helped me improve my speaking score from 6.0 to 8.5 in just 3 months. Highly recommended!"
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-gray-200">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xl font-bold">
                  EJ
                </div>
                <div>
                  <div className="font-semibold text-gray-800 text-lg">Emily Johnson</div>
                  <div className="text-sm text-gray-500">IELTS Band 8.5 • United Kingdom</div>
                </div>
              </div>

              {/* Success badges */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-blue-50 border border-blue-200">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Reading 9.0</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-purple-50 border border-purple-200">
                  <Award className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Speaking 8.5</span>
                </div>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-transform duration-300">
              <div className="text-center text-white">
                <div className="text-3xl font-bold">7+</div>
                <div className="text-xs">Band Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;