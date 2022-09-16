import React, { useEffect } from 'react';
import { useBlockNumber } from '../helpers';
import {BlockListContainer} from './BlockListContainer';
import { useNavigate, useParams } from 'react-router-dom';
import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { CircularProgress } from '@mui/material';

export const NodeView = (props: any) => {
  const history = useNavigate();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [blockNumber] = useBlockNumber(ethRPC);
  const urlParams = useParams();

  let blockNum = blockNumber;
  if (urlParams && urlParams.number !== undefined) {
    try {
      blockNum = parseInt(urlParams.number, 10);
    } catch (e) {
      console.error('Unable to parse block number from URL');
    }
  }

  useEffect(() => {
    if (blockNum === undefined || blockNumber === undefined) {
      return;
    }
    if (blockNum > blockNumber) {
      history(`/blocks/${blockNumber}`);
    }
    if (blockNum < 0) {
      history('/blocks/0');
    }
  }, [blockNumber, blockNum, props.history]);
  if (blockNumber === undefined || blockNum > blockNumber) {
    return <CircularProgress />;
  }
  return (
    <BlockListContainer
      from={Math.max(blockNum - 14, 0)}
      to={blockNum}
      disablePrev={blockNum >= blockNumber}
      disableNext={blockNum === 0}
      onPrev={() => {
        const newQuery = blockNum + 15;
        history(`/blocks/${newQuery}`);
      }}
      onNext={() => {
        const newQuery = Math.max(blockNum - 15, 0);
        history(`/blocks/${newQuery}`);
      }}
    />
  );
};
