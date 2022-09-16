import {
	PostMessageWindowTransport,
	PostMessageIframeTransport,
	WebSocketTransport,
	HTTPTransport,
	Client,
	RequestManager,
	JSONRPCError,
} from "@open-rpc/client-js";
import { MethodObject, OpenrpcDocument as OpenRPC } from "@open-rpc/meta-schema";
import {
	MethodNotFoundError,
	MethodCallValidator,
} from "@open-rpc/schema-utils-js";
import {
	EthBlockNumber,
	EthCall,
	EthChainId,
	EthCoinbase,
	EthEstimateGas,
	EthGasPrice,
	EthGetBalance,
	EthGetBlockByHash,
	EthGetBlockByNumber,
	EthGetBlockTransactionCountByHash,
	EthGetBlockTransactionCountByNumber,
	EthGetCode,
	EthGetFilterChanges,
	EthGetFilterLogs,
	EthGetLogs,
	EthGetProof,
	EthGetRawTransactionByBlockHashAndIndex,
	EthGetRawTransactionByBlockNumberAndIndex,
	EthGetRawTransactionByHash,
	EthGetStorageAt,
	EthGetTransactionByBlockHashAndIndex,
	EthGetTransactionByBlockNumberAndIndex,
	EthGetTransactionByHash,
	EthGetTransactionCount,
	EthGetTransactionReceipt,
	EthGetUncleByBlockHashAndIndex,
	EthGetUncleByBlockNumberAndIndex,
	EthGetUncleCountByBlockHash,
	EthGetUncleCountByBlockNumber,
	EthGetWork,
	EthHashrate,
	EthMining,
	EthNewBlockFilter,
	EthNewFilter,
	EthNewPendingTransactionFilter,
	EthPendingTransactions,
	EthProtocolVersion,
	EthSendRawTransaction,
	EthSubmitHashrate,
	EthSubmitWork,
	EthSyncing,
	EthUninstallFilter,
	NetListening,
	NetPeerCount,
	NetVersion,
	Options,
	Web3ClientVersion,
	Web3Sha3,
} from "./models/utils-types.model";
import { find, map, zipObject } from "lodash";
import { OpenRPCDocument } from "./open-rpc-document";

export class EthereumJSONRPC {
	rpc: Client;
	transport:
		| HTTPTransport
		| WebSocketTransport
		| PostMessageWindowTransport
		| PostMessageIframeTransport;
	private validator;
	private timeout!: number;

	web3_clientVersion: Web3ClientVersion;
	web3_sha3: Web3Sha3;
	net_listening: NetListening;
	net_peerCount: NetPeerCount;
	net_version: NetVersion;
	eth_blockNumber: EthBlockNumber;
	eth_call: EthCall;
	eth_chainId: EthChainId;
	eth_coinbase: EthCoinbase;
	eth_estimateGas: EthEstimateGas;
	eth_gasPrice: EthGasPrice;
	eth_getBalance: EthGetBalance;
	eth_getBlockByHash: EthGetBlockByHash;
	eth_getBlockByNumber: EthGetBlockByNumber;
	eth_getBlockTransactionCountByHash: EthGetBlockTransactionCountByHash;
	eth_getBlockTransactionCountByNumber: EthGetBlockTransactionCountByNumber;
	eth_getCode: EthGetCode;
	eth_getFilterChanges: EthGetFilterChanges;
	eth_getFilterLogs: EthGetFilterLogs;
	eth_getRawTransactionByHash: EthGetRawTransactionByHash;
	eth_getRawTransactionByBlockHashAndIndex: EthGetRawTransactionByBlockHashAndIndex;
	eth_getRawTransactionByBlockNumberAndIndex: EthGetRawTransactionByBlockNumberAndIndex;
	eth_getLogs: EthGetLogs;
	eth_getStorageAt: EthGetStorageAt;
	eth_getTransactionByBlockHashAndIndex: EthGetTransactionByBlockHashAndIndex;
	eth_getTransactionByBlockNumberAndIndex: EthGetTransactionByBlockNumberAndIndex;
	eth_getTransactionByHash: EthGetTransactionByHash;
	eth_getTransactionCount: EthGetTransactionCount;
	eth_getTransactionReceipt: EthGetTransactionReceipt;
	eth_getUncleByBlockHashAndIndex: EthGetUncleByBlockHashAndIndex;
	eth_getUncleByBlockNumberAndIndex: EthGetUncleByBlockNumberAndIndex;
	eth_getUncleCountByBlockHash: EthGetUncleCountByBlockHash;
	eth_getUncleCountByBlockNumber: EthGetUncleCountByBlockNumber;
	eth_getProof: EthGetProof;
	eth_getWork: EthGetWork;
	eth_hashrate: EthHashrate;
	eth_mining: EthMining;
	eth_newBlockFilter: EthNewBlockFilter;
	eth_newFilter: EthNewFilter;
	eth_newPendingTransactionFilter: EthNewPendingTransactionFilter;
	eth_pendingTransactions: EthPendingTransactions;
	eth_protocolVersion: EthProtocolVersion;
	eth_sendRawTransaction: EthSendRawTransaction;
	eth_submitHashrate: EthSubmitHashrate;
	eth_submitWork: EthSubmitWork;
	eth_syncing: EthSyncing;
	eth_uninstallFilter: EthUninstallFilter;

	public constructor(options: Options) {
		this.web3_clientVersion = (...params) => {
			return this.request("web3_clientVersion", params);
		};
		this.web3_sha3 = (...params) => {
			return this.request("web3_sha3", params);
		};
		this.net_listening = (...params) => {
			return this.request("net_listening", params);
		};
		this.net_peerCount = (...params) => {
			return this.request("net_peerCount", params);
		};
		this.net_version = (...params) => {
			return this.request("net_version", params);
		};
		this.eth_blockNumber = (...params) => {
			return this.request("eth_blockNumber", params);
		};
		this.eth_call = (...params) => {
			return this.request("eth_call", params);
		};
		this.eth_chainId = (...params) => {
			return this.request("eth_chainId", params);
		};
		this.eth_coinbase = (...params) => {
			return this.request("eth_coinbase", params);
		};
		this.eth_estimateGas = (...params) => {
			return this.request("eth_estimateGas", params);
		};
		this.eth_gasPrice = (...params) => {
			return this.request("eth_gasPrice", params);
		};
		this.eth_getBalance = (...params) => {
			return this.request("eth_getBalance", params);
		};
		this.eth_getBlockByHash = (...params) => {
			return this.request("eth_getBlockByHash", params);
		};
		this.eth_getBlockByNumber = (...params) => {
			return this.request("eth_getBlockByNumber", params);
		};
		this.eth_getBlockTransactionCountByHash = (...params) => {
			return this.request("eth_getBlockTransactionCountByHash", params);
		};
		this.eth_getBlockTransactionCountByNumber = (...params) => {
			return this.request("eth_getBlockTransactionCountByNumber", params);
		};
		this.eth_getCode = (...params) => {
			return this.request("eth_getCode", params);
		};
		this.eth_getFilterChanges = (...params) => {
			return this.request("eth_getFilterChanges", params);
		};
		this.eth_getFilterLogs = (...params) => {
			return this.request("eth_getFilterLogs", params);
		};
		this.eth_getRawTransactionByHash = (...params) => {
			return this.request("eth_getRawTransactionByHash", params);
		};
		this.eth_getRawTransactionByBlockHashAndIndex = (...params) => {
			return this.request("eth_getRawTransactionByBlockHashAndIndex", params);
		};
		this.eth_getRawTransactionByBlockNumberAndIndex = (...params) => {
			return this.request("eth_getRawTransactionByBlockNumberAndIndex", params);
		};
		this.eth_getLogs = (...params) => {
			return this.request("eth_getLogs", params);
		};
		this.eth_getStorageAt = (...params) => {
			return this.request("eth_getStorageAt", params);
		};
		this.eth_getTransactionByBlockHashAndIndex = (...params) => {
			return this.request("eth_getTransactionByBlockHashAndIndex", params);
		};
		this.eth_getTransactionByBlockNumberAndIndex = (...params) => {
			return this.request("eth_getTransactionByBlockNumberAndIndex", params);
		};
		this.eth_getTransactionByHash = (...params) => {
			return this.request("eth_getTransactionByHash", params);
		};
		this.eth_getTransactionCount = (...params) => {
			return this.request("eth_getTransactionCount", params);
		};
		this.eth_getTransactionReceipt = (...params) => {
			return this.request("eth_getTransactionReceipt", params);
		};
		this.eth_getUncleByBlockHashAndIndex = (...params) => {
			return this.request("eth_getUncleByBlockHashAndIndex", params);
		};
		this.eth_getUncleByBlockNumberAndIndex = (...params) => {
			return this.request("eth_getUncleByBlockNumberAndIndex", params);
		};
		this.eth_getUncleCountByBlockHash = (...params) => {
			return this.request("eth_getUncleCountByBlockHash", params);
		};
		this.eth_getUncleCountByBlockNumber = (...params) => {
			return this.request("eth_getUncleCountByBlockNumber", params);
		};
		this.eth_getProof = (...params) => {
			return this.request("eth_getProof", params);
		};
		this.eth_getWork = (...params) => {
			return this.request("eth_getWork", params);
		};
		this.eth_hashrate = (...params) => {
			return this.request("eth_hashrate", params);
		};
		this.eth_mining = (...params) => {
			return this.request("eth_mining", params);
		};
		this.eth_newBlockFilter = (...params) => {
			return this.request("eth_newBlockFilter", params);
		};
		this.eth_newFilter = (...params) => {
			return this.request("eth_newFilter", params);
		};
		this.eth_newPendingTransactionFilter = (...params) => {
			return this.request("eth_newPendingTransactionFilter", params);
		};
		this.eth_pendingTransactions = (...params) => {
			return this.request("eth_pendingTransactions", params);
		};
		this.eth_protocolVersion = (...params) => {
			return this.request("eth_protocolVersion", params);
		};
		this.eth_sendRawTransaction = (...params) => {
			return this.request("eth_sendRawTransaction", params);
		};
		this.eth_submitHashrate = (...params) => {
			return this.request("eth_submitHashrate", params);
		};
		this.eth_submitWork = (...params) => {
			return this.request("eth_submitWork", params);
		};
		this.eth_syncing = (...params) => {
			return this.request("eth_syncing", params);
		};
		this.eth_uninstallFilter = (...params) => {
			return this.request("eth_uninstallFilter", params);
		};
		if (
			options.transport === undefined ||
			options.transport.type === undefined
		) {
			throw new Error("Invalid constructor params");
		}
		const { type, host, port, protocol } = options.transport;
		let path = options.transport.path || "";
		if (path && path[0] !== "/") {
			path = "/" + path;
		}
		switch (type) {
			case "http":
			case "https":
				this.transport = new HTTPTransport(
					(protocol || type) + "://" + host + ":" + port + path
				);
				break;
			case "websocket":
				this.transport = new WebSocketTransport(
					(protocol || "ws://") + host + ":" + port + path
				);
				break;
			case "postmessageiframe":
				this.transport = new PostMessageIframeTransport(
					protocol + "://" + host + ":" + port + path
				);
				break;
			case "postmessagewindow":
				this.transport = new PostMessageWindowTransport(
					protocol + "://" + host + ":" + port + path
				);
				break;
			default:
				throw new Error("unsupported transport");
				break;
		}
		this.rpc = new Client(new RequestManager([this.transport]));
		this.validator = new MethodCallValidator(OpenRPCDocument);
	}
	/**
	 * Adds a JSONRPC notification handler to handle receiving notifications.
	 * @example
	 * myClient.onNotification((data)=>console.log(data));
	 */
	public onNotification(callback: (data: any) => void): void {
		this.rpc.onNotification(callback);
	}
	/**
	 * Adds an optional JSONRPCError handler to handle receiving errors that cannot be resolved to a specific request
	 * @example
	 * myClient.onError((err: JSONRPCError)=>console.log(err.message));
	 */
	public onError(callback: (data: JSONRPCError) => void): void {
		this.rpc.onError(callback);
	}
	/**
	 * Sets a default timeout in ms for all requests excluding notifications.
	 * @example
	 * // 20s timeout
	 * myClient.setDefaultTimeout(20000);
	 * // Removes timeout from request
	 * myClient.setDefaultTimeout(undefined);
	 */
	public setDefaultTimeout(ms: number): void {
		this.timeout = ms;
	}

	public startBatch(): void {
		return this.rpc.startBatch();
	}

	public stopBatch(): void {
		return this.rpc.stopBatch();
	}

	private request(methodName: string, params: any[]): Promise<any> {
		const methodObject = find<MethodObject>(
			(OpenRPCDocument.methods as MethodObject[]),
			({ name }) => name === methodName
		) as any;
		const notification = methodObject?.result ? false : true;
		const openRpcMethodValidationErrors = this.validator.validate(
			methodName,
			params
		);
		if (
			openRpcMethodValidationErrors instanceof MethodNotFoundError ||
			openRpcMethodValidationErrors.length > 0
		) {
			return Promise.reject(openRpcMethodValidationErrors);
		}
		let rpcParams;
		if (
			methodObject.paramStructure &&
			methodObject.paramStructure === "by-name"
		) {
			rpcParams = zipObject(params, map(methodObject.params, "name"));
		} else {
			rpcParams = params;
		}
		if (notification) {
			return this.rpc.notify({ method: methodName, params: rpcParams });
		}
		return this.rpc.request(
			{ method: methodName, params: rpcParams },
			this.timeout
		);
	}
}
