import React, { useEffect, useState } from "react";
import {BlockCard} from "../components/BlockCard";
import { Block } from '@shared/ethereum-json-rpc/models/utils-types.model';
import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { getBlocks, hexToNumber } from '@helpers';
import { CircularProgress, Grid } from '@mui/material';

interface IProps {
  from: number;
  to: number;
  style?: any;
}

export const BlockCardListContainer = (props: IProps) => {
  const { from, to, style } = props;
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [blocks, setBlocks] = useState<Block[]>();

  useEffect(() => {
    let isSubscribed = true;
    if (!ethRPC) { return; }
    if (isSubscribed) {
      getBlocks(from, to, ethRPC).then((bs) => {
        setBlocks(bs);
      });
    }
    return () => {
      isSubscribed = false;
      return;
    };
  }, [from, to]);

  if (!blocks) {
    return <CircularProgress />;
  }
  return (
    <Grid container spacing={2} style={style}>
      {
        blocks.sort((a: any, b: any) => {
          return hexToNumber(b.number) - hexToNumber(a.number);
        }).map((block: any) => {
          return (
            <Grid item xs={12} sm={4} key={block.hash}>
              <BlockCard block={block} />
            </Grid>
          );
        })
      }
    </Grid>
  );
}
