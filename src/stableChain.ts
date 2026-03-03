import { defineChain } from '@reown/appkit/networks'

export const stableTestnet = defineChain({
  id: 2201,
  caipNetworkId: 'eip155:2201',
  chainNamespace: 'eip155',
  name: 'Stable Testnet',
  nativeCurrency: {
    name: 'USDT0',
    symbol: 'USDT0',
    decimals: 18
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.stable.xyz']
    }
  },
  blockExplorers: {
    default: {
      name: 'Stable Explorer',
      url: 'https://testnet.stablescan.xyz/'
    }
  }
})

