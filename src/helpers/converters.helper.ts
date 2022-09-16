export const hexToNumber = (hex: string): number => parseInt(hex, 16);
export const hexToString = (hex: string): string => Buffer.from(hex.substring(2), 'hex').toString();
export const hexToBigInt = (hex: string): bigint => BigInt(hex);
export const hexToDate = (hexTimestamp: string): Date => new Date(parseInt(hexTimestamp, 16) * 1000);
