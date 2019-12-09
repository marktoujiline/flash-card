import React, { useState }from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  ScrollView
} from 'react-native';
import Flashcard from '../components/Flashcard';
import SyntaxHighlighter from 'react-native-syntax-highlighter';
import data from '../data.json';

const BigText = (props) => {
  return <Text {...props} style={{fontSize: 20, margin: 5}}/>;
}

export default function HomeScreen() {
  const toText = (obj) => obj.code ? (
  <BigText>{obj.text}</BigText>
  ) : (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ScrollView style={{flexGrow: 0}}>
        <BigText>{obj.text}</BigText>
      </ScrollView>
  </View>
  )
  
  
  ;
  const toCode = (obj) => <SyntaxHighlighter
    highlighter="prism"
    customStyle={{padding: 0, margin: 0 }}
    language='javascript'>
      {obj.code}
    </SyntaxHighlighter>

  const toComponent = obj => (<View>
    {obj.text && toText(obj)}
    {obj.code && toCode(obj)}
  </View>);

  const translatedData = data.map(card => ({
    front: toComponent(card.front),
    back: toComponent(card.back)
  }));

  const [currentCard, setCurrentCard] = useState(0);
  const [key, setKey] = useState(0);

  return (
      <View style={styles.contentContainer}>
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
      </View>
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
