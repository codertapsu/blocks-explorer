import React from 'react';
import { useTranslation } from 'react-i18next';

import { hexToDate, hexToNumber, hexToString } from '@helpers';
import { Card, CardContent, CardHeader, Chip, Typography } from '@mui/material';

import { RefLink } from './RefLink';

export const BlockCard = (props: any) => {
  const { block } = props;
  const { t } = useTranslation();

  if (!block) {
    return null;
  }

  return (
    <RefLink to={`/block/${block.hash}`}>
      <Card elevation={1}>
        <CardHeader title={hexToNumber(block.number!)}></CardHeader>
        <CardContent>
          <Typography variant='caption' style={{ fontSize: '11px' }}>
            {block.hash}
          </Typography>
          <Typography gutterBottom>{t('Timestamp Date', { date: hexToDate(block.timestamp!) })}</Typography>
          <Typography gutterBottom>{hexToString(block.extraData!)}</Typography>
          <Chip label={`${block.transactions!.length} Transactions`} />
        </CardContent>
      </Card>
    </RefLink>
  );
};
