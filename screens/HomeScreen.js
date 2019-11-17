import React, { useState }from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
import Flashcard from '../components/Flashcard';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import data from '../data.json';

const BigText = (props) => {
  return <Text {...props} style={{fontSize: 20}}/>;
}

export default function HomeScreen() {
  const toText = (obj) => <BigText>{obj.text}</BigText>;
  const toCode = (obj) => <SyntaxHighlighter
    highlighter="prism"
    language='javascript'>
      {obj.code}
    </SyntaxHighlighter>

  const toComponent = obj => {
    return obj.text 
      ? toText(obj)
      : obj.code
        ? toCode(obj)
        : <div></div>
  };

  const translatedData = data.map(card => ({
    front: toComponent(card.front),
    back: toComponent(card.back)
  }));

  const [currentCard, setCurrentCard] = useState(0);
  const [key, setKey] = useState(0);

  return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
            <View style={styles.button}>
              <Button
                title="Back"
                disabled={!translatedData[currentCard - 1]}
                onPress={() => {
                  setCurrentCard(currentCard - 1)
                  setKey(key + 1);
                }}
              />
            </View>
            <Flashcard key={key} front={translatedData[currentCard].front} back={translatedData[currentCard].back} />
            <View style={styles.button}>
              <Button
                title="Next"
                disabled={!translatedData[currentCard + 1]}
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
