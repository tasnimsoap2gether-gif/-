export interface StoryHotspot {
  id: string;
  name: string;
  letter: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  emoji: string;
}

export interface StoryPage {
  id: number;
  title: string;
  bgImage: string;
  text: string;
  words: string[];
  hotspots: StoryHotspot[];
  moralLesson: string;
  interactiveChallenge?: {
    question: string;
    choices: { text: string; nextHint: string; starsBonus: number }[];
  };
}

import magicCastleBg from '../assets/images/storybook_scene_magic_castle_1792577542128.jpg';
import cosmicLibraryBg from '../assets/images/storybook_scene_cosmic_library_1792577542013.jpg';
import magicalForestBg from '../assets/images/comic_bg_magical_forest_1792573521022.jpg';
import spaceAdventureBg from '../assets/images/comic_bg_space_adventure_1792573521371.jpg';

export const ANIMATED_STORIES: {
  id: string;
  title: string;
  coverImage: string;
  description: string;
  character: string;
  badge: string;
  pages: StoryPage[];
}[] = [
  {
    id: 'story-1',
    title: 'سر القلم السحري ومملكة الحروف المضيئة',
    coverImage: magicCastleBg,
    description: 'مغامرة ساحرة في قصر الكتب القديمة لاكتشاف كيف تحيي الكلمات الجميلة عوالم الخيال!',
    character: 'الطفل المكتشف وقلمور',
    badge: 'حكاية الإبداع 🌟',
    pages: [
      {
        id: 1,
        title: 'المشهد الأول: على أبواب قصر الحروف',
        bgImage: magicCastleBg,
        text: 'وَقَفَ البَطَلُ أَمَامَ قَصْرِ الكُتُبِ العَظِيمِ، وَفِي يَدِهِ قَلَمٌ ذَهَبِيٌّ يَشِعُّ نُوراً سِحْرِيّاً.',
        words: ['وَقَفَ', 'البَطَلُ', 'أَمَامَ', 'قَصْرِ', 'الكُتُبِ', 'العَظِيمِ،', 'وَفِي', 'يَدِهِ', 'قَلَمٌ', 'ذَهَبِيٌّ', 'يَشِعُّ', 'نُوراً', 'سِحْرِيّاً.'],
        hotspots: [
          {
            id: 'h1',
            name: 'القلم الذهبي السحري',
            letter: 'ق',
            x: 58,
            y: 60,
            description: 'قلم الريشة السحرية.. كل كلمة يكتبها البطل تتحول إلى حقيقة تضيء الدرب!',
            emoji: '🪶',
          },
          {
            id: 'h2',
            name: 'شلال الحبر البلوري',
            letter: 'ش',
            x: 18,
            y: 45,
            description: 'شلال ماء عذب يتدفق كالحبر الصافي ليسقي زهور الإبداع المضيئة.',
            emoji: '🌊',
          },
          {
            id: 'h3',
            name: 'كتاب القصر العالي',
            letter: 'ك',
            x: 67,
            y: 20,
            description: 'كتاب الحكمة المفتوح في قمة القصر.. يحفظ أسرار اللغة وجمال الكلمات.',
            emoji: '📖',
          },
        ],
        moralLesson: 'بالقراءة والكتابة نستطيع فتح أبواب أعظم القصور واكتشاف عوالم لا حدود لها!',
        interactiveChallenge: {
          question: 'ماذا تعتقد أن القلم السحري سيكتب على الهواء أولاً؟',
          choices: [
            { text: 'يكتب كلمة «سَلام» لتزهر كل زهور الحديقة 🌸', nextHint: 'اختيار رائع يدل على طيبة قلبك!', starsBonus: 3 },
            { text: 'يكتب كلمة «نُور» لتضيء ممرات القصر المظلمة 💡', nextHint: 'فكرة ذكية جداً لتوجيه الطريق للأصدقاء!', starsBonus: 3 },
          ],
        },
      },
      {
        id: 2,
        title: 'المشهد الثاني: مكتبة الفضاء ومجرة الأسرار',
        bgImage: cosmicLibraryBg,
        text: 'دَخَلَ البَطَلُ مَكْتَبَةَ الفَضَاءِ الكَوْنِيَّةِ، فَوَجَدَ البُومَةَ قَلْمُور يَقْرَأُ كِتَابَ النُّجُومِ المُتَلأْلِئَةِ.',
        words: ['دَخَلَ', 'البَطَلُ', 'مَكْتَبَةَ', 'الفَضَاءِ', 'الكَوْنِيَّةِ،', 'فَوَجَدَ', 'البُومَةَ', 'قَلْمُور', 'يَقْرَأُ', 'كِتَابَ', 'النُّجُومِ', 'المُتَلأْلِئَةِ.'],
        hotspots: [
          {
            id: 'h4',
            name: 'قلمور الحكيم',
            letter: 'ب',
            x: 68,
            y: 55,
            description: 'قلمور يرتدي نظارته ويشرح للبطل كيف تصنع النجوم خرائط الكلمات!',
            emoji: '🦉',
          },
          {
            id: 'h5',
            name: 'قبة الكواكب الزجاجية',
            letter: 'ك',
            x: 23,
            y: 35,
            description: 'مرصد فلكي عجيب يراقب حركة حروف اللغة وهي تدور في مدارات من ذهب.',
            emoji: '🪐',
          },
          {
            id: 'h6',
            name: 'كتاب مجرة الأسرار',
            letter: 'م',
            x: 65,
            y: 65,
            description: 'كتاب أزرق مطرز بنقوش سحرية يشع بحكم الأجداد وجمال البيان.',
            emoji: '✨',
          },
        ],
        moralLesson: 'العلم مثل الفضاء الواسع، كلما قرأت كتاباً جديداً اكتشفت نجماً جديداً في عقلك!',
        interactiveChallenge: {
          question: 'طلب قلمور منك كلمة سر لدخول القبة الفلكية، أي كلمة تختار؟',
          choices: [
            { text: '«اقْرَأْ» - الكلمة الأولى ومفتاح كل معرفة 📚', nextHint: 'أعظم كلمة سر على الإطلاق!', starsBonus: 5 },
            { text: '«إِبْدَاع» - وقود الخيال والمخترعين 🚀', nextHint: 'إجابة ملهمة وذكية جداً!', starsBonus: 5 },
          ],
        },
      },
      {
        id: 3,
        title: 'المشهد الثالث: كنز الحديقة الساحرة',
        bgImage: magicalForestBg,
        text: 'فِي الغَابَةِ السَّاحِرَةِ، اجْتَمَعَ الأَصْدِقَاءُ لِيَكْتُبُوا مَعاً أَجْمَلَ قِصَّةٍ فِي العَالَمِ.',
        words: ['فِي', 'الغَابَةِ', 'السَّاحِرَةِ،', 'اجْتَمَعَ', 'الأَصْدِقَاءُ', 'لِيَكْتُبُوا', 'مَعاً', 'أَجْمَلَ', 'قِصَّةٍ', 'فِي', 'العَالَمِ.'],
        hotspots: [
          {
            id: 'h7',
            name: 'بيوت الفطر الملونة',
            letter: 'ف',
            x: 35,
            y: 60,
            description: 'أكواخ الفطر الدافئة التي يلتقي فيها الصغار لتبادل القصص.',
            emoji: '🍄',
          },
          {
            id: 'h8',
            name: 'مصباح الطريق المنير',
            letter: 'م',
            x: 77,
            y: 78,
            description: 'مصباح قديم يرشد السائرين في درب المعرفة.',
            emoji: '🏮',
          },
        ],
        moralLesson: 'أجمل القصص هي تلك التي نكتبها ونعيشها مع أصدقائنا المخلصين بروح التعاون والحب!',
      },
    ],
  },
];
