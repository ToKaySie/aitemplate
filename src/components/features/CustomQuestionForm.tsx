import React from 'react';

interface CustomQuestionFormProps {
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (e: React.FormEvent) => void;
  loading: boolean;
}

export const CustomQuestionForm: React.FC<CustomQuestionFormProps> = ({
  value,
  onChange,
  onSubmit,
  loading
}) => {
  return (
    <form onSubmit={onSubmit} className="space-y-2">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
        placeholder="Posez votre question..."
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        disabled={loading}
      >
        Demander
      </button>
    </form>
  );
};