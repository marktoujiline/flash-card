import React from 'react';
import { Animated, Easing, StyleSheet, TouchableWithoutFeedback } from 'react-native';

export default class Flashcard extends React.Component {

  constructor(props) {
    super(props);
    this.onButtonPressed = this.onButtonPressed.bind(this);
    this.changeSide = this.changeSide.bind(this);
    this.state = {
      currentSide : "front",
      transform: []};
  }

  changeSide() {
    this.setState({
      currentSide: (this.state.currentSide === "front") ? "back" : "front"
    });
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

    this.setState({
      transform: [{ rotateX: x}]});
  }

  animate() {
    let rotateXVal = new Animated.Value(0);
    //let rotateZVal = new Animated.Value(0);

    Animated.timing( rotateXVal, {
      toValue: 90,
      duration:200,
      easing: Easing.linear
    }).start(() => this.changeSide());

    let x = rotateXVal.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

    this.setState({
      transform: [{ rotateX: x}]});
  }

  onButtonPressed() {
    this.animate();
  }

  render() {
    let side = (this.state.currentSide === "front") ? this.props.front : this.props.back;

    const styles = StyleSheet.create({
      container: {
        height:250,
        width:450,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        transform:this.state.transform
      },
    });

    return (
      <TouchableWithoutFeedback
        onPress={this.onButtonPressed}>
        <Animated.View style={styles.container}>
          {side}
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  }
}