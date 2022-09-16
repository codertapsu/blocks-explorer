import React, { useEffect, useState } from 'react';
import { weiToGwei } from '../components/formatters';
import { HashRate } from '../components/HashRate';
import { getTheme } from '../themes/victoryTheme';
import { ChartCard } from '../components/ChartCard';
import { BlockListContainer } from './BlockListContainer';
import { useTranslation } from 'react-i18next';
import { StatCharts } from '../components/StatCharts';
import { useEthereumJsonRpc } from '@hooks/useEthereumJsonRpc';
import { Button, CircularProgress, Grid, Theme, Typography, useTheme } from '@mui/material';
import { getBlocks, hexToNumber, useBlockNumber } from '@helpers';
import { Block } from '@shared/ethereum-json-rpc/models/utils-types.model';
import { useInterval } from '@hooks/useInterval';
import { ArrowForwardIos } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export const Dashboard = (props: any) => {
  const history = useNavigate();
  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();
  const theme = useTheme<Theme>();
  const victoryTheme = getTheme(theme);
  const [blockNumber] = useBlockNumber(ethRPC);
  const [chainId, setChainId] = useState<string>();
  const [block, setBlock] = useState<Block>();
  const [blocks, setBlocks] = useState<Block[]>();
  const [gasPrice, setGasPrice] = useState<string>();
  const [syncing, setSyncing] = useState<any>();
  const [peerCount, setPeerCount] = useState<string>();

  const { t } = useTranslation();

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    ethRPC.eth_chainId().then((cid) => {
      if (cid === null) {
        return;
      }
      setChainId(cid);
    });
  }, [ethRPC]);

  useEffect(() => {
    if (!ethRPC || blockNumber === undefined) {
      return;
    }
    ethRPC.eth_getBlockByNumber(`0x${blockNumber.toString(16)}`, true).then((b) => {
      if (b === null) {
        return;
      }
      setBlock(b);
    });
  }, [blockNumber]);

  useEffect(() => {
    if (!ethRPC || blockNumber === null) {
      return;
    }
    getBlocks(Math.max(blockNumber - config.blockHistoryLength + 1, 0), blockNumber, ethRPC).then((bl) => {
      setBlocks(bl);
    });
  }, [blockNumber]);

  useInterval(
    () => {
      if (!ethRPC) {
        return;
      }
      ethRPC.eth_syncing().then(setSyncing);
    },
    10000,
    true,
  );

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    ethRPC.net_peerCount().then(setPeerCount);
  }, [ethRPC]);

  useEffect(() => {
    if (!ethRPC) {
      return;
    }
    ethRPC.eth_gasPrice().then(setGasPrice);
  }, [ethRPC]);

  if (blocks === undefined || chainId === undefined || gasPrice === undefined || peerCount === undefined) {
    return <CircularProgress />;
  }

  return (
    <div>
      <Grid container spacing={3} direction='column'>
        <Grid item container justifyContent='space-between'>
          <Grid item key='blockHeight'>
            <ChartCard title={t('Block Height')}>
              <Typography variant='h4'>{blockNumber}</Typography>
            </ChartCard>
          </Grid>
          <Grid key='chainId' item>
            <ChartCard title={t('Chain ID')}>
              <Typography variant='h4'>{hexToNumber(chainId)}</Typography>
            </ChartCard>
          </Grid>
          {syncing && (
            <div key='syncing'>
              <ChartCard title={t('Syncing')}>
                {typeof syncing === 'object' && syncing.currentBlock && (
                  <Typography variant='h4'>
                    {hexToNumber(syncing.currentBlock)} / {hexToNumber(syncing.highestBlock || '0x0')}
                  </Typography>
                )}
              </ChartCard>
            </div>
          )}
          <Grid key='gasPrice' item>
            <ChartCard title={t('Gas Price')}>
              <Typography variant='h4'>{weiToGwei(hexToNumber(gasPrice))} Gwei</Typography>
            </ChartCard>
          </Grid>
          <Grid key='hRate' item>
            <ChartCard title={t('Network Hash Rate')}>
              {block && (
                <HashRate block={block} blockTime={config.blockTime}>
                  {(hashRate: any) => <Typography variant='h4'>{hashRate} GH/s</Typography>}
                </HashRate>
              )}
            </ChartCard>
          </Grid>
          <Grid key='peers' item>
            <ChartCard title={t('Peers')}>
              <Typography variant='h4'>{hexToNumber(peerCount)}</Typography>
            </ChartCard>
          </Grid>
        </Grid>
      </Grid>
      <StatCharts victoryTheme={victoryTheme} blocks={blocks} />
      <Grid container justifyContent='flex-end'>
        <Button
          color='primary'
          variant='outlined'
          endIcon={<ArrowForwardIos />}
          onClick={() => history('/stats/miners')}
        >
          More Stats
        </Button>
      </Grid>
      <br />

      <BlockListContainer
        from={Math.max(blockNumber - 14, 0)}
        to={blockNumber}
        disablePrev={true}
        disableNext={blockNumber < 14}
        onNext={() => {
          history(`/blocks/${blockNumber - 15}`);
        }}
        style={{ marginTop: '30px' }}
      />
    </div>
  );
};
