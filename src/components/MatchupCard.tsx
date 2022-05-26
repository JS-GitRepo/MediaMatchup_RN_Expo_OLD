import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  ImageBackground,
} from "react-native";
import Matchup from "../models/Matchup";

interface Props {
  matchup: Matchup;
  //   onSubmitMatchup: (winner: MediaItem, dailyMatchupIndex?: number) => void;
  //   checkAndSetMatchups: () => void;
}

const MatchupCard = ({
  matchup,
}: //   onSubmitMatchup,
//   checkAndSetMatchups,
Props) => {
  // useStates for Matchup and associated Media
  const loadingImage = require("../assets/images/loading.svg");
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [showGenerateButton, setShowGenerateButton] = useState(true);
  const [dailyIndex, setDailyIndex] = useState<number>(-1);
  //  useStates for media / matchup variable construction
  const [title1, setTitle1] = useState<string>();
  const [title2, setTitle2] = useState<string>();
  const [subtitle1, setSubtitle1] = useState<string>();
  const [subtitle2, setSubtitle2] = useState<string>();
  const [mainImg1, setMainImg1] = useState<any>();
  const [mainImg2, setMainImg2] = useState<any>();
  const [backgroundImg1, setBackgroundImg1] = useState<any>();
  const [backgroundImg2, setBackgroundImg2] = useState<any>();
  const [mediaCategory1, setMediaCategory1] = useState<string>();
  const [mediaCategory2, setMediaCategory2] = useState<string>();
  // Wait for all images to load before showing them
  const [loadingImages, setLoadingImages] = useState<string[]>([]);
  const [imagesAreLoaded, setImagesAreLoaded] = useState<boolean>(false);
  const imageLoadedCounter = useRef(0);

  const constructMedia = async () => {
    setTitle1(matchup.media1.title);
    setTitle2(matchup.media2.title);
    setSubtitle1(matchup.media1.subtitle);
    setSubtitle2(matchup.media2.subtitle);
    setMediaCategory1(matchup.media1.category);
    setMediaCategory2(matchup.media2.category);
    setMainImg1({
      uri: matchup.media1.artImg,
    });
    setMainImg2({
      uri: matchup.media2.artImg,
    });
    setBackgroundImg1({
      uri: matchup.media1.artImg2
        ? matchup.media1.artImg2
        : matchup.media1.artImg,
    });
    setBackgroundImg2({
      uri: matchup.media2.artImg2
        ? matchup.media2.artImg2
        : matchup.media2.artImg,
    });
    if (
      matchup.media1.category === "Video Game" ||
      matchup.media1.category === "Film" ||
      matchup.media1.category === "Television"
    ) {
      setSubtitle1(matchup.media1.subtitle.substring(0, 4));
    }
    if (
      matchup.media2.category === "Video Game" ||
      matchup.media2.category === "Film" ||
      matchup.media2.category === "Television"
    ) {
      setSubtitle2(matchup.media2.subtitle.substring(0, 4));
    }
  };

  useEffect(() => {
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    setImagesAreLoaded(false);
    if (!isInitialRender) {
      setLoadingImages([
        matchup.media1.artImg!,
        matchup.media2.artImg!,
        matchup.media1.artImg2!,
        matchup.media2.artImg2!,
      ]);
      constructMedia();
    }
  }, [matchup]);

  useEffect(() => {}, [imagesAreLoaded]);

  useEffect(() => {}, [matchup]);

  return (
    <View style={styles.matchupContainer}>
      <ImageBackground
        style={styles.mediaItemBg}
        source={backgroundImg1}
        resizeMode="cover"
        blurRadius={1}>
        <View style={styles.mediaItemContainer}>
          <View style={styles.mediaImgContainer}>
            <Image style={styles.mediaImage} source={mainImg1}></Image>
          </View>
          <View style={styles.mediaTextContainer}>
            <Text style={styles.titleText}>{title1}</Text>
            <Text style={styles.subtitleText}>{subtitle1}</Text>
            <Text style={styles.subtitleText}>{`(${mediaCategory1})`}</Text>
          </View>
        </View>
      </ImageBackground>

      <ImageBackground
        style={styles.mediaItemBg}
        source={backgroundImg2}
        resizeMode="cover"
        blurRadius={1}>
        <View style={styles.mediaItemContainer}>
          <View style={styles.mediaImgContainer}>
            <Image style={styles.mediaImage} source={mainImg2}></Image>
          </View>
          <View style={styles.mediaTextContainer}>
            <Text style={styles.titleText}>{title2}</Text>
            <Text style={styles.subtitleText}>{subtitle2}</Text>
            <Text style={styles.subtitleText}>{`(${mediaCategory2})`}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  matchupContainer: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  mediaItemContainer: {
    flex: 1,
    flexDirection: "column",
    height: "100%",
    padding: 10,
    backgroundColor: "rgba(0, 40, 60, 0.4)",
  },
  mediaTextContainer: {
    flex: 1,
    width: 175,
  },
  mediaImgContainer: {
    flex: 2,
    justifyContent: "center",
  },
  mediaItemBg: {},
  mediaImage: {
    width: 180,
    height: 300,
  },
  titleText: {
    fontSize: 17,
    color: "white",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 15,
    color: "white",
    textAlign: "center",
  },
});

export default MatchupCard;
