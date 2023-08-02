// @ts-nocheck
import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const BlockchainContext = createContext({ kovanProvider: () => null, getGasPrice: () => null });

export function BlockchainWrapper({ children }) {
  const [kovanProvider, setKovanProvider] = useState();

  useEffect(() => {
    if (!kovanProvider) {
      // Mainnet: homestead
      // Testnet: goerli
      const kovan = new ethers.providers.InfuraProvider('goerli', process.env.INFURA_TOKEN_API);
      setKovanProvider(kovan);
    }
  }, [kovanProvider]);

  if (!kovanProvider) return;

  // Obtener precio del gas
  const getGasPrice = async () => {
    const gasPrice = await kovanProvider.getGasPrice();
    return ethers.utils.formatEther(gasPrice);
  };

  return <BlockchainContext.Provider value={{ kovanProvider, getGasPrice }}>{children}</BlockchainContext.Provider>;
}

export function useBlockchain() {
  return useContext(BlockchainContext);
}
