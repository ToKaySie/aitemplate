import React from 'react';
import { X } from 'lucide-react';

interface CryptoPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { cryptoName: string }) => void;
  loading: boolean;
}

export const CryptoPriceModal: React.FC<CryptoPriceModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading
}) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    onSubmit({
      cryptoName: formData.get('cryptoName') as string
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
        <h3 className="text-xl font-semibold mb-4">Prix en Temps Réel</h3>
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
              placeholder="Ex: Bitcoin, Ethereum, etc."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Recherche...' : 'Obtenir le Prix'}
          </button>
        </form>
      </div>
    </div>
  );
};