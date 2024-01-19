/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { config } from '@gluestack-ui/config';
import {
  Button,
  ButtonText,
  GluestackUIProvider,
  VStack,
} from '@gluestack-ui/themed';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppleMusicUserToken from 'react-native-apple-music-user-token';
import type { ApiConfig } from 'react-native-spotify-remote';
import {
  ApiScope,
  auth as SpotifyAuth,
  remote as SpotifyRemote,
} from 'react-native-spotify-remote';

import { api } from './src/requests';

const spotifyConfig: ApiConfig = {
  clientID: '65e413bf96324a859b8246235fd2d998',
  redirectURL: 'untangle://',
  tokenRefreshURL:
    'https://api-prod.discoverrealmusic.com/spotify/token/refresh',
  tokenSwapURL: 'https://api-prod.discoverrealmusic.com/spotify/token/swap',
  scopes: [
    ApiScope.AppRemoteControlScope,
    ApiScope.UserReadRecentlyPlayedScope,
    ApiScope.UserReadCurrentlyPlaying,
    ApiScope.UserFollowReadScope,
    ApiScope.PlaylistModifyPublicScope,
  ],
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const handleApple = async () => {
    try {
      const { data: devToken } = await api.get('/apple/token');
      await AppleMusicUserToken.requestAuthorization();
      const userToken =
        await AppleMusicUserToken.requestUserTokenForDeveloperToken(devToken);
      console.log(userToken);
    } catch (error) {
      console.error('Authorization failed:', error);
    }
  };

  const handleSpotify = async () => {
    const session = await SpotifyAuth.authorize(spotifyConfig);
    console.log(session);
    await SpotifyRemote.connect(session.accessToken);
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GluestackUIProvider config={config}>
        <VStack space="sm">
          <Button
            onPress={handleApple}
            size="md"
            variant="solid"
            action="primary"
          >
            <ButtonText>애플</ButtonText>
          </Button>
          <Button
            onPress={handleSpotify}
            size="md"
            variant="solid"
            action="primary"
          >
            <ButtonText>스포티파이</ButtonText>
          </Button>
        </VStack>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}

export default App;
