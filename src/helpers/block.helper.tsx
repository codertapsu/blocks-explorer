import { useInterval } from '@hooks/useInterval';
import { EthereumJSONRPC } from '@shared/ethereum-json-rpc/ethereum-json-rpc';
import { Block } from '@shared/ethereum-json-rpc/models/utils-types.model';
import { useEffect, useState } from 'react';
import { hexToNumber } from './converters.helper';

export const getBlocks = (from: number, to: number, erpc: EthereumJSONRPC): Promise<Block[]> => {
  const promises: Promise<Block>[] = [];

  for (let i = from; i <= to; i++) {
    promises.push(erpc.eth_getBlockByNumber(`0x${i.toString(16)}`, true));
  }
  return Promise.all(promises);
};

export const useBlockNumber = (erpc: EthereumJSONRPC | undefined): [number] => {
  const [blockNumber, setBlockNumber] = useState<number>(NaN);
  useInterval(
    () => {
      if (!erpc) {
        return;
      }
      erpc.eth_blockNumber().then((bn: string) => {
        setBlockNumber(hexToNumber(bn));
      });
    },
    7000,
    true,
  );
  useEffect(() => {
    if (erpc) {
      erpc.eth_blockNumber().then((bn: string) => {
        setBlockNumber(hexToNumber(bn));
      });
    }
  }, [erpc]);
  return [blockNumber];
};
