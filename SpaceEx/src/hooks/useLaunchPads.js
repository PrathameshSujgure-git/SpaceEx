import * as React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

async function getLaunchPads(launchId) {
  const {data} = await axios.get('https://api.spacexdata.com/v4/launchpads');
  return data;
}
export default function useLaunchPads() {
  return useQuery('launchpads', getLaunchPads);
}
