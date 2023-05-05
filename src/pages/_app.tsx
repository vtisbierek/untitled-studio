import '@/styles/globals.scss';
import type { AppProps } from 'next/app'
import {ReactChannelIO} from 'react-channel-plugin';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReactChannelIO pluginKey={process.env.NEXT_PUBLIC_CHANNELIO_PLUGIN_KEY as string} language="en" autoBoot>
      <Component {...pageProps} />
    </ReactChannelIO>
  )
}
