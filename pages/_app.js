import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { MoralisProvider } from "react-moralis";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <MoralisProvider serverUrl="https://wvcurbwzq7qd.usemoralis.com:2053/server" appId="GNHTSQmbc9LHu42IulhirZD1MZNckqTabmaaL9ZWs" >
        <Component {...pageProps} />
      </MoralisProvider>
    </ChakraProvider>
  );
}

export default MyApp;
