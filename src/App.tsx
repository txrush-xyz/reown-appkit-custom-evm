import { AppKitButton } from '@reown/appkit/react'
import { useAccount, useSendTransaction } from 'wagmi'
import { parseUnits } from 'viem'

// Hardcoded recipient address
const RECIPIENT_ADDRESS =
  '0x0000000000000000000000000000000000000002'

// Stable Testnet chain id
const STABLE_TESTNET_CHAIN_ID = 2201

function App() {
  const { address, isConnected, chainId } = useAccount()
  const { sendTransactionAsync, isPending } = useSendTransaction()

  async function handleSend() {
    if (!isConnected || !address) {
      console.error('Wallet is not connected')
      alert('Please connect your wallet first.')
      return
    }

    if (chainId !== STABLE_TESTNET_CHAIN_ID) {
      console.error('Wrong network, please switch to Stable Testnet')
      alert('Please switch to Stable Testnet before sending.')
      return
    }

    try {
      const amount = parseUnits('0.01', 18)

      const txHash = await sendTransactionAsync({
        to: RECIPIENT_ADDRESS,
        value: amount
      })

      console.log('USDT0 native transfer transaction hash:', txHash)
      alert('Transaction submitted. Check your wallet or explorer.')
    } catch (error) {
      console.error('Failed to send 0.01 USDT0:', error)
      alert('Failed to send transaction. Please check the console for details.')
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif'
      }}
    >
      <h1>Stable Testnet Demo</h1>

      {/* Connect Wallet button (opens Reown AppKit modal) */}
      <AppKitButton label="Connect Wallet" balance="show" />

      {/* Send 0.01 USDT button */}
      <button
        onClick={handleSend}
        disabled={!isConnected || isPending}
        style={{
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: isConnected && !isPending ? 'pointer' : 'not-allowed'
        }}
      >
        {isPending ? 'Sending...' : 'Send 0.01 USDT'}
      </button>
    </div>
  )
}

export default App
