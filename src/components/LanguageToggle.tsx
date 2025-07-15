
import React from 'react';
import { ChevronDown, Globe } from 'lucide-react';
import { useApp, Language } from '../contexts/AppContext';

const languages = {
  en: 'English',
  ta: 'தமிழ்',
  hi: 'हिन्दी'
};

export const LanguageToggle: React.FC = () => {
  const { language, setLanguage } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLanguageChange = (newLang: Language) => {
    setLanguage(newLang);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-accent"
        aria-label="Select language"
        aria-expanded={isOpen}
      >
        <Globe className="w-4 h-4" />
        <span className="text-sm font-medium">{languages[language]}</span>
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px] animate-fade-in">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                language === code ? 'bg-accent text-accent-foreground' : 'text-gray-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
