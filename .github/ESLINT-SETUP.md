# ESLint Configuration for Frontend

```json
{
  "env": {
    "browser": true,
    "es2021": true,
    "node": true
  },
  "extends": [
    "react-app",
    "react-app/jest"
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "rules": {
    "no-unused-vars": "warn",
    "no-console": "warn",
    "react/prop-types": "warn"
  }
}
```

Save this in `product-frontend/.eslintrc.json`

Then add to `package.json`:
```json
"scripts": {
  "lint": "eslint src/**/*.js",
  "lint:fix": "eslint src/**/*.js --fix"
}
```
