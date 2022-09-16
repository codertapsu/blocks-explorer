import { Card, CardContent, Typography } from '@mui/material';
import React from "react";

interface IProps {
  children: any;
  title: string;
}

export const ChartCard: React.FC<IProps> = (props) => {
  return (
    <Card style={{background: "transparent"}} elevation={0}>
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        {props.children}
      </CardContent>
    </Card>
  );
};
