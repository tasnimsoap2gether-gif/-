export interface PersonalityQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    emoji: string;
    trait: 'creative' | 'artistic' | 'inventor' | 'leader';
  }[];
}

export interface PersonalityProfile {
  title: string;
  badge: string;
  avatar: string;
  description: string;
  superPowers: string[];
  recommendedStation: string;
  stationId: string;
  encouragingMessage: string;
}

export const PERSONALITY_QUESTIONS: PersonalityQuestion[] = [
  {
    id: 1,
    question: 'ما هو أكثر نشاط يجعلك سعيداً ومتحمساً في الحديقة؟',
    options: [
      { text: 'كتابة قصص خيالية وحكايات سحرية', emoji: '📖', trait: 'creative' },
      { text: 'رسم لوحات ملونة وتصميم شخصيات كرتونية', emoji: '🎨', trait: 'artistic' },
      { text: 'حل الألغاز واكتشاف كيف تعمل الآلات', emoji: '🧩', trait: 'inventor' },
      { text: 'الجري مع الأصدقاء وخوض المغامرات الحماسية', emoji: '🏃‍♂️', trait: 'leader' },
    ],
  },
  {
    id: 2,
    question: 'لو عثرت على صندوق سحري في الحديقة، ماذا تتمنى أن تجد بداخله؟',
    options: [
      { text: 'ريشة سحرية تكتب حكايات تتحول لحقيقة', emoji: '🪶', trait: 'creative' },
      { text: 'صندوق ألوان تضيء بنجوم ملونة عند الرسم بها', emoji: '✨', trait: 'artistic' },
      { text: 'روبوت صغير ذكي يخترع ألعاباً مسلية', emoji: '🤖', trait: 'inventor' },
      { text: 'تاج البطل ووسام الشجاعة لقيادة الفريق', emoji: '👑', trait: 'leader' },
    ],
  },
  {
    id: 3,
    question: 'كيف تحب أن تعبر عن حبك واهتمامك بأصدقائك؟',
    options: [
      { text: 'أكتب لهم رسالة لطيفة وشعراً جميلاً', emoji: '💌', trait: 'creative' },
      { text: 'أرسم لهم بطاقة إهداء مليئة بالقلوب والألوان', emoji: '🖼️', trait: 'artistic' },
      { text: 'أشاركهم أفكاراً ذكية لحل مشكلاتهم', emoji: '💡', trait: 'inventor' },
      { text: 'أعانقهم وأشجعهم بحماس وألعب معهم', emoji: '🤗', trait: 'leader' },
    ],
  },
  {
    id: 4,
    question: 'ما هو لون هالتك وطاقتك السحرية المفضلة؟',
    options: [
      { text: 'الذهبي المشمس (حكمة ودفء الكلمات)', emoji: '💛', trait: 'creative' },
      { text: 'البنفسجي الإبداعي (خيال فني بلا حدود)', emoji: '💜', trait: 'artistic' },
      { text: 'الأزرق الفضائي (ذكاء وتفكير استراتيجي)', emoji: '💙', trait: 'inventor' },
      { text: 'الأخضر الزمردي (حيوية وانطلاق ومغامرة)', emoji: '💚', trait: 'leader' },
    ],
  },
];

export const PERSONALITY_PROFILES: Record<string, PersonalityProfile> = {
  creative: {
    title: 'الكاتب الحالم وصانع الحكايات',
    badge: '🌟 وسام الأديب الصغير',
    avatar: '🦉',
    description: 'تمتلك خيالاً واسعاً وقدرة مذهلة على تحويل الكلمات إلى عوالم ساحرة تأسر القلوب!',
    superPowers: [
      'التعبير الرائع عن المشاعر بالكلمات',
      'تأليف نهايات غير متوقعة للقصص',
      'حب الاستماع والقراءة وصنع المعاني',
    ],
    recommendedStation: 'استوديو الكوميكس وتأليف القصص',
    stationId: 'comic',
    encouragingMessage: 'أنت تملك سحر الكلمة، والعالم كله متشوق لقراءة قصصك القادمة!',
  },
  artistic: {
    title: 'الفنان والرسام المبدع',
    badge: '🎨 وسام الريشة الذهبية',
    avatar: '🦋',
    description: 'عينك ترى الجمال في كل تفصيلة! تمتلك حساً بصرياً راقياً وتناسقاً مدهشاً في الألوان والأشكال.',
    superPowers: [
      'تنسيق الألوان بروعة وسحر',
      'رسم الحروف ببراعة وخط رشيق',
      'تحويل الصفحات البيضاء إلى لوحات بهيجة',
    ],
    recommendedStation: 'كراسة الخط العربي ورسم الحروف',
    stationId: 'tracing',
    encouragingMessage: 'أنت فنان حقيقي! كل لمسة من يديك تنشر البهجة والفرح في كل مكان.',
  },
  inventor: {
    title: 'العبقري والمكتشف الذكي',
    badge: '🚀 وسام العالم والمخترع',
    avatar: '🤖',
    description: 'عقلك لامع ومحب للاستكشاف! تحب ربط الأفكار، واكتشاف الأنماط، وسرعة البديهة في كل تحدٍ.',
    superPowers: [
      'سرعة البديهة والتركيز العالي',
      'حل المسائل والألغاز المعقدة بسهولة',
      'حب المعرفة وفهم أسرار العالم والكون',
    ],
    recommendedStation: 'ركن ألعاب الذكاء والألغاز',
    stationId: 'braingames',
    encouragingMessage: 'ذكاؤك الخارق سيصنع مستقبلاً مشرقاً! نحن فخورون جداً بتفكيرك العبقري.',
  },
  leader: {
    title: 'البطل الشجاع ونجم الأصدقاء',
    badge: '🦁 وسام قائد الحديقة',
    avatar: '🐻',
    description: 'قلبك دافئ وروحك شجاعة محبوبة! الجميع يحب اللعب معك لأنك تزرع الحماس والمرح في قلوب الجميع.',
    superPowers: [
      'نشر الطاقة الإيجابية والابتسامات',
      'السرعة والشجاعة في خوض التحديات',
      'الوفاء للأصدقاء وروح التعاون الجميلة',
    ],
    recommendedStation: 'صائد الكلمات وحلبة الكيبورد',
    stationId: 'catch',
    encouragingMessage: 'أنت بطل رائع وقائد طيب، حضورك في الحديقة ينير كل شجرة وزهرة!',
  },
};
