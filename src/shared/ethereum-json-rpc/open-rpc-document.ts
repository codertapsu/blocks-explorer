import { OpenrpcDocument } from '@open-rpc/meta-schema';

/**
 * @doc https://raw.githubusercontent.com/etclabscore/ethereum-json-rpc-specification/master/openrpc.json
 */
export const OpenRPCDocument: OpenrpcDocument = {
  openrpc: '1.0.0',
  info: {
    version: '1.3.13',
    title: 'Ethereum JSON-RPC',
    description: 'This API lets you interact with an EVM-based client via JSON-RPC',
    license: {
      name: 'Apache 2.0',
      url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  methods: [
    {
      name: 'web3_clientVersion',
      description: 'Returns the version of the current client',
      summary: 'current client version',
      params: [],
      result: {
        name: 'clientVersion',
        description: 'client version',
        schema: {
          title: 'clientVersion',
          type: 'string',
        },
      },
    },
    {
      name: 'web3_sha3',
      summary: 'Hashes data',
      description: 'Hashes data using the Keccak-256 algorithm',
      params: [
        {
          name: 'data',
          description: 'data to hash using the Keccak-256 algorithm',
          summary: 'data to hash',
          schema: {
            title: 'data',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]+$',
          },
        },
      ],
      result: {
        name: 'hashedData',
        description: 'Keccak-256 hash of the given data',
        schema: {
          title: 'keccak',
          type: 'string',
          description: 'Hex representation of a Keccak 256 hash',
          pattern: '^0x[a-fA-F\\d]{64}$',
        },
      },
      examples: [
        {
          name: 'sha3Example',
          params: [
            {
              name: 'sha3ParamExample',
              value: '0x68656c6c6f20776f726c64',
            },
          ],
          result: {
            name: 'sha3ResultExample',
            value: '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad',
          },
        },
      ],
    },
    {
      name: 'net_listening',
      summary: 'returns listening status',
      description: 'Determines if this client is listening for new network connections.',
      params: [],
      result: {
        name: 'netListeningResult',
        description: '`true` if listening is active or `false` if listening is not active',
        schema: {
          title: 'isNetListening',
          type: 'boolean',
        },
      },
      examples: [
        {
          name: 'netListeningTrueExample',
          description: 'example of true result for net_listening',
          params: [],
          result: {
            name: 'netListeningExampleFalseResult',
            value: true,
          },
        },
      ],
    },
    {
      name: 'net_peerCount',
      summary: 'number of peers',
      description: 'Returns the number of peers currently connected to this client.',
      params: [],
      result: {
        name: 'quantity',
        description: 'number of connected peers.',
        schema: {
          title: 'numConnectedPeers',
          description: 'Hex representation of number of connected peers',
          type: 'string',
        },
      },
    },
    {
      name: 'net_version',
      summary: 'Network identifier associated with network',
      description: 'Returns the network ID associated with the current network.',
      params: [],
      result: {
        name: 'networkId',
        description: 'Network ID associated with the current network',
        schema: {
          title: 'networkId',
          type: 'string',
          pattern: '^[\\d]+$',
        },
      },
    },
    {
      name: 'eth_blockNumber',
      summary: 'Returns the number of most recent block.',
      params: [],
      result: {
        name: 'blockNumber',
        required: true,
        schema: {
          title: 'blockNumberOrTag',
          oneOf: [
            {
              title: 'blockNumber',
              type: 'string',
              description: "The hex representation of the block's height",
              pattern: '^0x[a-fA-F0-9]+$',
            },
            {
              title: 'blockNumberTag',
              type: 'string',
              description: 'The optional block height description',
              enum: ['earliest', 'latest', 'pending'],
            },
          ],
        },
      },
    },
    {
      name: 'eth_call',
      summary: 'Executes a new message call (locally) immediately without creating a transaction on the block chain.',
      params: [
        {
          required: true,
          name: 'transaction',
          schema: {
            title: 'transaction',
            type: 'object',
            required: ['gas', 'gasPrice', 'nonce'],
            properties: {
              blockHash: {
                title: 'blockHashOrNull',
                description: 'The block hash or null when its the pending block',
                oneOf: [
                  {
                    title: 'keccak',
                    type: 'string',
                    description: 'Hex representation of a Keccak 256 hash',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              blockNumber: {
                title: 'blockNumberOrNull',
                description: 'The block number or null when its the pending block',
                oneOf: [
                  {
                    title: 'blockNumber',
                    type: 'string',
                    description: "The hex representation of the block's height",
                    pattern: '^0x[a-fA-F0-9]+$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              from: {
                title: 'From',
                description: 'The sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              gas: {
                title: 'transactionGas',
                type: 'string',
                description: 'The gas limit provided by the sender in Wei',
              },
              gasPrice: {
                title: 'transactionGasPrice',
                type: 'string',
                description: 'The gas price willing to be paid by the sender in Wei',
              },
              hash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              input: {
                title: 'transactionInput',
                type: 'string',
                description: 'The data field sent with the transaction',
              },
              nonce: {
                title: 'transactionNonce',
                description: 'The total number of prior transactions made by the sender',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              to: {
                title: 'To',
                description: 'Destination address of the transaction. Null if it was a contract create.',
                oneOf: [
                  {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              value: {
                title: 'transactionValue',
                description: 'Value of Ether being transferred in Wei',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              v: {
                title: 'transactionSigV',
                type: 'string',
                description: 'ECDSA recovery id',
              },
              r: {
                title: 'transactionSigR',
                type: 'string',
                description: 'ECDSA signature r',
              },
              s: {
                title: 'transactionSigS',
                type: 'string',
                description: 'ECDSA signature s',
              },
            },
          },
        },
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
      ],
      result: {
        name: 'returnValue',
        description: 'The return value of the executed contract',
        schema: {
          title: 'bytes',
          type: 'string',
          description: 'Hex representation of a variable length byte array',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
    },
    {
      name: 'eth_chainId',
      summary: 'Returns the currently configured chain id',
      description:
        'Returns the currently configured chain id, a value used in replay-protected transaction signing as introduced by [EIP-155](https://github.com/ethereum/EIPs/blob/master/EIPS/eip-155.md).',
      params: [],
      result: {
        name: 'chainId',
        description: 'hex format integer of the current chain id. Defaults are ETC=61, ETH=1, Morden=62.',
        schema: {
          title: 'chainId',
          type: 'string',
          pattern: '^0x[a-fA-F\\d]+$',
        },
      },
    },
    {
      name: 'eth_coinbase',
      summary: 'Returns the client coinbase address.',
      params: [],
      result: {
        name: 'address',
        description: 'The address owned by the client that is used as default for things like the mining reward',
        schema: {
          title: 'address',
          type: 'string',
          pattern: '^0x[a-fA-F\\d]{40}$',
        },
      },
    },
    {
      name: 'eth_estimateGas',
      summary:
        'Generates and returns an estimate of how much gas is necessary to allow the transaction to complete. The transaction will not be added to the blockchain. Note that the estimate may be significantly more than the amount of gas actually used by the transaction, for a variety of reasons including EVM mechanics and node performance.',
      params: [
        {
          required: true,
          name: 'transaction',
          schema: {
            title: 'transaction',
            type: 'object',
            required: ['gas', 'gasPrice', 'nonce'],
            properties: {
              blockHash: {
                title: 'blockHashOrNull',
                description: 'The block hash or null when its the pending block',
                oneOf: [
                  {
                    title: 'keccak',
                    type: 'string',
                    description: 'Hex representation of a Keccak 256 hash',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              blockNumber: {
                title: 'blockNumberOrNull',
                description: 'The block number or null when its the pending block',
                oneOf: [
                  {
                    title: 'blockNumber',
                    type: 'string',
                    description: "The hex representation of the block's height",
                    pattern: '^0x[a-fA-F0-9]+$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              from: {
                title: 'From',
                description: 'The sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              gas: {
                title: 'transactionGas',
                type: 'string',
                description: 'The gas limit provided by the sender in Wei',
              },
              gasPrice: {
                title: 'transactionGasPrice',
                type: 'string',
                description: 'The gas price willing to be paid by the sender in Wei',
              },
              hash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              input: {
                title: 'transactionInput',
                type: 'string',
                description: 'The data field sent with the transaction',
              },
              nonce: {
                title: 'transactionNonce',
                description: 'The total number of prior transactions made by the sender',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              to: {
                title: 'To',
                description: 'Destination address of the transaction. Null if it was a contract create.',
                oneOf: [
                  {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              value: {
                title: 'transactionValue',
                description: 'Value of Ether being transferred in Wei',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              v: {
                title: 'transactionSigV',
                type: 'string',
                description: 'ECDSA recovery id',
              },
              r: {
                title: 'transactionSigR',
                type: 'string',
                description: 'ECDSA signature r',
              },
              s: {
                title: 'transactionSigS',
                type: 'string',
                description: 'ECDSA signature s',
              },
            },
          },
        },
      ],
      result: {
        name: 'gasUsed',
        description: 'The amount of gas used',
        schema: {
          title: 'integer',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
          description: 'Hex representation of the integer',
        },
      },
    },
    {
      name: 'eth_gasPrice',
      summary: 'Returns the current price per gas in wei',
      params: [],
      result: {
        name: 'gasPrice',
        required: true,
        schema: {
          title: 'gasPriceResult',
          description: 'Integer of the current gas price',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
        },
      },
    },
    {
      name: 'eth_getBalance',
      summary: 'Returns Ether balance of a given or account or contract',
      params: [
        {
          name: 'address',
          required: true,
          description: 'The address of the account or contract',
          schema: {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
        },
        {
          name: 'blockNumber',
          description: 'A BlockNumber at which to request the balance',
          schema: {
            title: 'blockNumber',
            type: 'string',
            description: "The hex representation of the block's height",
            pattern: '^0x[a-fA-F0-9]+$',
          },
        },
      ],
      result: {
        name: 'getBalanceResult',
        schema: {
          title: 'integerOrNull',
          oneOf: [
            {
              title: 'integer',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
              description: 'Hex representation of the integer',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getBlockByHash',
      summary: 'Gets a block for a given hash',
      params: [
        {
          name: 'blockHash',
          required: true,
          schema: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
        },
        {
          name: 'includeTransactions',
          description:
            'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.',
          required: true,
          schema: {
            title: 'isTransactionsIncluded',
            type: 'boolean',
          },
        },
      ],
      result: {
        name: 'getBlockByHashResult',
        schema: {
          title: 'blockOrNull',
          oneOf: [
            {
              title: 'Block',
              description:
                'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
              type: 'object',
              properties: {
                number: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                hash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                parentHash: {
                  title: 'blockHash',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                  description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                },
                nonce: {
                  title: 'nonceOrNull',
                  description:
                    'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
                  oneOf: [
                    {
                      title: 'nonce',
                      description: 'A number only to be used once',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                sha3Uncles: {
                  title: 'blockShaUncles',
                  description: 'Keccak hash of the uncles data in the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                logsBloom: {
                  title: 'blockLogsBloom',
                  type: 'string',
                  description: 'The bloom filter for the logs of the block or null when its the pending block',
                  pattern: '^0x[a-fA-F\\d]+$',
                },
                transactionsRoot: {
                  title: 'blockTransactionsRoot',
                  description: 'The root of the transactions trie of the block.',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                stateRoot: {
                  title: 'blockStateRoot',
                  description: 'The root of the final state trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                receiptsRoot: {
                  title: 'blockReceiptsRoot',
                  description: 'The root of the receipts trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                miner: {
                  title: 'addressOrNull',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                difficulty: {
                  title: 'blockDifficulty',
                  type: 'string',
                  description: 'Integer of the difficulty for this block',
                },
                totalDifficulty: {
                  title: 'blockTotalDifficulty',
                  description: 'Integer of the total difficulty of the chain until this block',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                extraData: {
                  title: 'blockExtraData',
                  type: 'string',
                  description: "The 'extra data' field of this block",
                },
                size: {
                  title: 'blockSize',
                  type: 'string',
                  description: 'Integer the size of this block in bytes',
                },
                gasLimit: {
                  title: 'blockGasLimit',
                  type: 'string',
                  description: 'The maximum gas allowed in this block',
                },
                gasUsed: {
                  title: 'blockGasUsed',
                  type: 'string',
                  description: 'The total used gas by all transactions in this block',
                },
                timestamp: {
                  title: 'blockTimeStamp',
                  type: 'string',
                  description: 'The unix timestamp for when the block was collated',
                },
                transactions: {
                  title: 'transactionsOrHashes',
                  description:
                    'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
                  type: 'array',
                  items: {
                    title: 'transactionOrTransactionHash',
                    oneOf: [
                      {
                        title: 'transaction',
                        type: 'object',
                        required: ['gas', 'gasPrice', 'nonce'],
                        properties: {
                          blockHash: {
                            title: 'blockHashOrNull',
                            description: 'The block hash or null when its the pending block',
                            oneOf: [
                              {
                                title: 'keccak',
                                type: 'string',
                                description: 'Hex representation of a Keccak 256 hash',
                                pattern: '^0x[a-fA-F\\d]{64}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          blockNumber: {
                            title: 'blockNumberOrNull',
                            description: 'The block number or null when its the pending block',
                            oneOf: [
                              {
                                title: 'blockNumber',
                                type: 'string',
                                description: "The hex representation of the block's height",
                                pattern: '^0x[a-fA-F0-9]+$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          from: {
                            title: 'From',
                            description: 'The sender of the transaction',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{40}$',
                          },
                          gas: {
                            title: 'transactionGas',
                            type: 'string',
                            description: 'The gas limit provided by the sender in Wei',
                          },
                          gasPrice: {
                            title: 'transactionGasPrice',
                            type: 'string',
                            description: 'The gas price willing to be paid by the sender in Wei',
                          },
                          hash: {
                            title: 'transactionHash',
                            type: 'string',
                            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          input: {
                            title: 'transactionInput',
                            type: 'string',
                            description: 'The data field sent with the transaction',
                          },
                          nonce: {
                            title: 'transactionNonce',
                            description: 'The total number of prior transactions made by the sender',
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]+$',
                          },
                          to: {
                            title: 'To',
                            description: 'Destination address of the transaction. Null if it was a contract create.',
                            oneOf: [
                              {
                                title: 'address',
                                type: 'string',
                                pattern: '^0x[a-fA-F\\d]{40}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          transactionIndex: {
                            title: 'transactionIndex',
                            description: 'The index of the transaction. null when its pending',
                            oneOf: [
                              {
                                title: 'integer',
                                type: 'string',
                                pattern: '^0x[a-fA-F0-9]+$',
                                description: 'Hex representation of the integer',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          value: {
                            title: 'transactionValue',
                            description: 'Value of Ether being transferred in Wei',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          v: {
                            title: 'transactionSigV',
                            type: 'string',
                            description: 'ECDSA recovery id',
                          },
                          r: {
                            title: 'transactionSigR',
                            type: 'string',
                            description: 'ECDSA signature r',
                          },
                          s: {
                            title: 'transactionSigS',
                            type: 'string',
                            description: 'ECDSA signature s',
                          },
                        },
                      },
                      {
                        title: 'transactionHash',
                        type: 'string',
                        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                    ],
                  },
                },
                uncles: {
                  title: 'uncleHashes',
                  description: 'Array of uncle hashes',
                  type: 'array',
                  items: {
                    title: 'uncleHash',
                    description: 'Block hash of the RLP encoding of an uncle block',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getBlockByNumber',
      summary: 'Gets a block for a given number',
      params: [
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
        {
          name: 'includeTransactions',
          description:
            'If `true` it returns the full transaction objects, if `false` only the hashes of the transactions.',
          required: true,
          schema: {
            title: 'isTransactionsIncluded',
            type: 'boolean',
          },
        },
      ],
      result: {
        name: 'getBlockByNumberResult',
        schema: {
          title: 'blockOrNull',
          oneOf: [
            {
              title: 'Block',
              description:
                'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
              type: 'object',
              properties: {
                number: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                hash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                parentHash: {
                  title: 'blockHash',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                  description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                },
                nonce: {
                  title: 'nonceOrNull',
                  description:
                    'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
                  oneOf: [
                    {
                      title: 'nonce',
                      description: 'A number only to be used once',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                sha3Uncles: {
                  title: 'blockShaUncles',
                  description: 'Keccak hash of the uncles data in the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                logsBloom: {
                  title: 'blockLogsBloom',
                  type: 'string',
                  description: 'The bloom filter for the logs of the block or null when its the pending block',
                  pattern: '^0x[a-fA-F\\d]+$',
                },
                transactionsRoot: {
                  title: 'blockTransactionsRoot',
                  description: 'The root of the transactions trie of the block.',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                stateRoot: {
                  title: 'blockStateRoot',
                  description: 'The root of the final state trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                receiptsRoot: {
                  title: 'blockReceiptsRoot',
                  description: 'The root of the receipts trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                miner: {
                  title: 'addressOrNull',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                difficulty: {
                  title: 'blockDifficulty',
                  type: 'string',
                  description: 'Integer of the difficulty for this block',
                },
                totalDifficulty: {
                  title: 'blockTotalDifficulty',
                  description: 'Integer of the total difficulty of the chain until this block',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                extraData: {
                  title: 'blockExtraData',
                  type: 'string',
                  description: "The 'extra data' field of this block",
                },
                size: {
                  title: 'blockSize',
                  type: 'string',
                  description: 'Integer the size of this block in bytes',
                },
                gasLimit: {
                  title: 'blockGasLimit',
                  type: 'string',
                  description: 'The maximum gas allowed in this block',
                },
                gasUsed: {
                  title: 'blockGasUsed',
                  type: 'string',
                  description: 'The total used gas by all transactions in this block',
                },
                timestamp: {
                  title: 'blockTimeStamp',
                  type: 'string',
                  description: 'The unix timestamp for when the block was collated',
                },
                transactions: {
                  title: 'transactionsOrHashes',
                  description:
                    'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
                  type: 'array',
                  items: {
                    title: 'transactionOrTransactionHash',
                    oneOf: [
                      {
                        title: 'transaction',
                        type: 'object',
                        required: ['gas', 'gasPrice', 'nonce'],
                        properties: {
                          blockHash: {
                            title: 'blockHashOrNull',
                            description: 'The block hash or null when its the pending block',
                            oneOf: [
                              {
                                title: 'keccak',
                                type: 'string',
                                description: 'Hex representation of a Keccak 256 hash',
                                pattern: '^0x[a-fA-F\\d]{64}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          blockNumber: {
                            title: 'blockNumberOrNull',
                            description: 'The block number or null when its the pending block',
                            oneOf: [
                              {
                                title: 'blockNumber',
                                type: 'string',
                                description: "The hex representation of the block's height",
                                pattern: '^0x[a-fA-F0-9]+$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          from: {
                            title: 'From',
                            description: 'The sender of the transaction',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{40}$',
                          },
                          gas: {
                            title: 'transactionGas',
                            type: 'string',
                            description: 'The gas limit provided by the sender in Wei',
                          },
                          gasPrice: {
                            title: 'transactionGasPrice',
                            type: 'string',
                            description: 'The gas price willing to be paid by the sender in Wei',
                          },
                          hash: {
                            title: 'transactionHash',
                            type: 'string',
                            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          input: {
                            title: 'transactionInput',
                            type: 'string',
                            description: 'The data field sent with the transaction',
                          },
                          nonce: {
                            title: 'transactionNonce',
                            description: 'The total number of prior transactions made by the sender',
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]+$',
                          },
                          to: {
                            title: 'To',
                            description: 'Destination address of the transaction. Null if it was a contract create.',
                            oneOf: [
                              {
                                title: 'address',
                                type: 'string',
                                pattern: '^0x[a-fA-F\\d]{40}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          transactionIndex: {
                            title: 'transactionIndex',
                            description: 'The index of the transaction. null when its pending',
                            oneOf: [
                              {
                                title: 'integer',
                                type: 'string',
                                pattern: '^0x[a-fA-F0-9]+$',
                                description: 'Hex representation of the integer',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          value: {
                            title: 'transactionValue',
                            description: 'Value of Ether being transferred in Wei',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          v: {
                            title: 'transactionSigV',
                            type: 'string',
                            description: 'ECDSA recovery id',
                          },
                          r: {
                            title: 'transactionSigR',
                            type: 'string',
                            description: 'ECDSA signature r',
                          },
                          s: {
                            title: 'transactionSigS',
                            type: 'string',
                            description: 'ECDSA signature s',
                          },
                        },
                      },
                      {
                        title: 'transactionHash',
                        type: 'string',
                        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                    ],
                  },
                },
                uncles: {
                  title: 'uncleHashes',
                  description: 'Array of uncle hashes',
                  type: 'array',
                  items: {
                    title: 'uncleHash',
                    description: 'Block hash of the RLP encoding of an uncle block',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getBlockTransactionCountByHash',
      summary: 'Returns the number of transactions in a block from a block matching the given block hash.',
      params: [
        {
          name: 'blockHash',
          required: true,
          schema: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
        },
      ],
      result: {
        name: 'blockTransactionCountByHash',
        description: 'The Number of total transactions in the given block',
        schema: {
          title: 'integerOrNull',
          oneOf: [
            {
              title: 'integer',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
              description: 'Hex representation of the integer',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getBlockTransactionCountByNumber',
      summary: 'Returns the number of transactions in a block from a block matching the given block number.',
      params: [
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
      ],
      result: {
        name: 'blockTransactionCountByHash',
        description: 'The Number of total transactions in the given block',
        schema: {
          title: 'integerOrNull',
          oneOf: [
            {
              title: 'integer',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
              description: 'Hex representation of the integer',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getCode',
      summary: 'Returns code at a given contract address',
      params: [
        {
          name: 'address',
          required: true,
          description: 'The address of the contract',
          schema: {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
        },
        {
          name: 'blockNumber',
          description: 'A BlockNumber of which the code existed',
          schema: {
            title: 'blockNumber',
            type: 'string',
            description: "The hex representation of the block's height",
            pattern: '^0x[a-fA-F0-9]+$',
          },
        },
      ],
      result: {
        name: 'bytes',
        schema: {
          title: 'bytes',
          type: 'string',
          description: 'Hex representation of a variable length byte array',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
    },
    {
      name: 'eth_getFilterChanges',
      summary: 'Polling method for a filter, which returns an array of logs which occurred since last poll.',
      params: [
        {
          name: 'filterId',
          required: true,
          schema: {
            title: 'filterId',
            type: 'string',
            description: 'An identifier used to reference the filter.',
          },
        },
      ],
      result: {
        name: 'logResult',
        schema: {
          title: 'logResult',
          type: 'array',
          items: {
            title: 'log',
            type: 'object',
            description: 'An indexed event generated during a transaction',
            properties: {
              address: {
                title: 'LogAddress',
                description: 'Sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              blockHash: {
                title: 'blockHash',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
                description: 'The hex representation of the Keccak 256 of the RLP encoded block',
              },
              blockNumber: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              data: {
                title: 'LogData',
                description: 'The data/input string sent along with the transaction',
                type: 'string',
                pattern: '^0x([a-fA-F0-9]?)+$',
              },
              logIndex: {
                title: 'LogIndex',
                description: 'The index of the event within its transaction, null when its pending',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              removed: {
                title: 'logIsRemoved',
                description: 'Whether or not the log was orphaned off the main chain',
                type: 'boolean',
              },
              topics: {
                title: 'LogTopics',
                description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                type: 'array',
                items: {
                  title: 'topic',
                  description:
                    '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                  type: 'string',
                  pattern: '^0x([a-fA-F\\d]{64})?$',
                },
              },
              transactionHash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      name: 'eth_getFilterLogs',
      summary: 'Returns an array of all logs matching filter with given id.',
      params: [
        {
          name: 'filterId',
          required: true,
          schema: {
            title: 'filterId',
            type: 'string',
            description: 'An identifier used to reference the filter.',
          },
        },
      ],
      result: {
        name: 'logs',
        description: 'An array of all logs matching filter with given id.',
        schema: {
          title: 'setOfLogs',
          type: 'array',
          items: {
            title: 'log',
            type: 'object',
            description: 'An indexed event generated during a transaction',
            properties: {
              address: {
                title: 'LogAddress',
                description: 'Sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              blockHash: {
                title: 'blockHash',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
                description: 'The hex representation of the Keccak 256 of the RLP encoded block',
              },
              blockNumber: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              data: {
                title: 'LogData',
                description: 'The data/input string sent along with the transaction',
                type: 'string',
                pattern: '^0x([a-fA-F0-9]?)+$',
              },
              logIndex: {
                title: 'LogIndex',
                description: 'The index of the event within its transaction, null when its pending',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              removed: {
                title: 'logIsRemoved',
                description: 'Whether or not the log was orphaned off the main chain',
                type: 'boolean',
              },
              topics: {
                title: 'LogTopics',
                description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                type: 'array',
                items: {
                  title: 'topic',
                  description:
                    '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                  type: 'string',
                  pattern: '^0x([a-fA-F\\d]{64})?$',
                },
              },
              transactionHash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      name: 'eth_getRawTransactionByHash',
      summary: 'Returns raw transaction data of a transaction with the given hash.',
      params: [
        {
          name: 'transactionHash',
          required: true,
          schema: {
            title: 'transactionHash',
            type: 'string',
            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
        },
      ],
      result: {
        name: 'rawTransactionByHash',
        description: 'The raw transaction data',
        schema: {
          title: 'bytes',
          type: 'string',
          description: 'Hex representation of a variable length byte array',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
    },
    {
      name: 'eth_getRawTransactionByBlockHashAndIndex',
      summary: 'Returns raw transaction data of a transaction with the block hash and index of which it was mined.',
      params: [
        {
          name: 'blockHash',
          required: true,
          schema: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
        },
        {
          name: 'index',
          description: 'The ordering in which a transaction is mined within its block.',
          required: true,
          schema: {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
        },
      ],
      result: {
        name: 'rawTransaction',
        description: 'The raw transaction data',
        schema: {
          title: 'bytes',
          type: 'string',
          description: 'Hex representation of a variable length byte array',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
    },
    {
      name: 'eth_getRawTransactionByBlockNumberAndIndex',
      summary: 'Returns raw transaction data of a transaction with the block number and index of which it was mined.',
      params: [
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
        {
          name: 'index',
          description: 'The ordering in which a transaction is mined within its block.',
          required: true,
          schema: {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
        },
      ],
      result: {
        name: 'rawTransaction',
        description: 'The raw transaction data',
        schema: {
          title: 'bytes',
          type: 'string',
          description: 'Hex representation of a variable length byte array',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
    },
    {
      name: 'eth_getLogs',
      summary: 'Returns an array of all logs matching a given filter object.',
      params: [
        {
          name: 'filter',
          required: true,
          schema: {
            title: 'filter',
            type: 'object',
            description: 'A filter used to monitor the blockchain for log/events',
            properties: {
              fromBlock: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              toBlock: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              address: {
                title: 'oneOrArrayOfAddresses',
                oneOf: [
                  {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                  {
                    title: 'addresses',
                    type: 'array',
                    description: 'List of contract addresses from which to monitor events',
                    items: {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                  },
                ],
              },
              topics: {
                title: 'LogTopics',
                description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                type: 'array',
                items: {
                  title: 'topic',
                  description:
                    '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                  type: 'string',
                  pattern: '^0x([a-fA-F\\d]{64})?$',
                },
              },
            },
          },
        },
      ],
      result: {
        name: 'logs',
        description: 'An array of all logs matching filter with given id.',
        schema: {
          title: 'setOfLogs',
          type: 'array',
          items: {
            title: 'log',
            type: 'object',
            description: 'An indexed event generated during a transaction',
            properties: {
              address: {
                title: 'LogAddress',
                description: 'Sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              blockHash: {
                title: 'blockHash',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
                description: 'The hex representation of the Keccak 256 of the RLP encoded block',
              },
              blockNumber: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              data: {
                title: 'LogData',
                description: 'The data/input string sent along with the transaction',
                type: 'string',
                pattern: '^0x([a-fA-F0-9]?)+$',
              },
              logIndex: {
                title: 'LogIndex',
                description: 'The index of the event within its transaction, null when its pending',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              removed: {
                title: 'logIsRemoved',
                description: 'Whether or not the log was orphaned off the main chain',
                type: 'boolean',
              },
              topics: {
                title: 'LogTopics',
                description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                type: 'array',
                items: {
                  title: 'topic',
                  description:
                    '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                  type: 'string',
                  pattern: '^0x([a-fA-F\\d]{64})?$',
                },
              },
              transactionHash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
            },
          },
        },
      },
    },
    {
      name: 'eth_getStorageAt',
      summary: 'Gets a storage value from a contract address, a position, and an optional blockNumber',
      params: [
        {
          name: 'address',
          required: true,
          schema: {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
        },
        {
          name: 'key',
          required: true,
          schema: {
            title: 'position',
            type: 'string',
            description: 'Hex representation of the storage slot where the variable exists',
            pattern: '^0x([a-fA-F0-9]?)+$',
          },
        },
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
      ],
      result: {
        name: 'dataWord',
        schema: {
          title: 'dataWord',
          type: 'string',
          description: 'Hex representation of a 256 bit unit of data',
          pattern: '^0x([a-fA-F\\d]{64})?$',
        },
      },
    },
    {
      name: 'eth_getTransactionByBlockHashAndIndex',
      summary:
        'Returns the information about a transaction requested by the block hash and index of which it was mined.',
      params: [
        {
          name: 'blockHash',
          required: true,
          schema: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
        },
        {
          name: 'index',
          description: 'The ordering in which a transaction is mined within its block.',
          required: true,
          schema: {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
        },
      ],
      result: {
        name: 'transactionResult',
        description: 'Returns a transaction or null',
        schema: {
          title: 'TransactionOrNull',
          oneOf: [
            {
              title: 'transaction',
              type: 'object',
              required: ['gas', 'gasPrice', 'nonce'],
              properties: {
                blockHash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                blockNumber: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                from: {
                  title: 'From',
                  description: 'The sender of the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                gas: {
                  title: 'transactionGas',
                  type: 'string',
                  description: 'The gas limit provided by the sender in Wei',
                },
                gasPrice: {
                  title: 'transactionGasPrice',
                  type: 'string',
                  description: 'The gas price willing to be paid by the sender in Wei',
                },
                hash: {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                input: {
                  title: 'transactionInput',
                  type: 'string',
                  description: 'The data field sent with the transaction',
                },
                nonce: {
                  title: 'transactionNonce',
                  description: 'The total number of prior transactions made by the sender',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                to: {
                  title: 'To',
                  description: 'Destination address of the transaction. Null if it was a contract create.',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                transactionIndex: {
                  title: 'transactionIndex',
                  description: 'The index of the transaction. null when its pending',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                value: {
                  title: 'transactionValue',
                  description: 'Value of Ether being transferred in Wei',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                v: {
                  title: 'transactionSigV',
                  type: 'string',
                  description: 'ECDSA recovery id',
                },
                r: {
                  title: 'transactionSigR',
                  type: 'string',
                  description: 'ECDSA signature r',
                },
                s: {
                  title: 'transactionSigS',
                  type: 'string',
                  description: 'ECDSA signature s',
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
      examples: [
        {
          name: 'nullExample',
          params: [
            {
              name: 'blockHashExample',
              value: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
            },
            {
              name: 'indexExample',
              value: '0x0',
            },
          ],
          result: {
            name: 'nullResultExample',
            value: null,
          },
        },
      ],
    },
    {
      name: 'eth_getTransactionByBlockNumberAndIndex',
      summary:
        'Returns the information about a transaction requested by the block number and index of which it was mined.',
      params: [
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
        {
          name: 'index',
          description: 'The ordering in which a transaction is mined within its block.',
          required: true,
          schema: {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
        },
      ],
      result: {
        name: 'transactionResult',
        description: 'Returns a transaction or null',
        schema: {
          title: 'TransactionOrNull',
          oneOf: [
            {
              title: 'transaction',
              type: 'object',
              required: ['gas', 'gasPrice', 'nonce'],
              properties: {
                blockHash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                blockNumber: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                from: {
                  title: 'From',
                  description: 'The sender of the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                gas: {
                  title: 'transactionGas',
                  type: 'string',
                  description: 'The gas limit provided by the sender in Wei',
                },
                gasPrice: {
                  title: 'transactionGasPrice',
                  type: 'string',
                  description: 'The gas price willing to be paid by the sender in Wei',
                },
                hash: {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                input: {
                  title: 'transactionInput',
                  type: 'string',
                  description: 'The data field sent with the transaction',
                },
                nonce: {
                  title: 'transactionNonce',
                  description: 'The total number of prior transactions made by the sender',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                to: {
                  title: 'To',
                  description: 'Destination address of the transaction. Null if it was a contract create.',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                transactionIndex: {
                  title: 'transactionIndex',
                  description: 'The index of the transaction. null when its pending',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                value: {
                  title: 'transactionValue',
                  description: 'Value of Ether being transferred in Wei',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                v: {
                  title: 'transactionSigV',
                  type: 'string',
                  description: 'ECDSA recovery id',
                },
                r: {
                  title: 'transactionSigR',
                  type: 'string',
                  description: 'ECDSA signature r',
                },
                s: {
                  title: 'transactionSigS',
                  type: 'string',
                  description: 'ECDSA signature s',
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getTransactionByHash',
      summary: 'Returns the information about a transaction requested by transaction hash.',
      params: [
        {
          name: 'transactionHash',
          required: true,
          schema: {
            title: 'transactionHash',
            type: 'string',
            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
        },
      ],
      result: {
        name: 'transactionResult',
        description: 'Returns a transaction or null',
        schema: {
          title: 'TransactionOrNull',
          oneOf: [
            {
              title: 'transaction',
              type: 'object',
              required: ['gas', 'gasPrice', 'nonce'],
              properties: {
                blockHash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                blockNumber: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                from: {
                  title: 'From',
                  description: 'The sender of the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                gas: {
                  title: 'transactionGas',
                  type: 'string',
                  description: 'The gas limit provided by the sender in Wei',
                },
                gasPrice: {
                  title: 'transactionGasPrice',
                  type: 'string',
                  description: 'The gas price willing to be paid by the sender in Wei',
                },
                hash: {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                input: {
                  title: 'transactionInput',
                  type: 'string',
                  description: 'The data field sent with the transaction',
                },
                nonce: {
                  title: 'transactionNonce',
                  description: 'The total number of prior transactions made by the sender',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                to: {
                  title: 'To',
                  description: 'Destination address of the transaction. Null if it was a contract create.',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                transactionIndex: {
                  title: 'transactionIndex',
                  description: 'The index of the transaction. null when its pending',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                value: {
                  title: 'transactionValue',
                  description: 'Value of Ether being transferred in Wei',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                v: {
                  title: 'transactionSigV',
                  type: 'string',
                  description: 'ECDSA recovery id',
                },
                r: {
                  title: 'transactionSigR',
                  type: 'string',
                  description: 'ECDSA signature r',
                },
                s: {
                  title: 'transactionSigS',
                  type: 'string',
                  description: 'ECDSA signature s',
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getTransactionCount',
      summary: 'Returns the number of transactions sent from an address',
      params: [
        {
          name: 'address',
          required: true,
          schema: {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
        },
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
      ],
      result: {
        name: 'transactionCount',
        schema: {
          title: 'nonceOrNull',
          oneOf: [
            {
              title: 'nonce',
              description: 'A number only to be used once',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getTransactionReceipt',
      summary: 'Returns the receipt information of a transaction by its hash.',
      params: [
        {
          name: 'transactionHash',
          required: true,
          schema: {
            title: 'transactionHash',
            type: 'string',
            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
        },
      ],
      result: {
        name: 'transactionReceiptResult',
        description: 'returns either a receipt or null',
        schema: {
          title: 'transactionReceiptOrNull',
          oneOf: [
            {
              title: 'receipt',
              type: 'object',
              description: 'The receipt of a transaction',
              required: [
                'blockHash',
                'blockNumber',
                'contractAddress',
                'cumulativeGasUsed',
                'from',
                'gasUsed',
                'logs',
                'logsBloom',
                'to',
                'transactionHash',
                'transactionIndex',
              ],
              properties: {
                blockHash: {
                  title: 'blockHash',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                  description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                },
                blockNumber: {
                  title: 'blockNumber',
                  type: 'string',
                  description: "The hex representation of the block's height",
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                contractAddress: {
                  title: 'ReceiptContractAddress',
                  description:
                    'The contract address created, if the transaction was a contract creation, otherwise null',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                cumulativeGasUsed: {
                  title: 'ReceiptCumulativeGasUsed',
                  description: 'The gas units used by the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                from: {
                  title: 'From',
                  description: 'The sender of the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                gasUsed: {
                  title: 'ReceiptGasUsed',
                  description: 'The total gas used by the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                logs: {
                  title: 'logs',
                  type: 'array',
                  description: 'An array of all the logs triggered during the transaction',
                  items: {
                    title: 'log',
                    type: 'object',
                    description: 'An indexed event generated during a transaction',
                    properties: {
                      address: {
                        title: 'LogAddress',
                        description: 'Sender of the transaction',
                        type: 'string',
                        pattern: '^0x[a-fA-F\\d]{40}$',
                      },
                      blockHash: {
                        title: 'blockHash',
                        type: 'string',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                        description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                      },
                      blockNumber: {
                        title: 'blockNumber',
                        type: 'string',
                        description: "The hex representation of the block's height",
                        pattern: '^0x[a-fA-F0-9]+$',
                      },
                      data: {
                        title: 'LogData',
                        description: 'The data/input string sent along with the transaction',
                        type: 'string',
                        pattern: '^0x([a-fA-F0-9]?)+$',
                      },
                      logIndex: {
                        title: 'LogIndex',
                        description: 'The index of the event within its transaction, null when its pending',
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]+$',
                      },
                      removed: {
                        title: 'logIsRemoved',
                        description: 'Whether or not the log was orphaned off the main chain',
                        type: 'boolean',
                      },
                      topics: {
                        title: 'LogTopics',
                        description:
                          "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                        type: 'array',
                        items: {
                          title: 'topic',
                          description:
                            '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                          type: 'string',
                          pattern: '^0x([a-fA-F\\d]{64})?$',
                        },
                      },
                      transactionHash: {
                        title: 'transactionHash',
                        type: 'string',
                        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                      transactionIndex: {
                        title: 'transactionIndex',
                        description: 'The index of the transaction. null when its pending',
                        oneOf: [
                          {
                            title: 'integer',
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]+$',
                            description: 'Hex representation of the integer',
                          },
                          {
                            title: 'null',
                            type: 'null',
                            description: 'Null',
                          },
                        ],
                      },
                    },
                  },
                },
                logsBloom: {
                  title: 'bloomFilter',
                  type: 'string',
                  description:
                    "A 2048 bit bloom filter from the logs of the transaction. Each log sets 3 bits though taking the low-order 11 bits of each of the first three pairs of bytes in a Keccak 256 hash of the log's byte series",
                },
                to: {
                  title: 'To',
                  description: 'Destination address of the transaction. Null if it was a contract create.',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                transactionHash: {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                transactionIndex: {
                  title: 'transactionIndex',
                  description: 'The index of the transaction. null when its pending',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                postTransactionState: {
                  title: 'ReceiptPostTransactionState',
                  description: 'The intermediate stateRoot directly after transaction execution.',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                status: {
                  title: 'ReceiptStatus',
                  description: 'Whether or not the transaction threw an error.',
                  type: 'boolean',
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getUncleByBlockHashAndIndex',
      summary: 'Returns information about a uncle of a block by hash and uncle index position.',
      params: [
        {
          name: 'blockHash',
          required: true,
          schema: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
        },
        {
          name: 'index',
          description: 'The ordering in which a uncle is included within its block.',
          required: true,
          schema: {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
        },
      ],
      result: {
        name: 'uncle',
        schema: {
          title: 'blockOrNull',
          oneOf: [
            {
              title: 'Block',
              description:
                'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
              type: 'object',
              properties: {
                number: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                hash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                parentHash: {
                  title: 'blockHash',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                  description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                },
                nonce: {
                  title: 'nonceOrNull',
                  description:
                    'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
                  oneOf: [
                    {
                      title: 'nonce',
                      description: 'A number only to be used once',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                sha3Uncles: {
                  title: 'blockShaUncles',
                  description: 'Keccak hash of the uncles data in the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                logsBloom: {
                  title: 'blockLogsBloom',
                  type: 'string',
                  description: 'The bloom filter for the logs of the block or null when its the pending block',
                  pattern: '^0x[a-fA-F\\d]+$',
                },
                transactionsRoot: {
                  title: 'blockTransactionsRoot',
                  description: 'The root of the transactions trie of the block.',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                stateRoot: {
                  title: 'blockStateRoot',
                  description: 'The root of the final state trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                receiptsRoot: {
                  title: 'blockReceiptsRoot',
                  description: 'The root of the receipts trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                miner: {
                  title: 'addressOrNull',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                difficulty: {
                  title: 'blockDifficulty',
                  type: 'string',
                  description: 'Integer of the difficulty for this block',
                },
                totalDifficulty: {
                  title: 'blockTotalDifficulty',
                  description: 'Integer of the total difficulty of the chain until this block',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                extraData: {
                  title: 'blockExtraData',
                  type: 'string',
                  description: "The 'extra data' field of this block",
                },
                size: {
                  title: 'blockSize',
                  type: 'string',
                  description: 'Integer the size of this block in bytes',
                },
                gasLimit: {
                  title: 'blockGasLimit',
                  type: 'string',
                  description: 'The maximum gas allowed in this block',
                },
                gasUsed: {
                  title: 'blockGasUsed',
                  type: 'string',
                  description: 'The total used gas by all transactions in this block',
                },
                timestamp: {
                  title: 'blockTimeStamp',
                  type: 'string',
                  description: 'The unix timestamp for when the block was collated',
                },
                transactions: {
                  title: 'transactionsOrHashes',
                  description:
                    'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
                  type: 'array',
                  items: {
                    title: 'transactionOrTransactionHash',
                    oneOf: [
                      {
                        title: 'transaction',
                        type: 'object',
                        required: ['gas', 'gasPrice', 'nonce'],
                        properties: {
                          blockHash: {
                            title: 'blockHashOrNull',
                            description: 'The block hash or null when its the pending block',
                            oneOf: [
                              {
                                title: 'keccak',
                                type: 'string',
                                description: 'Hex representation of a Keccak 256 hash',
                                pattern: '^0x[a-fA-F\\d]{64}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          blockNumber: {
                            title: 'blockNumberOrNull',
                            description: 'The block number or null when its the pending block',
                            oneOf: [
                              {
                                title: 'blockNumber',
                                type: 'string',
                                description: "The hex representation of the block's height",
                                pattern: '^0x[a-fA-F0-9]+$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          from: {
                            title: 'From',
                            description: 'The sender of the transaction',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{40}$',
                          },
                          gas: {
                            title: 'transactionGas',
                            type: 'string',
                            description: 'The gas limit provided by the sender in Wei',
                          },
                          gasPrice: {
                            title: 'transactionGasPrice',
                            type: 'string',
                            description: 'The gas price willing to be paid by the sender in Wei',
                          },
                          hash: {
                            title: 'transactionHash',
                            type: 'string',
                            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          input: {
                            title: 'transactionInput',
                            type: 'string',
                            description: 'The data field sent with the transaction',
                          },
                          nonce: {
                            title: 'transactionNonce',
                            description: 'The total number of prior transactions made by the sender',
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]+$',
                          },
                          to: {
                            title: 'To',
                            description: 'Destination address of the transaction. Null if it was a contract create.',
                            oneOf: [
                              {
                                title: 'address',
                                type: 'string',
                                pattern: '^0x[a-fA-F\\d]{40}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          transactionIndex: {
                            title: 'transactionIndex',
                            description: 'The index of the transaction. null when its pending',
                            oneOf: [
                              {
                                title: 'integer',
                                type: 'string',
                                pattern: '^0x[a-fA-F0-9]+$',
                                description: 'Hex representation of the integer',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          value: {
                            title: 'transactionValue',
                            description: 'Value of Ether being transferred in Wei',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          v: {
                            title: 'transactionSigV',
                            type: 'string',
                            description: 'ECDSA recovery id',
                          },
                          r: {
                            title: 'transactionSigR',
                            type: 'string',
                            description: 'ECDSA signature r',
                          },
                          s: {
                            title: 'transactionSigS',
                            type: 'string',
                            description: 'ECDSA signature s',
                          },
                        },
                      },
                      {
                        title: 'transactionHash',
                        type: 'string',
                        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                    ],
                  },
                },
                uncles: {
                  title: 'uncleHashes',
                  description: 'Array of uncle hashes',
                  type: 'array',
                  items: {
                    title: 'uncleHash',
                    description: 'Block hash of the RLP encoding of an uncle block',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getUncleByBlockNumberAndIndex',
      summary: 'Returns information about a uncle of a block by hash and uncle index position.',
      params: [
        {
          name: 'uncleBlockNumber',
          description: 'The block in which the uncle was included',
          required: true,
          schema: {
            title: 'blockNumber',
            type: 'string',
            description: "The hex representation of the block's height",
            pattern: '^0x[a-fA-F0-9]+$',
          },
        },
        {
          name: 'index',
          description: 'The ordering in which a uncle is included within its block.',
          required: true,
          schema: {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
        },
      ],
      result: {
        name: 'uncleResult',
        description: 'returns an uncle block or null',
        schema: {
          title: 'blockOrNull',
          oneOf: [
            {
              title: 'Block',
              description:
                'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
              type: 'object',
              properties: {
                number: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                hash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                parentHash: {
                  title: 'blockHash',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                  description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                },
                nonce: {
                  title: 'nonceOrNull',
                  description:
                    'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
                  oneOf: [
                    {
                      title: 'nonce',
                      description: 'A number only to be used once',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                sha3Uncles: {
                  title: 'blockShaUncles',
                  description: 'Keccak hash of the uncles data in the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                logsBloom: {
                  title: 'blockLogsBloom',
                  type: 'string',
                  description: 'The bloom filter for the logs of the block or null when its the pending block',
                  pattern: '^0x[a-fA-F\\d]+$',
                },
                transactionsRoot: {
                  title: 'blockTransactionsRoot',
                  description: 'The root of the transactions trie of the block.',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                stateRoot: {
                  title: 'blockStateRoot',
                  description: 'The root of the final state trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                receiptsRoot: {
                  title: 'blockReceiptsRoot',
                  description: 'The root of the receipts trie of the block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                miner: {
                  title: 'addressOrNull',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                difficulty: {
                  title: 'blockDifficulty',
                  type: 'string',
                  description: 'Integer of the difficulty for this block',
                },
                totalDifficulty: {
                  title: 'blockTotalDifficulty',
                  description: 'Integer of the total difficulty of the chain until this block',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                extraData: {
                  title: 'blockExtraData',
                  type: 'string',
                  description: "The 'extra data' field of this block",
                },
                size: {
                  title: 'blockSize',
                  type: 'string',
                  description: 'Integer the size of this block in bytes',
                },
                gasLimit: {
                  title: 'blockGasLimit',
                  type: 'string',
                  description: 'The maximum gas allowed in this block',
                },
                gasUsed: {
                  title: 'blockGasUsed',
                  type: 'string',
                  description: 'The total used gas by all transactions in this block',
                },
                timestamp: {
                  title: 'blockTimeStamp',
                  type: 'string',
                  description: 'The unix timestamp for when the block was collated',
                },
                transactions: {
                  title: 'transactionsOrHashes',
                  description:
                    'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
                  type: 'array',
                  items: {
                    title: 'transactionOrTransactionHash',
                    oneOf: [
                      {
                        title: 'transaction',
                        type: 'object',
                        required: ['gas', 'gasPrice', 'nonce'],
                        properties: {
                          blockHash: {
                            title: 'blockHashOrNull',
                            description: 'The block hash or null when its the pending block',
                            oneOf: [
                              {
                                title: 'keccak',
                                type: 'string',
                                description: 'Hex representation of a Keccak 256 hash',
                                pattern: '^0x[a-fA-F\\d]{64}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          blockNumber: {
                            title: 'blockNumberOrNull',
                            description: 'The block number or null when its the pending block',
                            oneOf: [
                              {
                                title: 'blockNumber',
                                type: 'string',
                                description: "The hex representation of the block's height",
                                pattern: '^0x[a-fA-F0-9]+$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          from: {
                            title: 'From',
                            description: 'The sender of the transaction',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{40}$',
                          },
                          gas: {
                            title: 'transactionGas',
                            type: 'string',
                            description: 'The gas limit provided by the sender in Wei',
                          },
                          gasPrice: {
                            title: 'transactionGasPrice',
                            type: 'string',
                            description: 'The gas price willing to be paid by the sender in Wei',
                          },
                          hash: {
                            title: 'transactionHash',
                            type: 'string',
                            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          input: {
                            title: 'transactionInput',
                            type: 'string',
                            description: 'The data field sent with the transaction',
                          },
                          nonce: {
                            title: 'transactionNonce',
                            description: 'The total number of prior transactions made by the sender',
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]+$',
                          },
                          to: {
                            title: 'To',
                            description: 'Destination address of the transaction. Null if it was a contract create.',
                            oneOf: [
                              {
                                title: 'address',
                                type: 'string',
                                pattern: '^0x[a-fA-F\\d]{40}$',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          transactionIndex: {
                            title: 'transactionIndex',
                            description: 'The index of the transaction. null when its pending',
                            oneOf: [
                              {
                                title: 'integer',
                                type: 'string',
                                pattern: '^0x[a-fA-F0-9]+$',
                                description: 'Hex representation of the integer',
                              },
                              {
                                title: 'null',
                                type: 'null',
                                description: 'Null',
                              },
                            ],
                          },
                          value: {
                            title: 'transactionValue',
                            description: 'Value of Ether being transferred in Wei',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          v: {
                            title: 'transactionSigV',
                            type: 'string',
                            description: 'ECDSA recovery id',
                          },
                          r: {
                            title: 'transactionSigR',
                            type: 'string',
                            description: 'ECDSA signature r',
                          },
                          s: {
                            title: 'transactionSigS',
                            type: 'string',
                            description: 'ECDSA signature s',
                          },
                        },
                      },
                      {
                        title: 'transactionHash',
                        type: 'string',
                        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                    ],
                  },
                },
                uncles: {
                  title: 'uncleHashes',
                  description: 'Array of uncle hashes',
                  type: 'array',
                  items: {
                    title: 'uncleHash',
                    description: 'Block hash of the RLP encoding of an uncle block',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
      examples: [
        {
          name: 'nullResultExample',
          params: [
            {
              name: 'uncleBlockNumberExample',
              value: '0x0',
            },
            {
              name: 'uncleBlockNumberIndexExample',
              value: '0x0',
            },
          ],
          result: {
            name: 'nullResultExample',
            value: null,
          },
        },
      ],
    },
    {
      name: 'eth_getUncleCountByBlockHash',
      summary: 'Returns the number of uncles in a block from a block matching the given block hash.',
      params: [
        {
          name: 'blockHash',
          required: true,
          schema: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
        },
      ],
      result: {
        name: 'uncleCountResult',
        description: 'The Number of total uncles in the given block',
        schema: {
          title: 'integerOrNull',
          oneOf: [
            {
              title: 'integer',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
              description: 'Hex representation of the integer',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getUncleCountByBlockNumber',
      summary: 'Returns the number of uncles in a block from a block matching the given block number.',
      params: [
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
      ],
      result: {
        name: 'uncleCountResult',
        description: 'The Number of total uncles in the given block',
        schema: {
          title: 'integerOrNull',
          oneOf: [
            {
              title: 'integer',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
              description: 'Hex representation of the integer',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getProof',
      summary: 'Returns the account- and storage-values of the specified account including the Merkle-proof.',
      params: [
        {
          name: 'address',
          description: 'The address of the account or contract',
          required: true,
          schema: {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
        },
        {
          name: 'storageKeys',
          required: true,
          schema: {
            title: 'storageKeys',
            description:
              'A storage key is indexed from the solidity compiler by the order it is declared. For mappings it uses the keccak of the mapping key with its position (and recursively for X-dimensional mappings)',
            items: {
              title: 'storageProofKey',
              description: 'The key used to get the storage slot in its account tree.',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
            },
          },
        },
        {
          name: 'blockNumber',
          required: true,
          schema: {
            title: 'blockNumberOrTag',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'blockNumberTag',
                type: 'string',
                description: 'The optional block height description',
                enum: ['earliest', 'latest', 'pending'],
              },
            ],
          },
        },
      ],
      result: {
        name: 'account',
        schema: {
          title: 'proofAccountOrNull',
          oneOf: [
            {
              title: 'proofAccount',
              type: 'object',
              description:
                'The merkle proofs of the specified account connecting them to the blockhash of the block specified',
              properties: {
                address: {
                  title: 'proofAccountAddress',
                  description: 'The address of the account or contract of the request',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                accountProof: {
                  title: 'proofNodes',
                  type: 'array',
                  description:
                    'The set of node values needed to traverse a patricia merkle tree (from root to leaf) to retrieve a value',
                  items: {
                    title: 'proofNode',
                    type: 'string',
                    description: 'An individual node used to prove a path down a merkle-patricia-tree',
                    pattern: '^0x([a-fA-F0-9]?)+$',
                  },
                },
                balance: {
                  title: 'proofAccountBalance',
                  description: 'The Ether balance of the account or contract of the request',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                codeHash: {
                  title: 'proofAccountCodeHash',
                  description: 'The code hash of the contract of the request (keccak(NULL) if external account)',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                nonce: {
                  title: 'proofAccountNonce',
                  description: 'The transaction count of the account or contract of the request',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                storageHash: {
                  title: 'proofAccountStorageHash',
                  description:
                    'The storage hash of the contract of the request (keccak(rlp(NULL)) if external account)',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                storageProof: {
                  title: 'storageProofSet',
                  type: 'array',
                  description: 'Current block header PoW hash.',
                  items: {
                    title: 'storageProof',
                    type: 'object',
                    description: "Object proving a relationship of a storage value to an account's storageHash.",
                    properties: {
                      key: {
                        title: 'storageProofKey',
                        description: 'The key used to get the storage slot in its account tree.',
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]+$',
                      },
                      value: {
                        title: 'storageProofValue',
                        description: 'The value of the storage slot in its account tree',
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]+$',
                      },
                      proof: {
                        title: 'proofNodes',
                        type: 'array',
                        description:
                          'The set of node values needed to traverse a patricia merkle tree (from root to leaf) to retrieve a value',
                        items: {
                          title: 'proofNode',
                          type: 'string',
                          description: 'An individual node used to prove a path down a merkle-patricia-tree',
                          pattern: '^0x([a-fA-F0-9]?)+$',
                        },
                      },
                    },
                  },
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
    },
    {
      name: 'eth_getWork',
      summary: "Returns the hash of the current block, the seedHash, and the boundary condition to be met ('target').",
      params: [],
      result: {
        name: 'work',
        schema: {
          title: 'getWorkResults',
          type: 'array',
          items: [
            {
              title: 'powHash',
              description: 'Current block header PoW hash.',
              type: 'string',
              pattern: '^0x([a-fA-F\\d]{64})?$',
            },
            {
              title: 'seedHash',
              description: 'The seed hash used for the DAG.',
              type: 'string',
              pattern: '^0x([a-fA-F\\d]{64})?$',
            },
            {
              title: 'difficulty',
              description: "The boundary condition ('target'), 2^256 / difficulty.",
              type: 'string',
              pattern: '^0x([a-fA-F\\d]{64})?$',
            },
          ],
        },
      },
    },
    {
      name: 'eth_hashrate',
      summary: 'Returns the number of hashes per second that the node is mining with.',
      params: [],
      result: {
        name: 'hashesPerSecond',
        description: 'Integer of the number of hashes per second',
        schema: {
          title: 'integer',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
          description: 'Hex representation of the integer',
        },
      },
    },
    {
      name: 'eth_mining',
      summary: 'Returns true if client is actively mining new blocks.',
      params: [],
      result: {
        name: 'mining',
        description: 'Whether or not the client is mining',
        schema: {
          type: 'boolean',
        },
      },
    },
    {
      name: 'eth_newBlockFilter',
      summary:
        'Creates a filter in the node, to notify when a new block arrives. To check if the state has changed, call eth_getFilterChanges.',
      params: [],
      result: {
        name: 'filterId',
        schema: {
          title: 'filterId',
          type: 'string',
          description: 'An identifier used to reference the filter.',
        },
      },
    },
    {
      name: 'eth_newFilter',
      summary:
        'Creates a filter object, based on filter options, to notify when the state changes (logs). To check if the state has changed, call eth_getFilterChanges.',
      params: [
        {
          name: 'filter',
          required: true,
          schema: {
            title: 'filter',
            type: 'object',
            description: 'A filter used to monitor the blockchain for log/events',
            properties: {
              fromBlock: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              toBlock: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              address: {
                title: 'oneOrArrayOfAddresses',
                oneOf: [
                  {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                  {
                    title: 'addresses',
                    type: 'array',
                    description: 'List of contract addresses from which to monitor events',
                    items: {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                  },
                ],
              },
              topics: {
                title: 'LogTopics',
                description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                type: 'array',
                items: {
                  title: 'topic',
                  description:
                    '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                  type: 'string',
                  pattern: '^0x([a-fA-F\\d]{64})?$',
                },
              },
            },
          },
        },
      ],
      result: {
        name: 'filterId',
        description: 'The filter ID for use in `eth_getFilterChanges`',
        schema: {
          title: 'integer',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
          description: 'Hex representation of the integer',
        },
      },
    },
    {
      name: 'eth_newPendingTransactionFilter',
      summary:
        'Creates a filter in the node, to notify when new pending transactions arrive. To check if the state has changed, call eth_getFilterChanges.',
      params: [],
      result: {
        name: 'filterId',
        schema: {
          title: 'filterId',
          type: 'string',
          description: 'An identifier used to reference the filter.',
        },
      },
    },
    {
      name: 'eth_pendingTransactions',
      summary:
        'Returns the transactions that are pending in the transaction pool and have a from address that is one of the accounts this node manages.',
      params: [],
      result: {
        name: 'pendingTransactions',
        schema: {
          title: 'transactions',
          description: 'An array of transactions',
          type: 'array',
          items: {
            title: 'transaction',
            type: 'object',
            required: ['gas', 'gasPrice', 'nonce'],
            properties: {
              blockHash: {
                title: 'blockHashOrNull',
                description: 'The block hash or null when its the pending block',
                oneOf: [
                  {
                    title: 'keccak',
                    type: 'string',
                    description: 'Hex representation of a Keccak 256 hash',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              blockNumber: {
                title: 'blockNumberOrNull',
                description: 'The block number or null when its the pending block',
                oneOf: [
                  {
                    title: 'blockNumber',
                    type: 'string',
                    description: "The hex representation of the block's height",
                    pattern: '^0x[a-fA-F0-9]+$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              from: {
                title: 'From',
                description: 'The sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              gas: {
                title: 'transactionGas',
                type: 'string',
                description: 'The gas limit provided by the sender in Wei',
              },
              gasPrice: {
                title: 'transactionGasPrice',
                type: 'string',
                description: 'The gas price willing to be paid by the sender in Wei',
              },
              hash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              input: {
                title: 'transactionInput',
                type: 'string',
                description: 'The data field sent with the transaction',
              },
              nonce: {
                title: 'transactionNonce',
                description: 'The total number of prior transactions made by the sender',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              to: {
                title: 'To',
                description: 'Destination address of the transaction. Null if it was a contract create.',
                oneOf: [
                  {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              value: {
                title: 'transactionValue',
                description: 'Value of Ether being transferred in Wei',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              v: {
                title: 'transactionSigV',
                type: 'string',
                description: 'ECDSA recovery id',
              },
              r: {
                title: 'transactionSigR',
                type: 'string',
                description: 'ECDSA signature r',
              },
              s: {
                title: 'transactionSigS',
                type: 'string',
                description: 'ECDSA signature s',
              },
            },
          },
        },
      },
    },
    {
      name: 'eth_protocolVersion',
      summary: 'Returns the current ethereum protocol version.',
      params: [],
      result: {
        name: 'protocolVersion',
        description: 'The current ethereum protocol version',
        schema: {
          title: 'integer',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
          description: 'Hex representation of the integer',
        },
      },
    },
    {
      name: 'eth_sendRawTransaction',
      summary: 'Creates new message call transaction or a contract creation for signed transactions.',
      params: [
        {
          name: 'signedTransactionData',
          required: true,
          description: 'The signed transaction data',
          schema: {
            title: 'bytes',
            type: 'string',
            description: 'Hex representation of a variable length byte array',
            pattern: '^0x([a-fA-F0-9]?)+$',
          },
        },
      ],
      result: {
        name: 'transactionHash',
        description: 'The transaction hash, or the zero hash if the transaction is not yet available.',
        schema: {
          title: 'keccak',
          type: 'string',
          description: 'Hex representation of a Keccak 256 hash',
          pattern: '^0x[a-fA-F\\d]{64}$',
        },
      },
    },
    {
      name: 'eth_submitHashrate',
      deprecated: true,
      summary: 'Used for submitting mining hashrate.',
      params: [
        {
          name: 'hashRate',
          required: true,
          schema: {
            title: 'dataWord',
            type: 'string',
            description: 'Hex representation of a 256 bit unit of data',
            pattern: '^0x([a-fA-F\\d]{64})?$',
          },
        },
        {
          name: 'id',
          required: true,
          description: 'String identifying the client',
          schema: {
            title: 'dataWord',
            type: 'string',
            description: 'Hex representation of a 256 bit unit of data',
            pattern: '^0x([a-fA-F\\d]{64})?$',
          },
        },
      ],
      result: {
        name: 'submitHashRateSuccess',
        description: 'whether of not submitting went through successfully',
        schema: {
          type: 'boolean',
        },
      },
    },
    {
      name: 'eth_submitWork',
      summary: 'Used for submitting a proof-of-work solution.',
      params: [
        {
          name: 'nonce',
          required: true,
          schema: {
            title: 'nonce',
            description: 'A number only to be used once',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
          },
        },
        {
          name: 'powHash',
          required: true,
          schema: {
            title: 'powHash',
            description: 'Current block header PoW hash.',
            type: 'string',
            pattern: '^0x([a-fA-F\\d]{64})?$',
          },
        },
        {
          name: 'mixHash',
          required: true,
          schema: {
            title: 'mixHash',
            description: 'The mix digest.',
            type: 'string',
            pattern: '^0x([a-fA-F\\d]{64})?$',
          },
        },
      ],
      result: {
        name: 'solutionValid',
        description: 'returns true if the provided solution is valid, otherwise false.',
        schema: {
          type: 'boolean',
        },
      },
      examples: [
        {
          name: 'submitWorkExample',
          params: [
            {
              name: 'nonceExample',
              description: 'example of a number only used once',
              value: '0x0000000000000001',
            },
            {
              name: 'powHashExample',
              description: 'proof of work to submit',
              value: '0x6bf2cAE0dE3ec3ecA5E194a6C6e02cf42aADfe1C2c4Fff12E5D36C3Cf7297F22',
            },
            {
              name: 'mixHashExample',
              description: 'the mix digest example',
              value: '0xD1FE5700000000000000000000000000D1FE5700000000000000000000000000',
            },
          ],
          result: {
            name: 'solutionInvalidExample',
            description: 'this example should return `false` as it is not a valid pow to submit',
            value: false,
          },
        },
      ],
    },
    {
      name: 'eth_syncing',
      summary: 'Returns an object with data about the sync status or false.',
      params: [],
      result: {
        name: 'syncing',
        schema: {
          title: 'isSyncingResult',
          oneOf: [
            {
              title: 'syncingData',
              description: 'An object with sync status data',
              type: 'object',
              properties: {
                startingBlock: {
                  title: 'syncingDataStartingBlock',
                  description:
                    'Block at which the import started (will only be reset, after the sync reached his head)',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                currentBlock: {
                  title: 'syncingDataCurrentBlock',
                  description: 'The current block, same as eth_blockNumber',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                highestBlock: {
                  title: 'syncingDataHighestBlock',
                  description: 'The estimated highest block',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                knownStates: {
                  title: 'syncingDataKnownStates',
                  description: 'The known states',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                pulledStates: {
                  title: 'syncingDataPulledStates',
                  description: 'The pulled states',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
              },
            },
            {
              type: 'boolean',
              title: 'boolean_vyG3AETh',
            },
          ],
        },
      },
    },
    {
      name: 'eth_uninstallFilter',
      summary:
        "Uninstalls a filter with given id. Should always be called when watch is no longer needed. Additionally Filters timeout when they aren't requested with eth_getFilterChanges for a period of time.",
      params: [
        {
          name: 'filterId',
          required: true,
          schema: {
            title: 'filterId',
            type: 'string',
            description: 'An identifier used to reference the filter.',
          },
        },
      ],
      result: {
        name: 'filterUninstalledSuccess',
        description: 'returns true if the filter was successfully uninstalled, false otherwise.',
        schema: {
          type: 'boolean',
        },
      },
    },
  ],
  components: {
    schemas: {
      ProofNode: {
        title: 'proofNode',
        type: 'string',
        description: 'An individual node used to prove a path down a merkle-patricia-tree',
        pattern: '^0x([a-fA-F0-9]?)+$',
      },
      AccountProof: {
        title: 'proofNodes',
        type: 'array',
        description:
          'The set of node values needed to traverse a patricia merkle tree (from root to leaf) to retrieve a value',
        items: {
          title: 'proofNode',
          type: 'string',
          description: 'An individual node used to prove a path down a merkle-patricia-tree',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
      StorageProofKey: {
        title: 'storageProofKey',
        description: 'The key used to get the storage slot in its account tree.',
        type: 'string',
        pattern: '^0x[a-fA-F0-9]+$',
      },
      StorageProof: {
        title: 'storageProofSet',
        type: 'array',
        description: 'Current block header PoW hash.',
        items: {
          title: 'storageProof',
          type: 'object',
          description: "Object proving a relationship of a storage value to an account's storageHash.",
          properties: {
            key: {
              title: 'storageProofKey',
              description: 'The key used to get the storage slot in its account tree.',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
            },
            value: {
              title: 'storageProofValue',
              description: 'The value of the storage slot in its account tree',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
            },
            proof: {
              title: 'proofNodes',
              type: 'array',
              description:
                'The set of node values needed to traverse a patricia merkle tree (from root to leaf) to retrieve a value',
              items: {
                title: 'proofNode',
                type: 'string',
                description: 'An individual node used to prove a path down a merkle-patricia-tree',
                pattern: '^0x([a-fA-F0-9]?)+$',
              },
            },
          },
        },
      },
      ProofNodes: {
        title: 'proofNodes',
        type: 'array',
        description:
          'The set of node values needed to traverse a patricia merkle tree (from root to leaf) to retrieve a value',
        items: {
          title: 'proofNode',
          type: 'string',
          description: 'An individual node used to prove a path down a merkle-patricia-tree',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
      PowHash: {
        title: 'powHash',
        description: 'Current block header PoW hash.',
        type: 'string',
        pattern: '^0x([a-fA-F\\d]{64})?$',
      },
      SeedHash: {
        title: 'seedHash',
        description: 'The seed hash used for the DAG.',
        type: 'string',
        pattern: '^0x([a-fA-F\\d]{64})?$',
      },
      MixHash: {
        title: 'mixHash',
        description: 'The mix digest.',
        type: 'string',
        pattern: '^0x([a-fA-F\\d]{64})?$',
      },
      Difficulty: {
        title: 'difficulty',
        description: "The boundary condition ('target'), 2^256 / difficulty.",
        type: 'string',
        pattern: '^0x([a-fA-F\\d]{64})?$',
      },
      FilterId: {
        title: 'filterId',
        type: 'string',
        description: 'An identifier used to reference the filter.',
      },
      BlockHash: {
        title: 'blockHash',
        type: 'string',
        pattern: '^0x[a-fA-F\\d]{64}$',
        description: 'The hex representation of the Keccak 256 of the RLP encoded block',
      },
      BlockNumber: {
        title: 'blockNumber',
        type: 'string',
        description: "The hex representation of the block's height",
        pattern: '^0x[a-fA-F0-9]+$',
      },
      BlockNumberTag: {
        title: 'blockNumberTag',
        type: 'string',
        description: 'The optional block height description',
        enum: ['earliest', 'latest', 'pending'],
      },
      BlockOrNull: {
        title: 'blockOrNull',
        oneOf: [
          {
            title: 'Block',
            description:
              'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
            type: 'object',
            properties: {
              number: {
                title: 'blockNumberOrNull',
                description: 'The block number or null when its the pending block',
                oneOf: [
                  {
                    title: 'blockNumber',
                    type: 'string',
                    description: "The hex representation of the block's height",
                    pattern: '^0x[a-fA-F0-9]+$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              hash: {
                title: 'blockHashOrNull',
                description: 'The block hash or null when its the pending block',
                oneOf: [
                  {
                    title: 'keccak',
                    type: 'string',
                    description: 'Hex representation of a Keccak 256 hash',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              parentHash: {
                title: 'blockHash',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
                description: 'The hex representation of the Keccak 256 of the RLP encoded block',
              },
              nonce: {
                title: 'nonceOrNull',
                description: 'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
                oneOf: [
                  {
                    title: 'nonce',
                    description: 'A number only to be used once',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              sha3Uncles: {
                title: 'blockShaUncles',
                description: 'Keccak hash of the uncles data in the block',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              logsBloom: {
                title: 'blockLogsBloom',
                type: 'string',
                description: 'The bloom filter for the logs of the block or null when its the pending block',
                pattern: '^0x[a-fA-F\\d]+$',
              },
              transactionsRoot: {
                title: 'blockTransactionsRoot',
                description: 'The root of the transactions trie of the block.',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              stateRoot: {
                title: 'blockStateRoot',
                description: 'The root of the final state trie of the block',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              receiptsRoot: {
                title: 'blockReceiptsRoot',
                description: 'The root of the receipts trie of the block',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              miner: {
                title: 'addressOrNull',
                oneOf: [
                  {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              difficulty: {
                title: 'blockDifficulty',
                type: 'string',
                description: 'Integer of the difficulty for this block',
              },
              totalDifficulty: {
                title: 'blockTotalDifficulty',
                description: 'Integer of the total difficulty of the chain until this block',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
              extraData: {
                title: 'blockExtraData',
                type: 'string',
                description: "The 'extra data' field of this block",
              },
              size: {
                title: 'blockSize',
                type: 'string',
                description: 'Integer the size of this block in bytes',
              },
              gasLimit: {
                title: 'blockGasLimit',
                type: 'string',
                description: 'The maximum gas allowed in this block',
              },
              gasUsed: {
                title: 'blockGasUsed',
                type: 'string',
                description: 'The total used gas by all transactions in this block',
              },
              timestamp: {
                title: 'blockTimeStamp',
                type: 'string',
                description: 'The unix timestamp for when the block was collated',
              },
              transactions: {
                title: 'transactionsOrHashes',
                description:
                  'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
                type: 'array',
                items: {
                  title: 'transactionOrTransactionHash',
                  oneOf: [
                    {
                      title: 'transaction',
                      type: 'object',
                      required: ['gas', 'gasPrice', 'nonce'],
                      properties: {
                        blockHash: {
                          title: 'blockHashOrNull',
                          description: 'The block hash or null when its the pending block',
                          oneOf: [
                            {
                              title: 'keccak',
                              type: 'string',
                              description: 'Hex representation of a Keccak 256 hash',
                              pattern: '^0x[a-fA-F\\d]{64}$',
                            },
                            {
                              title: 'null',
                              type: 'null',
                              description: 'Null',
                            },
                          ],
                        },
                        blockNumber: {
                          title: 'blockNumberOrNull',
                          description: 'The block number or null when its the pending block',
                          oneOf: [
                            {
                              title: 'blockNumber',
                              type: 'string',
                              description: "The hex representation of the block's height",
                              pattern: '^0x[a-fA-F0-9]+$',
                            },
                            {
                              title: 'null',
                              type: 'null',
                              description: 'Null',
                            },
                          ],
                        },
                        from: {
                          title: 'From',
                          description: 'The sender of the transaction',
                          type: 'string',
                          pattern: '^0x[a-fA-F\\d]{40}$',
                        },
                        gas: {
                          title: 'transactionGas',
                          type: 'string',
                          description: 'The gas limit provided by the sender in Wei',
                        },
                        gasPrice: {
                          title: 'transactionGasPrice',
                          type: 'string',
                          description: 'The gas price willing to be paid by the sender in Wei',
                        },
                        hash: {
                          title: 'transactionHash',
                          type: 'string',
                          description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                          pattern: '^0x[a-fA-F\\d]{64}$',
                        },
                        input: {
                          title: 'transactionInput',
                          type: 'string',
                          description: 'The data field sent with the transaction',
                        },
                        nonce: {
                          title: 'transactionNonce',
                          description: 'The total number of prior transactions made by the sender',
                          type: 'string',
                          pattern: '^0x[a-fA-F0-9]+$',
                        },
                        to: {
                          title: 'To',
                          description: 'Destination address of the transaction. Null if it was a contract create.',
                          oneOf: [
                            {
                              title: 'address',
                              type: 'string',
                              pattern: '^0x[a-fA-F\\d]{40}$',
                            },
                            {
                              title: 'null',
                              type: 'null',
                              description: 'Null',
                            },
                          ],
                        },
                        transactionIndex: {
                          title: 'transactionIndex',
                          description: 'The index of the transaction. null when its pending',
                          oneOf: [
                            {
                              title: 'integer',
                              type: 'string',
                              pattern: '^0x[a-fA-F0-9]+$',
                              description: 'Hex representation of the integer',
                            },
                            {
                              title: 'null',
                              type: 'null',
                              description: 'Null',
                            },
                          ],
                        },
                        value: {
                          title: 'transactionValue',
                          description: 'Value of Ether being transferred in Wei',
                          type: 'string',
                          pattern: '^0x[a-fA-F\\d]{64}$',
                        },
                        v: {
                          title: 'transactionSigV',
                          type: 'string',
                          description: 'ECDSA recovery id',
                        },
                        r: {
                          title: 'transactionSigR',
                          type: 'string',
                          description: 'ECDSA signature r',
                        },
                        s: {
                          title: 'transactionSigS',
                          type: 'string',
                          description: 'ECDSA signature s',
                        },
                      },
                    },
                    {
                      title: 'transactionHash',
                      type: 'string',
                      description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                  ],
                },
              },
              uncles: {
                title: 'uncleHashes',
                description: 'Array of uncle hashes',
                type: 'array',
                items: {
                  title: 'uncleHash',
                  description: 'Block hash of the RLP encoding of an uncle block',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
              },
            },
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      IntegerOrNull: {
        title: 'integerOrNull',
        oneOf: [
          {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      AddressOrNull: {
        title: 'addressOrNull',
        oneOf: [
          {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      Receipt: {
        title: 'receipt',
        type: 'object',
        description: 'The receipt of a transaction',
        required: [
          'blockHash',
          'blockNumber',
          'contractAddress',
          'cumulativeGasUsed',
          'from',
          'gasUsed',
          'logs',
          'logsBloom',
          'to',
          'transactionHash',
          'transactionIndex',
        ],
        properties: {
          blockHash: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
          blockNumber: {
            title: 'blockNumber',
            type: 'string',
            description: "The hex representation of the block's height",
            pattern: '^0x[a-fA-F0-9]+$',
          },
          contractAddress: {
            title: 'ReceiptContractAddress',
            description: 'The contract address created, if the transaction was a contract creation, otherwise null',
            oneOf: [
              {
                title: 'address',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          cumulativeGasUsed: {
            title: 'ReceiptCumulativeGasUsed',
            description: 'The gas units used by the transaction',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
          },
          from: {
            title: 'From',
            description: 'The sender of the transaction',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
          gasUsed: {
            title: 'ReceiptGasUsed',
            description: 'The total gas used by the transaction',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
          },
          logs: {
            title: 'logs',
            type: 'array',
            description: 'An array of all the logs triggered during the transaction',
            items: {
              title: 'log',
              type: 'object',
              description: 'An indexed event generated during a transaction',
              properties: {
                address: {
                  title: 'LogAddress',
                  description: 'Sender of the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                blockHash: {
                  title: 'blockHash',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                  description: 'The hex representation of the Keccak 256 of the RLP encoded block',
                },
                blockNumber: {
                  title: 'blockNumber',
                  type: 'string',
                  description: "The hex representation of the block's height",
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                data: {
                  title: 'LogData',
                  description: 'The data/input string sent along with the transaction',
                  type: 'string',
                  pattern: '^0x([a-fA-F0-9]?)+$',
                },
                logIndex: {
                  title: 'LogIndex',
                  description: 'The index of the event within its transaction, null when its pending',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                removed: {
                  title: 'logIsRemoved',
                  description: 'Whether or not the log was orphaned off the main chain',
                  type: 'boolean',
                },
                topics: {
                  title: 'LogTopics',
                  description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                  type: 'array',
                  items: {
                    title: 'topic',
                    description:
                      '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                    type: 'string',
                    pattern: '^0x([a-fA-F\\d]{64})?$',
                  },
                },
                transactionHash: {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                transactionIndex: {
                  title: 'transactionIndex',
                  description: 'The index of the transaction. null when its pending',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
              },
            },
          },
          logsBloom: {
            title: 'bloomFilter',
            type: 'string',
            description:
              "A 2048 bit bloom filter from the logs of the transaction. Each log sets 3 bits though taking the low-order 11 bits of each of the first three pairs of bytes in a Keccak 256 hash of the log's byte series",
          },
          to: {
            title: 'To',
            description: 'Destination address of the transaction. Null if it was a contract create.',
            oneOf: [
              {
                title: 'address',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          transactionHash: {
            title: 'transactionHash',
            type: 'string',
            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          transactionIndex: {
            title: 'transactionIndex',
            description: 'The index of the transaction. null when its pending',
            oneOf: [
              {
                title: 'integer',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
                description: 'Hex representation of the integer',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          postTransactionState: {
            title: 'ReceiptPostTransactionState',
            description: 'The intermediate stateRoot directly after transaction execution.',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          status: {
            title: 'ReceiptStatus',
            description: 'Whether or not the transaction threw an error.',
            type: 'boolean',
          },
        },
      },
      BloomFilter: {
        title: 'bloomFilter',
        type: 'string',
        description:
          "A 2048 bit bloom filter from the logs of the transaction. Each log sets 3 bits though taking the low-order 11 bits of each of the first three pairs of bytes in a Keccak 256 hash of the log's byte series",
      },
      Log: {
        title: 'log',
        type: 'object',
        description: 'An indexed event generated during a transaction',
        properties: {
          address: {
            title: 'LogAddress',
            description: 'Sender of the transaction',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
          blockHash: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
          blockNumber: {
            title: 'blockNumber',
            type: 'string',
            description: "The hex representation of the block's height",
            pattern: '^0x[a-fA-F0-9]+$',
          },
          data: {
            title: 'LogData',
            description: 'The data/input string sent along with the transaction',
            type: 'string',
            pattern: '^0x([a-fA-F0-9]?)+$',
          },
          logIndex: {
            title: 'LogIndex',
            description: 'The index of the event within its transaction, null when its pending',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
          },
          removed: {
            title: 'logIsRemoved',
            description: 'Whether or not the log was orphaned off the main chain',
            type: 'boolean',
          },
          topics: {
            title: 'LogTopics',
            description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
            type: 'array',
            items: {
              title: 'topic',
              description:
                '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
              type: 'string',
              pattern: '^0x([a-fA-F\\d]{64})?$',
            },
          },
          transactionHash: {
            title: 'transactionHash',
            type: 'string',
            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          transactionIndex: {
            title: 'transactionIndex',
            description: 'The index of the transaction. null when its pending',
            oneOf: [
              {
                title: 'integer',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
                description: 'Hex representation of the integer',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
        },
      },
      Topics: {
        title: 'LogTopics',
        description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
        type: 'array',
        items: {
          title: 'topic',
          description:
            '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
          type: 'string',
          pattern: '^0x([a-fA-F\\d]{64})?$',
        },
      },
      Topic: {
        title: 'topic',
        description:
          '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
        type: 'string',
        pattern: '^0x([a-fA-F\\d]{64})?$',
      },
      TransactionIndex: {
        title: 'transactionIndex',
        description: 'The index of the transaction. null when its pending',
        oneOf: [
          {
            title: 'integer',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
            description: 'Hex representation of the integer',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      BlockNumberOrNull: {
        title: 'blockNumberOrNull',
        description: 'The block number or null when its the pending block',
        oneOf: [
          {
            title: 'blockNumber',
            type: 'string',
            description: "The hex representation of the block's height",
            pattern: '^0x[a-fA-F0-9]+$',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      BlockHashOrNull: {
        title: 'blockHashOrNull',
        description: 'The block hash or null when its the pending block',
        oneOf: [
          {
            title: 'keccak',
            type: 'string',
            description: 'Hex representation of a Keccak 256 hash',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      NonceOrNull: {
        title: 'nonceOrNull',
        description: 'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
        oneOf: [
          {
            title: 'nonce',
            description: 'A number only to be used once',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      From: {
        title: 'From',
        description: 'The sender of the transaction',
        type: 'string',
        pattern: '^0x[a-fA-F\\d]{40}$',
      },
      To: {
        title: 'To',
        description: 'Destination address of the transaction. Null if it was a contract create.',
        oneOf: [
          {
            title: 'address',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      Block: {
        title: 'Block',
        description:
          'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
        type: 'object',
        properties: {
          number: {
            title: 'blockNumberOrNull',
            description: 'The block number or null when its the pending block',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          hash: {
            title: 'blockHashOrNull',
            description: 'The block hash or null when its the pending block',
            oneOf: [
              {
                title: 'keccak',
                type: 'string',
                description: 'Hex representation of a Keccak 256 hash',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          parentHash: {
            title: 'blockHash',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
            description: 'The hex representation of the Keccak 256 of the RLP encoded block',
          },
          nonce: {
            title: 'nonceOrNull',
            description: 'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
            oneOf: [
              {
                title: 'nonce',
                description: 'A number only to be used once',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          sha3Uncles: {
            title: 'blockShaUncles',
            description: 'Keccak hash of the uncles data in the block',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          logsBloom: {
            title: 'blockLogsBloom',
            type: 'string',
            description: 'The bloom filter for the logs of the block or null when its the pending block',
            pattern: '^0x[a-fA-F\\d]+$',
          },
          transactionsRoot: {
            title: 'blockTransactionsRoot',
            description: 'The root of the transactions trie of the block.',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          stateRoot: {
            title: 'blockStateRoot',
            description: 'The root of the final state trie of the block',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          receiptsRoot: {
            title: 'blockReceiptsRoot',
            description: 'The root of the receipts trie of the block',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          miner: {
            title: 'addressOrNull',
            oneOf: [
              {
                title: 'address',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          difficulty: {
            title: 'blockDifficulty',
            type: 'string',
            description: 'Integer of the difficulty for this block',
          },
          totalDifficulty: {
            title: 'blockTotalDifficulty',
            description: 'Integer of the total difficulty of the chain until this block',
            oneOf: [
              {
                title: 'integer',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
                description: 'Hex representation of the integer',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          extraData: {
            title: 'blockExtraData',
            type: 'string',
            description: "The 'extra data' field of this block",
          },
          size: {
            title: 'blockSize',
            type: 'string',
            description: 'Integer the size of this block in bytes',
          },
          gasLimit: {
            title: 'blockGasLimit',
            type: 'string',
            description: 'The maximum gas allowed in this block',
          },
          gasUsed: {
            title: 'blockGasUsed',
            type: 'string',
            description: 'The total used gas by all transactions in this block',
          },
          timestamp: {
            title: 'blockTimeStamp',
            type: 'string',
            description: 'The unix timestamp for when the block was collated',
          },
          transactions: {
            title: 'transactionsOrHashes',
            description:
              'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
            type: 'array',
            items: {
              title: 'transactionOrTransactionHash',
              oneOf: [
                {
                  title: 'transaction',
                  type: 'object',
                  required: ['gas', 'gasPrice', 'nonce'],
                  properties: {
                    blockHash: {
                      title: 'blockHashOrNull',
                      description: 'The block hash or null when its the pending block',
                      oneOf: [
                        {
                          title: 'keccak',
                          type: 'string',
                          description: 'Hex representation of a Keccak 256 hash',
                          pattern: '^0x[a-fA-F\\d]{64}$',
                        },
                        {
                          title: 'null',
                          type: 'null',
                          description: 'Null',
                        },
                      ],
                    },
                    blockNumber: {
                      title: 'blockNumberOrNull',
                      description: 'The block number or null when its the pending block',
                      oneOf: [
                        {
                          title: 'blockNumber',
                          type: 'string',
                          description: "The hex representation of the block's height",
                          pattern: '^0x[a-fA-F0-9]+$',
                        },
                        {
                          title: 'null',
                          type: 'null',
                          description: 'Null',
                        },
                      ],
                    },
                    from: {
                      title: 'From',
                      description: 'The sender of the transaction',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    gas: {
                      title: 'transactionGas',
                      type: 'string',
                      description: 'The gas limit provided by the sender in Wei',
                    },
                    gasPrice: {
                      title: 'transactionGasPrice',
                      type: 'string',
                      description: 'The gas price willing to be paid by the sender in Wei',
                    },
                    hash: {
                      title: 'transactionHash',
                      type: 'string',
                      description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    input: {
                      title: 'transactionInput',
                      type: 'string',
                      description: 'The data field sent with the transaction',
                    },
                    nonce: {
                      title: 'transactionNonce',
                      description: 'The total number of prior transactions made by the sender',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    to: {
                      title: 'To',
                      description: 'Destination address of the transaction. Null if it was a contract create.',
                      oneOf: [
                        {
                          title: 'address',
                          type: 'string',
                          pattern: '^0x[a-fA-F\\d]{40}$',
                        },
                        {
                          title: 'null',
                          type: 'null',
                          description: 'Null',
                        },
                      ],
                    },
                    transactionIndex: {
                      title: 'transactionIndex',
                      description: 'The index of the transaction. null when its pending',
                      oneOf: [
                        {
                          title: 'integer',
                          type: 'string',
                          pattern: '^0x[a-fA-F0-9]+$',
                          description: 'Hex representation of the integer',
                        },
                        {
                          title: 'null',
                          type: 'null',
                          description: 'Null',
                        },
                      ],
                    },
                    value: {
                      title: 'transactionValue',
                      description: 'Value of Ether being transferred in Wei',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    v: {
                      title: 'transactionSigV',
                      type: 'string',
                      description: 'ECDSA recovery id',
                    },
                    r: {
                      title: 'transactionSigR',
                      type: 'string',
                      description: 'ECDSA signature r',
                    },
                    s: {
                      title: 'transactionSigS',
                      type: 'string',
                      description: 'ECDSA signature s',
                    },
                  },
                },
                {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
              ],
            },
          },
          uncles: {
            title: 'uncleHashes',
            description: 'Array of uncle hashes',
            type: 'array',
            items: {
              title: 'uncleHash',
              description: 'Block hash of the RLP encoding of an uncle block',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
          },
        },
      },
      Transaction: {
        title: 'transaction',
        type: 'object',
        required: ['gas', 'gasPrice', 'nonce'],
        properties: {
          blockHash: {
            title: 'blockHashOrNull',
            description: 'The block hash or null when its the pending block',
            oneOf: [
              {
                title: 'keccak',
                type: 'string',
                description: 'Hex representation of a Keccak 256 hash',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          blockNumber: {
            title: 'blockNumberOrNull',
            description: 'The block number or null when its the pending block',
            oneOf: [
              {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          from: {
            title: 'From',
            description: 'The sender of the transaction',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{40}$',
          },
          gas: {
            title: 'transactionGas',
            type: 'string',
            description: 'The gas limit provided by the sender in Wei',
          },
          gasPrice: {
            title: 'transactionGasPrice',
            type: 'string',
            description: 'The gas price willing to be paid by the sender in Wei',
          },
          hash: {
            title: 'transactionHash',
            type: 'string',
            description: 'Keccak 256 Hash of the RLP encoding of a transaction',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          input: {
            title: 'transactionInput',
            type: 'string',
            description: 'The data field sent with the transaction',
          },
          nonce: {
            title: 'transactionNonce',
            description: 'The total number of prior transactions made by the sender',
            type: 'string',
            pattern: '^0x[a-fA-F0-9]+$',
          },
          to: {
            title: 'To',
            description: 'Destination address of the transaction. Null if it was a contract create.',
            oneOf: [
              {
                title: 'address',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          transactionIndex: {
            title: 'transactionIndex',
            description: 'The index of the transaction. null when its pending',
            oneOf: [
              {
                title: 'integer',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
                description: 'Hex representation of the integer',
              },
              {
                title: 'null',
                type: 'null',
                description: 'Null',
              },
            ],
          },
          value: {
            title: 'transactionValue',
            description: 'Value of Ether being transferred in Wei',
            type: 'string',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          v: {
            title: 'transactionSigV',
            type: 'string',
            description: 'ECDSA recovery id',
          },
          r: {
            title: 'transactionSigR',
            type: 'string',
            description: 'ECDSA signature r',
          },
          s: {
            title: 'transactionSigS',
            type: 'string',
            description: 'ECDSA signature s',
          },
        },
      },
      Transactions: {
        title: 'transactions',
        description: 'An array of transactions',
        type: 'array',
        items: {
          title: 'transaction',
          type: 'object',
          required: ['gas', 'gasPrice', 'nonce'],
          properties: {
            blockHash: {
              title: 'blockHashOrNull',
              description: 'The block hash or null when its the pending block',
              oneOf: [
                {
                  title: 'keccak',
                  type: 'string',
                  description: 'Hex representation of a Keccak 256 hash',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            blockNumber: {
              title: 'blockNumberOrNull',
              description: 'The block number or null when its the pending block',
              oneOf: [
                {
                  title: 'blockNumber',
                  type: 'string',
                  description: "The hex representation of the block's height",
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            from: {
              title: 'From',
              description: 'The sender of the transaction',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{40}$',
            },
            gas: {
              title: 'transactionGas',
              type: 'string',
              description: 'The gas limit provided by the sender in Wei',
            },
            gasPrice: {
              title: 'transactionGasPrice',
              type: 'string',
              description: 'The gas price willing to be paid by the sender in Wei',
            },
            hash: {
              title: 'transactionHash',
              type: 'string',
              description: 'Keccak 256 Hash of the RLP encoding of a transaction',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            input: {
              title: 'transactionInput',
              type: 'string',
              description: 'The data field sent with the transaction',
            },
            nonce: {
              title: 'transactionNonce',
              description: 'The total number of prior transactions made by the sender',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
            },
            to: {
              title: 'To',
              description: 'Destination address of the transaction. Null if it was a contract create.',
              oneOf: [
                {
                  title: 'address',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            transactionIndex: {
              title: 'transactionIndex',
              description: 'The index of the transaction. null when its pending',
              oneOf: [
                {
                  title: 'integer',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                  description: 'Hex representation of the integer',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            value: {
              title: 'transactionValue',
              description: 'Value of Ether being transferred in Wei',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            v: {
              title: 'transactionSigV',
              type: 'string',
              description: 'ECDSA recovery id',
            },
            r: {
              title: 'transactionSigR',
              type: 'string',
              description: 'ECDSA signature r',
            },
            s: {
              title: 'transactionSigS',
              type: 'string',
              description: 'ECDSA signature s',
            },
          },
        },
      },
      TransactionHash: {
        title: 'transactionHash',
        type: 'string',
        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
        pattern: '^0x[a-fA-F\\d]{64}$',
      },
      KeccakOrPending: {
        title: 'keccakOrPending',
        oneOf: [
          {
            title: 'keccak',
            type: 'string',
            description: 'Hex representation of a Keccak 256 hash',
            pattern: '^0x[a-fA-F\\d]{64}$',
          },
          {
            title: 'null',
            type: 'null',
            description: 'Null',
          },
        ],
      },
      Keccak: {
        title: 'keccak',
        type: 'string',
        description: 'Hex representation of a Keccak 256 hash',
        pattern: '^0x[a-fA-F\\d]{64}$',
      },
      Nonce: {
        title: 'nonce',
        description: 'A number only to be used once',
        type: 'string',
        pattern: '^0x[a-fA-F0-9]+$',
      },
      Null: {
        title: 'null',
        type: 'null',
        description: 'Null',
      },
      Integer: {
        title: 'integer',
        type: 'string',
        pattern: '^0x[a-fA-F0-9]+$',
        description: 'Hex representation of the integer',
      },
      Address: {
        title: 'address',
        type: 'string',
        pattern: '^0x[a-fA-F\\d]{40}$',
      },
      Addresses: {
        title: 'addresses',
        type: 'array',
        description: 'List of contract addresses from which to monitor events',
        items: {
          title: 'address',
          type: 'string',
          pattern: '^0x[a-fA-F\\d]{40}$',
        },
      },
      Position: {
        title: 'position',
        type: 'string',
        description: 'Hex representation of the storage slot where the variable exists',
        pattern: '^0x([a-fA-F0-9]?)+$',
      },
      DataWord: {
        title: 'dataWord',
        type: 'string',
        description: 'Hex representation of a 256 bit unit of data',
        pattern: '^0x([a-fA-F\\d]{64})?$',
      },
      Bytes: {
        title: 'bytes',
        type: 'string',
        description: 'Hex representation of a variable length byte array',
        pattern: '^0x([a-fA-F0-9]?)+$',
      },
    },
    contentDescriptors: {
      Block: {
        name: 'block',
        summary: 'A block',
        description: 'A block object',
        schema: {
          title: 'Block',
          description:
            'The Block is the collection of relevant pieces of information (known as the block header), together with information corresponding to the comprised transactions, and a set of other block headers that are known to have a parent equal to the present block???s parent???s parent.',
          type: 'object',
          properties: {
            number: {
              title: 'blockNumberOrNull',
              description: 'The block number or null when its the pending block',
              oneOf: [
                {
                  title: 'blockNumber',
                  type: 'string',
                  description: "The hex representation of the block's height",
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            hash: {
              title: 'blockHashOrNull',
              description: 'The block hash or null when its the pending block',
              oneOf: [
                {
                  title: 'keccak',
                  type: 'string',
                  description: 'Hex representation of a Keccak 256 hash',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            parentHash: {
              title: 'blockHash',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
              description: 'The hex representation of the Keccak 256 of the RLP encoded block',
            },
            nonce: {
              title: 'nonceOrNull',
              description: 'Randomly selected number to satisfy the proof-of-work or null when its the pending block',
              oneOf: [
                {
                  title: 'nonce',
                  description: 'A number only to be used once',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            sha3Uncles: {
              title: 'blockShaUncles',
              description: 'Keccak hash of the uncles data in the block',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            logsBloom: {
              title: 'blockLogsBloom',
              type: 'string',
              description: 'The bloom filter for the logs of the block or null when its the pending block',
              pattern: '^0x[a-fA-F\\d]+$',
            },
            transactionsRoot: {
              title: 'blockTransactionsRoot',
              description: 'The root of the transactions trie of the block.',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            stateRoot: {
              title: 'blockStateRoot',
              description: 'The root of the final state trie of the block',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            receiptsRoot: {
              title: 'blockReceiptsRoot',
              description: 'The root of the receipts trie of the block',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            miner: {
              title: 'addressOrNull',
              oneOf: [
                {
                  title: 'address',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            difficulty: {
              title: 'blockDifficulty',
              type: 'string',
              description: 'Integer of the difficulty for this block',
            },
            totalDifficulty: {
              title: 'blockTotalDifficulty',
              description: 'Integer of the total difficulty of the chain until this block',
              oneOf: [
                {
                  title: 'integer',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                  description: 'Hex representation of the integer',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            extraData: {
              title: 'blockExtraData',
              type: 'string',
              description: "The 'extra data' field of this block",
            },
            size: {
              title: 'blockSize',
              type: 'string',
              description: 'Integer the size of this block in bytes',
            },
            gasLimit: {
              title: 'blockGasLimit',
              type: 'string',
              description: 'The maximum gas allowed in this block',
            },
            gasUsed: {
              title: 'blockGasUsed',
              type: 'string',
              description: 'The total used gas by all transactions in this block',
            },
            timestamp: {
              title: 'blockTimeStamp',
              type: 'string',
              description: 'The unix timestamp for when the block was collated',
            },
            transactions: {
              title: 'transactionsOrHashes',
              description:
                'Array of transaction objects, or 32 Bytes transaction hashes depending on the last given parameter',
              type: 'array',
              items: {
                title: 'transactionOrTransactionHash',
                oneOf: [
                  {
                    title: 'transaction',
                    type: 'object',
                    required: ['gas', 'gasPrice', 'nonce'],
                    properties: {
                      blockHash: {
                        title: 'blockHashOrNull',
                        description: 'The block hash or null when its the pending block',
                        oneOf: [
                          {
                            title: 'keccak',
                            type: 'string',
                            description: 'Hex representation of a Keccak 256 hash',
                            pattern: '^0x[a-fA-F\\d]{64}$',
                          },
                          {
                            title: 'null',
                            type: 'null',
                            description: 'Null',
                          },
                        ],
                      },
                      blockNumber: {
                        title: 'blockNumberOrNull',
                        description: 'The block number or null when its the pending block',
                        oneOf: [
                          {
                            title: 'blockNumber',
                            type: 'string',
                            description: "The hex representation of the block's height",
                            pattern: '^0x[a-fA-F0-9]+$',
                          },
                          {
                            title: 'null',
                            type: 'null',
                            description: 'Null',
                          },
                        ],
                      },
                      from: {
                        title: 'From',
                        description: 'The sender of the transaction',
                        type: 'string',
                        pattern: '^0x[a-fA-F\\d]{40}$',
                      },
                      gas: {
                        title: 'transactionGas',
                        type: 'string',
                        description: 'The gas limit provided by the sender in Wei',
                      },
                      gasPrice: {
                        title: 'transactionGasPrice',
                        type: 'string',
                        description: 'The gas price willing to be paid by the sender in Wei',
                      },
                      hash: {
                        title: 'transactionHash',
                        type: 'string',
                        description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                      input: {
                        title: 'transactionInput',
                        type: 'string',
                        description: 'The data field sent with the transaction',
                      },
                      nonce: {
                        title: 'transactionNonce',
                        description: 'The total number of prior transactions made by the sender',
                        type: 'string',
                        pattern: '^0x[a-fA-F0-9]+$',
                      },
                      to: {
                        title: 'To',
                        description: 'Destination address of the transaction. Null if it was a contract create.',
                        oneOf: [
                          {
                            title: 'address',
                            type: 'string',
                            pattern: '^0x[a-fA-F\\d]{40}$',
                          },
                          {
                            title: 'null',
                            type: 'null',
                            description: 'Null',
                          },
                        ],
                      },
                      transactionIndex: {
                        title: 'transactionIndex',
                        description: 'The index of the transaction. null when its pending',
                        oneOf: [
                          {
                            title: 'integer',
                            type: 'string',
                            pattern: '^0x[a-fA-F0-9]+$',
                            description: 'Hex representation of the integer',
                          },
                          {
                            title: 'null',
                            type: 'null',
                            description: 'Null',
                          },
                        ],
                      },
                      value: {
                        title: 'transactionValue',
                        description: 'Value of Ether being transferred in Wei',
                        type: 'string',
                        pattern: '^0x[a-fA-F\\d]{64}$',
                      },
                      v: {
                        title: 'transactionSigV',
                        type: 'string',
                        description: 'ECDSA recovery id',
                      },
                      r: {
                        title: 'transactionSigR',
                        type: 'string',
                        description: 'ECDSA signature r',
                      },
                      s: {
                        title: 'transactionSigS',
                        type: 'string',
                        description: 'ECDSA signature s',
                      },
                    },
                  },
                  {
                    title: 'transactionHash',
                    type: 'string',
                    description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                    pattern: '^0x[a-fA-F\\d]{64}$',
                  },
                ],
              },
            },
            uncles: {
              title: 'uncleHashes',
              description: 'Array of uncle hashes',
              type: 'array',
              items: {
                title: 'uncleHash',
                description: 'Block hash of the RLP encoding of an uncle block',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
            },
          },
        },
      },
      Null: {
        name: 'Null',
        description: 'JSON Null value',
        summary: 'Null value',
        schema: {
          title: 'null',
          type: 'null',
          description: 'Null',
        },
      },
      Signature: {
        name: 'signature',
        summary: 'The signature.',
        required: true,
        schema: {
          title: 'signatureBytes',
          type: 'string',
          description: 'Hex representation of byte array between 2 and 65 chars long',
          pattern: '0x^([A-Fa-f0-9]{2}){65}$',
        },
      },
      GasPrice: {
        name: 'gasPrice',
        required: true,
        schema: {
          title: 'gasPriceResult',
          description: 'Integer of the current gas price',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
        },
      },
      Transaction: {
        required: true,
        name: 'transaction',
        schema: {
          title: 'transaction',
          type: 'object',
          required: ['gas', 'gasPrice', 'nonce'],
          properties: {
            blockHash: {
              title: 'blockHashOrNull',
              description: 'The block hash or null when its the pending block',
              oneOf: [
                {
                  title: 'keccak',
                  type: 'string',
                  description: 'Hex representation of a Keccak 256 hash',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            blockNumber: {
              title: 'blockNumberOrNull',
              description: 'The block number or null when its the pending block',
              oneOf: [
                {
                  title: 'blockNumber',
                  type: 'string',
                  description: "The hex representation of the block's height",
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            from: {
              title: 'From',
              description: 'The sender of the transaction',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{40}$',
            },
            gas: {
              title: 'transactionGas',
              type: 'string',
              description: 'The gas limit provided by the sender in Wei',
            },
            gasPrice: {
              title: 'transactionGasPrice',
              type: 'string',
              description: 'The gas price willing to be paid by the sender in Wei',
            },
            hash: {
              title: 'transactionHash',
              type: 'string',
              description: 'Keccak 256 Hash of the RLP encoding of a transaction',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            input: {
              title: 'transactionInput',
              type: 'string',
              description: 'The data field sent with the transaction',
            },
            nonce: {
              title: 'transactionNonce',
              description: 'The total number of prior transactions made by the sender',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
            },
            to: {
              title: 'To',
              description: 'Destination address of the transaction. Null if it was a contract create.',
              oneOf: [
                {
                  title: 'address',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            transactionIndex: {
              title: 'transactionIndex',
              description: 'The index of the transaction. null when its pending',
              oneOf: [
                {
                  title: 'integer',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                  description: 'Hex representation of the integer',
                },
                {
                  title: 'null',
                  type: 'null',
                  description: 'Null',
                },
              ],
            },
            value: {
              title: 'transactionValue',
              description: 'Value of Ether being transferred in Wei',
              type: 'string',
              pattern: '^0x[a-fA-F\\d]{64}$',
            },
            v: {
              title: 'transactionSigV',
              type: 'string',
              description: 'ECDSA recovery id',
            },
            r: {
              title: 'transactionSigR',
              type: 'string',
              description: 'ECDSA signature r',
            },
            s: {
              title: 'transactionSigS',
              type: 'string',
              description: 'ECDSA signature s',
            },
          },
        },
      },
      TransactionResult: {
        name: 'transactionResult',
        description: 'Returns a transaction or null',
        schema: {
          title: 'TransactionOrNull',
          oneOf: [
            {
              title: 'transaction',
              type: 'object',
              required: ['gas', 'gasPrice', 'nonce'],
              properties: {
                blockHash: {
                  title: 'blockHashOrNull',
                  description: 'The block hash or null when its the pending block',
                  oneOf: [
                    {
                      title: 'keccak',
                      type: 'string',
                      description: 'Hex representation of a Keccak 256 hash',
                      pattern: '^0x[a-fA-F\\d]{64}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                blockNumber: {
                  title: 'blockNumberOrNull',
                  description: 'The block number or null when its the pending block',
                  oneOf: [
                    {
                      title: 'blockNumber',
                      type: 'string',
                      description: "The hex representation of the block's height",
                      pattern: '^0x[a-fA-F0-9]+$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                from: {
                  title: 'From',
                  description: 'The sender of the transaction',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                gas: {
                  title: 'transactionGas',
                  type: 'string',
                  description: 'The gas limit provided by the sender in Wei',
                },
                gasPrice: {
                  title: 'transactionGasPrice',
                  type: 'string',
                  description: 'The gas price willing to be paid by the sender in Wei',
                },
                hash: {
                  title: 'transactionHash',
                  type: 'string',
                  description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                input: {
                  title: 'transactionInput',
                  type: 'string',
                  description: 'The data field sent with the transaction',
                },
                nonce: {
                  title: 'transactionNonce',
                  description: 'The total number of prior transactions made by the sender',
                  type: 'string',
                  pattern: '^0x[a-fA-F0-9]+$',
                },
                to: {
                  title: 'To',
                  description: 'Destination address of the transaction. Null if it was a contract create.',
                  oneOf: [
                    {
                      title: 'address',
                      type: 'string',
                      pattern: '^0x[a-fA-F\\d]{40}$',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                transactionIndex: {
                  title: 'transactionIndex',
                  description: 'The index of the transaction. null when its pending',
                  oneOf: [
                    {
                      title: 'integer',
                      type: 'string',
                      pattern: '^0x[a-fA-F0-9]+$',
                      description: 'Hex representation of the integer',
                    },
                    {
                      title: 'null',
                      type: 'null',
                      description: 'Null',
                    },
                  ],
                },
                value: {
                  title: 'transactionValue',
                  description: 'Value of Ether being transferred in Wei',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{64}$',
                },
                v: {
                  title: 'transactionSigV',
                  type: 'string',
                  description: 'ECDSA recovery id',
                },
                r: {
                  title: 'transactionSigR',
                  type: 'string',
                  description: 'ECDSA signature r',
                },
                s: {
                  title: 'transactionSigS',
                  type: 'string',
                  description: 'ECDSA signature s',
                },
              },
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
      UncleCountResult: {
        name: 'uncleCountResult',
        description: 'The Number of total uncles in the given block',
        schema: {
          title: 'integerOrNull',
          oneOf: [
            {
              title: 'integer',
              type: 'string',
              pattern: '^0x[a-fA-F0-9]+$',
              description: 'Hex representation of the integer',
            },
            {
              title: 'null',
              type: 'null',
              description: 'Null',
            },
          ],
        },
      },
      Message: {
        name: 'message',
        required: true,
        schema: {
          title: 'bytes',
          type: 'string',
          description: 'Hex representation of a variable length byte array',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
      Filter: {
        name: 'filter',
        required: true,
        schema: {
          title: 'filter',
          type: 'object',
          description: 'A filter used to monitor the blockchain for log/events',
          properties: {
            fromBlock: {
              title: 'blockNumber',
              type: 'string',
              description: "The hex representation of the block's height",
              pattern: '^0x[a-fA-F0-9]+$',
            },
            toBlock: {
              title: 'blockNumber',
              type: 'string',
              description: "The hex representation of the block's height",
              pattern: '^0x[a-fA-F0-9]+$',
            },
            address: {
              title: 'oneOrArrayOfAddresses',
              oneOf: [
                {
                  title: 'address',
                  type: 'string',
                  pattern: '^0x[a-fA-F\\d]{40}$',
                },
                {
                  title: 'addresses',
                  type: 'array',
                  description: 'List of contract addresses from which to monitor events',
                  items: {
                    title: 'address',
                    type: 'string',
                    pattern: '^0x[a-fA-F\\d]{40}$',
                  },
                },
              ],
            },
            topics: {
              title: 'LogTopics',
              description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
              type: 'array',
              items: {
                title: 'topic',
                description:
                  '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                type: 'string',
                pattern: '^0x([a-fA-F\\d]{64})?$',
              },
            },
          },
        },
      },
      Address: {
        name: 'address',
        required: true,
        schema: {
          title: 'address',
          type: 'string',
          pattern: '^0x[a-fA-F\\d]{40}$',
        },
      },
      BlockHash: {
        name: 'blockHash',
        required: true,
        schema: {
          title: 'blockHash',
          type: 'string',
          pattern: '^0x[a-fA-F\\d]{64}$',
          description: 'The hex representation of the Keccak 256 of the RLP encoded block',
        },
      },
      Nonce: {
        name: 'nonce',
        required: true,
        schema: {
          title: 'nonce',
          description: 'A number only to be used once',
          type: 'string',
          pattern: '^0x[a-fA-F0-9]+$',
        },
      },
      Position: {
        name: 'key',
        required: true,
        schema: {
          title: 'position',
          type: 'string',
          description: 'Hex representation of the storage slot where the variable exists',
          pattern: '^0x([a-fA-F0-9]?)+$',
        },
      },
      Logs: {
        name: 'logs',
        description: 'An array of all logs matching filter with given id.',
        schema: {
          title: 'setOfLogs',
          type: 'array',
          items: {
            title: 'log',
            type: 'object',
            description: 'An indexed event generated during a transaction',
            properties: {
              address: {
                title: 'LogAddress',
                description: 'Sender of the transaction',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{40}$',
              },
              blockHash: {
                title: 'blockHash',
                type: 'string',
                pattern: '^0x[a-fA-F\\d]{64}$',
                description: 'The hex representation of the Keccak 256 of the RLP encoded block',
              },
              blockNumber: {
                title: 'blockNumber',
                type: 'string',
                description: "The hex representation of the block's height",
                pattern: '^0x[a-fA-F0-9]+$',
              },
              data: {
                title: 'LogData',
                description: 'The data/input string sent along with the transaction',
                type: 'string',
                pattern: '^0x([a-fA-F0-9]?)+$',
              },
              logIndex: {
                title: 'LogIndex',
                description: 'The index of the event within its transaction, null when its pending',
                type: 'string',
                pattern: '^0x[a-fA-F0-9]+$',
              },
              removed: {
                title: 'logIsRemoved',
                description: 'Whether or not the log was orphaned off the main chain',
                type: 'boolean',
              },
              topics: {
                title: 'LogTopics',
                description: "Topics are order-dependent. Each topic can also be an array of DATA with 'or' options.",
                type: 'array',
                items: {
                  title: 'topic',
                  description:
                    '32 Bytes DATA of indexed log arguments. (In solidity: The first topic is the hash of the signature of the event (e.g. Deposit(address,bytes32,uint256))',
                  type: 'string',
                  pattern: '^0x([a-fA-F\\d]{64})?$',
                },
              },
              transactionHash: {
                title: 'transactionHash',
                type: 'string',
                description: 'Keccak 256 Hash of the RLP encoding of a transaction',
                pattern: '^0x[a-fA-F\\d]{64}$',
              },
              transactionIndex: {
                title: 'transactionIndex',
                description: 'The index of the transaction. null when its pending',
                oneOf: [
                  {
                    title: 'integer',
                    type: 'string',
                    pattern: '^0x[a-fA-F0-9]+$',
                    description: 'Hex representation of the integer',
                  },
                  {
                    title: 'null',
                    type: 'null',
                    description: 'Null',
                  },
                ],
              },
            },
          },
        },
      },
      FilterId: {
        name: 'filterId',
        schema: {
          title: 'filterId',
          type: 'string',
          description: 'An identifier used to reference the filter.',
        },
      },
      BlockNumber: {
        name: 'blockNumber',
        required: true,
        schema: {
          title: 'blockNumberOrTag',
          oneOf: [
            {
              title: 'blockNumber',
              type: 'string',
              description: "The hex representation of the block's height",
              pattern: '^0x[a-fA-F0-9]+$',
            },
            {
              title: 'blockNumberTag',
              type: 'string',
              description: 'The optional block height description',
              enum: ['earliest', 'latest', 'pending'],
            },
          ],
        },
      },
      TransactionHash: {
        name: 'transactionHash',
        required: true,
        schema: {
          title: 'transactionHash',
          type: 'string',
          description: 'Keccak 256 Hash of the RLP encoding of a transaction',
          pattern: '^0x[a-fA-F\\d]{64}$',
        },
      },
    },
  },
};
