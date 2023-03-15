import React, { Component } from "react";

import {
  StyleSheet,
  ScrollView,
  Text,
  View,
  Image,
  Table,
  ActivityIndicator,
  FlatList,
} from "react-native";
import { Col, Row, Grid } from "react-native-easy-grid";
import korrona from "./korona.png";
import Sound from "react-native-sound";

import music from "./signal_of_mario.mp3";
import firstPlaceSound from "./The_king.mp3";
var ding;
var firstPlaceDing;

const firstCellHeight = 14;

export default App = () => {
  const [data, setData] = React.useState([]);
  const [isLoading, setLoading] = React.useState(true);
  const [maindata, setMainData] = React.useState([]);
  const [main, setMain] = React.useState(false);
  const [maunsumm, setMaunSumm] = React.useState(0);
  const [gen, setGen] = React.useState(0);
  const [test, setTest] = React.useState("");

  React.useEffect(() => {
    setTimeout(() => {
      //   ding = new Sound(music, Sound.MAIN_BUNDLE, (error) => {
      //     if (error) {
      //       console.log("Failed to load the sound file", error);
      //       return;
      //     }
      //     ding.load((success) => {
      //       if (!success) {
      //         console.log("Failed to load the sound file");
      //       }
      //     });
      //   });
      //   firstPlaceDing = new Sound(
      //     firstPlaceSound,
      //     Sound.MAIN_BUNDLE,
      //     (error) => {
      //       if (error) {
      //         console.log("Failed to load the sound file", error);
      //         return;
      //       }
      //       firstPlaceDing.load((success) => {
      //         if (!success) {
      //           console.log("Failed to load the sound file");
      //         }
      //       });
      //     }
      //   );
    }, 200);

    return () => {
      ding.stop();
      ding.release();
      firstPlaceDing.stop();
      firstPlaceDing.release();
    };
  }, []);

  return (
    <View>
      <Text></Text>
    </View>
  );
};
