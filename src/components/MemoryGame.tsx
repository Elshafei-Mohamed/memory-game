import React, { useState, useEffect, useCallback } from 'react';
import { useAudio } from '../hooks/useAudio';
import Card from './Card';
import SuccessModal from './SuccessModal';

// Define types
type ImageType = string;

interface CardType {
  id: number;
  image: ImageType;
  isFlipped: boolean;
  isMatched: boolean;
}

const images: ImageType[] = [
  'assets/images/cat.jpg',
  'assets/images/dog.jpg',
  'assets/images/bird.jpg',
  'assets/images/fish.jpg',
  'assets/images/lion.jpg',
  'assets/images/tiger.jpg',
  'assets/images/elephant.jpg',
  'assets/images/monkey.jpg',
];

const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Load audio
  const { playCorrectSound, playWrongSound } = useAudio();

  // Initialize game
  const initializeGame = useCallback(() => {
    // Duplicate images
    const duplicatedImages = [...images, ...images];
    
    // Create cards
    const initialCards: CardType[] = duplicatedImages.map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }));

    // Shuffle cards
    const shuffledCards = [...initialCards].sort(() => Math.random() - 0.5);

    setCards(shuffledCards);
    setFlippedCards([]);
    setMoves(0);
    setGameCompleted(false);
    setDisabled(false);
  }, []);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  // Handle card click
  const handleCardClick = (id: number) => {
    // If card is already flipped or matched, or game is disabled, return
    if (disabled || cards[id].isFlipped || cards[id].isMatched) return;

    // Flip the card
    const updatedCards = [...cards];
    updatedCards[id] = { ...updatedCards[id], isFlipped: true };
    setCards(updatedCards);

    // Add to flipped cards
    const newFlippedCards = [...flippedCards, id];

    if (newFlippedCards.length === 1) {
      // First card flipped
      setFlippedCards(newFlippedCards);
    } else if (newFlippedCards.length === 2) {
      // Second card flipped
      setFlippedCards(newFlippedCards);
      setDisabled(true);
      setMoves(moves + 1);

      // Check for match
      const [firstId, secondId] = newFlippedCards;
      const firstCard = cards[firstId];
      const secondCard = cards[secondId];

      if (firstCard.image === secondCard.image) {
        // Match found
        setTimeout(() => {
          const matchedCards = [...cards];
          matchedCards[firstId] = { ...matchedCards[firstId], isMatched: true };
          matchedCards[secondId] = { ...matchedCards[secondId], isMatched: true };
          setCards(matchedCards);
          setFlippedCards([]);
          setDisabled(false);
          playCorrectSound();
          
          // Check if game is completed
          if (matchedCards.every(card => card.isMatched)) {
            setGameCompleted(true);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const resetCards = [...cards];
          resetCards[firstId] = { ...resetCards[firstId], isFlipped: false };
          resetCards[secondId] = { ...resetCards[secondId], isFlipped: false };
          setCards(resetCards);
          setFlippedCards([]);
          setDisabled(false);
          playWrongSound();
        }, 1000);
      }
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Game Header */}
      <div className="flex justify-between items-center mb-6 px-4 py-3 bg-white/10 backdrop-blur-lg rounded-xl border border-white/20 shadow-xl">
        <div className="text-white font-bold text-xl">Memory Game</div>
        <div className="flex items-center space-x-4">
          <div className="bg-white/20 px-4 py-2 rounded-lg">
            <span className="text-white font-semibold">Moves: {moves}</span>
          </div>
          <button
            onClick={initializeGame}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            Restart
          </button>
        </div>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4 gap-4 p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onClick={() => handleCardClick(card.id)}
          />
        ))}
      </div>

      {/* Success Modal */}
      {gameCompleted && (
        <SuccessModal moves={moves} onRestart={initializeGame} />
      )}
    </div>
  );
};

export default MemoryGame;