export type TranslationKey = keyof typeof import('./index').translations.en;

export interface Translations {
  en: Record<TranslationKey, string>;
  es: Record<TranslationKey, string>;
}