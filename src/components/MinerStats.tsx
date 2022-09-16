import React, { useState } from "react";
import {ChartCard} from "./ChartCard";
import {CustomPieChartLabel} from "./CustomPieChartLabel";
import { useTranslation } from "react-i18next";
import _ from "lodash";
import { hexToString } from '@helpers';
import { Grid } from '@mui/material';
import { VictoryPie } from 'victory';

const blockTopMinerCount = (blocks: any[]) => {
  const result = _(blocks).chain()
    .countBy((b: any) => hexToString(b.extraData))
    .map((key: string, val: number) => ({
      x: val,
      y: key,
      label: val,
    }))
    .sortBy((item: any) => item.y)
    .reverse()
    .value();
  return result;
};

const blockTopMinerCountByAddress = (blocks: any[]) => {
  const result = _(blocks).chain()
    .countBy((b: any) => b.miner)
    .map((key: string, val: number) => ({
      x: val,
      y: key,
      label: val,
    }))
    .sortBy((item: any) => item.y)
    .reverse()
    .value();
  return result;
};

interface IProps {
  blocks: any[];
  config: any;
}

const config = {
  blockTime: 15, // seconds
  blockHistoryLength: 100,
  chartHeight: 200,
  chartWidth: 400,
};

export const MinerStats: React.FC<IProps> = ({blocks}) => {
  const [showDefaultPieHover, setShowDefaultPieHover] = useState(true);
  const { t } = useTranslation();

  return (
    <Grid container justifyContent="space-evenly">
      <Grid key="uncles" item xs={12} md={4} lg={4}>
        <ChartCard title={t("Miners by address")}>
          <VictoryPie
            cornerRadius={1}
            // innerRadius={50}
            colorScale="cool"
            data={blockTopMinerCountByAddress(blocks)}
            events={[{
              target: "data",
              eventHandlers: {
                onMouseOver: () => {
                  return [{
                    target: "labels",
                    mutation: () => {
                      setShowDefaultPieHover(false);
                      return { active: true };
                    },
                  }];
                },
              },
            }]}
            labelComponent={<CustomPieChartLabel {...{
              defaultActive: showDefaultPieHover ? blockTopMinerCountByAddress(blocks)[0] : undefined,
            }} />}
          >
          </VictoryPie>
        </ChartCard>
      </Grid>
      <Grid key="uncles" item xs={12} md={3} lg={3}>
        <ChartCard title={t("Miners by extraData", { count: config.blockHistoryLength })}>
          <VictoryPie
            colorScale="cool"
            labelComponent={<CustomPieChartLabel />}
            data={blockTopMinerCount(blocks)}
          />
        </ChartCard>
      </Grid>
    </Grid>
  );
};
