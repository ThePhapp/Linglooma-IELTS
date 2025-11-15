import React from 'react';
import { BookOpen, MessageSquare, Headphones, PenTool, TrendingUp, Target, Award, Sparkles } from 'lucide-react';

const FeatureCard = ({ icon: Icon, title, description, gradient, iconColor }) => {
  return (
    <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100">
      <div className={`w-14 h-14 rounded-xl ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className={`w-7 h-7 ${iconColor}`} />
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>
      <button className="flex items-center gap-2 text-purple-600 font-semibold hover:gap-3 transition-all duration-300">
        <span>Learn More</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: BookOpen,
      title: "Reading Mastery",
      description: "Comprehensive reading materials with real passages. Practice with diverse topics and improve comprehension skills.",
      gradient: "bg-gradient-to-br from-blue-500 to-cyan-500",
      iconColor: "text-white"
    },
    {
      icon: Headphones,
      title: "Listening Practice",
      description: "Interactive listening exercises with dictation and Q&A modes. Enhance your listening skills with authentic audio materials.",
      gradient: "bg-gradient-to-br from-pink-500 to-rose-500",
      iconColor: "text-white"
    },
    {
      icon: MessageSquare,
      title: "Speaking Confidence",
      description: "AI-powered pronunciation feedback and fluency training. Practice speaking with real-time analysis and improvement tips.",
      gradient: "bg-gradient-to-br from-purple-500 to-violet-500",
      iconColor: "text-white"
    },
    {
      icon: PenTool,
      title: "Writing Excellence",
      description: "Essay writing practice with AI feedback. Get detailed analysis on coherence, vocabulary, and grammar.",
      gradient: "bg-gradient-to-br from-green-500 to-emerald-500",
      iconColor: "text-white"
    },
    {
      icon: TrendingUp,
      title: "Progress Tracking",
      description: "Monitor your improvement with detailed analytics dashboard. Visualize your strengths and areas for improvement.",
      gradient: "bg-gradient-to-br from-orange-500 to-yellow-500",
      iconColor: "text-white"
    },
    {
      icon: Target,
      title: "Personalized Learning",
      description: "Customized study plans based on your performance. Focus on your weaknesses and accelerate your progress.",
      gradient: "bg-gradient-to-br from-indigo-500 to-blue-500",
      iconColor: "text-white"
    },
    {
      icon: Award,
      title: "Expert Resources",
      description: "Access premium English materials curated by experienced instructors. Learn strategies and tips from top scorers.",
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
      iconColor: "text-white"
    },
    {
      icon: Sparkles,
      title: "AI-Powered Feedback",
      description: "Get instant, detailed feedback powered by advanced AI. Understand your mistakes and learn how to improve.",
      gradient: "bg-gradient-to-br from-purple-500 to-pink-500",
      iconColor: "text-white"
    }
  ];

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-600">Comprehensive Features</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Excel in English
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Master all four English skills with our comprehensive platform designed for success
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              gradient={feature.gradient}
              iconColor={feature.iconColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;