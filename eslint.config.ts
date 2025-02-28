import js from '@eslint/js'
import ts from 'typescript-eslint'

export default ts.config(js.configs.recommended, ts.configs.recommended, {
  ignores: ['**/src-tauri/'],
  rules: {
    'no-console': [0],
  },
})
