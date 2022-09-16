import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { CircularProgress } from '@mui/material';
import { Transaction } from '@shared/ethereum-json-rpc/models/utils-types.model';

import { TxRaw } from '../components/TxRaw';

export const TransactionRawContainer = () => {
  const { hash } = useParams();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [transaction, setTransaction] = useState<Transaction>();
  const [receipt, setReceipt] = useState<any>();

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    ethRPC.eth_getTransactionByHash(hash).then((tx) => {
      if (tx === null) {
        return;
      }
      setTransaction(tx);
    });
  }, [hash, ethRPC]);

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    ethRPC.eth_getTransactionReceipt(hash).then((r) => {
      if (r === null) {
        return;
      }
      setReceipt(r);
    });
  }, [hash, ethRPC]);

  if (!transaction || !receipt) {
    return <CircularProgress />;
  }

  return <TxRaw tx={transaction} receipt={receipt} />;
};
