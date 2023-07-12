import { BIP32Factory } from 'bip32';
import bip39 from 'bip39';
import bitcoin from 'bitcoinjs-lib';
import * as ecc from 'tiny-secp256k1';

import { ethers } from 'ethers';

const createAccount = async (req, res) => {
  if (req.method === 'GET') {
    try {
      // Define the network
      const network = bitcoin?.networks?.bitcoin;

      // Derivation path
      const path = `m/49'/1'/0'/0`;

      // Use m/49'/0'/0'/0 for mainnet
      // Use m/49'/1'/0'/0 for testnet

      let mnemonic = bip39?.generateMnemonic();
      const seed = bip39?.mnemonicToSeedSync(mnemonic);
      const bip32 = BIP32Factory(ecc);
      let root = bip32.fromSeed(seed, network);

      let account = root?.derivePath(path);
      let node = account?.derive(0).derive(0);

      let walletBTC = bitcoin?.payments?.p2pkh({
        pubkey: node?.publicKey,
        network: network,
      }).address;

      const walletETH = ethers.Wallet.fromMnemonic(mnemonic);

      res.status(200).json({
        account: {
          security: {
            mnemonic,
          },
          wallet: {
            btc: walletBTC,
            eth: walletETH?.address,
          },
        },
      });
    } catch (error) {
      res.status(501).json({ error: error.message });
    }
  }
};

export default createAccount;
