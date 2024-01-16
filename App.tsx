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
import { authorize } from 'react-native-app-auth';
import AppleMusicUserToken from 'react-native-apple-music-user-token';

import { api } from './src/requests';

const spotifyConfig = {
  clientId: '65e413bf96324a859b8246235fd2d998', // available on the app page
  clientSecret: '6d3421f4c9c04aa2a0bbe1c17da4d6b2', // click "show client secret" to see this
  redirectUrl: 'com.highlight.untangle:/oauth', // the redirect you defined after creating the app
  scopes: ['user-read-email', 'playlist-modify-public', 'user-read-private'], // the scopes you need to access
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
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
    const authState = await authorize(spotifyConfig);
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
