import React from 'react';
import Accordion from '../../components/common/Accordion';

const FAQSection = () => {
  const faqItems = [
    {
      title: "What is Linglooma?",
      content: <p className="text-lg font-medium text-[#0c0c0c]">Linglooma is a comprehensive IELTS preparation platform focused on helping students master the Reading skill for the IELTS exam.</p>
    },
    {
      title: "How does the Reading feature work?",
      content: <p className="text-lg font-medium text-[#0c0c0c] leading-7">The Reading feature allows users to practice their reading skills using various texts. Users can read aloud, and their speech will be transcribed for review. This helps in improving pronunciation and fluency.</p>
    },
    {
      title: "Are there any quizzes available?",
      content: <p className="text-lg font-medium text-[#0c0c0c] leading-7">Currently, only the Reading feature is implemented, but we are actively developing quizzes for all IELTS skills to provide a comprehensive learning experience.</p>
    },
    {
      title: "How can I track my progress?",
      content: <p className="text-lg font-medium text-[#0c0c0c]">You can track your progress through the Dashboard, where you will find detailed analytics of your performance in the Reading section.</p>
    },
    {
      title: "Is Linglooma free to use?",
      content: <p className="text-lg font-medium text-[#0c0c0c] leading-7">Linglooma offers a mix of free and premium features. While the basic Reading feature is free, additional resources and quizzes may require a subscription.</p>
    },
    {
      title: "Can I access Linglooma on mobile devices?",
      content: <p className="text-base font-normal text-[#0c0c0c]">Currently, Linglooma is optimized for desktop use, but we are working on a mobile-friendly version for on-the-go learning.</p>
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-black mb-4">Frequently Asked Questions</h2>
          <p className="text-lg font-medium text-[#0c0c0c]">Your Queries Answered</p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion items={faqItems} />
        </div>
      </div>
    </section>
  );
};

export default FAQSection;