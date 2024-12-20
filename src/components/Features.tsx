import React, { useState } from 'react';
import { useGemini } from '../lib/gemini';
import { 
  Brain, 
  TrendingUp, 
  BookOpen, 
  MessageSquare,
  DollarSign,
  Loader2
} from 'lucide-react';
import { MarketAnalysisModal } from './MarketAnalysisModal';
import { CryptoPriceModal } from './features/CryptoPriceModal';
import { FeatureCard } from './features/FeatureCard';
import { ResponseDisplay } from './features/ResponseDisplay';

export const Features = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');
  const [isMarketModalOpen, setIsMarketModalOpen] = useState(false);
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);
  const { generateResponse } = useGemini();

  const features = [
    {
      title: 'Concepts Crypto Expliqués',
      icon: BookOpen,
      prompt: 'Expliquez le concept de la blockchain en termes simples.',
      description: 'Obtenez des explications simples pour des concepts crypto complexes'
    },
    {
      title: 'Analyse de Marché',
      icon: TrendingUp,
      prompt: '',
      description: 'Comprendre les tendances et analyses du marché',
      isMarketAnalysis: true
    },
    {
      title: 'Prix en Temps Réel',
      icon: DollarSign,
      prompt: '',
      description: 'Consultez le prix actuel et l\'historique des cryptomonnaies',
      isCryptoPrice: true
    },
    {
      title: 'Assistant Smart Contract',
      icon: Brain,
      prompt: 'Expliquez comment fonctionnent les smart contracts et leurs applications réelles.',
      description: 'Apprenez sur les smart contracts et leur implémentation'
    },
    {
      title: 'Questions & Réponses',
      icon: MessageSquare,
      prompt: '',
      description: 'Posez n\'importe quelle question sur la crypto',
      custom: true
    }
  ];

  const [customQuestion, setCustomQuestion] = useState('');

  const handleFeatureClick = async (prompt: string) => {
    try {
      setLoading(true);
      setResult('');
      const response = await generateResponse(prompt);
      setResult(response);
    } catch (error) {
      setResult('Erreur lors de la génération de la réponse. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleMarketAnalysis = async (data: { cryptoName: string; cryptoAuthor: string }) => {
    const prompt = `Analysez la cryptomonnaie ${data.cryptoName} créée par ${data.cryptoAuthor}. 
    Fournissez une analyse détaillée incluant:
    1. L'historique et le contexte
    2. Les caractéristiques techniques principales
    3. Les avantages et inconvénients
    4. Les cas d'utilisation potentiels
    5. Les perspectives d'avenir`;
    
    await handleFeatureClick(prompt);
    setIsMarketModalOpen(false);
  };

  const handlePriceCheck = async (data: { cryptoName: string }) => {
    const prompt = `Fournissez une analyse détaillée du prix actuel de ${data.cryptoName} incluant:
    1. Le prix actuel en USD et EUR
    2. La variation sur 24h
    3. Le volume d'échange
    4. La capitalisation boursière
    5. Une brève analyse des tendances récentes`;
    
    await handleFeatureClick(prompt);
    setIsPriceModalOpen(false);
  };

  const handleCustomQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customQuestion.trim()) return;
    await handleFeatureClick(customQuestion);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            isCustom={feature.custom}
            isMarketAnalysis={feature.isMarketAnalysis}
            loading={loading}
            onAction={() => {
              if (feature.isMarketAnalysis) {
                setIsMarketModalOpen(true);
              } else if (feature.isCryptoPrice) {
                setIsPriceModalOpen(true);
              } else if (feature.prompt) {
                handleFeatureClick(feature.prompt);
              }
            }}
            customQuestion={customQuestion}
            onCustomQuestionChange={setCustomQuestion}
            onCustomQuestionSubmit={handleCustomQuestion}
          />
        ))}
      </div>

      <MarketAnalysisModal
        isOpen={isMarketModalOpen}
        onClose={() => setIsMarketModalOpen(false)}
        onSubmit={handleMarketAnalysis}
        loading={loading}
      />

      <CryptoPriceModal
        isOpen={isPriceModalOpen}
        onClose={() => setIsPriceModalOpen(false)}
        onSubmit={handlePriceCheck}
        loading={loading}
      />

      <ResponseDisplay loading={loading} result={result} />
    </div>
  );
};