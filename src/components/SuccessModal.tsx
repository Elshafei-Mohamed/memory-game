import React from 'react';

interface SuccessModalProps {
  moves: number;
  onRestart: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ moves, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl p-8 max-w-md w-full text-center shadow-2xl border border-white/20 transform animate-scale-in">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-3xl font-bold text-white mb-2">Congratulations!</h2>
        <p className="text-white/90 text-lg mb-6">
          You completed the game in <span className="font-bold">{moves}</span> moves!
        </p>
        <button
          onClick={onRestart}
          className="bg-white text-emerald-600 font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg w-full max-w-xs mx-auto"
        >
          Play Again
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;