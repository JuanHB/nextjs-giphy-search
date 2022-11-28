import '../styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className='p-4 m-4'>
      <Component {...pageProps} />
    </div>
  )
}
