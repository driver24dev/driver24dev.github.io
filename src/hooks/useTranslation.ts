import { useLanguage } from '@/components/LanguageProvider';
import { translations } from '@/translations';
import { TranslationKey } from '@/translations/types';

export function useTranslation() {
  const { language } = useLanguage();

  const t = (key: TranslationKey): string => {
    return translations[language][key] || key;
  };

  return { t };
}