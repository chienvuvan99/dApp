import React from 'react';
import {MoralisProvider} from 'react-moralis';
import Moralis from 'moralis/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {enableViaWalletConnect} from './Moralis/enableViaWalletConnect';
import WalletConnectProvider, {
  WalletConnectProviderProps,
} from './screen/walletConnect';
import {Platform} from 'react-native';
import Qrcode from './Qrcode';

interface ProvidersProps {
  readonly children: JSX.Element;
}

/**
 * Initialization of Moralis
 */
const appId = 'cpT2KGFyXoIWleOAQdLA9UacWKtuMXKrqznyyFIu';
const serverUrl = 'https://nipo9o7lunwb.usemoralis.com:2053/server';
const environment = 'native';
// Initialize Moralis with AsyncStorage to support react-native storage
Moralis.setAsyncStorage(AsyncStorage);
// Replace the enable function to use the react-native WalletConnect
// @ts-ignore
Moralis.enable = enableViaWalletConnect;

const walletConnectOptions: WalletConnectProviderProps = {
  redirectUrl:
    Platform.OS === 'web'
      ? window.location.origin
      : `org.reactjs.native.example.dApp://`,
  storageOptions: {
    // @ts-ignore
    asyncStorage: AsyncStorage,
  },
  qrcodeModalOptions: {
    mobileLinks: [
      'rainbow',
      'metamask',
      'argent',
      'trust',
      'imtoken',
      'pillar',
    ],
  },
  // Uncomment to show a QR-code to connect a wallet
  renderQrcodeModal: Qrcode,
};

export const Providers = ({children}: ProvidersProps) => {
  return (
    <WalletConnectProvider {...walletConnectOptions}>
      <MoralisProvider
        appId={appId}
        serverUrl={serverUrl}
        environment={environment}
      >
        {children}
      </MoralisProvider>
    </WalletConnectProvider>
  );
};
