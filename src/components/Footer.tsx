import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <p className="text-center text-gray-500">
          © {new Date().getFullYear()} CryptoGenius. Propulsé par Gemini AI
        </p>
      </div>
    </footer>
  );
};