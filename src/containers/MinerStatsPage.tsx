import React, { useEffect, useState } from 'react';
import { getBlocks, useBlockNumber } from '../helpers';
import {MinerStats} from '../components/MinerStats';
import {MinerStatsTable} from '../components/MinerStatsTable';
import {StatCharts} from '../components/StatCharts';
import {getTheme} from '../themes/victoryTheme';
import {BlockPagination} from '../components/BlockPagination';
import _ from 'lodash';
import { CircularProgress, Theme, useTheme } from '@mui/material';
import { Block } from '@shared/ethereum-json-rpc/models/utils-types.model';
import { useNavigate, useParams } from 'react-router-dom';
import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export const MinerStatsPage = () => {
  const history = useNavigate();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const [blockNumber] = useBlockNumber(ethRPC);
  const [blocks, setBlocks] = useState<Block[]>();
  const theme = useTheme<Theme>();
  const victoryTheme = getTheme(theme);
  const { block } = useParams();
  const blockNum = block !== undefined ? parseInt(block, 10) : blockNumber;
  const from = Math.max(blockNum - 99, 0);
  const to = blockNum;

  useEffect(() => {
    if (blockNum === undefined || blockNumber === undefined) {
      return;
    }
    if (blockNum > blockNumber) {
      history(`/stats/miners/${blockNumber}`);
    }
    if (blockNum < 0) {
      history(`/stats/miners/0`);
    }
  }, [blockNumber, blockNum, history]);

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    getBlocks(from, to, ethRPC).then((bl) => {
      setBlocks(_.compact(bl));
    });
  }, [from, to]);

  if (!blocks || blockNumber === undefined || blockNum > blockNumber) {
    return <CircularProgress />;
  }

  return (
    <>
      <BlockPagination
        from={from}
        to={to}
        disablePrev={blockNum >= blockNumber}
        disableNext={blockNum === 0}
        onPrev={() => {
          const newQuery = blockNum + 100;
          history(`/stats/miners/${newQuery}`);
        }}
        onNext={() => {
          const newQuery = Math.max(blockNum - 100, 0);
          history(`/stats/miners/${newQuery}`);
        }}
      ></BlockPagination>
      <StatCharts blocks={blocks} victoryTheme={victoryTheme} />
      <MinerStats blocks={blocks} config={config} />
      <MinerStatsTable blocks={blocks} />
    </>
  );
};
