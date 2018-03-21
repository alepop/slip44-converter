const constants = require('bip44-constants');

// BIP32 path: m / purpose' / coin_type' / account' / change / address_index
// https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki

const HARDENED_OFFSET = 0x80000000;

const toBIP44 = address => {
    const [coin, ...other] = address.split('/');
    const constant = constants[coin.toUpperCase()];
    if (constant) {
        return `m/44'/${constant - HARDENED_OFFSET}'/${other.join('/')}`;
    } else {
        throw Error('Wrong coin symbol');
    }
};

const fromBIP44 = address => {
    const [m, purpose, coin, ...other] = address.split('/');
    const constant = parseInt(coin.replace("'", ''), 10) + HARDENED_OFFSET;
    const [symbol] = Object.entries(constants).find(
        ([key, val]) => val === constant,
    );
    if (symbol) {
        return `${symbol}/${other.join('/')}`;
    } else {
        throw Error('Wrong address');
    }
};

module.exports = {
    toBIP44,
    fromBIP44
};