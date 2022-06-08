import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import AxLayout from 'components/ax-layout';

export default function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <UserProvider>
      {/* <AxLayout> */}
        <Component {...pageProps} />
      {/* </AxLayout> */}
    </UserProvider>
  )
}
