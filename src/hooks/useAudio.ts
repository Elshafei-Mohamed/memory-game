import { useCallback } from 'react';

export const useAudio = () => {
  const playCorrectSound = useCallback(() => {
    try {
      const audio = new Audio('assets/audio/correct.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.error('Audio play error:', e));
    } catch (e) {
      console.error('Failed to play correct sound:', e);
    }
  }, []);

  const playWrongSound = useCallback(() => {
    try {
      const audio = new Audio('assets/audio/wrong.mp3');
      audio.volume = 0.5;
      audio.play().catch(e => console.error('Audio play error:', e));
    } catch (e) {
      console.error('Failed to play wrong sound:', e);
    }
  }, []);

  return { playCorrectSound, playWrongSound };
};