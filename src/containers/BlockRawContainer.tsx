import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { CircularProgress } from '@mui/material';
import { Block } from '@shared/ethereum-json-rpc/models/utils-types.model';

import { BlockRaw } from '../components/BlockRaw';

export const BlockRawContainer = () => {
  const {hash} = useParams();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [block, setBlock] = useState<Block>();

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    ethRPC.eth_getBlockByHash(hash, true).then((b) => {
      if (b === null) {
        return;
      }
      setBlock(b);
    });
  }, [hash, ethRPC]);
  if (!block) {
    return <CircularProgress />;
  }
  return <BlockRaw block={block} />;
};
