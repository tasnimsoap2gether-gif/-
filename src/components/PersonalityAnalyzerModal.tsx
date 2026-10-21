import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { PERSONALITY_QUESTIONS, PERSONALITY_PROFILES, PersonalityProfile } from '../data/personalityData';
import { soundManager } from '../utils/audio';
import { X, Sparkles, Volume2, Award, ArrowLeft, RotateCcw, CheckCircle } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface PersonalityAnalyzerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAwardStars: (amount: number) => void;
  onSelectStation: (stationId: ActiveTab) => void;
  childName: string;
}

export const PersonalityAnalyzerModal: React.FC<PersonalityAnalyzerModalProps> = ({
  isOpen,
  onClose,
  onAwardStars,
  onSelectStation,
  childName,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    creative: 0,
    artistic: 0,
    inventor: 0,
    leader: 0,
  });
  const [resultProfile, setResultProfile] = useState<PersonalityProfile | null>(null);

  if (!isOpen) return null;

  const currentQ = PERSONALITY_QUESTIONS[currentStep];

  const handleSelectOption = (trait: string) => {
    soundManager.playPop();
    const updatedScores = { ...scores, [trait]: scores[trait] + 1 };
    setScores(updatedScores);

    if (currentStep + 1 < PERSONALITY_QUESTIONS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Calculate winner
      let highestTrait = 'creative';
      let highestCount = -1;
      for (const [t, count] of Object.entries(updatedScores)) {
        if (count > highestCount) {
          highestCount = count;
          highestTrait = t;
        }
      }

      const profile = PERSONALITY_PROFILES[highestTrait] || PERSONALITY_PROFILES.creative;
      setResultProfile(profile);

      // Celebration!
      soundManager.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
      onAwardStars(10);
      soundManager.speak(
        `أهلاً يا ${childName}! لقد حللنا شخصيتك وميولك، وأنت ${profile.title}! ${profile.encouragingMessage}`,
        'ar'
      );
    }
  };

  const handleReset = () => {
    soundManager.playClick();
    setCurrentStep(0);
    setScores({ creative: 0, artistic: 0, inventor: 0, leader: 0 });
    setResultProfile(null);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full border border-sky-300 shadow-2xl p-6 sm:p-8 space-y-6 relative animate-fade-in my-6">
        {/* Close Button */}
        <button
          onClick={() => {
            soundManager.playClick();
            onClose();
          }}
          className="absolute top-5 left-5 p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-2xl shadow-xs">
            🤖
          </div>
          <div>
            <span className="text-[11px] font-bold text-sky-600 block">
              مختبر روبوت زكي الذكي
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              اكتشاف شخصية ومواهب البطل
            </h2>
          </div>
        </div>

        {/* Quiz Body */}
        {!resultProfile ? (
          <div className="space-y-6">
            {/* Progress bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>سؤال {currentStep + 1} من {PERSONALITY_QUESTIONS.length}</span>
                <span>{Math.round(((currentStep + 1) / PERSONALITY_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-sky-400 to-blue-500 transition-all duration-300 rounded-full"
                  style={{ width: `${((currentStep + 1) / PERSONALITY_QUESTIONS.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-sky-50/60 p-5 rounded-2xl border border-sky-100 text-center space-y-3">
              <span className="text-3xl animate-bounce inline-block">✨</span>
              <h3 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
              <button
                onClick={() => soundManager.speak(currentQ.question, 'ar')}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white hover:bg-sky-100 text-sky-700 text-xs font-bold rounded-lg border border-sky-200 transition-colors cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" />
                <span>اقرأ السؤال بصوت واضح</span>
              </button>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(opt.trait)}
                  className="p-4 bg-white hover:bg-amber-50/70 border-2 border-slate-200 hover:border-amber-400 rounded-2xl text-right transition-all transform hover:-translate-y-1 shadow-xs hover:shadow-md cursor-pointer flex items-center gap-3 group"
                >
                  <span className="text-3xl group-hover:scale-125 transition-transform">
                    {opt.emoji}
                  </span>
                  <span className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                    {opt.text}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Result Card */
          <div className="space-y-6 animate-fade-in text-center">
            <div className="p-6 bg-linear-to-b from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-300 space-y-4">
              <span className="text-6xl inline-block animate-float-gentle">
                {resultProfile.avatar}
              </span>
              <div>
                <span className="bg-amber-500 text-white text-xs font-extrabold px-3 py-1 rounded-full shadow-xs">
                  {resultProfile.badge}
                </span>
                <h3 className="text-2xl font-black text-slate-900 mt-2">
                  يا {childName || 'بطلنا الجميل'}.. أنت: <br />
                  <span className="text-amber-700">{resultProfile.title}</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  {resultProfile.description}
                </p>
              </div>

              {/* Super powers */}
              <div className="bg-white/80 p-4 rounded-2xl border border-amber-200 text-right space-y-2">
                <span className="text-xs font-extrabold text-amber-900 block flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>قواك الخارقة وميولك المكتشفة:</span>
                </span>
                <ul className="space-y-1.5 text-xs text-slate-700 font-medium">
                  {resultProfile.superPowers.map((sp, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{sp}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Love message */}
              <p className="text-xs font-bold text-amber-800 bg-amber-100/70 p-2.5 rounded-xl border border-amber-200">
                ❤️ {resultProfile.encouragingMessage}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => {
                  soundManager.playSparkle();
                  onClose();
                  onSelectStation(resultProfile.stationId as unknown as ActiveTab);
                }}
                className="w-full sm:flex-1 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>انطلق إلى محطتك المفضلة ({resultProfile.recommendedStation})</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>إعادة الاختبار</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
