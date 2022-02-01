import Web3Provider from "@/features/web3";

import "./globals.css";
import "./fonts.css";

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  );
}
