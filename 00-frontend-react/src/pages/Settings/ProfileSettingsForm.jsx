import { AuthContext } from '@/components/context/auth.context';
import React, { useContext } from 'react';

const ProfileSettingsForm = () => {
    const { auth } = useContext(AuthContext);

    const username = auth?.user?.username;
    const email = auth?.user?.email;
    const gender = auth?.user?.gender;
    const phone = auth?.user?.phonenumber;
    const nationality = auth?.user?.nationality;

    const socialLinks = [
      { name: 'Facebook', icon: '👥', url: 'https://www.facebook.com/?locale=vi_VN', color: 'from-blue-500 to-blue-600' },
      { name: 'Instagram', icon: '📷', url: 'https://www.instagram.com/', color: 'from-pink-500 to-purple-600' },
      { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/', color: 'from-blue-600 to-blue-700' },
      { name: 'Twitter', icon: '🐦', url: 'https://x.com/?lang=vi', color: 'from-sky-400 to-sky-600' },
    ];

    return (
      <div className="space-y-6">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl font-bold border-2 border-white/30">
              {username?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <div>
              <h2 className="text-2xl font-bold">{username}</h2>
              <p className="text-white/80">{email}</p>
            </div>
          </div>
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>📋</span>
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username || 'Not provided'}
                  disabled
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">👤</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email || 'Not provided'}
                  disabled
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">📧</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={gender || 'Not specified'}
                  disabled
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">⚥</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone || 'Not provided'}
                  disabled
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">📱</span>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nationality
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={nationality || 'Not specified'}
                  disabled
                  className="w-full px-4 py-3 pl-10 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 cursor-not-allowed"
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2">🌍</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <span>🔗</span>
            <span>Social Media</span>
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`bg-gradient-to-br ${social.color} hover:opacity-90 text-white rounded-xl p-4 flex flex-col items-center gap-2 transition-all duration-200 transform hover:scale-105 shadow-lg`}
              >
                <span className="text-3xl">{social.icon}</span>
                <span className="text-sm font-medium">{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Info Notice */}
        <div className="bg-blue-50 border-l-4 border-blue-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">ℹ️</span>
            <div>
              <h4 className="font-semibold text-blue-800 mb-1">Profile Information</h4>
              <p className="text-sm text-blue-700">
                Your profile information is read-only. To update your details, please go to the Security & Password tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
}

export default ProfileSettingsForm;
