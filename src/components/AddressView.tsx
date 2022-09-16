import { Card, CardContent, Typography } from '@mui/material';
import React from "react";
import { useTranslation } from "react-i18next";

export interface IAddressViewProps {
  address: string;
  balance: string;
  txCount: number;
  code: string;
}

export const AddressView = (props: IAddressViewProps) => {
  const { address, balance, txCount, code } = props;
  const { t } = useTranslation();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6">{t("Address")}: {address}</Typography>
        <Typography variant="h6">{t("Balance")}: {balance}</Typography>
        <Typography variant="h6">{t("Transactions")}: {txCount}</Typography>
        <br />
        <div>
          <div>{t("Code")}</div>
          <pre>
            <code>{code}</code>
          </pre>
        </div>
      </CardContent>
    </Card>
  );
}

