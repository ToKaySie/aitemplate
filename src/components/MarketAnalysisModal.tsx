import React from 'react';
import { X } from 'lucide-react';

interface MarketAnalysisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { cryptoName: string; cryptoAuthor: string }) => void;
  loading: boolean;
}

export const MarketAnalysisModal: React.FC<MarketAnalysisModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      cryptoName: formData.get('cryptoName') as string,
      cryptoAuthor: formData.get('cryptoAuthor') as string
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold mb-4">Analyse de Marché</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="cryptoName" className="block text-sm font-medium text-gray-700 mb-1">
              Nom de la Crypto
            </label>
            <input
              type="text"
              id="cryptoName"
              name="cryptoName"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Bitcoin"
            />
          </div>
          <div>
            <label htmlFor="cryptoAuthor" className="block text-sm font-medium text-gray-700 mb-1">
              Créateur de la Crypto
            </label>
            <input
              type="text"
              id="cryptoAuthor"
              name="cryptoAuthor"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Satoshi Nakamoto"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Analyse en cours...' : 'Analyser'}
          </button>
        </form>
      </div>
    </div>
  );
};