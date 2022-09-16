
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';
import { Grid, IconButton, Typography } from '@mui/material';
import React from "react";

interface IProps {
  from: number;
  to: number;
  disableNext?: boolean;
  disablePrev?: boolean;
  onNext?: () => void;
  onPrev?: () => void;
  style?: any;
}

export const BlockPagination: React.FC<IProps> = (props) => {

  return (
    <Grid container>
      <Grid container justifyContent="flex-end">
        <IconButton onClick={props.onPrev} disabled={props.disablePrev}>
          <ArrowBackIos />
        </IconButton>
        <IconButton onClick={props.onNext} disabled={props.disableNext}>
          <ArrowForwardIos />
        </IconButton>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Typography>Showing {(props.to - props.from) + 1} Block Range: <b>{props.to}</b> - {props.from}</Typography>
      </Grid>
    </Grid>
  );
};
