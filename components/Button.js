import React, {Component} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class Button extends Component {
  render() {
    const {children, start, end, locations, startColor, endColor} = this.props;

    return (
      <TouchableOpacity {...this.props}>
        <LinearGradient
          start={start}
          end={end}
          locations={locations}
          style={styles.button}
          colors={[startColor, endColor]}>
          {children}
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}
Button.defaultProps = {
  startColor: 'orange',
  endColor: '#ff971f',
  start: {x: 0, y: 0},
  end: {x: 1, y: 1},
  locations: [0.1, 0.9],
  opacity: 0.7,
};

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    height: 60,
    justifyContent: 'center',
    marginVertical: 14,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});
