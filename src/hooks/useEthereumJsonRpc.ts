import { useContext } from 'react';

import { EthereumJsonRpcContext } from '../contexts/ethereum-json-rpc.context';
export const useEthereumJsonRpc = () => {
  const context = useContext(EthereumJsonRpcContext);

  if (!context) {
    throw new Error('useEthereumJsonRpc must be used within a EthereumJsonRpcContextProvider');
  }

  return context;
};
