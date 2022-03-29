import * as React from 'react';

import {
  SafeAreaView,
  Button,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ImageBackground,
  ActivityIndicator,
} from 'react-native';
import useLaunchInfo from '../hooks/useLaunchInfo';
import useLaunchPads from '../hooks/useLaunchPads';
import {useQuery} from 'react-query';
import SingleLaunchInfo from '../components/SingleLaunchInfo';
import {useEffect} from 'react';

const DetailsScreen = ({navigation, launchId}) => {
  const {data: lpdata, isSuccess, isError, isLoading} = useLaunchPads();

  const renderItem = ({item}) => <SingleLaunchInfo title={item.name} />;
  // launchId = lpdata[1].launches[0];

  if (isLoading) {
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#00ff00" />
        <Text>Loading...</Text>
      </View>
    );
  }
  if (isError) {
    return (
      <View>
        <Text>Error!...</Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ImageBackground
        source={require('../assets/spacebg.jpg')}
        // style={{backgroundColor: '#180f1a'}}
        resizeMode="cover"
        blurRadius={2}>
        {/* <Text style={{color: 'black'}}>ok</Text>
      <Button
        title="Go to Details"
        onPress={() => {
          // navigation.navigate('LaunchDetails', {id: 1});
          // lpdata[1].launches.slice(0, 3).map((l, index) => {
          //   console.log(l);
          // });
          // console.log(lpdata[0].images.large[0]);
          // console.log(lidata);
        }}
      /> */}

        <FlatList
          data={lpdata}
          renderItem={item => <SingleLaunchInfo item={item} />}
          keyExtractor={item => item.id}
        />
      </ImageBackground>
    </View>
  );
};

export default DetailsScreen;
