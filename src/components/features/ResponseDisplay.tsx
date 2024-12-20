import React from 'react';
import { Loader2 } from 'lucide-react';

interface ResponseDisplayProps {
  loading: boolean;
  result: string;
}

export const ResponseDisplay: React.FC<ResponseDisplayProps> = ({ loading, result }) => {
  if (!loading && !result) return null;

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mt-8">
      {loading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="h-8 w-8 text-blue-600 animate-spin" />
          <span className="ml-2">Génération de la réponse...</span>
        </div>
      ) : (
        <div className="prose max-w-none">
          <h3 className="text-xl font-semibold mb-4">Réponse:</h3>
          <p className="whitespace-pre-wrap">{result}</p>
        </div>
      )}
    </div>
  );
};