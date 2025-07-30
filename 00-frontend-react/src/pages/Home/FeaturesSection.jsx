import React from 'react';

const FeatureCard = ({ icon, title, description, actionText, onClick }) => {
  return (
    <div className="flex flex-col items-start">
      <div className="w-11 h-11 border border-[#b3b3b3] rounded-xl flex items-center justify-center mb-4">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold text-black mb-2">{title}</h3>
      <p className="text-base text-black mb-4">{description}</p>
      <button 
        className="text-lg font-bold text-[#2463eb]"
        onClick={onClick}
      >
        {actionText}
      </button>
    </div>
  );
};

const FeaturesSection = () => {
  const features = [
    {
      icon: "/images/img_vector.svg",
      title: "Interactive Reading",
      description: "Engage with diverse reading materials to enhance comprehension skills.",
      actionText: "Explore Reading Features",
      onClick: () => console.log("Explore Reading Features clicked")
    },
    {
      icon: "/images/img_clip_path_group.svg",
      title: "Personalized Feedback",
      description: "Receive tailored feedback based on your reading performance.",
      actionText: "Get Feedback",
      onClick: () => console.log("Get Feedback clicked")
    },
    {
      icon: "/images/img_vector_19x18.svg",
      title: "Progress Tracking",
      description: "Monitor your improvement and stay motivated on your learning journey.",
      actionText: "Track My Progress",
      onClick: () => console.log("Track My Progress clicked")
    },
    {
      icon: "/images/img_vector_17x19.svg",
      title: "Expert Resources",
      description: "Access a wealth of resources curated by IELTS experts for your success.",
      actionText: "View Resources",
      onClick: () => console.log("View Resources clicked")
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <p className="text-lg font-bold text-[#4c4c4c] mb-2">Master Your IELTS Skills</p>
          <h2 className="text-3xl font-bold text-black">Comprehensive IELTS Preparation</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              actionText={feature.actionText}
              onClick={feature.onClick}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;