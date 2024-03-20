/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Contract,
  ContractFactory,
  ContractTransactionResponse,
  Interface,
} from "ethers";
import type { Signer, ContractDeployTransaction, ContractRunner } from "ethers";
import type { NonPayableOverrides } from "../common";
import type { Movie, MovieInterface } from "../Movie";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint32",
        name: "",
        type: "uint32",
      },
    ],
    name: "movies",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint32",
        name: "_movieId",
        type: "uint32",
      },
    ],
    name: "watchMovie",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "payable",
    type: "function",
  },
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50610500806100206000396000f3fe6080604052600436106100295760003560e01c8063de9843fa1461002e578063f49e77521461005e575b600080fd5b61004860048036038101906100439190610271565b61009b565b60405161005591906102b9565b60405180910390f35b34801561006a57600080fd5b5061008560048036038101906100809190610332565b610201565b60405161009291906102b9565b60405180910390f35b60008060003373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008363ffffffff1663ffffffff16815260200190815260200160002060009054906101000a900460ff161561011457600190506101fc565b6000620f4240670de0b6b3a76400008463ffffffff1661013491906103ab565b61013e919061041c565b9050803414610182576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610179906104aa565b60405180910390fd5b60016000803373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008563ffffffff1663ffffffff16815260200190815260200160002060006101000a81548160ff02191690831515021790555060019150505b919050565b60006020528160005260406000206020528060005260406000206000915091509054906101000a900460ff1681565b600080fd5b600063ffffffff82169050919050565b61024e81610235565b811461025957600080fd5b50565b60008135905061026b81610245565b92915050565b60006020828403121561028757610286610230565b5b60006102958482850161025c565b91505092915050565b60008115159050919050565b6102b38161029e565b82525050565b60006020820190506102ce60008301846102aa565b92915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b60006102ff826102d4565b9050919050565b61030f816102f4565b811461031a57600080fd5b50565b60008135905061032c81610306565b92915050565b6000806040838503121561034957610348610230565b5b60006103578582860161031d565b92505060206103688582860161025c565b9150509250929050565b6000819050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006103b682610372565b91506103c183610372565b92508282026103cf81610372565b915082820484148315176103e6576103e561037c565b5b5092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601260045260246000fd5b600061042782610372565b915061043283610372565b925082610442576104416103ed565b5b828204905092915050565b600082825260208201905092915050565b7f506c65617365207061792074686520657861637420616d6f756e740000000000600082015250565b6000610494601b8361044d565b915061049f8261045e565b602082019050919050565b600060208201905081810360008301526104c381610487565b905091905056fea2646970667358221220d5c1b80ef83adbe593d25059c6c0cbc6a75a52ac388154e4d85b5af2a37d05e364736f6c63430008130033";

type MovieConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: MovieConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Movie__factory extends ContractFactory {
  constructor(...args: MovieConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override getDeployTransaction(
    overrides?: NonPayableOverrides & { from?: string }
  ): Promise<ContractDeployTransaction> {
    return super.getDeployTransaction(overrides || {});
  }
  override deploy(overrides?: NonPayableOverrides & { from?: string }) {
    return super.deploy(overrides || {}) as Promise<
      Movie & {
        deploymentTransaction(): ContractTransactionResponse;
      }
    >;
  }
  override connect(runner: ContractRunner | null): Movie__factory {
    return super.connect(runner) as Movie__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): MovieInterface {
    return new Interface(_abi) as MovieInterface;
  }
  static connect(address: string, runner?: ContractRunner | null): Movie {
    return new Contract(address, _abi, runner) as unknown as Movie;
  }
}
