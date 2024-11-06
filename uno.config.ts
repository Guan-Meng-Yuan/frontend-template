import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno } from 'unocss'

export default defineConfig({
  presets: [
    presetUno({
      dark: 'class',
    }),
    presetTypography({
      selectorName: '',
    }),
    presetAttributify(),
    presetIcons(),
  ],
})
