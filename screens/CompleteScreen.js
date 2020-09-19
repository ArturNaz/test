import React, {Component} from 'react';
import {SafeAreaView, StatusBar, StyleSheet, Text, View} from 'react-native';
import Button from '../components/Button';
import LottieView from 'lottie-react-native';

export default class CompleteScreen extends Component {
  onTryAgainHandler = async () => {
    this.props.route.params.reset();
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <LottieView
            loop
            autoPlay
            style={{flex: 1}}
            source={require('../assets/animation/fireworks')}
          />
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Congratulations!</Text>
            <Text style={styles.sectionDescription}>You pass the test</Text>
            <Button style={styles.button} onPress={this.onTryAgainHandler}>
              <Text style={styles.btnText}>Try Again</Text>
            </Button>
          </View>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#21232a',
    paddingHorizontal: 14,
    justifyContent: 'center',
  },
  button: {
    width: '60%',
    alignSelf: 'center',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginHorizontal: 14,
    backgroundColor: '#2b3139bd',
    borderRadius: 8,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: 'orange',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#9fa6ad',
  },
});
