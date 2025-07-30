import React from 'react';
import Header from '../../components/common/Header';
import HeroSection from '../../components/common/HeroSection';
import FeaturesSection from './FeaturesSection';
import FAQSection from './FAQSection';
import TeamSection from './TeamSection';
import Footer from '../../components/common/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturesSection />
        <FAQSection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;