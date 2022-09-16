import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { utils } from 'ethers';
import _ from 'lodash';

import { getBlocks, hexToNumber, useBlockNumber } from '@helpers';
import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { CircularProgress } from '@mui/material';
import { Transaction } from '@shared/ethereum-json-rpc/models/utils-types.model';

import { AddressTransactions } from '../components/AddressTransactions';
import { AddressView } from '../components/AddressView';

export const Address = () => {
  const { address, block } = useParams();
  const history = useNavigate();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [blockNumber] = useBlockNumber(ethRPC);
  const [transactionCount, setTransactionCount] = useState<string>();
  const [balance, setBalance] = useState<string>();
  const [code, setCode] = useState<string>();
  const blockNum = block === undefined ? blockNumber : parseInt(block, 10);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const from = Math.max(blockNum ? blockNum : 0 - 99, 0);
  const to = blockNum;

  useEffect(() => {
    if (isNaN(blockNum) || isNaN(blockNumber)) {
      return;
    }
    if (blockNum > blockNumber) {
      history(`/address/${address}/${blockNumber}`);
    }
    if (blockNum < 0) {
      history(`/address/${address}/0`);
    }
  }, [blockNumber, blockNum, history, address]);

  useEffect(() => {
    if (blockNumber === undefined || !ethRPC) {
      return;
    }
    const hexBlockNumber = `0x${blockNumber.toString(16)}`;
    ethRPC
      .eth_getTransactionCount(address, hexBlockNumber)
      .then((txCount) => {
        if (txCount === null) {
          return;
        }
        setTransactionCount(txCount);
        return txCount;
      })
      .then((txCountRes: string | undefined) => {
        if (txCountRes) {
          ethRPC.eth_getBalance(address, hexBlockNumber).then((b) => {
            if (b === null) {
              return;
            }
            setBalance(b);
          });
          ethRPC.eth_getCode(address, hexBlockNumber).then((c) => {
            if (c === null) {
              return;
            }
            setCode(c);
          });
        }
      });
  }, [blockNumber, address, ethRPC]);

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    getBlocks(from, to, ethRPC).then((blcks) => {
      const txes = _.flatMap(blcks, 'transactions');
      const filteredTxes = _.filter(txes, (tx: any) => {
        if (!tx) {
          return false;
        }
        return tx.to === address || tx.from === address;
      });
      const sortedTxes = _.sortBy(filteredTxes, (tx: any) => {
        return hexToNumber(tx.blockNumber);
      }).reverse();
      setTransactions(sortedTxes);
    });
  }, [from, to]);

  if (transactionCount === undefined || balance === undefined || code === undefined) {
    return <CircularProgress />;
  }
  return (
    <>
      <AddressView
        address={address}
        txCount={transactionCount ? hexToNumber(transactionCount) : 0}
        balance={utils.formatEther(balance || 0)}
        code={code}
      />
      <AddressTransactions
        from={from}
        to={to}
        transactions={transactions}
        disablePrev={blockNum >= blockNumber}
        disableNext={blockNum === 0}
        onPrev={() => {
          const newQuery = blockNum + 100;
          history(`/address/${address}/${newQuery}`);
        }}
        onNext={() => {
          const newQuery = Math.max(blockNum - 100, 0);
          history(`/address/${address}/${newQuery}`);
        }}
      />
    </>
  );
};
