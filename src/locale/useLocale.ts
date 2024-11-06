import { i18n } from '.'

export function useLocale() {
  const { locale, t } = useI18n({ useScope: 'global' })
  const getComponentsLocale = computed(() => {
    return i18n.global.getLocaleMessage(locale.value) as any
  })
  return {
    locale,
    getComponentsLocale,
    t,
  }
}
