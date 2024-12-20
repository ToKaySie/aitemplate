import React, { useState } from 'react';
import { Key, X } from 'lucide-react';
import { useApiKeyStore } from '../store/apiKey';

export const ApiKeyInput = () => {
  const { apiKey, setApiKey, clearApiKey } = useApiKeyStore();
  const [inputKey, setInputKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputKey.trim()) {
      setError('La clé API est requise');
      return;
    }
    try {
      setApiKey(inputKey);
      setError(null);
      setInputKey('');
    } catch (err) {
      setError('Clé API invalide');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      {!apiKey ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col space-y-2">
            <label htmlFor="apiKey" className="text-sm font-medium text-gray-700">
              Clé API Gemini
            </label>
            <div className="relative">
              <input
                type="password"
                id="apiKey"
                value={inputKey}
                onChange={(e) => setInputKey(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Entrez votre clé API Gemini"
              />
              <Key className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Valider la Clé API
          </button>
        </form>
      ) : (
        <div className="flex items-center justify-between bg-green-50 p-4 rounded-lg">
          <div className="flex items-center space-x-2">
            <Key className="h-5 w-5 text-green-600" />
            <span className="text-green-700">Clé API valide et active</span>
          </div>
          <button
            onClick={clearApiKey}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      )}
    </div>
  );
};