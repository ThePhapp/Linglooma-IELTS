import React from 'react';

const TeamMember = ({ image, name, role, description }) => {
  return (
    <div className="bg-white rounded-[10px] p-6 flex flex-col items-center">
      <img 
        src={image} 
        alt={name} 
        className="w-[118px] h-[118px] rounded-full mb-4"
      />
      <h3 className="text-xl font-semibold text-black mb-1">{name}</h3>
      <p className="text-xs text-black mb-4">{role}</p>
      <p className="text-sm font-light text-black text-center mb-8">{description}</p>
      <div className="flex space-x-4">
        <a href="#" className="social-link">
          <img src="/images/img_facebook.png" alt="Facebook" className="w-9 h-9" />
        </a>
        <a href="#" className="social-link">
          <img src="/images/img_instagram.png" alt="Instagram" className="w-9 h-9" />
        </a>
        <a href="#" className="social-link">
          <img src="/images/img_linkedin.png" alt="LinkedIn" className="w-9 h-9" />
        </a>
        <a href="#" className="social-link">
          <img src="/images/img_twitter.png" alt="Twitter" className="w-9 h-9" />
        </a>
      </div>
    </div>
  );
};

const TeamSection = () => {
  const teamMembers = [
    {
      image: "/images/img_imagefotor2025051113567_1.png",
      name: "Mai Tấn Trung",
      role: "Frontend and Figma",
      description: "Frontend development as a verb is to build user interfaces using React and design UI/UX with Figma"
    },
    {
      image: "/images/img_image_2.png",
      name: "Bùi Trung Thanh",
      role: "Database and API",
      description: "Frontend development as a verb is to build user interfaces using React and design UI/UX with Figma"
    },
    {
      image: "/images/img_downloadfotor20250511103821_1.png",
      name: "Nguyễn Thành Minh",
      role: "Frontend and Figma",
      description: "Frontend development as a verb is to build user interfaces using React and design UI/UX with Figma"
    },
    {
      image: "/images/img_4950742717217545770443287342289213603571812nfotor2025051110286_1.png",
      name: "Phạm Thế Hùng",
      role: "Backend",
      description: "Frontend development as a verb is to build user interfaces using React and design UI/UX with Figma"
    },
    {
      image: "/images/img_animenamngau001fotor20250511114918_1.png",
      name: "Trần Thế Pháp",
      role: "Backend",
      description: "Frontend development as a verb is to build user interfaces using React and design UI/UX with Figma"
    }
  ];

  return (
    <section className="bg-[#b7d8ec] py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-semibold text-white text-center mb-12 font-['Poppins']">OUR TEAM</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.slice(0, 3).map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 max-w-4xl mx-auto">
          {teamMembers.slice(3, 5).map((member, index) => (
            <TeamMember
              key={index}
              image={member.image}
              name={member.name}
              role={member.role}
              description={member.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;