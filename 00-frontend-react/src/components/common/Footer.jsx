import React from 'react';
import { Mail, Phone, MapPin, Heart } from 'lucide-react';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Product: [
      { name: 'Reading Practice', href: '#' },
      { name: 'Listening Practice', href: '#' },
      { name: 'Speaking Practice', href: '#' },
      { name: 'Writing Practice', href: '#' }
    ],
    Company: [
      { name: 'About Us', href: '#' },
      { name: 'Our Team', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' }
    ],
    Resources: [
      { name: 'Help Center', href: '#' },
      { name: 'Study Guide', href: '#' },
      { name: 'English Tips', href: '#' },
      { name: 'FAQ', href: '#' }
    ],
    Legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
      { name: 'Disclaimer', href: '#' }
    ]
  };

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
          {/* Brand Section - Takes 2 columns */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center">
                <span className="text-2xl font-bold">L</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold">Linglooma</h3>
                <p className="text-sm text-gray-300">English Excellence</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Master your English exam with AI-powered feedback, comprehensive practice materials, and personalized learning paths.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-300">
                <MapPin className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-sm">144 Xuân Thủy, Cầu Giấy, Hà Nội</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Phone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-sm">+1 234 567 8901</span>
              </div>
              <div className="flex items-center gap-3 text-gray-300">
                <Mail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span className="text-sm">support@linglooma.com</span>
              </div>
            </div>
          </div>

          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-lg font-bold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-gray-300 hover:text-purple-400 transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter Section */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-bold mb-3">Stay Updated with English Tips</h3>
            <p className="text-gray-300 mb-6">
              Subscribe to our newsletter for exclusive study materials and exam strategies
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border border-white/30 focus:border-purple-400 focus:ring-2 focus:ring-purple-400 outline-none text-white placeholder-gray-300"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links & Copyright */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-300 text-sm">
              © {currentYear} Linglooma. Made with <Heart className="w-4 h-4 inline text-red-400 fill-red-400" /> for English learners worldwide
            </p>
            
            {/* Social Media Links */}
            <div className="flex gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-all group">
                <FaFacebook className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-pink-600 flex items-center justify-center transition-all group">
                <FaInstagram className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-700 flex items-center justify-center transition-all group">
                <FaLinkedin className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-white/10 hover:bg-blue-400 flex items-center justify-center transition-all group">
                <FaTwitter className="w-5 h-5 text-gray-300 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;