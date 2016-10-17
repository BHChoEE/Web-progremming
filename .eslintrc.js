module.exports = {
    extends: 'airbnb-base',
    plugins: [
        'react',
        'jsx-a11y',
        'import',
    ],
    rules: {
      'no-console': 0,
      'no-else-return': 0, 
      "no-unused-vars": [1, { "vars": "all", "args": "after-used" }],//1 for warnning
      "eol-last":0,
      "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
      "brace-style": [0, "allman"],
      "new-cap": 0,
      "no-undef":1 ,
      "curly":["error", "multi"],
      "eqeqeq":0,
    },
    
};
