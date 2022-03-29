import * as React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  Button,
  Linking,
  Alert,
} from 'react-native';
import {spaceBg} from '../bgimages';
import {useState, useCallback} from 'react';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const supportedURL = 'https://google.com';
const OpenURLButton = ({url, src, children}) => {
  const handlePress = useCallback(async () => {
    // const supported = await Linking.canOpenURL(url);

    await Linking.openURL(url);
  }, [url]);

  return (
    <Pressable onPress={handlePress}>
      <Image
        style={{height: 35, width: 40, marginHorizontal: 40}}
        source={src}
      />
    </Pressable>
  );
};

const LaunchDetailsScreen = ({route}) => {
  const {launchInfoData} = route.params;
  const date = new Date(launchInfoData.date_utc);

  const image = {
    uri: spaceBg[Math.floor(Math.random() * 15) + 1],
  };

  return (
    <View
      style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        blurRadius={10}>
        <View
          style={{
            display: 'flex',
            //   justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri: launchInfoData.links.patch.small,
            }}
            style={{width: 300, height: 300, marginTop: 40}}
          />
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 40,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
              textAlign: 'center',
              marginHorizontal: 17,
              fontFamily: 'monospace',
              marginTop: 20,
            }}>
            {launchInfoData.name}
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'monospace',
            }}>
            {date.toUTCString()}
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
              textAlign: 'center',
              marginHorizontal: 17,
              marginVertical: 20,
              borderWidth: 1,
              padding: 8,
              borderStyle: 'dotted',
              borderColor: 'grey',
              marginBottom: 5,
            }}>
            {launchInfoData.details
              ? launchInfoData.details
              : 'Space Exploration Technologies Corp. (SpaceX) is an American aerospace manufacturer, a provider of space transportation services, and a communications corporation headquartered in Hawthorne, California. SpaceX was founded in 2002 by Elon Musk.'}
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 15,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
              textAlign: 'center',
              marginHorizontal: 17,
              marginVertical: 0,
            }}>
            {launchInfoData.cores[0].reused
              ? 'The launch system was reused'
              : `The launch system was new`}
          </Text>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontSize: 20,
              textShadowColor: 'rgba(0, 0, 0, 0.75)',
              textShadowOffset: {width: -1, height: 1},
              textShadowRadius: 10,
              textAlign: 'center',
              marginHorizontal: 17,
              marginVertical: 20,
            }}>
            {launchInfoData.success ? (
              <Text>
                This mission was{' '}
                <Text style={{color: 'lightgreen'}}>successful</Text>!!!
              </Text>
            ) : (
              <Text>
                This mission <Text style={{color: 'red'}}>failed</Text> due to{' '}
                {launchInfoData.failures[0].reason}
              </Text>
            )}
          </Text>
        </View>
        <Text style={{fontFamily: 'monospace', fontSize: 12}}>
          For more info:
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            //   justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 50,
          }}>
          <OpenURLButton
            url={launchInfoData.links.wikipedia}
            src={require('../assets/wiki.png')}>
            Wikipedia
          </OpenURLButton>
          <OpenURLButton
            url={launchInfoData.links.webcast}
            src={require('../assets/yt.png')}>
            YouTube{' '}
          </OpenURLButton>
          <OpenURLButton
            url={launchInfoData.links.article}
            src={require('../assets/link.png')}>
            Article
          </OpenURLButton>
        </View>
      </ImageBackground>
    </View>
  );
};
export default LaunchDetailsScreen;
