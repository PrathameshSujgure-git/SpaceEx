import * as React from 'react';
import {
  Button,
  View,
  Text,
  ImageBackground,
  Image,
  Animated,
  Pressable,
} from 'react-native';
import {useState, useEffect} from 'react';

const HomeScreen = ({navigation}) => {
  const [pressed, setPressed] = useState(false);
  const topValue = useState(new Animated.Value(0))[0];
  const scaleValue = useState(new Animated.Value(1))[0];

  function moveCar() {
    Animated.timing(topValue, {
      toValue: pressed ? 0 : -600,
      duration: 1000,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleValue, {
      toValue: pressed ? 1 : 2,
      duration: 100,
      useNativeDriver: true,
    }).start();
  }
  function moveCarBack() {
    Animated.timing(topValue, {
      toValue: pressed ? -600 : 0,
      duration: 10,
      useNativeDriver: true,
    }).start();
    Animated.timing(scaleValue, {
      toValue: pressed ? 2 : 1,
      duration: 10,
      useNativeDriver: true,
    }).start();
  }

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        // flexDirection: 'column-reverse',
      }}>
      <ImageBackground
        source={require('../assets/spaceex.png')}
        resizeMode="cover"
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column-reverse',
        }}>
        <Animated.Image
          source={require('../assets/spaceexdriver.png')}
          style={{
            width: '100%',
            height: '100%',
            zIndex: 0,
            transform: [
              {scale: scaleValue},
              {translateX: topValue},
              {translateY: topValue},
            ],
            position: 'absolute',
            top: 0,
          }}
        />
        <Pressable
          style={{
            height: '20%',
          }}
          onPress={() => {
            setTimeout(() => {
              moveCarBack();
              setPressed(false);
              navigation.navigate('Details');
            }, 500);

            setPressed(!pressed);
            moveCar();
          }}>
          <View
            style={{
              backgroundColor: 'black',
              borderRadius: 150,
              padding: 50,
              height: 400,
            }}>
            <Text
              style={{
                height: '100%',
                textAlign: 'center',
                fontWeight: 'bold',
                fontSize: 22,
              }}>
              Check{' '}
              <Text style={{textDecorationLine: 'underline'}}>SpaceX</Text>{' '}
              LaunchPads{'\n'}
              <Text style={{fontSize: 15}}> and more...</Text>
            </Text>
          </View>
        </Pressable>
        {/* <Button
          title="ok"
          onPress={() => {
           
            setPressed(false);
          }}
        /> */}
      </ImageBackground>
    </View>
  );
};
export default HomeScreen;
