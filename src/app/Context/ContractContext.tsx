"use client"
import React, { createContext,useContext, useState } from 'react';
import { ethers ,BrowserProvider,Eip1193Provider,Contract} from 'ethers';
import detectEthereumProvider from '@metamask/detect-provider';
import { MetaMaskInpageProvider } from "@metamask/providers"
import { Maybe } from '@metamask/providers/dist/utils';
import ContractAbi from '../../../../BlockVerse/artifacts/contracts/movies.sol/Movie.json'

const ContractContext = createContext<ContractContextValue|undefined>(undefined);
type ContractContextValue={
    currentUser:string|undefined,
    contractInstance:Contract|undefined,
    tokenInstance:Contract|undefined,
    connectWallet: () => {}
}
interface ContractProviderProps {
    children: React.ReactNode;
  }
  declare global {
    interface Window{
      ethereum?:MetaMaskInpageProvider
    }
  }

     export const ContractProvider:React.FC<ContractProviderProps> = ({ children }) => {
     const [contractInstance,setContractInstance] = useState<Contract|undefined>();
     const [tokenInstance,setTokenInstance] = useState<Contract|undefined>();
     const [currentUser,setCurrentUser] = useState<string|undefined>(undefined);
   //  const [provider,setProvider] = useState<BrowserProvider|undefined>();
     const abi = ContractAbi.abi;
     const contractAddress = "0x5BBE5E74BcE3bE1B4D8D5848bfa1A89724b1A719";
     async function connectWallet(){
         if(typeof window !== "undefined"){  
           const ETHProvider:Eip1193Provider|null = await detectEthereumProvider();
             if(ETHProvider){
                 sendRequest(new ethers.BrowserProvider(ETHProvider));
             }
             else{
                    alert("Please install metamask wallet to use this site")
                      
             }
         }
      }

         
     const sendRequest =async(provider: ethers.BrowserProvider)=>{

           try{    
             if(provider){
             // setProvider(provider)
             const account = await provider.send('eth_requestAccounts',[]);
             setCurrentUser(account[0]);
             window.ethereum?.on('accountsChanged', updateCurrentWalletAddress);
             // getInstance();
             console.log("connect wallet called")
             getInstance(provider);
             getTokenInstance(provider);
             }
           }catch(err:any){
           
             console.log(err.message)
           }
       }
            
       const updateCurrentWalletAddress = async () => {
        try {
          const accounts: Maybe<string[]> = await window.ethereum?.request({
            method: "eth_requestAccounts",
          });
      
          if (accounts) {
            setCurrentUser(accounts[0]);
            console.log("Accounts updated");
          }
        } catch (error) {
          console.error("Error updating wallet address:", error);
        }
      };
    
      const getInstance= async(provider: ethers.BrowserProvider)=>{
         
        try{
        
         const signer = await provider?.getSigner();
         const contractInst = new ethers.Contract(contractAddress,abi,signer);
         setContractInstance(contractInst);
         
        }
        catch(err:any){
           console.log(err.message);
         }
      }
    const getTokenInstance = async(provider: ethers.BrowserProvider)=>{
      const tokenAbi = [
        {
          constant: false,
          inputs: [
            { name: "_spender", type: "address" },
            { name: "_value", type: "uint256" },
          ],
          name: "approve",
          outputs: [],
          payable: false,
          stateMutability: "nonpayable",
          type: "function",
        },
      ];

      const tokenAddress = "0x2a4c6394886502942d4Dd3d0Fd5E0B6245136f0d";
      const signer = await provider.getSigner(); // Replace with your token address
      const tokenInstance = new ethers.Contract(tokenAddress, tokenAbi,signer );
      setTokenInstance(tokenInstance);
      
    }
    
    
      return (
        <ContractContext.Provider value={{connectWallet, currentUser, contractInstance,tokenInstance }}>
          {children}
        </ContractContext.Provider>
      );
};

export const useContract = () => useContext(ContractContext);