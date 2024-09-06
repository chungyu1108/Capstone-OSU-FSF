import { Text } from "tamagui";
import { Redirect, useRootNavigationState } from "expo-router";
import { useAuth } from "../features/system/Auth";
import { useTypedDispatch } from "../store/store";
import { useEffect } from "react";
import { fetchProfiles } from "../store/profilesSlice";
import { fetchTeamStats, fetchTeamStatsBreakdown } from "../store/teamStatsSlice";
import { fetchProfileStats } from "../store/profileStatsSlice";
import { fetchEvents } from "../store/eventsSlice";
import { syncMyActivity } from "../store/progressSlice";

export default function Index() {
  const { session, isReady, getSession } = useAuth();
  const dispatch = useTypedDispatch();

  // We use this to key 
  const navigationState = useRootNavigationState();

  useEffect(() => {
    dispatch(fetchProfiles());
    dispatch(fetchProfileStats());
    dispatch(fetchTeamStatsBreakdown());
    dispatch(fetchEvents());
    dispatch(fetchTeamStats());
    dispatch(syncMyActivity());
  }, [dispatch]);

  if (!isReady) {
    getSession();
    return <Text>Loading</Text>;
  }

  if (!navigationState?.key) {
    // Temporary fix for router not being ready.
    return null;
  }
  
  if (!session)
    return <Redirect href={'/(auth)/sign-in'} />;
  else
    return <Redirect href={'/(tabs)/events/events-list'} />;
}