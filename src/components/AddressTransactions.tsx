import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import { Transaction } from '@shared/ethereum-json-rpc/models/utils-types.model';
import React from "react";
import { useTranslation } from "react-i18next";
import {TxList} from "./TxList";

export interface IProps {
  transactions: Transaction[];
  from: number;
  to: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  style?: any;
}

export const AddressTransactions: React.FC<IProps> = (props) => {
  const { t } = useTranslation();
  return (
    <div style={props.style}>
      <Grid container justifyContent="flex-end">
        <IconButton onClick={props.onPrev} disabled={props.disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={props.onNext} disabled={props.disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Typography>Showing block range: {props.to} - {props.from}</Typography>
      </Grid>
      <TxList transactions={props.transactions || []} showBlockNumber={true}></TxList>
      {(!props.transactions || props.transactions.length === 0) &&
        <Grid container style={{ padding: "15px" }}>
          <Typography>{t("No Transactions for this block range.")}</Typography>
        </Grid>
      }
    </div>
  );
};
