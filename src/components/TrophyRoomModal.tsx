import React, { useState } from 'react';
import { X, Award, Printer, Star, CheckCircle } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface TrophyRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  stars: number;
  completedLettersCount: number;
  completedStoriesCount: number;
}

export const TrophyRoomModal: React.FC<TrophyRoomModalProps> = ({
  isOpen,
  onClose,
  stars,
  completedLettersCount,
  completedStoriesCount,
}) => {
  const [childName, setChildName] = useState('البطل المبدع');

  if (!isOpen) return null;

  const badges = [
    {
      id: 'b1',
      title: 'خطاط الحروف الأول',
      desc: 'رسم وتدرب على الحروف بالسطور الصحيحة',
      icon: '✍️',
      unlocked: completedLettersCount >= 1,
    },
    {
      id: 'b2',
      title: 'مؤلف القصص الكرتونية',
      desc: 'نشر قصصاً مصورة بفقاعات الحوار',
      icon: '🎨',
      unlocked: completedStoriesCount >= 1,
    },
    {
      id: 'b3',
      title: 'صائد النجوم الذهبية',
      desc: 'جمع أكثر من ٢٠ نجمة في الألعاب',
      icon: '⭐',
      unlocked: stars >= 20,
    },
    {
      id: 'b4',
      title: 'فارس الكيبورد السريع',
      desc: 'أتقن طباعة الكلمات بسرعة ودقة',
      icon: '⌨️',
      unlocked: stars >= 10,
    },
  ];

  const handlePrintCertificate = () => {
    soundManager.playSparkle();
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full border border-amber-300 shadow-2xl p-6 sm:p-8 space-y-6 animate-fade-in relative my-6">
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
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl shadow-xs">
            🏆
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              قاعة الأوسمة وشهادات التقدير
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              إنجازاتك الرائعة في الكتابة والتأليف والألعاب الترفيهية
            </p>
          </div>
        </div>

        {/* Stars Trophy Showcase */}
        <div className="bg-linear-to-r from-amber-50 via-yellow-50 to-orange-50 p-5 rounded-3xl border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌟</span>
            <div>
              <span className="text-xs text-amber-800 font-bold block">رصيد النجوم الكلي:</span>
              <span className="text-3xl font-black text-amber-900 tabular-nums">{stars} نجمة</span>
            </div>
          </div>
          <div className="text-left text-xs font-bold text-slate-600">
            <span>مستوى: </span>
            <span className="text-amber-700 font-extrabold text-sm">
              {stars > 50 ? '👑 الكاتب الأسطوري' : stars > 20 ? '🥇 المؤلف الماهر' : '🌱 الكاتب الواعد'}
            </span>
          </div>
        </div>

        {/* Badges Grid */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-600" />
            <span>الأوسمة المكتسبة:</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {badges.map((b) => (
              <div
                key={b.id}
                className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all ${
                  b.unlocked
                    ? 'bg-amber-50/70 border-amber-300 text-slate-900 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-400 opacity-60'
                }`}
              >
                <span className="text-3xl">{b.icon}</span>
                <div className="flex-1">
                  <h4 className="text-xs font-bold">{b.title}</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">{b.desc}</p>
                </div>
                {b.unlocked && <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />}
              </div>
            ))}
          </div>
        </div>

        {/* Printable Certificate Preview */}
        <div className="bg-amber-50/40 p-5 rounded-3xl border-2 border-dashed border-amber-300 space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2">
            <div>
              <h4 className="text-sm font-black text-amber-950">
                📜 شهادة شكر وتقدير للكاتب الصغير
              </h4>
              <p className="text-xs text-slate-500">
                يمكنك طباعة الشهادة أو تعليقها كذكرى جميلة لإنجازاتك اليوم
              </p>
            </div>
            <button
              onClick={handlePrintCertificate}
              className="flex items-center gap-1.5 px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>طباعة الشهادة 🖨️</span>
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border-4 border-double border-amber-400 text-center space-y-3 shadow-inner">
            <span className="text-3xl">🏅</span>
            <h3 className="text-xl font-black text-amber-900">شهادة إتقان الكتابة والإبداع</h3>
            <p className="text-xs text-slate-600">تُمنح هذه الشهادة بكل فخر واعتزاز إلى:</p>
            <input
              type="text"
              value={childName}
              onChange={(e) => setChildName(e.target.value)}
              className="text-lg font-black text-center text-amber-700 bg-amber-50/50 border-b-2 border-amber-400 px-4 py-1 focus:outline-none"
              placeholder="اكتب اسم البطل هنا..."
            />
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              تقديراً لمثابرته الرائعة في تعلم رسم الحروف العربية وتأليف القصص المصورة بأسلوب ممتع ومبتكر.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-amber-100 text-[10px] text-slate-400 font-bold px-4">
              <span>عالم الكتّاب الصغار</span>
              <span>المرشد قلمور 🦉</span>
              <span>التاريخ: {new Date().toLocaleDateString('ar-EG')}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
