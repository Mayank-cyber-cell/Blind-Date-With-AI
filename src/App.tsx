import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { GameState, Character, ChatMessage } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import CharacterSelection from './components/CharacterSelection';
import ChatInterface from './components/ChatInterface';
import RevealScreen from './components/RevealScreen';
import ThemeToggle from './components/ThemeToggle';
import { useTheme } from './hooks/useTheme';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const [gameState, setGameState] = useState<GameState>({
    currentScreen: 'welcome',
    messages: [],
    conversationStage: 0,
    hasRevealed: false
  });

  const handleStart = () => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'character-select'
    }));
  };

  const handleCharacterSelect = (character: Character) => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'chat',
      selectedCharacter: character,
      messages: [],
      conversationStage: 0
    }));
  };

  const handleReveal = (messages: ChatMessage[]) => {
    setGameState(prev => ({
      ...prev,
      currentScreen: 'reveal',
      messages,
      hasRevealed: true
    }));
  };

  const handleRestart = () => {
    setGameState({
      currentScreen: 'welcome',
      messages: [],
      conversationStage: 0,
      hasRevealed: false
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDark ? 'dark' : 'light-theme'}`}>
      <Toaster 
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.95)',
            color: isDark ? '#fff' : '#1f2937',
            backdropFilter: 'blur(10px)',
            border: isDark ? '1px solid rgba(255, 255, 255, 0.2)' : '1px solid rgba(0, 0, 0, 0.1)',
            boxShadow: isDark ? '0 4px 16px rgba(0, 0, 0, 0.3)' : '0 4px 16px rgba(0, 0, 0, 0.1)',
          },
        }}
      />
      
      <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      
      {gameState.currentScreen === 'welcome' && (
        <WelcomeScreen onStart={handleStart} />
      )}
      
      {gameState.currentScreen === 'character-select' && (
        <CharacterSelection onSelect={handleCharacterSelect} />
      )}
      
      {gameState.currentScreen === 'chat' && gameState.selectedCharacter && (
        <ChatInterface 
          character={gameState.selectedCharacter}
          onReveal={handleReveal}
        />
      )}
      
      {gameState.currentScreen === 'reveal' && gameState.selectedCharacter && (
        <RevealScreen 
          character={gameState.selectedCharacter}
          messages={gameState.messages}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;