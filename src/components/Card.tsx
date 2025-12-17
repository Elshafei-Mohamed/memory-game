import React from 'react';

interface CardProps {
  card: {
    id: number;
    image: string;
    isFlipped: boolean;
    isMatched: boolean;
  };
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ card, onClick }) => {
  return (
    <div
      className={`relative cursor-pointer aspect-square transition-transform duration-300 ${
        card.isMatched ? 'opacity-75' : ''
      }`}
      onClick={onClick}
    >
      <div
        className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-preserve-3d ${
          card.isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Front (Back of Card) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center border-2 border-white/30 shadow-lg">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
        </div>

        {/* Card Back (Image) */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-xl overflow-hidden bg-white border-2 border-white/30 shadow-lg">
          <img
            src={card.image}
            alt="Memory Card"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;