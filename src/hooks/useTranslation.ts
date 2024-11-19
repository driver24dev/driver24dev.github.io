import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/translations';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: keyof typeof translations.en) => {
    return translations[language][key] || key;
  };

  return { t };
}