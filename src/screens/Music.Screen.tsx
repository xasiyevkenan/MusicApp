import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import React, { useRef, useState } from "react";
import { Header } from "../components/Header";
import LikeVector from "../../assets/vectors/like.svg";
import BackVector from "../../assets/vectors/back.svg";
import ShuffleVector from "../../assets/vectors/shuffle.svg";
import PauseVector from "../../assets/vectors/pause.svg";
import PlayVector from "../../assets/vectors/play.svg";
import RepeatVector from "../../assets/vectors/repeat.svg";
import SkipBackVector from "../../assets/vectors/skip_back.svg";
import SkipForwardVector from "../../assets/vectors/skip_forward.svg";
import { colors } from "../themes/colors";
import { songs } from "../mocks/songs.mock";
import { ProgressBar } from "../components/ProgressBar";
import { useNavigation, useRoute } from "@react-navigation/native";

export const MusicScreen: React.FC = () => {
  const navigation = useNavigation<any>();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleRightPress = () => {
    navigation.navigate("Favorite");
  };

  const HeaderLeft = () => {
    const handleBackPress = () => {
      navigation.goBack();
    };

    return (
      <Pressable onPress={handleBackPress}>
        <BackVector color={colors.white} />
      </Pressable>
    );
  };

  const HeaderRight = () => {
    return (
      <Pressable onPress={handleRightPress}>
        <LikeVector color={colors.gray} />
      </Pressable>
    );
  };

  const audioPlayer = useRef<null>(null);
  const [play, setPlay] = useState<boolean>(false);

  const onController = () => {
    // do stuff
    // audioPlayer.current?.playAsync();
    // audioPlayer.current?.pauseAsync();

    if (play) {
      // audioPlayer.current?.pauseAsync();
    } else {
      // audioPlayer.current?.playAsync();
    }

    setPlay((state) => !state);
  };

  return (
    <View style={styles.root}>
      <Header
        onLeftPress={handleBackPress}
        left={<HeaderLeft />}
        right={<HeaderRight />}
        title="Ophelia by Steven"
      />
      <View style={styles.main}>
        <View style={styles.wrapper}>
          <Image
            resizeMode="cover"
            source={{
              uri: songs[0].url,
            }}
            style={styles.image}
          />
          <View style={styles.imageTexts}>
            <Text style={styles.title}>{songs[0].title}</Text>
            <Text style={styles.singer}>{songs[0].singer}</Text>
          </View>
          <View style={styles.controllers}>
            <ProgressBar time={185} currentTime={120} />
            <View style={styles.buttons}>
              <ShuffleVector color={colors.white} />
              <SkipBackVector color={colors.white} />
              <Pressable onPress={onController} style={styles.pause}>
                {play ? (
                  <PauseVector color={colors.white} />
                ) : (
                  <PlayVector color={colors.white} width={50} height={50} />
                )}
              </Pressable>
              <SkipForwardVector color={colors.white} />
              <RepeatVector color={colors.white} />
            </View>
          </View>
          <View
            style={{
              height: 50,
              width: "100%",
              backgroundColor: colors.dark,
            }}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    paddingHorizontal: 17,
    gap: 32,
    backgroundColor: colors.dark,
  },
  pause: {
    width: 75,
    height: 75,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderRadius: 99,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  main: {
    flex: 1,
  },
  wrapper: {
    gap: 28,
    flex: 1,
  },
  controllers: {
    flexGrow: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  image: {
    height: 319,
    width: "100%",
    borderRadius: 36,
  },
  imageTexts: {
    gap: 7,
  },
  title: {
    fontFamily: "Nunito-Regular",
    fontSize: 24,
    color: colors.white,
    textAlign: "center",
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.gray,
    textAlign: "center",
  },
});
