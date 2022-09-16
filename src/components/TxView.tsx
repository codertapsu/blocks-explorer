import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Table, TableBody, TableCell, TableRow, Typography, Button, Link } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { hexToNumber } from '@helpers';
import { utils } from 'ethers';
import { RefLink } from './RefLink';

export interface ITxViewProps {
  tx: any;
  receipt: any | null;
}

export const TxView = (props: ITxViewProps) => {
  const { tx, receipt } = props;
  const { t } = useTranslation();
  const history = useNavigate();
  if (!tx) {
    return null;
  }

  return (
    <div>
      <Button
        onClick={() => {
          history(`/tx/${tx.hash}/raw`);
        }}
        style={{ position: 'absolute', right: '10px', top: '75px' }}
      >
        View Raw
      </Button>
      <Typography variant='h6'>Transaction</Typography>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>{t('Hash')}</TableCell>
            <TableCell>{tx.hash}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Block')}</TableCell>
            <TableCell>
              <RefLink to={`/block/${tx.blockHash}`}>{tx.blockHash}</RefLink>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Block Number')}</TableCell>
            <TableCell>{hexToNumber(tx.blockNumber)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Gas')}</TableCell>
            <TableCell>{hexToNumber(tx.gas)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Gas Price')}</TableCell>
            <TableCell>{hexToNumber(tx.gasPrice)} Wei</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Value')}</TableCell>
            <TableCell>{utils.formatEther(tx.value)} Ether</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('From')}</TableCell>
            <TableCell>
              <RefLink to={`/address/${tx.from}`}>{tx.from}</RefLink>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('To')}</TableCell>
            <TableCell>{tx.to !== null ? <RefLink to={`/address/${tx.to}`}>{tx.to}</RefLink> : null}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Nonce')}</TableCell>
            <TableCell>{hexToNumber(tx.nonce)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Transaction Index')}</TableCell>
            <TableCell>{hexToNumber(tx.transactionIndex)}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>{t('Input')}</TableCell>
            <TableCell>{tx.input}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>v</TableCell>
            <TableCell>{tx.v}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>r</TableCell>
            <TableCell>{tx.r}</TableCell>
          </TableRow>

          <TableRow>
            <TableCell>s</TableCell>
            <TableCell>{tx.s}</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <br />
      <Typography variant='h6'>Receipt</Typography>
      {receipt && (
        <Table>
          <TableBody>
            <TableRow>
              <TableCell>{t('Hash')}</TableCell>
              <TableCell>{receipt.transactionHash}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Block')}</TableCell>
              <TableCell>
                <RefLink to={`/block/${receipt.blockHash}`}>{receipt.blockHash}</RefLink>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Block Number')}</TableCell>
              <TableCell>{hexToNumber(receipt.blockNumber)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Gas Used')}</TableCell>
              <TableCell>{hexToNumber(receipt.gasUsed)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Cumulative Gas Used')}</TableCell>
              <TableCell>{hexToNumber(receipt.cumulativeGasUsed)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Value')}</TableCell>
              <TableCell>{utils.formatEther(tx.value)} Ether</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('From')}</TableCell>
              <TableCell>
                <RefLink to={`/address/${receipt.from}`}>{receipt.from}</RefLink>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('To')}</TableCell>
              <TableCell>
                <RefLink to={`/address/${receipt.to}`}>{receipt.to}</RefLink>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Contract Address')}</TableCell>
              <TableCell>
                <RefLink to={`/address/${receipt.contractAddress}`}>{receipt.contractAddress}</RefLink>
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Transaction Index')}</TableCell>
              <TableCell>{hexToNumber(receipt.transactionIndex)}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Receipt Status')}</TableCell>
              <TableCell>{receipt.status}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>{t('Receipt Logs')}</TableCell>
              <TableCell>{receipt.logs.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}
    </div>
  );
};
