import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { ARABIC_LETTERS } from '../data/learningData';
import { soundManager } from '../utils/audio';
import { Layers, Volume2, Sparkles, CheckCircle2, RotateCcw, ArrowLeft, BookOpen } from 'lucide-react';

interface WordMorphologyLabProps {
  onAwardStars: (amount: number) => void;
}

export const WordMorphologyLab: React.FC<WordMorphologyLabProps> = ({ onAwardStars }) => {
  const [activeTab, setActiveTab] = useState<'positions' | 'madd' | 'roots'>('positions');

  // Letter Positions state
  const [selectedLetterChar, setSelectedLetterChar] = useState('ب');

  // Letter forms dictionary for Arabic script connectivity
  const LETTER_FORMS: Record<string, { isolated: string; initial: string; medial: string; final: string; sample: string }> = {
    'أ': { isolated: 'أ', initial: 'أَ', medial: 'ـأَ', final: 'ـأ', sample: 'أَسَد - مَأْوَى - صَدَأ' },
    'ب': { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب', sample: 'بَاب - حَبْل - كِتَاب' },
    'ت': { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت', sample: 'تَاج - دَفْتَر - بَيْت' },
    'ث': { isolated: 'ث', initial: 'ثـ', medial: 'ـثـ', final: 'ـث', sample: 'ثَوْب - مُثَلَّث - بَحْث' },
    'ج': { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج', sample: 'جَمَل - نَجْم - تَاج' },
    'ح': { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح', sample: 'حِصَان - بَحْر - فَرَح' },
    'خ': { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ', sample: 'خَرُوف - نَخْلَة - فَرْخ' },
    'د': { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد', sample: 'دُبّ - هُدْهُد - وَلَد' },
    'ر': { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر', sample: 'رِيشَة - وَرْدَة - نَمِر' },
    'س': { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس', sample: 'سَمَكَة - مَسْجِد - شَمْس' },
    'ش': { isolated: 'ش', initial: 'شـ', medial: 'ـشـ', final: 'ـش', sample: 'شَجَرَة - مِشْمِش - رِيش' },
    'ص': { isolated: 'ص', initial: 'صـ', medial: 'ـصـ', final: 'ـص', sample: 'صَقْر - عَصِير - قَفَص' },
    'ط': { isolated: 'ط', initial: 'طـ', medial: 'ـطـ', final: 'ـط', sample: 'طَيْر - مَطَر - خَيْط' },
    'ع': { isolated: 'ع', initial: 'عـ', medial: 'ـعـ', final: 'ـع', sample: 'عَيْن - مَلْعَب - شَارِع' },
    'ف': { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف', sample: 'فَرَاشَة - طِفْل - صَيْف' },
    'ق': { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق', sample: 'قَلَم - حَقِيبَة - شُرُوق' },
    'ك': { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك', sample: 'كِتَاب - مَكْتَبَة - مَلِك' },
    'ل': { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل', sample: 'لَيْمُون - قَلْب - عَسَل' },
    'م': { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم', sample: 'مَوْز - قَمَر - قَلَم' },
    'ن': { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن', sample: 'نَجْمَة - عِنَب - عَيْن' },
  };

  const currentForm = LETTER_FORMS[selectedLetterChar] || LETTER_FORMS['ب'];

  // Madd (Long Vowels) interactive explorer
  const MADD_EXAMPLES = [
    { type: 'المد بالألف (ــَا)', letter: 'ب', short: 'بَ (فَتْحَة)', long: 'بَا (مَدٌّ بِالأَلِفِ)', word: 'بَاب', soundText: 'باااا' },
    { type: 'المد بالواو (ــُو)', letter: 'ن', short: 'نُ (ضَمَّة)', long: 'نُو (مَدٌّ بِالوَاوِ)', word: 'نُور', soundText: 'نوووور' },
    { type: 'المد بالياء (ــِي)', letter: 'ف', short: 'فِ (كَسْرَة)', long: 'فِي (مَدٌّ بِاليَاءِ)', word: 'فِيل', soundText: 'فييييل' },
  ];

  // Root Builder (جذور الكلمات وعائلاتها)
  const ROOT_FAMILIES = [
    {
      root: 'ك - ت - ب (كَتَبَ)',
      meaning: 'الكتابة والتدوين',
      derivatives: [
        { word: 'كِتَاب', desc: 'ما نقرأه ونتعلم منه', prefix: '', suffix: '' },
        { word: 'كَاتِب', desc: 'الشخص الذي يؤلف القصص', prefix: '', suffix: '' },
        { word: 'مَكْتَبَة', desc: 'المكان المليء بالكتب', prefix: 'مَـ', suffix: 'ـة' },
        { word: 'يَكْتُبُ', desc: 'فعل الكتابة في الحاضر', prefix: 'يَـ', suffix: '' },
      ],
    },
    {
      root: 'ر - س - م (رَسَمَ)',
      meaning: 'الفن والألوان والتصوير',
      derivatives: [
        { word: 'رَسَّام', desc: 'الفنان المبدع في اللوحات', prefix: '', suffix: '' },
        { word: 'رَسْمَة', desc: 'اللوحة التي نرسمها', prefix: '', suffix: 'ـة' },
        { word: 'مَرْسَم', desc: 'مكان الرسم والإبداع', prefix: 'مَـ', suffix: '' },
        { word: 'يَرْسُمُ', desc: 'فعل الرسم المستمر', prefix: 'يَـ', suffix: '' },
      ],
    },
  ];

  const [selectedRootIdx, setSelectedRootIdx] = useState(0);

  const handlePronounce = (text: string) => {
    soundManager.playPop();
    soundManager.speak(text, 'ar');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-teal-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="p-2.5 rounded-2xl bg-teal-100 text-teal-600 text-2xl">🔬</span>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              مختبر تشريح الكلمات وعلم الحروف
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              تعلّم كيف تتصل الحروف وتتغير أشكالها، وكيف تصنع الجذور عائلات كاملة من الكلمات!
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-1.5 p-1.5 bg-teal-50 rounded-2xl border border-teal-200">
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('positions');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'positions' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            اتصال الحروف الأربعة
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('madd');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'madd' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            حروف المد الطويل
          </button>
          <button
            onClick={() => {
              soundManager.playClick();
              setActiveTab('roots');
            }}
            className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-all cursor-pointer ${
              activeTab === 'roots' ? 'bg-teal-600 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            شجرة جذور الكلمات
          </button>
        </div>
      </div>

      {/* Tab 1: Letter Positions */}
      {activeTab === 'positions' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          {/* Letter Selector Carousel */}
          <div>
            <label className="text-xs font-bold text-slate-500 block mb-2">
              اختر الحرف لتشريح مواضعه في الكلمة:
            </label>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
              {Object.keys(LETTER_FORMS).map((ch) => (
                <button
                  key={ch}
                  onClick={() => {
                    soundManager.playPop();
                    setSelectedLetterChar(ch);
                  }}
                  className={`min-w-[48px] h-12 rounded-xl text-lg font-black transition-all cursor-pointer shrink-0 ${
                    selectedLetterChar === ch
                      ? 'bg-teal-500 text-white scale-110 shadow-md'
                      : 'bg-teal-50/70 hover:bg-teal-100 text-slate-700 border border-teal-200/60'
                  }`}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          {/* 4 Interactive Connection Stages */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Form 1: Isolated */}
            <div className="bg-slate-50 p-5 rounded-3xl border border-slate-200 text-center space-y-2 hover:border-teal-400 transition-colors">
              <span className="text-[11px] font-bold text-slate-500 block">١. منفصل (حر)</span>
              <div className="h-24 flex items-center justify-center">
                <span className="text-5xl font-black text-slate-900">{currentForm.isolated}</span>
              </div>
              <p className="text-[11px] text-slate-500">لا يتصل بما قبله ولا بعده</p>
            </div>

            {/* Form 2: Initial */}
            <div className="bg-teal-50/50 p-5 rounded-3xl border border-teal-200 text-center space-y-2 hover:border-teal-400 transition-colors">
              <span className="text-[11px] font-bold text-teal-800 block">٢. في أول الكلمة</span>
              <div className="h-24 flex items-center justify-center">
                <span className="text-5xl font-black text-teal-700">{currentForm.initial}</span>
              </div>
              <p className="text-[11px] text-slate-500">يمد يده اليسرى ليتصل بما بعده</p>
            </div>

            {/* Form 3: Medial */}
            <div className="bg-amber-50/50 p-5 rounded-3xl border border-amber-200 text-center space-y-2 hover:border-amber-400 transition-colors">
              <span className="text-[11px] font-bold text-amber-800 block">٣. في وسط الكلمة</span>
              <div className="h-24 flex items-center justify-center">
                <span className="text-5xl font-black text-amber-700">{currentForm.medial}</span>
              </div>
              <p className="text-[11px] text-slate-500">يمد كلتا يديه ليربط الحروف معاً</p>
            </div>

            {/* Form 4: Final Connected */}
            <div className="bg-emerald-50/50 p-5 rounded-3xl border border-emerald-200 text-center space-y-2 hover:border-emerald-400 transition-colors">
              <span className="text-[11px] font-bold text-emerald-800 block">٤. في آخر الكلمة متصل</span>
              <div className="h-24 flex items-center justify-center">
                <span className="text-5xl font-black text-emerald-700">{currentForm.final}</span>
              </div>
              <p className="text-[11px] text-slate-500">يمد يده لما قبله ويختم الكلمة</p>
            </div>
          </div>

          {/* Real Word Example Banner */}
          <div className="bg-linear-to-r from-teal-500 to-emerald-600 text-white p-5 rounded-3xl shadow-md flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">💡</span>
              <div>
                <span className="text-xs text-teal-100 font-bold block">أمثلة حية على الحرف في مواقعه:</span>
                <span className="text-lg font-black">{currentForm.sample}</span>
              </div>
            </div>
            <button
              onClick={() => handlePronounce(currentForm.sample)}
              className="px-4 py-2 bg-white hover:bg-teal-50 text-teal-800 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Volume2 className="w-4 h-4" />
              <span>استمع لنطق الأمثلة</span>
            </button>
          </div>
        </div>
      )}

      {/* Tab 2: Madd Explorer */}
      {activeTab === 'madd' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-1">
              مقارنة الحركة القصيرة بالمد الطويل 🎵
            </h3>
            <p className="text-xs text-slate-500">
              المد هو إطالة الصوت بحرف من حروف العلة الثلاثة: (الألف، الواو، والياء).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MADD_EXAMPLES.map((ex, i) => (
              <div
                key={i}
                className="bg-purple-50/60 p-6 rounded-3xl border border-purple-200 text-center space-y-4 hover:shadow-md transition-shadow"
              >
                <span className="bg-purple-600 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {ex.type}
                </span>

                <div className="flex items-center justify-center gap-4 pt-2">
                  <div className="bg-white p-3 rounded-2xl border border-purple-100 shadow-xs">
                    <span className="text-xs text-slate-400 block font-bold">حركة قصيرة</span>
                    <span className="text-2xl font-black text-slate-700">{ex.short}</span>
                  </div>
                  <span className="text-xl text-purple-400">➔</span>
                  <div className="bg-purple-600 text-white p-3 rounded-2xl shadow-md">
                    <span className="text-xs text-purple-200 block font-bold">صوت طويل</span>
                    <span className="text-2xl font-black">{ex.long}</span>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-2xl border border-purple-100">
                  <span className="text-xs text-slate-400 block">مثال في كلمة:</span>
                  <span className="text-2xl font-black text-purple-900">{ex.word}</span>
                </div>

                <button
                  onClick={() => handlePronounce(`${ex.short}... ثم المد الطويل: ${ex.soundText}`)}
                  className="w-full py-2 bg-purple-100 hover:bg-purple-200 text-purple-900 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>اسمع الفرق في الصوت</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Root Word Families */}
      {activeTab === 'roots' && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h3 className="text-lg font-black text-slate-900">
                شجرة الجذور: كيف نولد كلمات لا تنتهي من ٣ حروف فقط! 🌱
              </h3>
              <p className="text-xs text-slate-500">
                في لغتنا العربية الجميلة، كل جذر ثلاثي ينمو ليصبح عائلة كاملة من الكلمات المفيدة.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {ROOT_FAMILIES.map((fam, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedRootIdx(i)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-xl transition-colors cursor-pointer ${
                    selectedRootIdx === i ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}
                >
                  عائلة ({fam.root.split(' ')[0]})
                </button>
              ))}
            </div>
          </div>

          {/* Root Family Tree Display */}
          <div className="p-6 bg-linear-to-b from-teal-50/60 to-emerald-50/60 rounded-3xl border border-teal-200 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-3xl">🌳</span>
              <h4 className="text-2xl font-black text-teal-900">
                الجذر الأصلي: {ROOT_FAMILIES[selectedRootIdx].root}
              </h4>
              <p className="text-xs text-teal-700 font-semibold">
                المعنى الأساسي: {ROOT_FAMILIES[selectedRootIdx].meaning}
              </p>
            </div>

            {/* Derivatives Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {ROOT_FAMILIES[selectedRootIdx].derivatives.map((der, idx) => (
                <div
                  key={idx}
                  className="bg-white p-4 rounded-2xl border border-teal-200 shadow-xs flex flex-col justify-between space-y-2 text-center"
                >
                  <span className="text-2xl font-black text-teal-900">{der.word}</span>
                  <p className="text-xs text-slate-600 leading-snug">{der.desc}</p>
                  <button
                    onClick={() => handlePronounce(`${der.word}.. ${der.desc}`)}
                    className="p-1.5 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-bold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>استمع</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
