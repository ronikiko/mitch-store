import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import CategoryNav from './components/CategoryNav';
import ProductCard from './components/ProductCard';
import FilterBar from './components/FilterBar';
import QuickViewModal from './components/QuickViewModal';
import CartPage from './components/CartPage';
import { PRODUCTS } from './constants';
import { Product, CartItem } from './types';
import { Zap, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  // --- State ---
  const [currentView, setCurrentView] = useState<'home' | 'checkout'>('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Filter State
  const maxGlobalPrice = useMemo(() => Math.ceil(Math.max(...PRODUCTS.map(p => p.price))), []);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [priceLimit, setPriceLimit] = useState<number>(maxGlobalPrice);
  const [minRating, setMinRating] = useState<number | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // --- Cart Logic ---
  const cartCount = useMemo(() => cartItems.reduce((acc, item) => acc + item.quantity, 0), [cartItems]);

  const handleAddToCart = (product: Product, quantity: number = 1) => {
    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + quantity } 
            : item
        );
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearFilters = () => {
    setSelectedCategory(null);
    setPriceLimit(maxGlobalPrice);
    setMinRating(null);
    setIsFilterOpen(false);
  };

  // --- Render Logic ---
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      if (selectedCategory) {
        if (selectedCategory === 'new') {
          if (!product.isNew) return false;
        } else if (product.category !== selectedCategory) {
          return false;
        }
      }
      if (product.price > priceLimit) return false;
      if (minRating !== null && product.rating < minRating) return false;
      return true;
    });
  }, [selectedCategory, priceLimit, minRating]);

  // If in Checkout View
  if (currentView === 'checkout') {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Header 
          cartCount={cartCount} 
          onCartClick={() => setCurrentView('checkout')}
          onLogoClick={() => setCurrentView('home')}
        />
        <CartPage 
          cartItems={cartItems}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveFromCart}
          onBack={() => setCurrentView('home')}
        />
        {/* Mobile Bottom Nav for Checkout */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-6 flex justify-center z-40 safe-area-pb">
             <button onClick={() => setCurrentView('home')} className="text-xs font-medium text-black">חזרה לחנות</button>
        </div>
      </div>
    );
  }

  // Home View
  return (
    <div className="min-h-screen pb-20 bg-white font-sans">
      <Header 
        cartCount={cartCount} 
        onCartClick={() => setCurrentView('checkout')}
        onLogoClick={() => setCurrentView('home')}
      />
      <CategoryNav 
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      {/* Hero Section */}
      {!selectedCategory && !minRating && priceLimit === maxGlobalPrice && (
        <section className="relative w-full h-[200px] md:h-[400px] bg-gray-900 overflow-hidden group">
            <div className="absolute inset-0 opacity-80 transition-opacity group-hover:opacity-70">
                <img src="https://picsum.photos/1600/900?grayscale" alt="Hero" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center p-4">
            <h2 className="text-3xl md:text-6xl font-black mb-2 tracking-tight italic drop-shadow-lg">SALE CRAZY!</h2>
            <p className="text-sm md:text-xl font-medium mb-6 text-gray-200">עד 70% הנחה על כל קולקציית הקיץ</p>
            <button className="bg-white text-black font-bold py-3 px-8 rounded-full hover:scale-105 hover:bg-black hover:text-white transition-all text-sm md:text-base shadow-xl">
                לקנייה עכשיו
            </button>
            </div>
        </section>
      )}

      {/* Flash Sale Banner */}
      {!selectedCategory && (
        <section className="container mx-auto px-4 mt-6 mb-2">
            <div className="flex items-center justify-between mb-4 bg-yellow-50 p-3 rounded-lg border border-yellow-100">
            <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-yellow-600 fill-yellow-500 animate-pulse" />
                <h2 className="text-lg font-bold text-gray-800">מבצע בזק מסתיים בעוד:</h2>
            </div>
            <div className="flex gap-1 text-sm font-mono font-bold bg-black text-white px-3 py-1 rounded shadow-sm">
                <span>02</span>:<span>45</span>:<span>12</span>
            </div>
            </div>
        </section>
      )}

      {/* Filter Bar */}
      <FilterBar 
        maxPrice={maxGlobalPrice}
        currentMaxPrice={priceLimit}
        onPriceChange={setPriceLimit}
        minRating={minRating}
        onRatingChange={setMinRating}
        resultCount={filteredProducts.length}
        onClear={handleClearFilters}
        isOpen={isFilterOpen}
        setIsOpen={setIsFilterOpen}
      />

      {/* Product Grid */}
      <main className="container mx-auto px-2 md:px-4 min-h-[400px]">
        {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-x-3 gap-y-8 md:gap-6">
            {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product}
                  onAddToCart={(p) => handleAddToCart(p, 1)}
                  onQuickView={setQuickViewProduct}
                />
            ))}
            </div>
        ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <AlertCircle className="w-12 h-12 mb-4 text-gray-300" />
                <p className="text-lg font-medium">לא נמצאו מוצרים התואמים את הסינון.</p>
                <button 
                    onClick={handleClearFilters}
                    className="mt-4 text-black font-bold underline hover:no-underline"
                >
                    נקה סינונים ונסה שוב
                </button>
            </div>
        )}
        
        {filteredProducts.length > 0 && (
            <div className="flex justify-center mt-12 mb-8">
            <button className="border-2 border-black text-black font-bold py-3 px-10 rounded-full hover:bg-black hover:text-white transition-all uppercase tracking-wide text-sm shadow-sm hover:shadow-md">
                ראה עוד מוצרים
            </button>
            </div>
        )}
      </main>

      {/* Quick View Modal */}
      <QuickViewModal 
        isOpen={!!quickViewProduct}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />

      {/* Mobile Bottom Nav (Sticky) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 py-2 px-6 flex justify-between items-center z-40 text-[10px] font-medium text-gray-500 safe-area-pb">
        <div className="flex flex-col items-center gap-1 text-black" onClick={() => {
           window.scrollTo({ top: 0, behavior: 'smooth' });
           setCurrentView('home');
        }}>
           <Zap className="w-5 h-5" />
           <span>בית</span>
        </div>
        <div 
            className="flex flex-col items-center gap-1 cursor-pointer hover:text-black"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
        >
           <div className="w-5 h-5 flex items-center justify-center rounded-sm border border-gray-300">
             <div className="w-3 h-0.5 bg-gray-500"></div>
           </div>
           <span>סינון</span>
        </div>
         <div className="flex flex-col items-center gap-1">
           <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
           <span>חדש</span>
        </div>
         <div className="flex flex-col items-center gap-1">
           <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
           <span>אני</span>
        </div>
      </div>

      {/* Footer Simple */}
      <footer className="bg-gray-50 py-10 mt-12 text-center border-t border-gray-200 hidden md:block">
        <div className="container mx-auto">
          <h3 className="font-serif italic font-bold text-xl mb-4">STYLEFLOW</h3>
          <p className="text-gray-500 text-sm mb-6">© 2024 StyleFlow Israel. כל הזכויות שמורות.</p>
          <div className="flex justify-center gap-6 text-gray-600 text-xs font-medium">
             <span className="hover:text-black cursor-pointer">תקנון</span>
             <span className="hover:text-black cursor-pointer">מדיניות פרטיות</span>
             <span className="hover:text-black cursor-pointer">משלוחים והחזרות</span>
             <span className="hover:text-black cursor-pointer">צור קשר</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;