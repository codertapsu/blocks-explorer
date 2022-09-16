import React, { forwardRef, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { TxList } from './TxList';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

// import { BlockGasPrice } from './BlockGasPrice';
import { hexToDate, hexToNumber, hexToString } from '@helpers';
import { Button, LinearProgress, Link, Table, TableBody, TableCell, TableRow, Typography } from '@mui/material';
import { RefLink } from './RefLink';

export const BlockView = (props: any) => {
  const { block } = props;
  const history = useNavigate();
  const { t } = useTranslation();

  if (!block) {
    return <div>Loading...</div>;
  }

  const {
    timestamp,
    hash,
    parentHash,
    miner,
    nonce,
    difficulty,
    extraData,
    stateRoot,
    transactionsRoot,
    receiptsRoot,
    transactions,
    gasUsed,
    gasLimit,
    size,
  } = block;

  const filledPercent = (hexToNumber(gasUsed) / hexToNumber(gasLimit)) * 100;

  return (
    <div>
      <Button
        onClick={() => {
          history(`/block/${block.hash}/raw`);
        }}
        style={{ position: 'absolute', right: '10px', top: '75px' }}
      >
        View Raw
      </Button>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>{t('Number')}</TableCell>
            <TableCell>{hexToNumber(block.number)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Gas Usage')}</TableCell>
            <TableCell>
              <Typography variant='caption'>
                {hexToNumber(gasUsed)}/{hexToNumber(gasLimit)}
              </Typography>
              <LinearProgress style={{ width: '150px' }} value={filledPercent} variant='determinate' />
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Timestamp')}</TableCell>
            <TableCell>{t('Timestamp Date', { date: hexToDate(timestamp) })}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Hash')}</TableCell>
            <TableCell>{hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('ParentHash')}</TableCell>
            <TableCell>
              <RefLink to={`/block/${parentHash}`}>{parentHash}</RefLink>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Miner')}</TableCell>
            <TableCell>
              <RefLink to={`/address/${miner}`}>{miner}</RefLink>
            </TableCell>
          </TableRow>

          {/* <BlockGasPrice block={block} /> */}

          <TableRow>
            <TableCell>{t('Gas Limit')}</TableCell>
            <TableCell>{hexToNumber(gasLimit)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Size')}</TableCell>
            <TableCell>{hexToNumber(size)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Nonce')}</TableCell>
            <TableCell>{hexToNumber(nonce)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Difficulty')}</TableCell>
            <TableCell>{hexToNumber(difficulty)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Extra Data')}</TableCell>
            <TableCell>{hexToString(extraData)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('State Root')}</TableCell>
            <TableCell>{stateRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Transaction Root')}</TableCell>
            <TableCell>{transactionsRoot}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Receipts Root')}</TableCell>
            <TableCell>{receiptsRoot}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <TxList transactions={transactions} />
    </div>
  );
};
