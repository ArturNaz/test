import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import LottieView from 'lottie-react-native';

class ResultAnimation extends Component {
  render() {
    const {result} = this.props;
    if (result === null) {
      return null;
    }
    if (result) {
      return (
        <LottieView
          loop={false}
          autoPlay
          style={styles.layer}
          source={require('../assets/animation/check-mark')}
        />
      );
    } else {
      return (
        <LottieView
          loop={false}
          autoPlay
          style={styles.layer}
          source={require('../assets/animation/wrong-mark')}
        />
      );
    }
  }
}

ResultAnimation.defaultProps = {
  result: null,
};

export default ResultAnimation;

const styles = StyleSheet.create({
  layer: {
    position: 'absolute',
    elevation: 2,
    height: 50,
    aspectRatio: 1,
    right: 0,
  },
});
