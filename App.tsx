/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { config } from '@gluestack-ui/config';
import { Button, ButtonText, GluestackUIProvider } from '@gluestack-ui/themed';
import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import AppleMusicUserToken from 'react-native-apple-music-user-token';

import { api } from './src/requests';

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

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <GluestackUIProvider config={config}>
        <Button
          onPress={handleApple}
          size="md"
          variant="solid"
          action="primary"
        >
          <ButtonText>버튼1</ButtonText>
        </Button>
      </GluestackUIProvider>
    </SafeAreaView>
  );
}

export default App;
