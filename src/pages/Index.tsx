
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, Store } from 'lucide-react';
import { LanguageToggle } from '../components/LanguageToggle';
import { TrustMetrics } from '../components/TrustMetrics';
import { useApp } from '../contexts/AppContext';
import GoogleTranslate from '../components/GoogleTranslate';

const Index = () => {
  const navigate = useNavigate();
  const { language } = useApp();

  const texts = {
    en: {
      tagline: "The Voice of Local Commerce",
      subtitle: "Connect with your community through voice-powered local marketplace",
      buyer: "I'm a Buyer",
      seller: "I'm a Seller",
      buyerDesc: "Discover local products and services",
      sellerDesc: "Grow your business locally"
    },
    ta: {
      tagline: "உள்ளூர் வர்த்தகத்தின் குரல்",
      subtitle: "குரல் சக்தி மூலம் உங்கள் சமூகத்துடன் இணைக்கவும்",
      buyer: "நான் வாங்குபவர்",
      seller: "நான் விற்பனையாளர்",
      buyerDesc: "உள்ளூர் பொருட்களையும் சேவைகளையும் கண்டறியவும்",
      sellerDesc: "உங்கள் வணிகத்தை உள்ளூரில் வளர்க்கவும்"
    },
    hi: {
      tagline: "स्थानीय वाणिज्य की आवाज़",
      subtitle: "आवाज़-संचालित स्थानीय बाज़ार के माध्यम से अपने समुदाय से जुड़ें",
      buyer: "मैं खरीदार हूं",
      seller: "मैं विक्रेता हूं",
      buyerDesc: "स्थानीय उत्पादों और सेवाओं की खोज करें",
      sellerDesc: "अपने व्यवसाय को स्थानीय रूप से बढ़ाएं"
    }
  };

  const currentText = texts[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-gray-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-primary">LocalHub</div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <GoogleTranslate />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-primary mb-6 leading-tight">
              {currentText.tagline}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
              {currentText.subtitle}
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16 max-w-2xl mx-auto">
            <div
              onClick={() => navigate('/marketplace')}
              className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:rotate-1 border-2 border-transparent hover:border-accent"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/marketplace');
                }
              }}
              aria-label={`${currentText.buyer} - ${currentText.buyerDesc}`}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 mx-auto group-hover:bg-accent/20 transition-colors">
                <ShoppingBag className="w-8 h-8 text-accent group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4 text-primary group-hover:text-accent transition-colors">
                {currentText.buyer}
              </h2>
              <p className="text-gray-600 text-center">
                {currentText.buyerDesc}
              </p>
            </div>

            <div
              onClick={() => navigate('/dashboard')}
              className="group cursor-pointer bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:-rotate-1 border-2 border-transparent hover:border-primary"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  navigate('/dashboard');
                }
              }}
              aria-label={`${currentText.seller} - ${currentText.sellerDesc}`}
            >
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6 mx-auto group-hover:bg-primary/20 transition-colors">
                <Store className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <h2 className="text-2xl font-bold text-center mb-4 text-primary group-hover:text-accent transition-colors">
                {currentText.seller}
              </h2>
              <p className="text-gray-600 text-center">
                {currentText.sellerDesc}
              </p>
            </div>
          </div>

          {/* Trust Metrics */}
          <TrustMetrics />
        </div>
      </main>
    </div>
  );
};

export default Index;
