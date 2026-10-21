import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { soundManager } from '../utils/audio';
import { Brain, Sparkles, RotateCcw, Volume2, Award, CheckCircle2, HelpCircle } from 'lucide-react';

interface BrainGamesProps {
  onAwardStars: (amount: number) => void;
}

interface MemoryCard {
  id: number;
  pairId: number;
  name: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export const BrainGames: React.FC<BrainGamesProps> = ({ onAwardStars }) => {
  const [activeSubTab, setActiveSubTab] = useState<'memory' | 'riddles'>('memory');

  // Memory Game State
  const initialPairs = [
    { id: 1, name: 'أسد', emoji: '🦁' },
    { id: 2, name: 'تفاحة', emoji: '🍎' },
    { id: 3, name: 'صاروخ', emoji: '🚀' },
    { id: 4, name: 'قلم', emoji: '✏️' },
    { id: 5, name: 'بومة', emoji: '🦉' },
    { id: 6, name: 'شمس', emoji: '☀️' },
  ];

  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);

  const initMemoryGame = () => {
    soundManager.playPop();
    const deck: MemoryCard[] = [];
    initialPairs.forEach((item) => {
      deck.push({
        id: Math.random(),
        pairId: item.id,
        name: item.name,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      });
      deck.push({
        id: Math.random(),
        pairId: item.id,
        name: item.name,
        emoji: item.emoji,
        isFlipped: false,
        isMatched: false,
      });
    });
    setCards(deck.sort(() => Math.random() - 0.5));
    setFlippedCards([]);
    setMatchedPairsCount(0);
  };

  useEffect(() => {
    initMemoryGame();
  }, []);

  const handleCardClick = (index: number) => {
    if (flippedCards.length === 2) return;
    if (cards[index].isFlipped || cards[index].isMatched) return;

    soundManager.playClick();
    const nextCards = [...cards];
    nextCards[index].isFlipped = true;
    setCards(nextCards);

    const nextFlipped = [...flippedCards, index];
    setFlippedCards(nextFlipped);

    if (nextFlipped.length === 2) {
      const [firstIdx, secondIdx] = nextFlipped;
      if (cards[firstIdx].pairId === cards[secondIdx].pairId) {
        // Matched!
        soundManager.playFanfare();
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isMatched = true;
            updated[secondIdx].isMatched = true;
            return updated;
          });
          setFlippedCards([]);
          const nextMatches = matchedPairsCount + 1;
          setMatchedPairsCount(nextMatches);
          onAwardStars(2);

          if (nextMatches === initialPairs.length) {
            confetti({ particleCount: 80, spread: 70 });
            soundManager.speak('رائع جداً يا عبقري! لقد طابقت جميع بطاقات الذاكرة بنجاح!', 'ar');
          }
        }, 500);
      } else {
        // Not matched
        soundManager.playBoing();
        setTimeout(() => {
          setCards((prev) => {
            const updated = [...prev];
            updated[firstIdx].isFlipped = false;
            updated[secondIdx].isFlipped = false;
            return updated;
          });
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  // Riddles State
  const riddles = [
    {
      id: 1,
      riddle: 'أنا بيت بلا أبواب ولا نوافذ، وإذا خرج الصوص من داخلي لا أعود كما كنت.. فما أنا؟',
      options: ['البيضة 🥚', 'الصندوق 📦', 'الخيمة ⛺'],
      answerIndex: 0,
      explanation: 'البيضة! تفقس ليخرج الصوص الصغير اللطيف.',
    },
    {
      id: 2,
      riddle: 'أمشي بلا أرجل، وأبكي بلا عيون قطرات ندى ومطر، وأنير السماء بقوس قزح.. فما أنا؟',
      options: ['السحابة ☁️', 'النهر 🌊', 'الشجرة 🌳'],
      answerIndex: 0,
      explanation: 'السحابة! تسقي الزرع في حديقتنا الجميلة.',
    },
    {
      id: 3,
      riddle: 'أحملك في يدك وتحملني، وبدون ريشتي أو حبري لا تستطيع كتابة قصة.. فما أنا؟',
      options: ['القلم السحري ✏️', 'الممحاة 🧹', 'المسطرة 📏'],
      answerIndex: 0,
      explanation: 'القلم السحري صديقنا قلمور!',
    },
  ];

  const [currentRiddleIndex, setCurrentRiddleIndex] = useState(0);
  const [selectedRiddleOption, setSelectedRiddleOption] = useState<number | null>(null);
  const [riddleResult, setRiddleResult] = useState<'correct' | 'wrong' | null>(null);

  const currentRiddle = riddles[currentRiddleIndex];

  const handleSelectRiddle = (idx: number) => {
    setSelectedRiddleOption(idx);
    if (idx === currentRiddle.answerIndex) {
      soundManager.playFanfare();
      confetti({ particleCount: 70, spread: 60 });
      setRiddleResult('correct');
      onAwardStars(3);
      soundManager.speak(`صحيح يا بطل! الإجابة هي ${currentRiddle.options[idx]}!`, 'ar');
    } else {
      soundManager.playBoing();
      setRiddleResult('wrong');
    }
  };

  const handleNextRiddle = () => {
    soundManager.playSparkle();
    setSelectedRiddleOption(null);
    setRiddleResult(null);
    setCurrentRiddleIndex((prev) => (prev + 1) % riddles.length);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-indigo-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-indigo-100 text-indigo-600 text-2xl">🧠</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              ركن ألعاب الذكاء والألغاز التفاعلية
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              قوّي ذاكرتك وذكاءك البصري واللغوي مع بطاقات الذاكرة وفوازير دبدوب اللطيفة!
            </p>
          </div>
        </div>

        {/* Sub-tab switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-indigo-50 rounded-2xl border border-indigo-200">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveSubTab('memory');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'memory'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🃏 بطاقات الذاكرة السحرية
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveSubTab('riddles');
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeSubTab === 'riddles'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ❓ فوازير دبدوب الذكي
          </button>
        </div>
      </div>

      {/* Mode 1: Memory Cards */}
      {activeSubTab === 'memory' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">
                المطابقات المكتملة: <strong className="text-indigo-600 font-black">{matchedPairsCount} / {initialPairs.length}</strong>
              </span>
            </div>
            <button
              onClick={initMemoryGame}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>إعادة توزيع البطاقات</span>
            </button>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-4 max-w-3xl mx-auto">
            {cards.map((c, idx) => {
              const showFace = c.isFlipped || c.isMatched;
              return (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`h-28 sm:h-36 rounded-2xl flex flex-col items-center justify-center transition-all duration-300 transform cursor-pointer border-2 shadow-xs ${
                    showFace
                      ? c.isMatched
                        ? 'bg-emerald-50 border-emerald-400 scale-95 opacity-90'
                        : 'bg-indigo-50 border-indigo-400 rotate-y-180 scale-102'
                      : 'bg-linear-to-b from-indigo-500 to-purple-600 border-indigo-300 hover:scale-105 hover:shadow-md'
                  }`}
                >
                  {showFace ? (
                    <div className="text-center animate-fade-in">
                      <span className="text-3xl sm:text-4xl block mb-1">{c.emoji}</span>
                      <span className="text-xs font-black text-slate-800">{c.name}</span>
                    </div>
                  ) : (
                    <span className="text-2xl text-white opacity-80 font-bold">✨</span>
                  )}
                </button>
              );
            })}
          </div>

          {matchedPairsCount === initialPairs.length && (
            <div className="text-center p-6 bg-emerald-50 border border-emerald-300 rounded-2xl animate-fade-in space-y-2">
              <span className="text-4xl block">🏆</span>
              <h3 className="text-xl font-black text-emerald-900">
                عبقري لا يُشق لك غبار! 🎉
              </h3>
              <p className="text-xs text-emerald-700">
                لقد تذكرت وطابقت كل البطاقات بمهارة مذهلة وكسبت نجوماً جديدة!
              </p>
            </div>
          )}
        </div>
      )}

      {/* Mode 2: Riddles */}
      {activeSubTab === 'riddles' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <span className="text-3xl">🐻</span>
            <div>
              <span className="text-xs font-bold text-amber-700 block">فزورة دبدوب الطيب:</span>
              <h3 className="text-lg font-black text-slate-900">
                فزورة رقم {currentRiddleIndex + 1} من {riddles.length}
              </h3>
            </div>
          </div>

          {/* Riddle Card */}
          <div className="bg-amber-50/70 p-6 rounded-3xl border border-amber-200 text-center space-y-4">
            <p className="text-base sm:text-lg font-bold text-slate-900 leading-relaxed">
              &ldquo;{currentRiddle.riddle}&rdquo;
            </p>
            <button
              onClick={() => soundManager.speak(currentRiddle.riddle, 'ar')}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-amber-100 text-amber-800 text-xs font-bold rounded-lg border border-amber-200 transition-colors cursor-pointer"
            >
              <Volume2 className="w-3.5 h-3.5" />
              <span>استمع للفزورة</span>
            </button>
          </div>

          {/* Options */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {currentRiddle.options.map((opt, i) => {
              const isSelected = selectedRiddleOption === i;
              return (
                <button
                  key={i}
                  onClick={() => handleSelectRiddle(i)}
                  className={`p-4 rounded-2xl border-2 text-center text-sm font-bold transition-all transform hover:-translate-y-1 shadow-xs cursor-pointer ${
                    isSelected
                      ? riddleResult === 'correct'
                        ? 'bg-emerald-500 text-white border-emerald-600 scale-103'
                        : 'bg-rose-500 text-white border-rose-600'
                      : 'bg-white hover:bg-indigo-50 border-slate-200 text-slate-800'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {/* Feedback */}
          {riddleResult === 'correct' && (
            <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-300 text-center space-y-2 animate-fade-in">
              <span className="text-2xl">🌟</span>
              <h4 className="text-sm font-black text-emerald-900">إجابة ذكية وصحيحة! 🎉</h4>
              <p className="text-xs text-emerald-700">{currentRiddle.explanation}</p>
              <button
                onClick={handleNextRiddle}
                className="mt-2 px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                الفزورة التالية ➔
              </button>
            </div>
          )}

          {riddleResult === 'wrong' && (
            <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-center text-xs font-bold text-rose-800">
              فكر جيداً يا بطل، حاول مرة ثانية! 🤔
            </div>
          )}
        </div>
      )}
    </div>
  );
};
