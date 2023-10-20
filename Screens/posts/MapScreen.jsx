import { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useRoute } from "@react-navigation/native";

export const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const route = useRoute();

  useEffect(() => {
    if (route.params) {
      setLocation(route.params.locationCoords);
    }
  }, [route.params]);

  return (
    <View style={StyleSheet.container}>
      <MapView
        style={styles.map}
        region={{
          ...location,
          latitudeDelta: 0.001,
          longitudeDelta: 0.007,
        }}
      >
        <Marker title="Post location" coordinate={location} />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
