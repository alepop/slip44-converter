const constants = require('bip44-constants');

// BIP32 path: m / purpose' / coin_type' / account' / change / address_index
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

const HARDENED_OFFSET = 0x80000000;

const toBIP44 = address => {
  try {
    const [coin, ...other] = address.split('/');
    const [constant] = constants.find(([constant, coinSymbol]) => coinSymbol.toUpperCase() === coin.toUpperCase());
    return `m/44'/${constant - HARDENED_OFFSET}'/${other.join('/')}`;
  } catch {
    throw Error('Wrong coin symbol');
  }
};

const fromBIP44 = address => {
  try {
    const [m, purpose, coin, ...other] = address.split('/');
    const parsedConstant = parseInt(coin.replace("'", ''), 10) + HARDENED_OFFSET;
    const [_, coinSymbol] = constants.find(([constant]) => constant === parsedConstant);
    return `${coinSymbol}/${other.join('/')}`;
  } catch {
    throw Error('Wrong address');
  }
};

module.exports = {
  toBIP44,
  fromBIP44
};
