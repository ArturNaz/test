/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import axios from 'axios';
import Button from './components/Button';
import LottieView from 'lottie-react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
const MOCKY_DATA =
  'https://run.mocky.io/v3/7268b856-16d9-42ab-9e69-53d41bf9666d';
const MOCKY_SEND =
  'https://run.mocky.io/v3/9869cfd3-dd49-4131-956b-2dfc01dfd718';
export default class App extends Component {
  state = {
    load: false,
    data: {},
    select: null,
  };
  animation = null;

  componentDidMount() {
    setTimeout(()=>this.animation && this.animation.play(),1000)

    this.getData();
  }

  getData = async () => {
    try {
      const response = await axios.get(MOCKY_DATA);
      if (response.status >= 200 && response.status < 300) {
        let data = {};
        response.data.map((el) => (data[el.type] = el));
        this.setState({data, load: true, select: null});
        console.log(this.state.data);
      }
    } catch (e) {
      console.error(e);
    }
  };

  getCode = (uri) => {
    const video_id = uri.split('v=')[1];
    const ampersandPosition = video_id.indexOf('&');
    return ampersandPosition !== -1
      ? video_id.substring(0, ampersandPosition)
      : video_id;
  };

  onChoiceSelect = (index) => {
    if (this.state.select === null) {
      this.setState({select: index});
      setTimeout(()=>this.animation && this.animation.play(),500)
    }
  };
  checkChoice = (select, index, isTitle = false) => {
    const answer = this.state.data.quiz.answer;
    if (select === index && index === answer) {
      return isTitle ? styles.choiceTitleSuccess : styles.choiceSuccess;
    } else if (select === index && index !== answer) {
      return isTitle ? styles.choiceTitleWrong : styles.choiceWrong;
    }
    return {};
  };
  render() {
    const {
      load,
      select,
      data: {text, image, quiz, video, input},
    } = this.state;
    if (!load) {
      return null;
    }

    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex: 1, backgroundColor: '#21232a'}}>
          <KeyboardAwareScrollView
            keyboardVerticalOffset={40}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            contentContainerStyle={{
              paddingBottom: 20,
              justifyContent: 'center',
              paddingHorizontal: 12,
            }}
            //style={{backgroundColor: 'red',flex:1}}
            contentInsetAdjustmentBehavior="automatic"
            getTextInputRefs={() => {
              return [this._textInputRef];
            }}>
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{text.title}</Text>
                <YoutubePlayer
                  webViewStyle={{marginVertical: 16}}
                  height={220}
                  play={false}
                  videoId={this.getCode(video.content)}
                />
                <Image
                  style={{width: '100%', aspectRatio: 1.8}}
                  resizeMode="cover"
                  source={{uri: image.content}}
                />
                <Text style={styles.sectionDescription}>{text.content}</Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{quiz.title}</Text>
                <Text style={styles.sectionDescription}>{quiz.content}</Text>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    marginVertical: 8,
                  }}>
                  {quiz.choices.map((choice, index) => (
                    <TouchableOpacity
                      disabled={select !== null}
                      style={[styles.choice, this.checkChoice(select, index)]}
                      onPress={() => this.onChoiceSelect(index)}>
                      <Text
                        key={`choice-${index}`}
                        style={[
                          styles.choiceTitle,
                          this.checkChoice(select, index, true),
                        ]}
                        adjustsFontSizeToFit={true}
                        numberOfLines={1}>
                        {choice}
                      </Text>
                    </TouchableOpacity>
                  ))}
                  {select !== null && <LottieView
                      style={{position:'absolute',height:'100%',width:'100%', backgroundColor:'rgba(33,35,42,0.08)'}}
                      ref={(animation) => {
                        this.animation = animation;
                      }}
                      source={require('./assets/animation/fireworks')}
                  />}
                </View>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>{input.title}</Text>
                <View style={styles.textAreaContainer}>
                  <TextInput
                    ref={(r) => {
                      this._textInputRef = r;
                    }}
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder={input.content}
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                  />
                </View>
              </View>
              <Button style={{width: '60%', alignSelf: 'center'}}>
                <Text
                  style={{
                    color: 'white',
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  send
                </Text>
              </Button>
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textAreaContainer: {
    padding: 5,
    marginVertical: 14,
    backgroundColor: '#21232a',
  },
  textArea: {
    color: 'white',
    minHeight: 150,
    width: '100%',
    justifyContent: 'flex-start',
  },
  scrollView: {},
  body: {
    //backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: '#2b3139',
    borderRadius: 8,
    elevation: 2,
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
  highlight: {
    fontWeight: '700',
  },
  choice: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 18,
    marginVertical: 4,
    marginHorizontal: 4,
    alignItems: 'center',
    borderRadius: 8,
    minWidth: '40%',
    elevation: 2,
  },
  choiceTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  choiceTitleSuccess: {
    color: 'white',
  },
  choiceTitleWrong: {
    color: 'white',
  },
  choiceSuccess: {
    backgroundColor: '#90ff3b',
    shadowColor: '#90ff3b',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  choiceWrong: {
    backgroundColor: 'tomato',
    shadowColor: '#ff6347',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
  },
  footer: {
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
