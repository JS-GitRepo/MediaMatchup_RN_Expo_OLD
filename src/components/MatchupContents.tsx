import * as WebBrowser from "expo-web-browser";
import { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import Colors from "../constants/Colors";
import Matchup from "../models/Matchup";
import MediaItem from "../models/MediaItem";
import {
  getAlbum,
  getArtpiece,
  getMovie,
  getTVShow,
  getVideoGame,
} from "../services/ExternalAPIService";
import { MonoText } from "./StyledText";
import { Text, View } from "./Themed";
import { Image } from "react-native";

interface Props {
  path: string;
}

export const MatchupContents = ({ path }: Props) => {
  const wideChevron = require("../assets/images/wide_chevron.png");
  const defaultMatchup: Matchup = {
    media1: {
      title: "",
      subtitle: "",
      artImg: "",
      category: "",
    },
    media2: {
      title: "",
      subtitle: "",
      artImg: "",
      category: "",
    },
  };
  const [matchup, setMatchup] = useState<Matchup>(defaultMatchup);
  const [media1Img, setMedia1Img] = useState(wideChevron);
  const [isInitialRender, setIsInitialRender] = useState<boolean>(true);

  const getMediaArray = [
    getAlbum,
    getArtpiece,
    getMovie,
    getTVShow,
    getVideoGame,
  ];

  const generateMedia = async (selection: number): Promise<MediaItem> => {
    return await getMediaArray[selection]();
  };

  const generateMatchup = async (): Promise<void> => {
    let randSelection = Math.floor(Math.random() * 5);
    let randSelection2 = Math.floor(Math.random() * 5);
    while (randSelection2 === randSelection) {
      randSelection2 = Math.floor(Math.random() * 5);
    }

    let [media1, media2] = await Promise.all([
      generateMedia(randSelection),
      generateMedia(randSelection2),
    ]);

    if (
      media1.title === null ||
      undefined ||
      "" ||
      media1.subtitle === null ||
      undefined ||
      "" ||
      media1.artImg === null ||
      undefined ||
      ""
    ) {
      console.log(`Media1 generated again due to missing info.`);
      media1 = await generateMedia(randSelection);
    }
    if (
      media2.title === null ||
      undefined ||
      "" ||
      media2.subtitle === null ||
      undefined ||
      "" ||
      media2.artImg === null ||
      undefined ||
      ""
    ) {
      console.log(`Media2 generated again due to missing info.`);
      media2 = await generateMedia(randSelection2);
    }

    setMatchup({ media1, media2 });
  };

  useEffect(() => {
    generateMatchup();
    setIsInitialRender(false);
  }, []);

  useEffect(() => {
    if (!isInitialRender) {
      setMedia1Img({
        uri: matchup.media1.artImg,
      });
    }
  }, [matchup]);

  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Open up the code for this screen:
        </Text>

        <View
          style={[styles.codeHighlightContainer, styles.homeScreenFilename]}
          darkColor="rgba(255,255,255,0.05)"
          lightColor="rgba(0,0,0,0.05)">
          <MonoText>{matchup.media1.title}</MonoText>
        </View>

        <Image source={media1Img} style={styles.media1Image}></Image>
      </View>

      <View style={styles.helpContainer}>
        <TouchableOpacity onPress={handleHelpPress} style={styles.helpLink}>
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Tap here if your app doesn't automatically update after making
            changes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const handleHelpPress = () => {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/get-started/create-a-new-app/#opening-the-app-on-your-phonetablet"
  );
};

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  media1Image: {
    width: 300,
    height: 300,
  },
});
