import React, { useState } from 'react';
import {
  X,
  User,
  Package,
  MapPin,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { AnimatedModal } from './transitions/AnimatedModal';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  postalCode: string;
}

export const AccountModal: React.FC<AccountModalProps> = ({
  isOpen,
  onClose,
  postalCode,
}) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'rewards'>('orders');
  const { showToast } = useCart();

  return (
    <AnimatedModal
      isOpen={isOpen}
      onClose={onClose}
      maxWidth="max-w-lg"
      className="flex flex-col max-h-[90vh]"
      ariaLabel="Account Dialog"
    >
      {/* Header */}
      <div className="p-5 sm:p-6 border-b border-stone-100 flex items-center justify-between bg-[#F8F9FA]">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-[#18181B] text-[#F5D103] flex items-center justify-center font-bold text-base shadow-xs">
            AM
          </div>
          <div>
            <h3 className="font-serif-heading font-bold text-lg text-[#0B133C]">
              Alex Mercer
            </h3>
            <p className="text-xs text-[#64748B]">
              alex.mercer@example.com • Hatfield Member
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white text-stone-600 hover:bg-stone-200 flex items-center justify-center transition-colors cursor-pointer"
          aria-label="Close account modal"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-stone-100 px-6 bg-stone-50/50">
        <button
          type="button"
          onClick={() => setActiveTab('orders')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'orders'
              ? 'border-[#F5D103] text-[#18181B]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Package className="w-3.5 h-3.5" />
          <span>Past Orders (3)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('rewards')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'rewards'
              ? 'border-[#F5D103] text-[#18181B]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>FreshPoints (240)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('profile')}
          className={`py-3 px-4 text-xs font-bold border-b-2 flex items-center gap-2 transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'border-[#F5D103] text-[#18181B]'
              : 'border-transparent text-stone-500 hover:text-stone-800'
          }`}
        >
          <User className="w-3.5 h-3.5" />
          <span>Addresses &amp; Settings</span>
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-6 overflow-y-auto flex-1 scrollbar-none">
        <AnimatePresence mode="wait">
          {activeTab === 'orders' && (
            <motion.div
              key="orders"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-3"
            >
              {/* Order 1 */}
              <div className="p-4 rounded-2xl border border-stone-200/90 bg-stone-50/40 hover:bg-stone-50 transition-colors">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-stone-700">#FM-84920</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/60 font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#B45309]" />
                    Delivered Yesterday
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  5 items • Organic Strawberries, Avocados, Sourdough, Almond Milk
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200/50">
                  <span className="font-extrabold text-[#18181B]">£23.85</span>
                  <button
                    type="button"
                    onClick={() => showToast('Re-order added to your basket!')}
                    className="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer"
                  >
                    Reorder Items →
                  </button>
                </div>
              </div>

              {/* Order 2 */}
              <div className="p-4 rounded-2xl border border-stone-200/90 bg-stone-50/40 hover:bg-stone-50 transition-colors">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-mono font-bold text-stone-700">#FM-83109</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/60 font-bold text-[10px] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#B45309]" />
                    Delivered 3 days ago
                  </span>
                </div>
                <p className="text-xs text-stone-600 mb-2">
                  8 items • Farm Spinach, Cherry Tomatoes, Free-Range Eggs, Wild Salmon
                </p>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-200/50">
                  <span className="font-extrabold text-[#18181B]">£41.20</span>
                  <button
                    type="button"
                    onClick={() => showToast('Re-order added to your basket!')}
                    className="text-[11px] font-bold text-[#B45309] hover:underline cursor-pointer"
                  >
                    Reorder Items →
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'rewards' && (
            <motion.div
              key="rewards"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-[#18181B] to-[#18181B] text-white p-5 rounded-2xl shadow-md">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#F8BE17]">
                  FreshMart VIP Loyalty
                </span>
                <div className="flex items-baseline justify-between mt-2">
                  <h4 className="text-3xl font-black">240 Points</h4>
                  <span className="text-xs bg-white/20 px-2.5 py-1 rounded-full font-bold">
                    = £2.40 Reward
                  </span>
                </div>
                <p className="text-xs text-stone-200 mt-2">
                  Earn 10 points for every £1 spent on organic produce and pantry items.
                </p>
              </div>

              <div className="space-y-2">
                <h5 className="text-xs font-bold text-stone-700 uppercase tracking-wider">
                  Available Vouchers
                </h5>
                <div className="p-3 rounded-xl border border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#18181B]">£5 Off Any Basket Over £40</p>
                    <p className="text-[11px] text-[#737A72]">Cost: 500 points</p>
                  </div>
                  <button
                    type="button"
                    disabled
                    className="px-3 py-1.5 rounded-lg bg-stone-100 text-stone-400 text-xs font-bold cursor-not-allowed"
                  >
                    Need 260 more
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'profile' && (
            <motion.div
              key="profile"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="space-y-4"
            >
              <div className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50">
                <div className="flex items-center gap-2 mb-1">
                  <MapPin className="w-4 h-4 text-[#B45309]" />
                  <h5 className="text-xs font-bold text-[#18181B]">Default Delivery Postcode</h5>
                </div>
                <p className="text-xs text-stone-600 pl-6">
                  {postalCode} (Hertfordshire County)
                </p>
              </div>

              <div className="p-3.5 rounded-2xl border border-stone-200 bg-stone-50/50 space-y-2">
                <h5 className="text-xs font-bold text-[#18181B]">Preferences</h5>
                <div className="space-y-1.5 text-xs text-stone-600">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#F5D103]" />
                    <span>Receive SMS when delivery driver is 15 minutes away</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" defaultChecked className="accent-[#F5D103]" />
                    <span>Always use compostable paper packaging</span>
                  </label>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  showToast('Signed out of Alex Mercer profile.');
                  onClose();
                }}
                className="w-full py-2.5 rounded-xl border border-stone-300 text-stone-600 hover:bg-stone-50 active:scale-98 transition-transform text-xs font-bold cursor-pointer"
              >
                Sign Out
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedModal>
  );
};
