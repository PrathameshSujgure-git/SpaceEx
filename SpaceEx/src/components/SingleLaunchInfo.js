import * as React from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import {useState} from 'react';
import useLaunchInfo from '../hooks/useLaunchInfo';
import {useNavigation} from '@react-navigation/native';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';

const SingleLaunchName = ({launchId}) => {
  const {data, isSuccess, isLoading} = useLaunchInfo(launchId);
  const navigation = useNavigation();
  const navToLaunchPage = (name, launchInfoData) => {
    navigation.navigate('LaunchDetails', {
      name: name,
      launchInfoData: launchInfoData,
    });
    // console.log(launchInfoData);
  };

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (isSuccess) {
    return (
      <>
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            // backgroundColor: 'red',
            display: 'flex',
            alignItems: 'center',
          }}
          onPress={() => {
            // console.log(data);

            navToLaunchPage(data.name, data);
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: '#7d6766',
              fontSize: 14,
              backgroundColor: '#ffebb0',
              width: '60%',
              marginVertical: 4,
              paddingVertical: 4,
              fontWeight: 'bold',
              borderRadius: 5,
              borderWidth: 0.3,
              borderStyle: 'dotted',
              fontFamily: 'monospace',
              elevation: 1,
              shadowColor: '#757575',
            }}>
            {data.name}
          </Text>
        </TouchableOpacity>
      </>
    );
  }

  return (
    <View>
      <Text>Error</Text>
    </View>
  );
};

const LaunchesList = ({launchIds}) => {
  const allList = () => {
    return launchIds.slice(0, 3).map((launchId, index) => {
      return <SingleLaunchName launchId={launchId} key={index} />;
    });
  };
  return <View>{allList()}</View>;
};

const SingleLaunchInfo = ({item}) => {
  const [pressed, setPressed] = useState(false);
  const topValue = useState(new Animated.Value(0))[0];
  function moveRocket() {
    Animated.timing(topValue, {
      toValue: pressed ? 0 : -240,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }
  // useEffect(() => {
  //   Animated.timing(top, {
  //     // toValue: 200,
  //     easing: Easing.back(),
  //     duration: 2000,
  //   }).start();
  // }, []);

  return (
    <View style={[styles.item, styles.elevation]}>
      {/* <Text style={{color: 'black'}}>{item.item.images.large[0]}</Text> */}
      <Pressable
        style={styles.touchItem}
        onPress={() => {
          moveRocket();
          setPressed(!pressed);
        }}>
        <View style={{width: '100%', backgroundColor: 'white', margin: 0}}>
          {/* <Image
            source={require('../assets/bgrocket.png')}
            style={styles.cardImage}
            blurRadius={6}
          /> */}
          <Image
            source={{
              uri: item.item.images.large[0],
            }}
            style={styles.cardImage}
            blurRadius={20}
          />
          <Animated.Image
            source={require('../assets/singlerocket.png')}
            style={{
              width: '100%',
              height: 200,
              position: 'absolute',
              top: 40,
              transform: [{translateY: topValue}],
            }}
          />
          <Animated.View
            style={{
              backgroundColor: '#fcfefc',
              width: '100%',
              height: 240,
              position: 'absolute',
              paddingHorizontal: 10,
              paddingVertical: 6,
              top: 240,
              zIndex: 999,
              transform: [{translateY: topValue}],
            }}>
            <Text
              style={[
                styles.name,
                {textAlign: 'left', textDecorationLine: 'underline'},
              ]}>
              {item.item.name}
            </Text>
            <Text style={styles.details}>
              {item.item.details.substring(0, 220) + '.....'}
            </Text>
            <View style={styles.launchesBox}>
              <Text
                style={{
                  color: 'black',
                  textAlign: 'center',
                  fontSize: 13,
                  fontWeight: 'bold',
                }}>
                Launches:{' '}
                {item.item.launches.length == 0
                  ? '---'
                  : item.item.launches.length}
              </Text>
              {item.item.launches.length == 0 ? (
                <View
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 12,
                  }}>
                  <Image
                    source={require('../assets/astrofind.png')}
                    style={{width: 70, height: 70, opacity: 0.5}}
                  />
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 10,
                      fontFamily: 'monospace',
                      opacity: 0.5,
                    }}>
                    Sorry, no Launch details Available
                  </Text>
                </View>
              ) : (
                <LaunchesList launchIds={item.item.launches} />
              )}
              {/* <Text style={{color: 'black'}}></Text> */}
            </View>
            <Image
              source={require('../assets/close.png')}
              style={{
                height: 20,
                width: 20,
                position: 'absolute',
                top: 10,
                right: 10,
              }}
            />
          </Animated.View>
          <View style={styles.textBox}>
            <View style={styles.textBoxMain}>
              <Text style={styles.name}>{item.item.name}</Text>
              <Text style={styles.fullname}>{item.item.full_name}</Text>
              <View style={styles.textBoxDetails}>
                <Text style={styles.textDetails}>
                  Locality: {item.item.locality}
                </Text>
                <Text
                  style={[
                    styles.textDetails,
                    {lineHeight: 15, marginBottom: 5},
                  ]}>
                  Number of Launches: {item.item.launches.length}
                </Text>
                <Text
                  style={[
                    styles.textDetails,
                    {
                      backgroundColor:
                        item.item.status == 'active'
                          ? 'green'
                          : item.item.status == 'retired'
                          ? 'red'
                          : 'orange',
                      display: 'flex',
                      maxWidth: '45%',

                      textAlign: 'center',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingTop:
                        item.item.status == 'under construction' ? 0 : 6,
                      paddingBottom:
                        item.item.status == 'under construction' ? 0 : 6,
                      borderRadius: 10,
                      fontWeight: 'bold',
                      // color: '#fcfefc',
                      fontSize: 12,
                      paddingHorizontal: 10,
                      fontFamily: 'monospace',
                    },
                  ]}>
                  {item.item.status}
                </Text>
              </View>
              <Text
                style={{
                  textAlign: 'right',
                  fontSize: 9,
                }}>
                Click on the card for more info 🚀
              </Text>
            </View>
          </View>
        </View>
      </Pressable>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    // display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
    marginVertical: 15,
    marginHorizontal: 16,
    boxShadow: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },
  touchItem: {
    // display: 'flex',
    overflow: 'hidden',
    flexDirection: 'row',
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 0,
  },
  textBox: {
    position: 'absolute',
    right: 0,
    width: '100%',
    padding: 5,
    paddingRight: 10,
    display: 'flex',
    flexDirection: 'column',
  },
  textBoxMain: {
    position: 'absolute',
    right: 0,
    width: '75%',
    padding: 5,
    paddingRight: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fcba03',
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  fullname: {
    fontSize: 15,
    lineHeight: 16,
    color: '#1c1e2b',
    textAlign: 'center',
    fontWeight: 'bold',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 30,
  },
  cardImage: {
    width: '100%',
    height: 240,
    opacity: 0.95,
  },
  cardImageSingle: {
    width: '100%',
    height: 240,
    position: 'absolute',
    top: 240,
    zIndex: 999,
  },
  cardImageSingleok: {
    width: '100%',
    height: 240,
    position: 'absolute',
    top: 0,
  },
  elevation: {
    elevation: 10,
    shadowColor: '#592963',
  },
  textBoxDetails: {
    marginTop: 6,
    width: '100%',
    alignItems: 'center',
    borderWidth: 2,
    borderRadius: 5,
    borderStyle: 'dotted',
    paddingVertical: 8,
    // backgroundColor: 'red',
  },
  textDetails: {
    textAlign: 'center',
    width: '100%',
    fontSize: 13,
    fontWeight: 'bold',
    color: 'black',
    textShadowColor: 'rgba(255, 255, 255, 1)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 50,
  },
  details: {
    fontSize: 13,
    color: 'black',
  },
  launchesBox: {
    width: '100%',
  },
});
export default SingleLaunchInfo;
