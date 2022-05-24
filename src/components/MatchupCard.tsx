import axios from "axios";
import { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
} from "react-native";
import Matchup from "../models/Matchup";
import MediaItem from "../models/MediaItem";
import { MonoText } from "./StyledText";
import { View } from "./Themed";

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
  const [backgroundImg1, setBackgroundImg1] = useState<string>();
  const [backgroundImg2, setBackgroundImg2] = useState<string>();
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
    setMainImg1(matchup.media1.artImg);
    setMainImg2(matchup.media2.artImg);
    setBackgroundImg1(
      matchup.media1.artImg2 ? matchup.media1.artImg2 : matchup.media1.artImg
    );
    setBackgroundImg2(
      matchup.media2.artImg2 ? matchup.media2.artImg2 : matchup.media2.artImg
    );
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

  useEffect(() => {
    if (!isInitialRender) {
      setMainImg1({
        uri: matchup.media1.artImg,
      });
      setMainImg2({
        uri: matchup.media2.artImg,
      });
    }
  }, [matchup]);

  return (
    <ScrollView>
      <View>
        <Image style={styles.media1Image} source={mainImg1}></Image>
        <Text style={styles.titleText}>TITLE WORKS</Text>
        <Text style={styles.subtitleText}>Subtitle goes here</Text>
      </View>

      <View>
        <Image style={styles.media1Image} source={mainImg2}></Image>
        <Text style={styles.titleText}>TITLE2 WORKS</Text>
        <Text style={styles.subtitleText}>Subtitle 2 goes here</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  media1Image: {
    width: 300,
    height: 300,
  },
  titleText: {
    fontSize: 17,
    lineHeight: 50,
    color: "white",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 15,
    lineHeight: 50,
    color: "white",
    textAlign: "center",
  },
});

export default MatchupCard;
