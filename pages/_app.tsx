import '../styles/globals.css'
// import type { AppProps } from 'next/app'
import { UserProvider } from '@auth0/nextjs-auth0';
import AxLayout from 'components/ax-layout';
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
export const getServerSideProps = withPageAuthRequired();
export default function MyApp({ Component, pageProps: { session, ...pageProps } }: any) {
  return (
    <UserProvider>
      <AxLayout>
        <Component {...pageProps} />
      </AxLayout>
    </UserProvider>
  )
}