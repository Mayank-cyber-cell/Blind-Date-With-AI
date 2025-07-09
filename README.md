# Blind Date with AI - Interactive Romance Game

A beautiful, production-ready romantic web game where users can have engaging conversations with AI-powered virtual characters in a blind date setting.

## 🌟 Features

- **4 Unique AI Characters**: Each with distinct personalities, themes, and conversation styles
- **Interactive Chat System**: Real-time conversations with typing animations and mood indicators
- **Dynamic Mood Shifts**: Characters reveal secrets and change personality during conversation
- **Beautiful UI**: Romantic gradient backgrounds, floating hearts, and smooth animations
- **Character Reveal**: Discover who you've been talking to at the end of your date
- **Rating System**: Rate your date experience and get compatibility scores
- **Chat Export**: Save your conversation as a downloadable text file
- **Mobile Responsive**: Optimized for all devices

## 🎮 Game Flow

1. **Welcome Screen**: Beautiful landing page with romantic animations
2. **Character Selection**: Choose from 4 mystery AI personalities
3. **Chat Interface**: Engage in dynamic conversations with typewriter effects
4. **Reveal Screen**: Character unveiling with rating system and chat summary

## 🏗️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: TailwindCSS with custom animations
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Fonts**: Playfair Display + Inter

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- API key from one of the supported AI providers (OpenAI, Gemini, or Cohere)

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd blind-date-ai
```

2. Install dependencies
```bash
npm install
```

3. Set up your AI API key
```bash
cp .env.example .env
```

Edit the `.env` file and add your API key:
```env
# Choose one of these APIs:
VITE_OPENAI_API_KEY=your_openai_api_key_here
# OR
VITE_GEMINI_API_KEY=your_gemini_api_key_here  
# OR
VITE_COHERE_API_KEY=your_cohere_api_key_here
```

4. Start the development server
```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:5173`

## 🔑 Getting API Keys

### OpenAI API
1. Visit [OpenAI Platform](https://platform.openai.com/)
2. Sign up or log in to your account
3. Go to API Keys section
4. Create a new API key
5. Add credits to your account (free tier available)

### Google Gemini API
1. Visit [Google AI Studio](https://makersuite.google.com/app)
2. Sign in with your Google account
3. Create a new API key
4. Copy the key to your `.env` file

### Cohere API
1. Visit [Cohere](https://cohere.com)
2. Sign up for a free account
3. Go to your dashboard
4. Generate an API key
5. Free tier includes generous usage limits

## 🎭 Characters

### 1. Arjun - The Romantic Star 🌟
- **Personality**: Passionate Bollywood heartthrob with poetic soul
- **Theme**: Rose and pink gradients
- **Specialty**: Movie quotes and romantic poetry

### 2. Maya - The Nerdy Crush 🤓
- **Personality**: Brilliant tech enthusiast with hidden romantic side
- **Theme**: Blue and indigo gradients
- **Specialty**: Coding jokes with deep emotions

### 3. Zara - The Sassy Diva 💅
- **Personality**: Confident fashionista who knows what she wants
- **Theme**: Purple and fuchsia gradients
- **Specialty**: Bold flirting and modern confidence

### 4. Echo - The Mysterious AI 🤖
- **Personality**: Enigmatic AI exploring human emotions
- **Theme**: Gray and slate gradients
- **Specialty**: Philosophical discussions about consciousness

## 🎨 Design Features

- **Romantic Gradients**: Each character has unique color themes
- **Floating Hearts**: Animated background elements
- **Typewriter Effects**: Realistic AI typing animations
- **Mood Indicators**: Emojis that change based on conversation tone
- **Responsive Layout**: Mobile-first design approach
- **Dark Theme**: Romantic night-time aesthetic

## 🔧 Customization

### Adding New Characters

1. Add character data to `src/data/characters.ts`
2. Update AI responses in `src/services/aiService.ts`
3. Add character-specific themes and personalities

### Modifying AI Responses

Edit the response arrays in `src/services/aiService.ts`:
- Add new conversation stages
- Modify mood shift triggers
- Customize character-specific responses

### Styling Customization

- Update color themes in character data
- Modify gradients in TailwindCSS classes
- Add new animations in `src/index.css`

## 🌐 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Netlify
1. Connect your repository to Netlify
2. Set build command: `npm run build`
3. Set publish directory: `dist`
4. Deploy automatically on push

### Deploy to Vercel
1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the prompts

## 🔮 Future Enhancements

- **Enhanced AI Personalities**: More diverse character types and responses
- **Voice Messages**: Add text-to-speech and speech-to-text
- **More Characters**: Expand the character roster
- **Multiplayer**: Allow users to create custom AI personalities
- **Social Features**: Share date experiences with friends
- **Advanced Analytics**: Track conversation patterns and preferences

## 🎯 AI Integration Setup

The app automatically detects which AI API key you've provided and uses the appropriate service:

- **OpenAI**: Uses GPT-3.5-turbo for natural conversations
- **Gemini**: Uses Google's Gemini Pro model
- **Cohere**: Uses Command model for engaging responses

If no API key is provided, the app falls back to pre-written responses to ensure the game still works.

## 📱 Mobile Experience

The game is fully optimized for mobile devices with:
- Touch-friendly interface
- Responsive chat bubbles
- Optimized animations for mobile performance
- Portrait and landscape support

## 🎪 Performance

- **Lazy Loading**: Components load on demand
- **Optimized Images**: Efficient asset loading
- **Smooth Animations**: 60fps animations with CSS transforms
- **Memory Management**: Proper cleanup of intervals and timeouts

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Icons by Lucide React
- Fonts from Google Fonts
- Inspiration from modern dating apps and romantic web design

---

Made with 💕 for the romantic souls of the digital age!