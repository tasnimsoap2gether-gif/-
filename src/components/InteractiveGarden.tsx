import React, { useState } from 'react';
import { ActiveTab } from './Navbar';
import { soundManager } from '../utils/audio';
import { Sparkles, Heart, Volume2, ArrowLeft, Award, Users, Bot, PenTool, LayoutGrid, Gamepad2, Brain, Keyboard } from 'lucide-react';

import gardenImg from '../assets/images/interactive_kids_magical_garden_1792577022744.jpg';
import friendsGroupImg from '../assets/images/mascot_garden_friends_trio_1792577022993.jpg';
import owlImg from '../assets/images/mascot_qalamoor_owl_1792573519618.jpg';

interface InteractiveGardenProps {
  setActiveTab: (tab: ActiveTab) => void;
  stars: number;
  childName: string;
  setChildName: (name: string) => void;
  onOpenPersonalityTest: () => void;
  onOpenFriendsClub: () => void;
  onOpenTrophies: () => void;
}

interface GardenCharacter {
  id: string;
  name: string;
  title: string;
  emoji: string;
  greetingVoice: string;
  speechText: string;
  activityTitle: string;
  targetTab: ActiveTab;
  positionClass: string;
  themeColor: string;
}

export const InteractiveGarden: React.FC<InteractiveGardenProps> = ({
  setActiveTab,
  stars,
  childName,
  setChildName,
  onOpenPersonalityTest,
  onOpenFriendsClub,
  onOpenTrophies,
}) => {
  const [activeCharacterDialog, setActiveCharacterDialog] = useState<GardenCharacter | null>(null);

  // Garden characters with affectionate loving messages tailored for kids
  const characters: GardenCharacter[] = [
    {
      id: 'qalamoor',
      name: 'قلمور الحكيم',
      title: 'حارس ريشة الحروف والكتابة 🦉',
      emoji: '🦉',
      greetingVoice: `أهلاً بك يا ${childName || 'صديقي الحبيب'}! أنا قلمور، سعيد جداً بقدومك! نحن هنا جميعاً نحبك وفخورون بك! تعال لنتعلم رسم الحروف بأجمل خط عربي!`,
      speechText: 'أهلاً بك يا بطلي الحبيب! نحن نحبك كثيراً ومتحمسون لنتعلم معك فن الخط ورسم الحروف بالسطور الذهبية!',
      activityTitle: 'ادخل إلى كوخ رسم الحروف والخط',
      targetTab: 'tracing',
      positionClass: 'top-[36%] right-[10%] sm:right-[14%]',
      themeColor: 'from-amber-400 to-orange-500',
    },
    {
      id: 'dabdoub',
      name: 'دبدوب الطيب',
      title: 'صديق الأحضان الدافئة والألغاز 🐻',
      emoji: '🐻',
      greetingVoice: `يا أهلاً ويا مرحباً يا ${childName || 'بطلنا الغالي'}! أنا دبدوب، قلبي يفيض فرحاً بلقائك! خذ مني عناق الدب الدافئ، وتعال نتحدى ذكاءنا في الألغاز!`,
      speechText: 'يا حبيبي الغالي! عانقني عناقاً دافئاً! وجودك يجعل حديقتنا أكثر إشراقاً وجمالاً، تعال نلعب ألعاب الذكاء معاً!',
      activityTitle: 'العب ألعاب الذكاء وفوازير دبدوب',
      targetTab: 'braingames',
      positionClass: 'bottom-[18%] right-[18%] sm:right-[26%]',
      themeColor: 'from-amber-500 to-yellow-600',
    },
    {
      id: 'arnoob',
      name: 'أرنوب السريع',
      title: 'بطل القفز وفرقعة الحروف 🐰',
      emoji: '🐰',
      greetingVoice: `مرحباً يا ${childName || 'بطل السرعة'}! أنا أرنوب! هاي فايف يا صديقي! تعال نتسابق ونفرقع بالونات الحروف الطائرة في السماء!`,
      speechText: 'وااااو! مرحباً بأسرع وأذكى بطل! أعطني كفك بقوة (هاي فايف 🖐️)! هل أنت مستعد لتحدي البالونات الطائرة السريعة؟',
      activityTitle: 'انطلق إلى منطاد صائد الحروف',
      targetTab: 'catch',
      positionClass: 'bottom-[22%] left-[30%] sm:left-[38%]',
      themeColor: 'from-emerald-400 to-teal-500',
    },
    {
      id: 'farasha',
      name: 'فراشة الألوان',
      title: 'أميرة القصص والكوميكس 🦋',
      emoji: '🦋',
      greetingVoice: `يا أهلاً بالجمال والإبداع يا ${childName || 'فناننا الصغير'}! أنا فراشة الألوان، سأنثر عليك غبار السحر لتصنع أروع قصة مصورة اليوم!`,
      speechText: 'أهلاً برسامنا ومؤلفنا المبدع! أنثر عليك غبار النجوم اللامعة لتصنع قصة كرتونية خيالية في استوديو الكوميكس!',
      activityTitle: 'افتح استوديو القصص والكوميكس',
      targetTab: 'comic',
      positionClass: 'top-[38%] left-[12%] sm:left-[18%]',
      themeColor: 'from-pink-400 to-rose-500',
    },
    {
      id: 'zaki',
      name: 'روبوت زكي',
      title: 'مكتشف المواهب والشخصيات 🤖',
      emoji: '🤖',
      greetingVoice: `بيب بوب! مرحباً يا ${childName || 'عبقري المستقبل'}! مجساتي تقرأ أنك تملك مواهب استثنائية وطاقة إبداعية عالية! دعني أحلل شخصيتك وميولك الآن!`,
      speechText: 'بيب بوب! رادار الذكاء عندي يضيء بنور قوي! أنت مميز جداً ولديك ذكاء خارق، تعال لأحلل شخصيتك وميولك في مختبري!',
      activityTitle: 'ابدأ اختبار تحليل الشخصية والميول',
      targetTab: 'home', // Special handler triggers personality modal
      positionClass: 'top-[22%] left-[42%] sm:left-[46%]',
      themeColor: 'from-sky-400 to-blue-600',
    },
  ];

  const handleCharacterClick = (char: GardenCharacter) => {
    soundManager.playHighFive();
    soundManager.playChirp();
    setActiveCharacterDialog(char);
    soundManager.speak(char.greetingVoice, 'ar');
  };

  const handleTeleport = (char: GardenCharacter) => {
    soundManager.playSparkle();
    if (char.id === 'zaki') {
      setActiveCharacterDialog(null);
      onOpenPersonalityTest();
    } else {
      setActiveCharacterDialog(null);
      setActiveTab(char.targetTab);
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Garden Reception Hero Area */}
      <div className="relative overflow-hidden rounded-3xl border-4 border-amber-300 shadow-2xl bg-slate-900">
        {/* Landscape Image */}
        <div className="relative w-full h-[480px] sm:h-[560px] lg:h-[620px]">
          <img
            src={gardenImg}
            alt="الحديقة التفاعلية الساحرة للأطفال"
            className="w-full h-full object-cover"
          />

          {/* Gentle Lighting Scrim */}
          <div className="absolute inset-0 bg-linear-to-b from-black/30 via-transparent to-black/60 pointer-events-none"></div>

          {/* Top Floating Welcome Ribbon */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/90 backdrop-blur-md p-3 sm:p-4 rounded-3xl border border-amber-200 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">🏰</span>
              <div>
                <h1 className="text-base sm:text-xl font-black text-slate-900">
                  مرحباً بك في حديقة الأصدقاء الساحرة! 🌸
                </h1>
                <p className="text-xs text-slate-500">
                  اضغط على أي شخصية لتسلم عليك، واكتشف محطات التعلم والألعاب التفاعلية!
                </p>
              </div>
            </div>

            {/* Child Name customization field */}
            <div className="flex items-center gap-2 bg-amber-50 px-3 py-1.5 rounded-2xl border border-amber-200">
              <span className="text-xs font-bold text-amber-800">اسم البطل:</span>
              <input
                type="text"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                placeholder="اسمك هنا..."
                className="w-24 sm:w-32 text-xs font-extrabold text-amber-900 bg-transparent focus:outline-none"
              />
            </div>
          </div>

          {/* Interactive Character Hotspots scattered on the Garden landscape */}
          {characters.map((char) => (
            <div
              key={char.id}
              className={`absolute ${char.positionClass} z-20 transform -translate-x-1/2 -translate-y-1/2`}
            >
              <button
                onClick={() => handleCharacterClick(char)}
                className="group relative flex flex-col items-center cursor-pointer transition-transform duration-300 hover:scale-125 focus:outline-none"
              >
                {/* Pulsing Aura */}
                <div className="absolute -inset-2 rounded-full bg-amber-400/50 animate-ping"></div>

                {/* Character Button Badge */}
                <div
                  className={`relative w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-linear-to-br ${char.themeColor} border-3 border-white shadow-xl flex items-center justify-center text-3xl sm:text-4xl transform group-hover:rotate-6 transition-all`}
                >
                  <span className="select-none filter drop-shadow-md">{char.emoji}</span>
                  <span className="absolute -bottom-1 -right-1 bg-white text-rose-500 rounded-full p-0.5 text-xs shadow-xs">
                    ❤️
                  </span>
                </div>

                {/* Character Label Tag */}
                <div className="mt-1 bg-white/95 backdrop-blur-xs px-2.5 py-1 rounded-xl text-[11px] font-black text-slate-900 shadow-md border border-amber-200 whitespace-nowrap">
                  {char.name}
                </div>
              </button>
            </div>
          ))}

          {/* Active Character Speech Interaction Modal Dialog */}
          {activeCharacterDialog && (
            <div className="absolute inset-0 z-30 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 border-4 border-amber-400 shadow-2xl relative animate-fade-in space-y-5 text-center">
                <button
                  onClick={() => setActiveCharacterDialog(null)}
                  className="absolute top-4 left-4 p-2 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-xl cursor-pointer"
                >
                  ✕
                </button>

                {/* Character Avatar & Title */}
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 rounded-3xl bg-amber-100 flex items-center justify-center text-5xl mb-2 shadow-inner animate-bounce">
                    {activeCharacterDialog.emoji}
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {activeCharacterDialog.name}
                  </h3>
                  <span className="text-xs font-bold text-amber-700">
                    {activeCharacterDialog.title}
                  </span>
                </div>

                {/* Loving speech message */}
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-sm text-slate-800 font-semibold leading-relaxed relative">
                  &ldquo;{activeCharacterDialog.speechText}&rdquo;
                  <div className="flex items-center justify-center gap-1.5 text-rose-500 text-xs font-bold mt-2">
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>كل أصدقاء الحديقة يحبونك وفخورون بك!</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <button
                    onClick={() =>
                      soundManager.speak(activeCharacterDialog.greetingVoice, 'ar')
                    }
                    className="w-full sm:w-auto px-4 py-3 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-2xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>أعد الترحيب بالصوت</span>
                  </button>

                  <button
                    onClick={() => handleTeleport(activeCharacterDialog)}
                    className="w-full sm:flex-1 py-3 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black text-sm rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{activeCharacterDialog.activityTitle}</span>
                    <ArrowLeft className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Quick Hub Navigation Strip at the bottom of the Garden */}
          <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-center gap-2 sm:gap-3 bg-white/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-white shadow-lg">
            <button
              onClick={() => {
                soundManager.playSparkle();
                onOpenPersonalityTest();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-linear-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
            >
              <Bot className="w-4 h-4" />
              <span>تحليل شخصيتي وميولي 🤖</span>
            </button>

            <button
              onClick={() => {
                soundManager.playHighFive();
                onOpenFriendsClub();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-linear-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
            >
              <Users className="w-4 h-4" />
              <span>نادي الأصدقاء والتعارف 🤝</span>
            </button>

            <button
              onClick={() => {
                soundManager.playFanfare();
                onOpenTrophies();
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-linear-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-900 font-bold text-xs rounded-xl shadow-xs transition-transform hover:scale-105 cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>أوسمتي وشهاداتي 📜</span>
            </button>
          </div>
        </div>
      </div>

      {/* Garden Friends Mascot Welcome Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-4 flex justify-center">
            <img
              src={friendsGroupImg}
              alt="أصدقاء الحديقة الكرتونية"
              className="w-56 h-56 sm:w-64 sm:h-64 object-contain rounded-3xl shadow-sm animate-float-gentle"
            />
          </div>
          <div className="lg:col-span-8 space-y-4 text-right">
            <span className="bg-amber-100 text-amber-800 text-xs font-black px-3 py-1 rounded-full">
              عائلة الحديقة السعيدة ترحب بك ❤️
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              أنت لست وحدك هنا.. أصدقاؤك في كل مكان يشجعونك!
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              هنا تجد دبدوب الطيب يعطيك العناق والتشجيع، وأرنوب يقفز معك في كل تحدٍ، وقلمور يعلمك أسرار الخط الجميل، وفراشة الألوان تلهمك لرسم أجمل القصص الكرتونية، وروبوت زكي يكتشف مواهبك الخفية!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => {
                  soundManager.speak(
                    `نحن نحبك يا ${childName || 'بطلنا الجميل'}! كل يوم في الحديقة هو مغامرة جديدة مخصصة لك لتكبر وتبدع!`,
                    'ar'
                  );
                }}
                className="flex items-center gap-2 px-4 py-2.5 bg-amber-50 hover:bg-amber-100 text-amber-800 font-bold text-xs sm:text-sm rounded-xl border border-amber-200 transition-colors cursor-pointer"
              >
                <Volume2 className="w-4 h-4 text-amber-600" />
                <span>استمع لرسالة حب من جميع الأصدقاء 💖</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Stations Directory in the Garden */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900">
            خريطة محطات الحديقة التعليمية والألعاب 🎪
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            اختر المحطة التي ترغب في استكشافها وانطلق في مغامرتك الآن:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Station 0: Animated Living Storybook */}
          <div
            onClick={() => {
              soundManager.playSparkle();
              setActiveTab('storybook');
            }}
            className="group bg-gradient-to-br from-amber-500 to-orange-600 text-white p-6 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-xs backdrop-blur-xs">
                📖
              </div>
              <span className="text-[11px] font-black text-amber-200 block">حصري ومتحرك ✨</span>
              <h3 className="text-lg font-black text-white">
                القصص المتحركة وقراءة الكاراوكي
              </h3>
              <p className="text-amber-100 text-xs sm:text-sm mt-2 leading-relaxed">
                مشاهد حية تفاعلية تتحرك بها الكلمات مع نطق الكاراوكي المتزامن ونقاط استكشاف سحرية!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs font-bold text-white">
              <span>افتح كتاب الحكايات</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 0.5: Morphology Lab */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('morphology');
            }}
            className="group bg-white p-6 rounded-3xl border border-teal-200 hover:border-teal-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-teal-100 text-teal-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-xs">
                🔬
              </div>
              <span className="text-[11px] font-bold text-teal-600 block">تعليم احترافي متقدم</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">
                مختبر تشريح الحروف والكلمات
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                تعلّم اتصال الحروف بمواقعها الأربعة، وأصوات المدود الطويلة، وعائلات جذور الكلمات!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-teal-600">
              <span>تعلّم قواعد الخط والتركيب</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 1: Letter Tracing */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('tracing');
            }}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-xs">
                ✍️
              </div>
              <span className="text-[11px] font-bold text-amber-600 block">محطة الخط والإبداع</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                كوخ رسم الحروف والخط العربي
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                تعلّم الخط العربي وكتابة الحروف على سطور الكراسة، مع فرشاة قوس قزح وتقييم ذكي فوري لكل حرف!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-amber-600">
              <span>تدرّب على ٢٨ حرفاً</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 2: Comic Studio */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('comic');
            }}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-pink-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-pink-500 group-hover:text-white transition-all shadow-xs">
                🎨
              </div>
              <span className="text-[11px] font-bold text-pink-600 block">محطة التأليف والرسم</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-pink-600 transition-colors">
                شجرة القصص والكوميكس المصورة
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                كن المؤلف والمصمم! أضف شخصيات الحديقة وفقاعات الحوار واكتب مغامراتك واطبع قصتك!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-pink-600">
              <span>صمم قصتك الكرتونية</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 3: Brain Games */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('braingames');
            }}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-indigo-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-100 text-indigo-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-xs">
                🧠
              </div>
              <span className="text-[11px] font-bold text-indigo-600 block">محطة الذكاء والتفكير</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                ركن ألعاب الذكاء والألغاز
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                بطاقات الذاكرة السحرية وفوازير دبدوب الذكي لتنشيط العقل وسرعة البديهة والتركيز!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-indigo-600">
              <span>العب فوازير وبطاقات الذاكرة</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 4: Word Catch */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('catch');
            }}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-emerald-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xs">
                🎈
              </div>
              <span className="text-[11px] font-bold text-emerald-600 block">محطة السرعة واللعب</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors">
                منطاد صائد الحروف السريعة
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                فرقع بالونات الحروف الطائرة باللمس أو الكيبورد واجمع النجوم وسجل أرقاماً قياسية!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-600">
              <span>تحدي السرعة بالبالونات</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 5: Sentence Builder */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('sentence');
            }}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-xs">
                🧩
              </div>
              <span className="text-[11px] font-bold text-purple-600 block">محطة المعنى واللغة</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-purple-600 transition-colors">
                طاولة تركيب الجمل السحرية
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                رتّب الكلمات المبعثرة كالمكعبات لتصنع جملاً جميلة ذات معنى واستمع لنطقها الفوري!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-purple-600">
              <span>تحدي تكوين الجمل</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Station 6: Typing Hero */}
          <div
            onClick={() => {
              soundManager.playClick();
              setActiveTab('typing');
            }}
            className="group bg-white p-6 rounded-3xl border border-slate-200 hover:border-sky-400 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:bg-sky-500 group-hover:text-white transition-all shadow-xs">
                ⌨️
              </div>
              <span className="text-[11px] font-bold text-sky-600 block">محطة أصابع المستقبل</span>
              <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                حلبة سرعة الكيبورد والطباعة
              </h3>
              <p className="text-slate-500 text-xs sm:text-sm mt-2 leading-relaxed">
                تعلّم الطباعة السريعة على لوحة المفاتيح بأصابع رشيقة مع الزر المضيء المرشد!
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-sky-600">
              <span>تدرّب على الكيبورد</span>
              <ArrowLeft className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
