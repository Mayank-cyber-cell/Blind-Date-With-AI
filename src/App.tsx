import React, { useState } from 'react';
import { GameState, Character, ChatMessage } from './types';
import WelcomeScreen from './components/WelcomeScreen';
import CharacterSelection from './components/CharacterSelection';
import ChatInterface from './components/ChatInterface';
import RevealScreen from './components/RevealScreen';

function App() {
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
    <div className="min-h-screen">
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