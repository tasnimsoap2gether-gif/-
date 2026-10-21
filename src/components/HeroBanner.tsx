import React from 'react';
import { Sparkles, PenTool, LayoutGrid, Gamepad2, ArrowLeft, Volume2, Award, Zap } from 'lucide-react';
import { ActiveTab } from './Navbar';
import { soundManager } from '../utils/audio';

import heroImg from '../assets/images/hero_kids_writing_magic_1792573519843.jpg';
import mascotImg from '../assets/images/mascot_qalamoor_owl_1792573519618.jpg';

interface HeroBannerProps {
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  completedLettersCount: number;
  completedStoriesCount: number;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  setActiveTab,
  stars,
  completedLettersCount,
  completedStoriesCount,
}) => {
  const handleSpeakGreeting = () => {
    soundManager.speak('أهلاً بك يا بطل المستقبل في عالم الكتّاب الصغار! اليوم سنتعلم رسم أجمل الحروف ونؤلف أروع القصص الكرتونية ونلعب معاً!');
    soundManager.playSparkle();
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Hero Visual Card */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-b from-amber-100/60 to-orange-50 border border-amber-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-6 p-6 sm:p-10">
          {/* Text and Mascot Greeting */}
          <div className="lg:col-span-7 space-y-6 order-2 lg:order-1">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src={mascotImg}
                  alt="قلمور البومة الحكيمة"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-3 border-amber-300 shadow-md bg-white animate-float-gentle"
                />
                <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-white shadow-xs">
                  مرشدك
                </span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm sm:text-base font-bold text-amber-900">
                    قلمور يرحب بك! 🦉
                  </h2>
                  <button
                    onClick={handleSpeakGreeting}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold text-amber-800 bg-amber-200/80 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    title="استمع لصوت قلمور"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-amber-700" />
                    <span>استمع إلي</span>
                  </button>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  &ldquo;الكتابة ريشة سحرية، ترسم أفكارك وتصنع منها عوالم وألعاباً لا تنتهي!&rdquo;
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 leading-tight">
                اكتب، ارسم، والعب <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-600 via-orange-500 to-rose-500">
                  في مغامرة الحروف السحرية!
                </span>
              </h1>
              <p className="text-slate-600 text-base sm:text-lg mt-3 max-w-xl leading-relaxed">
                مساحتك الممتعة لتعلم فن الخط العربي والرسم الجرافيكي، وتأليف قصص الكوميكس الكرتونية، وتحدي سرعة الكيبورد والألعاب المسلية.
              </p>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.playPop();
                  setActiveTab('tracing');
                }}
                className="flex items-center gap-2 px-6 py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-base rounded-2xl shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <PenTool className="w-5 h-5" />
                <span>ابدأ رسم الحروف والخط</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  soundManager.playPop();
                  setActiveTab('comic');
                }}
                className="flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-orange-50 text-slate-800 font-bold text-base rounded-2xl border-2 border-amber-200 shadow-xs hover:border-amber-300 transition-all cursor-pointer"
              >
                <LayoutGrid className="w-5 h-5 text-orange-500" />
                <span>استوديو الكوميكس والقصص</span>
              </button>
            </div>

            {/* Stats Bar */}
            <div className="flex items-center gap-6 pt-3 border-t border-amber-200/60 text-slate-600 text-xs sm:text-sm">
              <div className="flex items-center gap-1.5">
                <span className="text-amber-500 font-bold text-base">⭐</span>
                <span>النجوم المكتسبة: <strong className="text-slate-900 font-extrabold tabular-nums">{stars}</strong></span>
              </div>
              <span className="text-amber-300">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-blue-500 font-bold text-base">✍️</span>
                <span>الحروف المتقنة: <strong className="text-slate-900 font-extrabold tabular-nums">{completedLettersCount} / 28</strong></span>
              </div>
              <span className="text-amber-300">·</span>
              <div className="flex items-center gap-1.5">
                <span className="text-rose-500 font-bold text-base">🎨</span>
                <span>القصص المنشورة: <strong className="text-slate-900 font-extrabold tabular-nums">{completedStoriesCount}</strong></span>
              </div>
            </div>
          </div>

          {/* Hero Visual Image */}
          <div className="lg:col-span-5 order-1 lg:order-2">
            <div className="relative group rounded-2xl overflow-hidden border-4 border-white shadow-xl">
              <img
                src={heroImg}
                alt="عالم الأطفال للكتابة والمرح"
                className="w-full h-64 sm:h-80 lg:h-96 object-cover transform group-hover:scale-103 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-900/60 via-transparent to-transparent flex items-end p-5">
                <div className="text-white">
                  <span className="bg-amber-500/90 text-white text-xs font-bold px-2.5 py-1 rounded-lg backdrop-blur-xs">
                    مغامرة اليوم
                  </span>
                  <p className="text-sm font-semibold mt-1 drop-shadow-md">
                    قلعة الكتب وعالم الحروف المضيئة في انتظارك
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Main Adventure Hub Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              اختر مغامرتك التعليمية الآن! 🚀
            </h2>
            <p className="text-sm text-slate-500">
              أنشطة تفاعلية مصممة خصيصاً لتطوير مهارات الكتابة، التعبير، والسرعة
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Letter Tracing */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('tracing');
            }}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                ✍️
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                رسم الحروف والخط العربي
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                لوحة رسم ذكية مع سطور كراسة الخط العربي، وفرشاة قوس قزح، وتقييم ذكي لكل حرف ترسمه بيديك!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>تدرّب على 28 حرفاً</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 2: Comic Studio */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('comic');
            }}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 hover:border-orange-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-xs">
                🎨
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                استوديو الكوميكس والقصص
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                كن المؤلف والمصمم! اختر خلفيات الغابة السحرية أو الفضاء، وأضف الشخصيات وفقاعات الحوار الملونة واطبع قصتك!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-orange-600">
              <span>اصنع قصتك المصورة</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 3: Word Catch */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('catch');
            }}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs">
                🎈
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                صائد الحروف والكلمات
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                لعبة سرعة ترفيهية! فرقع بالونات الحروف الطائرة واجمع النقاط وسجل أرقاماً قياسية مع كل كلمة صحيحة!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>العب واجمع النجوم</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Card 4: Sentence Builder */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sentence');
            }}
            className="group relative bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-xs">
                🧩
              </div>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                مختبر تركيب الجمل
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                رتّب بطاقات الكلمات المبعثرة لتصنع جملاً مفيدة وجميلة، مع استماع فوري لنطق الجملة بصوت نقي ومشجع!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>تحدي تكوين الجمل</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
