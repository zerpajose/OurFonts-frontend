import { BigNumber, providers, Contract } from 'ethers'
import Web3Modal from 'web3modal'
import { CONTRACT_ADDRESS, CONTRACT_ABI } from './constants'
import { tokenUri } from '../stores/store'

let tokenUriValue
tokenUri.subscribe((value) => tokenUriValue = value)

const getProviderOrSigner = async (needSigner = false) => {
  const providerOptions = {
    injected: {
      display: {
        name: 'Injected',
        description: 'Connect with the provider in your Browser'
      },
      package: null
    }
  }
  
  const web3Modal = new Web3Modal({
    network: 'goerli',
    providerOptions  // required
  })
  
  const instance = await web3Modal.connect()
  
  const provider = new providers.Web3Provider(instance)

  if (needSigner) {
    const signer = provider.getSigner()
    return signer
  }
  
  return provider
}

/*
 * get token uri (metadata)
 */
const getTokenUri = async (tokenId) => {
  try {
    const provider = await getProviderOrSigner()

    const nftContract = new Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider)
    
    const _tokenUri = await nftContract.tokenURI(tokenId)

    tokenUri.set(_tokenUri)

    return _tokenUri

  } catch (err) {
    console.error(err)
    return false
  }
}

export { getProviderOrSigner, getTokenUri }