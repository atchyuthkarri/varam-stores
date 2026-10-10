import React, { useState } from 'react';
import { X, MapPin, Check, Clock } from 'lucide-react';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPostalCode: string;
  onSelectPostalCode: (code: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  selectedPostalCode,
  onSelectPostalCode,
}) => {
  const [customPostal, setCustomPostal] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('Today, 6:00 PM - 8:00 PM');

  if (!isOpen) return null;

  const popularLocations = [
    { name: 'Hatfield', code: 'Hatfield, AL10' },
    { name: 'St Albans', code: 'St Albans, AL1' },
    { name: 'Welwyn Garden City', code: 'Welwyn, AL8' },
    { name: 'Hertford', code: 'Hertford, SG14' },
    { name: 'North London', code: 'London, N10' },
  ];

  const deliverySlots = [
    'Today, 6:00 PM - 8:00 PM (Evening Express)',
    'Tomorrow, 8:00 AM - 10:00 AM (Morning Fresh)',
    'Tomorrow, 2:00 PM - 4:00 PM (Afternoon Standard)',
  ];

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customPostal.trim()) {
      onSelectPostalCode(customPostal.trim().toUpperCase());
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-stone-200 relative">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors"
          aria-label="Close delivery location dialog"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#EAF0E6] text-[#2F7654] flex items-center justify-center">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="font-serif-heading text-xl font-bold text-[#123F32]">
            Choose Delivery Location
          </h3>
        </div>

        <p className="text-xs text-[#737A72] mb-5">
          Select your local area to view real-time harvest stock and same-day delivery slots.
        </p>

        {/* Custom Input */}
        <form onSubmit={handleCustomSubmit} className="mb-5">
          <label className="text-xs font-bold text-[#18231E] block mb-1">
            Enter UK Postcode:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={customPostal}
              onChange={(e) => setCustomPostal(e.target.value)}
              placeholder="e.g. AL10 9AB"
              className="flex-1 text-sm uppercase px-3 py-2 rounded-xl border border-[#DCE2D8] focus:outline-none focus:border-[#123F32]"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-[#123F32] hover:bg-[#1B5746] text-white text-xs font-bold rounded-xl transition-colors"
            >
              Set Postcode
            </button>
          </div>
        </form>

        {/* Popular Locations */}
        <div className="mb-6">
          <label className="text-xs font-bold text-[#18231E] block mb-2">
            Frequent Delivery Hubs:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {popularLocations.map((loc) => {
              const isSelected = selectedPostalCode === loc.code;
              return (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => {
                    onSelectPostalCode(loc.code);
                    onClose();
                  }}
                  className={`text-left p-2.5 rounded-xl border text-xs font-medium flex items-center justify-between transition-colors ${
                    isSelected
                      ? 'bg-[#EAF0E6] border-[#2F7654] text-[#123F32] font-bold'
                      : 'border-stone-200 hover:bg-stone-50 text-[#18231E]'
                  }`}
                >
                  <span>{loc.code}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-[#2F7654]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Delivery Slot Selector */}
        <div>
          <label className="text-xs font-bold text-[#18231E] flex items-center gap-1.5 mb-2">
            <Clock className="w-3.5 h-3.5 text-[#2F7654]" />
            <span>Available Delivery Windows:</span>
          </label>
          <div className="space-y-1.5">
            {deliverySlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-colors ${
                  selectedSlot === slot
                    ? 'border-[#123F32] bg-[#F4F7F2] font-semibold text-[#123F32]'
                    : 'border-stone-200 hover:bg-stone-50 text-[#737A72]'
                }`}
              >
                <span>{slot}</span>
                {selectedSlot === slot && (
                  <Check className="w-3.5 h-3.5 text-[#123F32]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
