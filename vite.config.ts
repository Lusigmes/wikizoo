import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'


export default defineConfig({
  plugins: [vue(), svgLoader()],
    define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false',
    __VUE_OPTIONS_API__: 'true',
  }
});