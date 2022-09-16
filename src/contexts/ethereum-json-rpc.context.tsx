import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Chain } from '../models/chain.model';
import { EthereumJSONRPC } from '../shared/ethereum-json-rpc/ethereum-json-rpc';
import { TransportType } from '../shared/ethereum-json-rpc/models/utils-types.model';

interface Context {
  ethRPC: EthereumJSONRPC;
  selectedChain: Chain;
  chains: Chain[];
  addChain: (value: Chain) => void;
  changeChain: (value: Chain) => void;
}

export const EthereumJsonRpcContext = createContext<Context>(null);

export const EthereumJsonRpcContextProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [query, setQuery] = useSearchParams({ rpcUrl: '' });
  const [chains, setChains] = useState<Chain[]>([
    // {
    //   name: 'Grocery Chain',
    //   network: 'mainnet',
    //   rpc: ['https://coin.codertapsu.dev'],
    // },
    {
      name: 'Smart Chain',
      network: 'mainnet',
      rpc: ['https://bsc-dataseed.binance.org'],
    },
    {
      name: 'Ethereum Classic',
      network: 'mainnet',
      rpc: ['https://mainnet.infura.io/v3'],
    },
  ]);
  const [selectedChain, setSelectedChain] = useState<Chain>(chains[0]);
  const [ethRPC, setEthRPC] = useState<EthereumJSONRPC>();

  useEffect(() => {
    
    
    if (selectedChain === undefined && !query.get('rpcUrl')) {
      return;
    }
    const rpcUrl = selectedChain?.rpc.reduce((curr, toCheck) => {
      if (curr !== selectedChain.rpc[0]) {
        return curr;
      }
      if (toCheck.indexOf('${') !== -1) {
        return curr;
      }
      return toCheck;
    }, selectedChain.rpc[0]);

    const runAsync = async () => {
      let parsedUrl;
      const newUrl = query.get('rpcUrl') || rpcUrl;
      
      if (!newUrl) {
        return;
      }
      try {
        parsedUrl = new URL(newUrl);
      } catch (e) {
        alert('invalid rpc url ' + newUrl);
        return;
      }
      let rpc;
      try {
        const protocol = parsedUrl.protocol.split(':')[0] as TransportType;
        const fallbackPort = protocol === 'http' ? 80 : 443;
        const port = parseInt(parsedUrl.port, 10);
        rpc = new EthereumJSONRPC({
          transport: {
            host: parsedUrl.hostname,
            port: port ? port : fallbackPort,
            type: protocol,
            path: parsedUrl.pathname,
          },
        });
      } catch (e) {
        return;
      }
      if (rpc) {
        setEthRPC(rpc);
      }
    };
    runAsync();

    return () => {
      if (ethRPC) {
        ethRPC.rpc.requestManager.close();
      }
    };
  }, [selectedChain]);

  const addChain = useCallback((newChain: Chain) => {
    setChains(chains.concat(newChain));
  }, []);

  const changeChain = useCallback((value: Chain) => {
    setSelectedChain(value);
  }, []);

  const value: Context = {
    ethRPC: ethRPC,
    selectedChain,
    chains,
    addChain,
    changeChain,
  };

  return <EthereumJsonRpcContext.Provider value={value}>{children}</EthereumJsonRpcContext.Provider>;
};
