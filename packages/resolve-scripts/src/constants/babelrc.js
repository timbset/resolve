export default {
  presets: [['env', { useBuiltIns: 'usage' }], 'react'],
  plugins: [
    'add-module-exports',
    'transform-runtime',
    'transform-object-rest-spread',
    'transform-class-properties',
    'transform-decorators-legacy',
    'transform-export-default'
  ]
}
