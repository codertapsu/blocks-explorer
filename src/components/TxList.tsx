import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import { Table, TableBody, TableCell, TableHead, TableRow, Link } from '@mui/material';
import { hexToNumber } from '@helpers';
import { RefLink } from './RefLink';

export const TxListItem = ({ tx, showblockNumber }: { tx: any; showblockNumber?: boolean }) => {
  return (
    <TableRow>
      {showblockNumber && <TableCell>{hexToNumber(tx.blockNumber)}</TableCell>}
      <TableCell>
        <RefLink to={`/tx/${tx.hash}`}>{tx.hash}</RefLink>
      </TableCell>

      <TableCell>
        <RefLink to={`/address/${tx.from}`}>{tx.from}</RefLink>
      </TableCell>

      <TableCell>{tx.to !== null ? <RefLink to={`/address/${tx.to}`}>{tx.to}</RefLink> : null}</TableCell>

      <TableCell>{hexToNumber(tx.transactionIndex)}</TableCell>
    </TableRow>
  );
};

export interface ITxListProps {
  transactions: any[];
  showBlockNumber?: boolean;
}

export const TxList = (props: ITxListProps) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          {props.showBlockNumber && <TableCell>Block Number</TableCell>}
          <TableCell>Hash</TableCell>
          <TableCell>From</TableCell>
          <TableCell>To</TableCell>
          <TableCell>Index</TableCell>
        </TableRow>
      </TableHead>

      <TableBody>
        {props.transactions.map((tx: any) => (
          <TxListItem key={tx.hash} tx={tx} showblockNumber={props.showBlockNumber} />
        ))}
      </TableBody>
    </Table>
  );
};
