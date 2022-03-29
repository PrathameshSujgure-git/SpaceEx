import * as React from 'react';
import {useQuery} from 'react-query';
import axios from 'axios';

async function getLaunchInfo(launchId) {
  const {data} = await axios.get(
    `https://api.spacexdata.com/v4/launches/${launchId}`,
  );
  return data;
}
export default function useLaunchInfo(launchId) {
  return useQuery([`launch${launchId}`, launchId], () =>
    getLaunchInfo(launchId),
  );
}
