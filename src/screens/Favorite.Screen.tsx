import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Header } from "../components/Header";
import BackVector from "../../assets/vectors/back.svg";
import { colors } from "../themes/colors";
import { Card } from "../components/Card";
import { CommonStyles } from "../themes/common";
import { screenWidth } from "../themes/consts.styles";
import { useNavigation } from "@react-navigation/native";
import { FlashList } from "@shopify/flash-list";
import fetchSongs from "../api/songs.api";
import Loading from "../components/Loading";

export const FavoriteScreen = () => {
  const [songs, setSongs] = useState<any>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const songsData = await fetchSongs();
      setSongs(songsData);
    } catch (error) {
      console.error("Error ", error);
    }
  };

  const HeaderLeft = () => {
    const navigation = useNavigation();

    const handleBackPress = () => {
      navigation.goBack();
    };

    return (
      <Pressable onPress={handleBackPress}>
        <BackVector color={colors.white} />
      </Pressable>
    );
  };

  const renderItems = ({ item }: { item: any }) => {
    return (
      <Card
        size="l"
        url={item.artist.picture_big}
        style={{ width: "100%" }}
        imageStyle={{ width: cardWidth }}
      />
    );
  };

  if (!songs) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView contentContainerStyle={styles.root}>
      <Header left={<HeaderLeft />} />
      <View style={styles.info}>
        <Image
          style={styles.image}
          source={{ uri: songs[0].artist.picture_big }}
        />
        <View style={CommonStyles.flex}>
          <View style={styles.cardTitle}>
            <Text style={styles.singer}>Xasiyev Kenan</Text>
            <Text style={styles.text}>xasiyevkenan48@gmail.com</Text>
          </View>
          <Text style={[styles.text, styles.member]}>Gold Member</Text>
          <Text style={styles.text}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
            hendrerit euismod justo, id tempus mi condimentum ac
          </Text>
        </View>
      </View>
      <View style={{ flex: 1, width: "100%" }}>
        <Text style={styles.singer}>Favourite Album</Text>
        <FlashList
          estimatedItemSize={50}
          data={songs}
          renderItem={({ item: { artist } }: { item: any }) => (
            <Card size="l" url={artist.picture_big} />
          )}
          horizontal
          ItemSeparatorComponent={() => (
            <View style={{ width: 9, height: "100%" }} />
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={CommonStyles.flex}>
        <Text style={styles.singer}>Favourite Music</Text>
        <FlashList
          data={songs}
          estimatedItemSize={50}
          scrollEnabled={false}
          renderItem={renderItems}
          numColumns={3}
          horizontal={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
        />
      </View>
    </ScrollView>
  );
};

const screenPaddingSize = 17 * 2;
const cardWidth = Math.floor((screenWidth - screenPaddingSize - 18) / 3);

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 17,
    gap: 32,
    minHeight: "100%",
    minWidth: "100%",
    paddingBottom: 40,
    backgroundColor: colors.dark,
  },
  cardTitle: {
    gap: 2,
  },
  member: {
    marginTop: 11,
    marginBottom: 13,
  },
  singer: {
    fontFamily: "Nunito-Regular",
    fontSize: 18,
    color: colors.white,
    marginBottom: 24,
  },
  text: {
    fontFamily: "Nunito-Regular",
    fontSize: 16,
    color: colors.gray,
  },
  info: {
    flexDirection: "row",
    gap: 15,
  },
  image: {
    width: 91,
    height: 100,
    borderRadius: 10,
  },
});
