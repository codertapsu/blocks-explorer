import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { CircularProgress, Grid, IconButton } from '@mui/material';
import { Block } from '@shared/ethereum-json-rpc/models/utils-types.model';
import React, { useEffect, useState } from 'react';
import { getBlocks } from '@helpers';
import {BlockList} from '../components/BlockList';

interface IProps {
  from: number;
  to: number;
  disablePrev: boolean;
  disableNext: boolean;
  style?: any;
  onNext?: any;
  onPrev?: any;
}

export const BlockListContainer = (props: IProps) =>  {
  const { from, to, style } = props;
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [blocks, setBlocks] = useState<Block[]>();

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    getBlocks(from, to, ethRPC).then(setBlocks);
  }, [from, to]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <div style={style}>
      <Grid container justifyContent='flex-end'>
        <IconButton onClick={props.onPrev} disabled={props.disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={props.onNext} disabled={props.disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <BlockList blocks={blocks} />
    </div>
  );
}
