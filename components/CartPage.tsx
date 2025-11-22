import React, { useState, useMemo } from 'react';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ArrowRight, MessageCircle, ShieldCheck } from 'lucide-react';

interface CartPageProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemoveItem: (id: number) => void;
  onBack: () => void;
}

const CartPage: React.FC<CartPageProps> = ({ cartItems, onUpdateQuantity, onRemoveItem, onBack }) => {
  const [customerName, setCustomerName] = useState('');
  const [address, setAddress] = useState('');

  const subtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cartItems]);

  const shippingCost = subtotal > 199 ? 0 : 30;
  const total = subtotal + shippingCost;

  const handleWhatsAppCheckout = () => {
    if (!customerName.trim()) {
      alert('אנא מלא את שמך לפני שליחת ההזמנה');
      return;
    }

    const phoneNumber = "9720506932920"; // REPLACE WITH YOUR REAL NUMBER
    
    let message = `*היי, אשמח לבצע הזמנה חדשה מ 👋\n\n`;
    message += `*שם הלקוח:* ${customerName}\n`;
    message += `*כתובת:* ${address || 'איסוף עצמי'}\n\n`;
    message += `*סיכום הזמנה:*\n`;
    
    cartItems.forEach(item => {
      message += `▫️ ${item.quantity}x ${item.title} - ₪${(item.price * item.quantity).toFixed(2)}\n`;
    });

    message += `\n------------------\n`;
    message += `*סך הכל לתשלום: ₪${total.toFixed(2)}*`;
    if (shippingCost === 0) message += ` (כולל משלוח חינם)`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4 text-center animate-in fade-in duration-500">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <MessageCircle className="w-8 h-8 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">סל הקניות שלך ריק</h2>
        <p className="text-gray-500 mb-8">נראה שעדיין לא בחרת פריטים. בואי נמצא לך משהו מהמם!</p>
        <button 
          onClick={onBack}
          className="bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-all flex items-center gap-2"
        >
          <ArrowRight className="w-4 h-4" />
          חזרה לחנות
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-black mb-6 text-sm font-medium">
        <ArrowRight className="w-4 h-4" />
        חזרה לקניות
      </button>

      <h1 className="text-3xl font-black font-serif italic mb-8">סל הקניות שלי</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1">
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 border-b border-gray-100 pb-6 bg-white p-4 rounded-xl shadow-sm">
                <div className="w-24 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-gray-900">{item.title}</h3>
                      <p className="text-sm text-gray-500">{item.category}</p>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 text-gray-600"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-gray-100 text-black"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-lg">₪{(item.price * item.quantity).toFixed(2)}</div>
                      {item.quantity > 1 && (
                        <div className="text-xs text-gray-500">₪{item.price} ליחידה</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checkout Summary */}
        <div className="lg:w-[380px]">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold text-xl mb-6">סיכום הזמנה</h3>
            
            {/* User Details Form */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">שם מלא *</label>
                <input 
                  type="text" 
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="ישראל ישראלי"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">כתובת למשלוח</label>
                <input 
                  type="text" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="רחוב, מספר, עיר"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black"
                />
              </div>
            </div>

            <div className="space-y-3 border-t border-gray-100 pt-4 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>סכום ביניים</span>
                <span>₪{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>משלוח</span>
                {shippingCost === 0 ? (
                  <span className="text-green-600 font-medium">חינם</span>
                ) : (
                  <span>₪{shippingCost}</span>
                )}
              </div>
              <div className="flex justify-between text-xl font-black mt-4 pt-4 border-t border-black/5">
                <span>סה"כ לתשלום</span>
                <span>₪{total.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleWhatsAppCheckout}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-4 rounded-xl shadow-md transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              שליחת הזמנה ב-WhatsApp
            </button>
            
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4" />
              <span>תשלום מאובטח ומוצפן</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;