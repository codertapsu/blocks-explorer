import React, { useEffect, useState } from 'react';
import { BlockView } from '../components/BlockView';
import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { CircularProgress } from '@mui/material';
import { useParams } from 'react-router-dom';

export const Block = () => {
  const {hash} = useParams();
  
  const [block, setBlock] = useState<any>();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();

  useEffect(() => {
    console.log({ethRPC, hash});
    
    if (!ethRPC) {
      return;
    }
    ethRPC.eth_getBlockByHash(hash, true).then((b) => {
      if (b === null) {
        return;
      }
      setBlock(b);
    }).catch(e => {
      console.log(e);
      
    });
  }, [ethRPC, hash]);

  if (!block) {
    return <CircularProgress />;
  }
  return <BlockView block={block} />;
};
 