import React from 'react'
import ReactDOM from 'react-dom/client'
import { WagmiProvider } from 'wagmi'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createAppKit } from '@reown/appkit/react'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'

import App from './App.tsx'
import { stableTestnet } from './stableChain'

// Setup React Query client
const queryClient = new QueryClient()

// Placeholder project id, replace with your actual ID from Reown Dashboard
const projectId = import.meta.env.VITE_PROJECT_ID || 'b56e18d47c72ab683b10814fe9495694'

// Networks used by AppKit and Wagmi
const networks = [stableTestnet]

// Create Wagmi adapter with SSR disabled
const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks,
  ssr: false
})

// Create AppKit instance (modal)
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId,
  metadata: {
    name: 'Stable Testnet Demo',
    description: 'Minimal Reown AppKit + Wagmi example',
    url: 'https://localhost', // This should match your real origin in production
    icons: ['https://avatars.githubusercontent.com/u/179229932']
  },
  customRpcUrls: {
    'eip155:2201': ['https://rpc.testnet.stable.xyz']
  },
  features: {
    analytics: false,
    email: true,
    socials: ['google']
  }
})

// Provider component to wrap the app with Wagmi and React Query
function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </React.StrictMode>
)
