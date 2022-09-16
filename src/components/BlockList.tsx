import React, { forwardRef, ReactNode } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  TableBody,
  Tooltip,
  LinearProgress,
  Link,
} from '@mui/material';
import { hexToNumber, hexToString, hexToDate } from '@helpers';
import { RefLink } from './RefLink';

const rightPaddingFix = {
  paddingRight: '24px',
};

export const BlockList = ({ blocks }: any) => {
  const { t } = useTranslation();
  if (!blocks) {
    return null;
  }
  const sortedBlocks = blocks.sort((a: { number: number }, b: { number: number }) => {
    return b.number - a.number;
  });
  return (
    <div style={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <Typography>{t('Author')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('Block Number')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('Timestamp')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('#Txs')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('Gas Usage')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('Gas Limit')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('Uncles')}</Typography>
            </TableCell>
            <TableCell>
              <Typography>{t('Hash')}</Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBlocks.map((b: any, index: number) => {
            const filledPercent = (hexToNumber(b.gasUsed) / hexToNumber(b.gasLimit)) * 100;

            // Shorten hash views by concatenating first and last 4 chars.
            const blockHashShort =
              b.hash.substring(2, 6) + '—' + b.hash.substring(b.hash.length - 5, b.hash.length - 1);
            const authorHashShort =
              b.miner.substring(2, 6) + '—' + b.miner.substring(b.miner.length - 5, b.miner.length - 1);

            // Colorize left border derived from author credit account.
            const authorHashStyle = {
              borderLeft: `1em solid #${b.miner.substring(2, 8)}`,
            };

            // Tally transactions which create contracts vs transactions with addresses.
            const txTypes = {
              create: 0,
              transact: 0,
            };

            b.transactions.forEach((tx: any) => {
              if (tx.to !== null) {
                txTypes.transact++;
              } else {
                txTypes.create++;
              }
            });

            // Calculate difference of block timestamp from that of parent.
            let tdfp;

            if (index === sortedBlocks.length - 1) {
              tdfp = 0;
            } else {
              tdfp = hexToNumber(b.timestamp) - hexToNumber(sortedBlocks[index + 1].timestamp);
            }

            return (
              <TableRow key={b.number} style={authorHashStyle}>
                <TableCell style={rightPaddingFix}>
                  <Typography>
                    <RefLink to={`/address/${b.miner}`}>{authorHashShort}</RefLink>
                    &nbsp;<sup>{hexToString(b.extraData).substring(0, 20)}</sup>
                  </Typography>
                </TableCell>
                <TableCell component='th' scope='row'>
                  <RefLink to={`/block/${b.hash}`}>{parseInt(b.number, 16)}</RefLink>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Typography>
                    {t('Timestamp Date', { date: hexToDate(b.timestamp) })}
                    &nbsp;
                    <sub>({tdfp > 0 ? `+${tdfp}` : `-${tdfp}`}s)</sub>
                  </Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <Tooltip title={t('Create Transactions', { count: txTypes.create }) as string} placement='top'>
                    <Typography variant='caption' color='textSecondary'>
                      {txTypes.create === 0 ? '' : txTypes.create}
                    </Typography>
                  </Tooltip>
                  <Typography>{txTypes.transact}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <LinearProgress value={filledPercent} variant='determinate' />
                </TableCell>
                <TableCell>
                  <Typography>{hexToNumber(b.gasLimit)}</Typography>
                </TableCell>
                <TableCell>
                  <Typography>{b.uncles.length === 0 ? '' : b.uncles.length}</Typography>
                </TableCell>
                <TableCell style={rightPaddingFix}>
                  <RefLink to={`/block/${b.hash}`}>{blockHashShort}</RefLink>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
