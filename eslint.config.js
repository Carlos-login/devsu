// eslint.config.js
export default [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        'eqeqeq': ['error', 'always'], 
        'curly': ['error', 'all'], 
        'no-eval': 'error', 
        'no-implied-eval': 'error', 
        'no-alert': 'warn', 
  
       
        'no-unused-vars': ['warn', { 'vars': 'all', 'args': 'after-used', 'ignoreRestSiblings': false }],
        'no-undef': 'error', 
    },
  ];
  