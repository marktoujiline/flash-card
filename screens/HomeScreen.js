import React, { useState }from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import Flashcard from '../components/Flashcard';

export default function HomeScreen() {
  
  const data = [
    {
      front: <Text>Hello</Text>,
      back: <Text>Goodbye</Text>
    },
    {
      front: <Text>I want to draw</Text>,
      back: <Text>a cat for you</Text>
    },
    {
      front: <Text>Skrit</Text>,
      back: <Text>Bweit</Text>
    }
  ]
  const [currentCard, setCurrentCard] = useState(0);
  const [key, setKey] = useState(0);

  return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <View style={styles.button}>
              <Button
                title="Back"
                disabled={!data[currentCard - 1]}
                onPress={() => {
                  setCurrentCard(currentCard - 1)
                  setKey(key + 1);
                }}
              />
            </View>
            <Flashcard key={key} front={data[currentCard].front} back={data[currentCard].back} />
            <View style={styles.button}>
              <Button
                title="Next"
                disabled={!data[currentCard + 1]}
                onPress={() => {
                  setCurrentCard(currentCard + 1);
                  setKey(key + 1);
                }}
              />
            </View>
      </ScrollView>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  button: {
    margin: 20
  }
});
