import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  Platform,
} from 'react-native';
const {width} = Dimensions.get('window');
import LottieView from 'lottie-react-native';
import {getStatusBarHeight} from '../helpers';
class Toast extends Component {
  fadeAnim = new Animated.Value(0);

  fadeIn = () => {
    const {duration} = this.props;
    Animated.spring(this.fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
    this.animation && this.animation.play(0, 200);
    setTimeout(() => {
      this.fadeOut();
    }, duration);
  };

  fadeOut = () => {
    Animated.timing(this.fadeAnim, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const translateX = this.fadeAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [width, 0],
    });
    const {title} = this.props;
    return (
      <View style={styles.backdrop} pointerEvents={'none'}>
        <Animated.View
          style={[styles.box, {transform: [{translateX}]}]}
          {...this.props}>
          <Text style={styles.title}>{title}</Text>
          <LottieView
            loop={false}
            style={styles.icon}
            ref={(animation) => {
              this.animation = animation;
            }}
            source={require('../assets/animation/trophy-animation')}
          />
        </Animated.View>
      </View>
    );
  }
}
Toast.defaultProps = {
  duration: 5000,
  title: 'GOOD!',
};

export default Toast;

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFill,
    top: Platform.OS === 'ios' ? getStatusBarHeight() + 10 : 0,
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 16,
  },
  title: {
    color: '#e7f1fb',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  icon: {
    position: 'absolute',
    elevation: 2,
    height: '100%',
    right: 0,
    backgroundColor: 'transparent',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  box: {
    backgroundColor: '#46694f',
    borderRadius: 8,
    height: 60,
    width: '100%',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 0},
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
});
