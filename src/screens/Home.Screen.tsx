import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import { Avatar } from "../components/Avatar";
import { Header } from "../components/Header";
import RingVector from "../../assets/vectors/ring.svg";
import SearchVector from "../../assets/vectors/search.svg";
import { activeIndex, standardHitSlop } from "../themes/standard";
import { colors } from "../themes/colors";
import { Input } from "../components/Input";
import { Card, ICard } from "../components/Card";
import { FlashList } from "@shopify/flash-list";
import { CommonStyles } from "../themes/common";
import { fetchSongs } from "../api/songs.api";
import { useNavigation } from "@react-navigation/native";
import Loading from "../components/Loading";

export const HomeScreen = () => {
  const [value, setValue] = useState<string>("");
  const [songs, setSongs] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const songs = await fetchSongs();
      setSongs(songs);

      setLoading(false);
    } catch (error) {
      console.error("Error ", error);
      setLoading(false);
    }
  };

  const navigation = useNavigation<any>();

  const onCardPress = (
    title: string,
    url: string,
    singer: string,
    duration: number
  ): void => {
    navigation.navigate("Music", { title, url, singer, duration });
  };

  const renderVerticalCards = ({
    item,
    index,
  }: {
    item: any;
    index: number;
  }) => {
    const { title, artist, duration } = item;
    return (
      <Card
        size="s"
        key={index}
        horizontal
        onPress={() =>
          onCardPress(title, artist.picture_big, artist.name, duration)
        }
        title={title}
        url={artist.picture_big}
        singer={artist.name}
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed hendrerit euismod justo, id tempus mi condimentum ac"
      />
    );
  };

  const renderCards = ({ item, index }: { item: any; index: number }) => {
    return (
      <Card
        key={index}
        onPress={() =>
          onCardPress(
            item.title,
            item.artist.picture_big,
            item.artist.name,
            item.duration
          )
        }
        title={item.title}
        url={item.artist.picture_big}
      />
    );
  };

  if (!songs) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView
      indicatorStyle="white"
      style={styles.scrollView}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.root}>
        <Header
          left={
            <Avatar
              title="Kenan Xasiyev"
              caption="Gold Member"
              url="https://tmssl.akamaized.net/images/foto/galerie/ronaldo-cristiano-2017-real-madrid-ballon-d-or-2016-0026751808hjpg-1698686328-120749.jpg?lm=1698686338"
            />
          }
          right={
            <TouchableOpacity
              activeOpacity={activeIndex}
              hitSlop={standardHitSlop}
              onPress={() => console.log("pressed")}
            >
              <RingVector color={colors.gray} />
            </TouchableOpacity>
          }
        />

        <View style={styles.search}>
          <Text numberOfLines={2} style={styles.title}>
            Listen The Latest Music
          </Text>
          <Input
            placeholder="Search Music"
            placeholderTextColor={colors.gray}
            inputStyle={{ flexGrow: 0 }}
            value={value}
            icon={<SearchVector color={colors.lightGray} />}
            setValue={setValue}
          />
        </View>
        <View style={[CommonStyles.flex, { gap: 16 }]}>
          {loading ? (
            <Text style={[styles.title, styles.cardHeader]}>Loading...</Text>
          ) : (
            <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
              Recently Played
            </Text>
          )}

          <FlashList
            data={songs}
            horizontal
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={50}
            ItemSeparatorComponent={() => <View style={{ width: 17 }} />}
            renderItem={renderCards}
          />
        </View>

        {loading ? (
          <Text style={[styles.title, styles.cardHeader]}>Loading...</Text>
        ) : (
          <Text numberOfLines={2} style={[styles.title, styles.cardHeader]}>
            Recommend for you
          </Text>
        )}
        <FlashList
          data={songs}
          removeClippedSubviews
          contentContainerStyle={styles.cards}
          scrollEnabled={false}
          estimatedItemSize={50}
          ItemSeparatorComponent={() => <View style={{ height: 17 }} />}
          renderItem={renderVerticalCards}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingHorizontal: 20,
    flex: 1,
    minHeight: "100%",
    backgroundColor: colors.dark,
  },
  scrollView: {
    flex: 1,
  },
  search: {
    marginTop: 24,
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 26,
    width: "50%",
    color: colors.white,
  },
  cards: {
    paddingTop: 18,
  },
  cardHeader: {
    width: undefined,
    fontSize: 22,
    marginTop: 44,
  },
});
