## Proof of concept for bip44 address converter
[Issue comment](https://github.com/trezor/python-trezor/issues/239#issuecomment-374653015)

## Install
```
npm i -S slip44-converter
```

### Usage
```javascript
const { toBIP44, fromBIP44 } = require('slip44-converter');

toBIP44("BTC/0'/0/0") // => m/44'/0'/0'/0/0
fromBIP44("m/44'/0'/0'/0/0") // => BTC/0'/0/0
```