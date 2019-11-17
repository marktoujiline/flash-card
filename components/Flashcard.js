import React, { useState } from 'react';
import { Animated, Easing, StyleSheet, TouchableWithoutFeedback } from 'react-native';

const Flashcard = ({front, back}) => {
    const [currentSide, setCurrentSide] = useState('front');
    const [transform, setTransform] = useState([]);

  const changeSide = () => {
    setCurrentSide(currentSide === "front" ? "back" : "front");
    let rotateXVal = new Animated.Value(90);
    Animated.timing( rotateXVal, {
      toValue: 0,
      duration:200,
      easing: Easing.linear
    }).start();

    let x = rotateXVal.interpolate({
      inputRange: [0, 360],
      outputRange: ['360deg', '0deg'],
    });

    setTransform([{ rotateX: x}]);
  }

  const animate = () => {
    let rotateXVal = new Animated.Value(0);
    //let rotateZVal = new Animated.Value(0);

    Animated.timing( rotateXVal, {
      toValue: 90,
      duration:200,
      easing: Easing.linear
    }).start(() => changeSide());

    let x = rotateXVal.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    setTransform([{ rotateX: x}]);
  }

    let side = (currentSide === "front") ? front : back;

    const styles = StyleSheet.create({
        container: {
        height:250,
        width:450,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        transform
        },
    });

    return (
      <TouchableWithoutFeedback
        onPress={() => animate()}>
        <Animated.View style={styles.container}>
          {side}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
}

export default Flashcard;