/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { useDarkMode } from 'usehooks-ts';

import { RefLink } from '@components/RefLink';
import {
  AppBar,
  CircularProgress,
  CssBaseline,
  Grid,
  IconButton,
  InputBase,
  ThemeProvider,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';

import { AddChain } from './components/AddChain';
import { ChainDropdown } from './components/ChainDropdown';
import { Address } from './containers/Address';
import { Block } from './containers/Block';
import { BlockRawContainer } from './containers/BlockRawContainer';
import { Dashboard } from './containers/Dashboard';
import { LanguageMenu } from './containers/LanguageMenu';
import { MinerStatsPage } from './containers/MinerStatsPage';
import { NodeView } from './containers/NodeView';
import { TransactionContainer } from './containers/Transaction';
import { TransactionRawContainer } from './containers/TransactionRawContainer';
import expeditionLogo from './expedition.png';
import { useEthereumJsonRpc } from './hooks/useEthereumJsonRpc';
import { useInterval } from './hooks/useInterval';
import { Chain } from './models/chain.model';
import { Brightness3Icon, CodeIcon, NetworkWifi, NoteAddIcon, PlaylistAddIcon, WbSunnyIcon } from './shared/mui-icons';
import { darkTheme, lightTheme } from './themes/jadeTheme';

export const App = () => {
  const navigate  = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const darkMode = useDarkMode();
  const [search, setSearch] = useState();
  const theme = darkMode.isDarkMode ? darkTheme : lightTheme;

  const { ethRPC, chains, selectedChain, changeChain, addChain } = useEthereumJsonRpc();

  const [addChainDialogIsOpen, setAddChainDialogIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if (selectedChain !== undefined) {
      changeChain(selectedChain);
    }
  }, [selectedChain, changeChain]);

  useEffect(() => {
    console.log(ethRPC);
    
    if (ethRPC) {
      ethRPC.startBatch();
    }
  }, [ethRPC]);

  useInterval(
    () => {
      if (ethRPC) {
        ethRPC.stopBatch();
        ethRPC.startBatch();
      }
    },
    100,
    true,
  );

  const isAddress = (q: string): boolean => {
    const re = new RegExp('^0x[a-fA-F\\d]{40}$');
    return re.test(q);
  };

  const isKeccakHash = (q: string): boolean => {
    const re = new RegExp('^0x[a-fA-F\\d]{64}$');
    return re.test(q);
  };

  const isBlockNumber = (q: string): boolean => {
    const re = new RegExp(/^-{0,1}\d+$/);
    return re.test(q);
  };

  const handleSearch = async (qry: string | undefined) => {
    if (qry === undefined) {
      return;
    }
    const q = qry.trim();
    if (isAddress(q)) {
      navigate(`/address/${q}`);
    }
    if (isKeccakHash(q)) {
      let transaction;

      try {
        transaction = await ethRPC.eth_getTransactionByHash(q);
      } catch (e) {
        // do nothing
      }

      if (transaction) {
        navigate(`/tx/${q}`);
      }
      let block;
      try {
        block = await ethRPC.eth_getBlockByHash(q, false);
      } catch (e) {
        // do nothing
      }
      if (block) {
        navigate(`/block/${q}`);
      }
    }
    if (isBlockNumber(q)) {
      const block = await ethRPC.eth_getBlockByNumber(`0x${parseInt(q, 10).toString(16)}`, false);
      if (block) {
        navigate(`/block/${block.hash}`);
      }
    }
  };

  const openAddChainModal = () => {
    setAddChainDialogIsOpen(true);
  };

  const cancelAddChainDialog = () => {
    setAddChainDialogIsOpen(false);
  };

  const submitAddChainDialog = (c: Chain) => {
    setAddChainDialogIsOpen(false);
    addChain(c);
    changeChain(c);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position='sticky' color='default' elevation={0}>
        <Toolbar>
          <Grid justifyContent='space-between' alignItems='center' alignContent='center' container>
            <Grid item style={{ marginTop: '8px' }}>
              <RefLink to={'/'}>
                <Grid container>
                  <Grid>
                    <img alt='expedition-logo' height='30' style={{ marginRight: '10px' }} src={expeditionLogo} />
                  </Grid>
                  <Grid>
                    <Typography color='textSecondary' variant='h6'>
                      {t('Expedition')}
                    </Typography>
                  </Grid>
                </Grid>
              </RefLink>
            </Grid>
            <Grid item md={6} xs={12}>
              <InputBase
                placeholder={t('Enter an Address, Transaction Hash or Block Number')}
                onKeyDown={(event) => {
                  if (event.keyCode === 13) {
                    handleSearch(search);
                  }
                }}
                onChange={(event) => {
                  if (event.target.value) {
                    const { value } = event.target;
                    setSearch(value as any);
                  }
                }}
                fullWidth
                style={{
                  background: 'rgba(0,0,0,0.1)',
                  borderRadius: '4px',
                  padding: '5px 10px 0px 10px',
                  marginRight: '5px',
                }}
              />
            </Grid>
            <Grid item>
              {selectedChain ? (
                <ChainDropdown chains={chains} onChange={changeChain} selected={selectedChain} />
              ) : (
                <>
                  {selectedChain?.rpc && (
                    <Tooltip title={selectedChain?.rpc[0]}>
                      <IconButton>
                        <NetworkWifi />
                      </IconButton>
                    </Tooltip>
                  )}
                  {!selectedChain && <CircularProgress />}
                </>
              )}
              <Tooltip title={t('Add custom chain') as string}>
                <IconButton onClick={openAddChainModal}>
                  <PlaylistAddIcon />
                </IconButton>
              </Tooltip>
              <LanguageMenu />
              <Tooltip title={t('JSON-RPC API Documentation') as string}>
                <IconButton
                  onClick={
                    () =>
                      window.open(
                        'https://playground.open-rpc.org/?schemaUrl=https://raw.githubusercontent.com/etclabscore/ethereum-json-rpc-specification/master/openrpc.json',
                      ) //tslint:disable-line
                  }
                >
                  <NoteAddIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('Expedition Github') as string}>
                <IconButton onClick={() => window.open('https://github.com/xops/expedition')}>
                  <CodeIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title={t('Toggle Dark Mode') as string}>
                <IconButton onClick={darkMode.toggle}>
                  {darkMode.isDarkMode ? <Brightness3Icon /> : <WbSunnyIcon />}
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <AddChain open={addChainDialogIsOpen} onCancel={cancelAddChainDialog} onSubmit={submitAddChainDialog} />
      <div style={{ margin: '0px 25px 0px 25px' }}>
        <CssBaseline />
        <Routes>
          <Route path={'/'} element={<Dashboard />} />
          <Route path={'/stats/miners'} element={<MinerStatsPage />} />
          <Route path={'/stats/miners/:block'} element={<MinerStatsPage />} />
          <Route path={'/block/:hash/raw'} element={<BlockRawContainer />} />
          <Route path={'/block/:hash'} element={<Block />} />
          <Route path={'/blocks/:number'} element={<NodeView />} />
          <Route path={'/tx/:hash/raw'} element={<TransactionRawContainer />} />
          <Route path={'/tx/:hash'} element={<TransactionContainer />} />
          <Route path={'/address/:address/:block'} element={<Address />} />
          <Route path={'/address/:address'} element={<Address />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};
