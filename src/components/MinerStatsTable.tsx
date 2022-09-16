import React from 'react';
import { Table, TableRow, TableCell, TableHead, TableBody, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import _ from 'lodash';
import { green } from '@mui/material/colors';
import { hexToNumber, hexToString } from '@helpers';

const blockTopMiners = (blocks: any[]) => {
  const result = _(blocks)
    .chain()
    .countBy((b: any) => b.miner)
    .map((key: string, val: number) => ({
      address: val,
      blocksMined: key,
    }))
    .sortBy((item: any) => item.blocksMined)
    .reverse()
    .value();
  return result;
};

const groupByMiner = (blocks: any[]) => {
  const result = _.chain(blocks)
    .groupBy((b: any) => b.miner)
    .map((value, key) => {
      return {
        [key]: _.groupBy(value, (item) => {
          return hexToString(item.extraData);
        }),
      };
    })
    .value();
  return result;
};

interface IProps {
  blocks: any[];
}

export const MinerStatsTable: React.FC<IProps> = ({ blocks }) => {
  const history = useNavigate();
  const topMiners = blockTopMiners(blocks);
  const groupedMiners = Object.assign({}, ...groupByMiner(blocks));
  return (
    <Table aria-label='simple table'>
      <TableHead>
        <TableRow>
          <TableCell>Blocks Mined</TableCell>
          <TableCell>Address</TableCell>
          <TableCell>ExtraData</TableCell>
          <TableCell>Blocks</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {topMiners.map((minerData: any, index) => (
          <TableRow key={index}>
            <TableCell component='th' scope='row'>
              {minerData.blocksMined}
            </TableCell>
            <TableCell>{minerData.address}</TableCell>
            <TableCell colSpan={2}>
              <Table>
                <TableBody>
                  {_.map(groupedMiners[minerData.address], (bs: any[], key: string) => (
                    <TableRow>
                      <TableCell>{key}</TableCell>
                      <TableCell colSpan={1}>
                        {bs.map((block, i) => {
                          const percentFull = (hexToNumber(block.gasUsed) / hexToNumber(block.gasLimit)) * 100;
                          return (
                            <Button
                              key={i}
                              variant='outlined'
                              style={{
                                margin: '3px',
                                background: `linear-gradient(to right, ${green[600]} 0% ${percentFull}%, transparent ${percentFull}% 100%)`,
                              }}
                              onClick={() => history(`/block/${block.hash}`)}
                            >
                              <Typography>{hexToNumber(block.number)}</Typography>
                            </Button>
                          );
                        })}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
