import { useState, useRef, useEffect } from "react";
import Web3Modal from 'web3modal'
import { providers } from "ethers";

const Metamask = () => {
    let chainId;
    const [connectToWallet, setConnectedWallet] = useState(false)
    const [getChainId, setChainId] = useState(null);
    // const providerOptions= {
    //     walletconnect: {
    //         options: {
    //             rpc: {
    //                 8301: 'https://backend.buildbear.io/node/bold-bohr-2aa906'
    //             },
    //             chainId: 8301
    //         }
    //     }
    // }
    const Web3ModalRef = useRef();
    const getSignerorProvider = async (needSigner = true) => {
        const provider = await Web3ModalRef.current.connect();
        const Web3Provider = new providers.Web3Provider(provider);
        chainId = await Web3Provider.getNetwork();
        var fetchChainId = chainId
        // if (chainId !== 8301) {
        //     alert('Use BuildBear Network')
        //     throw new Error('Change network to BuildBear');
        // }
    
        if (needSigner) {
            const signer = Web3Provider.getSigner(); //TODO: this is the signer
            // console.log(signer, 'signer')
            return signer;
        }
        return provider;
    }


    const connectWallet = async () => {
       try {
        await getSignerorProvider();
        setConnectedWallet(true)
        setChainId(chainId)
        console.log(chainId)
       } catch (err) {
        console.log(err)
       }
    }

    useEffect(() => {
        Web3ModalRef.current = new Web3Modal({        
        })
    }, [])
   return (
    <div>
        <button onClick={connectWallet}>{connectToWallet? <p>Connected To Web3</p>: <p>Connect To Wallet</p>}</button>
    </div>
   )
}

export default Metamask