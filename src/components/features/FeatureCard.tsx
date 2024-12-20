import React from 'react';
import { LucideIcon } from 'lucide-react';
import { CustomQuestionForm } from './CustomQuestionForm';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  isCustom?: boolean;
  isMarketAnalysis?: boolean;
  loading: boolean;
  onAction: () => void;
  customQuestion?: string;
  onCustomQuestionChange?: (value: string) => void;
  onCustomQuestionSubmit?: (e: React.FormEvent) => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  icon: Icon,
  isCustom,
  isMarketAnalysis,
  loading,
  onAction,
  customQuestion,
  onCustomQuestionChange,
  onCustomQuestionSubmit,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center space-x-4 mb-4">
        <Icon className="h-6 w-6 text-blue-600" />
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      
      {isCustom ? (
        <CustomQuestionForm
          value={customQuestion}
          onChange={onCustomQuestionChange}
          onSubmit={onCustomQuestionSubmit}
          loading={loading}
        />
      ) : (
        <button
          onClick={onAction}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
          disabled={loading}
        >
          Essayer
        </button>
      )}
    </div>
  );
};