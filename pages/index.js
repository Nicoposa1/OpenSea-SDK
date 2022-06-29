import React, { useState, useEffect, useMemo } from "react";
import { useMoralis } from "react-moralis";
import {
  Flex,
  Box,
  Spacer,
  Heading,
  Button,
  Stack,
  Input,
  NumberInput,
  NumberInputField,
} from "@chakra-ui/react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const {
    Moralis,
    user,
    logout,
    isInitialized,
    authenticate,
    isAuthenticated,
    isWeb3Enabled,
  } = useMoralis();

  const [values, setValues] = useState({ tokenAddress: "", tokenId: "" });

  const expirationTime = Math.round(Date.now() / 1000 + 60 * 60 * 24);
  const web3Account = useMemo(
    () => isAuthenticated && user.get("accounts")[0],
    [user, isAuthenticated]
  );

	const getAsset = async () => {
		const res = await Moralis.Plugins.opensea.getAsset({
			network: "testnet",
			tokenAddress: values.tokenAddress,
			tokenId: values.tokenId,
		});
		console.log(res);
	};

  const getOrders = async () => {
    await Moralis.Plugins.opensea.getOrders({
      network: network,
      tokenAddress: tokenAddress,
      tokenId: tokenId,
      orderSide: side,
      page: 1, // pagination shows 20 orders each page
    });
  };

  const createSellOrder = async () => {
    await Moralis.Plugins.opensea.createSellOrder({
      network: "testnet",
      tokenAddress: "0xdbe8143c3996c87ecd639ebba5d13b84f56855c2",
      tokenId: "0",
      tokenType: "ERC1155",
      userAddress: "0x7fB3948c368A943e4EFE848F251E4f254dA1a2b2",
      startAmount: 1,
      endAmount: 1,

      // expirationTime: expirationTime, Only set if you startAmount > endAmount
    });
  };

  useEffect(() => {
    if (isInitialized) {
      Moralis.initPlugins();
    }
  }, []);

  // useEffect(() => {
  //   if (isAuthenticated && !isWeb3Enabled) {
  //     enableWeb3();
  //   }
  // }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated && isWeb3Enabled);
  }, [isAuthenticated]);

  return (
    <>
      <Flex sx={{ margin: 3 }}>
        <Box p="2">
          <Heading size="md">Moralis OpenSea</Heading>
        </Box>
        <Spacer />
        <Box>
          {isAuthenticated ? (
            <Flex justifyContent="center" alignItems="center">
              <div>{web3Account}</div>
              <Button
                colorScheme="teal"
                sx={{ ml: 3 }}
                onClick={() => logout()}
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Button colorScheme="teal" onClick={() => authenticate()}>
              Connect to Metamask
            </Button>
          )}
        </Box>
      </Flex>
      <Flex sx={{ margin: 3 }}>
        <Box w="45vw" sx={{ mr: 3 }}>
          <Input
            sx={{ borderColor: "1px solid black" }}
            placeholder="NFT Token Address"
            onChange={(e) =>
              setValues({ ...values, tokenAddress: e.target.value })
            }
          />
        </Box>
        <Box w="10vw">
          <NumberInput
            min={0}
            value={values.tokenId}
            onChange={(valueString) =>
              setValues({ ...values, tokenId: valueString })
            }
          >
            <NumberInputField sx={{ borderColor: "1px solid black" }} />
          </NumberInput>
        </Box>
      </Flex>
      <Stack direction="row" spacing={4} sx={{ margin: 3 }}>
        <Button onClick={getAsset}>Get Asset</Button>
        <Button>Get Order</Button>
        {isAuthenticated && (
          <>
            <Button>Create Buy Order</Button>
            <Button>Create Sell Order</Button>
          </>
        )}
      </Stack>
    </>
  );
}
