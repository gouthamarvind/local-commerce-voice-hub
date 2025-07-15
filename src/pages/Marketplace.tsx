
import React, { useState, useEffect } from 'react';
import { Search, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { ProductCard } from '../components/ProductCard';
import { ProductFilters } from '../components/ProductFilters';
import { VoiceInput } from '../components/VoiceInput';
import { CartPreview } from '../components/CartPreview';

const Marketplace = () => {
  const navigate = useNavigate();
  const { products, language } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [maxDistance, setMaxDistance] = useState(10);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState(products);

  const categories = Array.from(new Set(products.map(p => p.category)));

  const texts = {
    en: {
      title: "Local Marketplace",
      search: "Search products...",
      noProducts: "No products found matching your criteria",
      backToHome: "Back to Home"
    },
    ta: {
      title: "உள்ளூர் சந்தை",
      search: "தயாரிப்புகளைத் தேடுங்கள்...",
      noProducts: "உங்கள் அளவுகோல்களுடன் பொருந்தும் தயாரிப்புகள் இல்லை",
      backToHome: "வீட்டுக்குத் திரும்பு"
    },
    hi: {
      title: "स्थानीय बाज़ार",
      search: "उत्पादों की खोज करें...",
      noProducts: "आपके मानदंडों से मेल खाने वाले कोई उत्पाद नहीं मिले",
      backToHome: "होम पर वापस जाएं"
    }
  };

  const currentText = texts[language];

  // Filter products based on search term, category, distance, and tags
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.seller.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    filtered = filtered.filter(product => product.distance <= maxDistance);

    if (selectedTags.length > 0) {
      filtered = filtered.filter(product =>
        selectedTags.some(tag => product.tags.includes(tag))
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, maxDistance, selectedTags]);

  const handleVoiceInput = (transcript: string) => {
    setSearchTerm(transcript);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-white shadow-sm z-30 border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-4">
            <button
              onClick={() => navigate('/')}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              aria-label={currentText.backToHome}
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-2xl font-bold text-primary">{currentText.title}</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg p-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder={currentText.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400"
              />
              <VoiceInput onTranscript={handleVoiceInput} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <ProductFilters
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              distance={maxDistance}
              onDistanceChange={setMaxDistance}
              selectedTags={selectedTags}
              onTagsChange={setSelectedTags}
            />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-600 text-lg">{currentText.noProducts}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Cart Preview */}
      <CartPreview />
    </div>
  );
};

export default Marketplace;
