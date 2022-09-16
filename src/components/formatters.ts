import { BigNumber } from 'ethers';

export const hashesToGH = (hashes: BigNumber) => {
  return parseInt((hashes.div(1000000000).toNumber()).toFixed(2), 10);
}

export const weiToGwei = (wei: any) => {
  if (wei === 0) {
    return wei;
  }

  return wei / 1000000000;
}
