import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import Constants from "expo-constants";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";

import Loading from "./src/components/Loading";

// replace this key with your API key from open weather api.
const API_KEY = "";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  const getWeather = async (latitude, longitude) => {
    try {
      const { data } = await axios.get(
        `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
      );

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);

    if (status !== "granted") {
      Alert.alert("Location permission denied", "So Sad");
      setIsLoading(false);
    }

    const {
      coords: { latitude, longitude }
    } = await Location.getCurrentPositionAsync();

    getWeather(latitude, longitude);
    setIsLoading(false);
  };

  useEffect(() => {
    getLocation();
  }, []);

  return <Loading />;
};

export default App;
