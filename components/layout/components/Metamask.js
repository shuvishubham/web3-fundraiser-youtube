import { useState, useRef, useEffect } from "react";
import Web3Modal from 'web3modal'
import { providers } from "ethers";

const Metamask = () => {
    const [connectToWallet, setConnectedWallet] = useState(false)
    const providerOptions= {
        walletconnect: {
            options: {
                rpc: {
                    8301: 'https://backend.buildbear.io/node/bold-bohr-2aa906'
                },
                chainId: 8301
            }
        }
    }
    const Web3ModalRef = useRef();
    const getSignerorProvider = async (needSigner = false) => {
        const provider = await Web3ModalRef.current.connect();
        const Web3Provider = new providers.Web3Provider(provider);
        const {chainId} = await Web3Provider.getNetwork();
        if (chainId !== 8301) {
            alert('Use BuildBear Network')
            throw new Error('Change network to BuildBear');
        }
        if (needSigner) {
            const signer = Web3Provider.getSigner();
            console.log(signer, 'signer')
            return signer;

        }
        return provider;
    }

    const connectWallet = async () => {
       try {
        await getSignerorProvider();
        
        setConnectedWallet(true)
       } catch (err) {
        console.log(err)
       }
    }

    useEffect(() => {
        Web3ModalRef.current = new Web3Modal({
            network: 'buildbear',
            providerOptions,
            
        })

    }, [])
   return (
    <div>
        <button onClick={connectWallet}>{connectToWallet? <p>Connected To Buildbear</p>: <p>Connect To Wallet</p>}</button>
    </div>
   )
}

export default Metamask