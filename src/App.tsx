import React from 'react';
import { useApiKeyStore } from './store/apiKey';
import { ApiKeyInput } from './components/ApiKeyInput';
import { Features } from './components/Features';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

export default function App() {
  const apiKey = useApiKeyStore((state) => state.apiKey);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">
            Votre Assistant d'Apprentissage Crypto Alimenté par l'IA
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Comprendre les concepts de cryptomonnaie, l'analyse de marché et obtenir des insights intelligents grâce à Gemini AI
          </p>
        </div>

        <ApiKeyInput />
        
        {apiKey && <Features />}
      </main>

      <Footer />
    </div>
  );
}