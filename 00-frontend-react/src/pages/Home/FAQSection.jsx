import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const FAQItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      <button
        className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
        onClick={onClick}
      >
        <span className="text-lg font-semibold text-gray-800 pr-8">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-purple-600 transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
        />
      </button>
      <div 
        className={`transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-5 text-gray-600 leading-relaxed">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqItems = [
    {
      question: "What is Linglooma?",
      answer: "Linglooma is a comprehensive IELTS preparation platform that helps students master all four skills (Reading, Writing, Listening, and Speaking) for the IELTS exam. We use AI-powered feedback and personalized learning paths to accelerate your progress."
    },
    {
      question: "How does the AI feedback system work?",
      answer: "Our advanced AI analyzes your performance in real-time across all four IELTS skills. For speaking, it evaluates pronunciation and fluency. For writing, it checks grammar, coherence, and vocabulary. You receive instant, detailed feedback with specific improvement suggestions."
    },
    {
      question: "What features are included in Linglooma?",
      answer: "Linglooma offers comprehensive features including: Interactive Reading passages, Listening practice with dictation and Q&A modes, Speaking practice with AI pronunciation feedback, Writing exercises with detailed analysis, Progress tracking dashboard, and personalized study plans based on your performance."
    },
    {
      question: "How can I track my progress?",
      answer: "You can track your progress through our Smart Analytics Dashboard, which provides detailed insights into your performance across all four IELTS skills. View your improvement trends, identify weaknesses, monitor your practice time, and see your predicted band scores."
    },
    {
      question: "Is Linglooma free to use?",
      answer: "Linglooma offers both free and premium features. The free version includes basic practice materials for all four skills. Premium features include unlimited practice tests, advanced AI feedback, detailed analytics, and personalized study plans. Start with our free trial to experience all premium features!"
    },
    {
      question: "Can I access Linglooma on mobile devices?",
      answer: "Yes! Linglooma is fully responsive and optimized for all devices including smartphones, tablets, and desktops. Practice anytime, anywhere with the same great experience across all your devices."
    }
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 mb-4">
            <HelpCircle className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-600">FAQ</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about Linglooma IELTS preparation
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <FAQItem
              key={index}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
            />
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-2xl p-8 text-white max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold mb-3">Still have questions?</h3>
            <p className="text-white/90 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <button className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors shadow-lg">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;