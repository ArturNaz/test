import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import axios from 'axios';
import Button from '../components/Button';
import Toast from '../components/Toast';
import Lightbox from 'react-native-lightbox-v2';
import YoutubePlayer from 'react-native-youtube-iframe';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import ResultAnimation from '../components/ResultAnimation';
import LottieView from 'lottie-react-native';
const MOCKY_DATA =
  'https://run.mocky.io/v3/7268b856-16d9-42ab-9e69-53d41bf9666d';
const MOCKY_SEND =
  'https://run.mocky.io/v3/9869cfd3-dd49-4131-956b-2dfc01dfd718';
export default class HomeScreen extends Component {
  state = {
    load: false,
    completeLoader: false,
    data: {},
    select: null,
    win: null,
    code: '',
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    try {
      this.setState({load: false});
      const response = await axios.get(MOCKY_DATA);
      if (response.status >= 200 && response.status < 300) {
        let data = {};
        response.data.map((el) => (data[el.type] = el));
        this.setState({data, load: true, select: null, win: null, code: ''});
      }
    } catch (e) {
      console.error(e);
    }
  };
  completeQuiz = async (input, quiz) => {
    try {
      this.setState({completeLoader: true});
      const response = await axios.post(MOCKY_SEND, {input, quiz});
      if (response.status >= 200 && response.status < 300) {
        this.props.navigation.navigate('Complete', {reset: this.getData});
      } else {
        alert('server error');
      }
    } catch (e) {
      console.error(e);
    }
    this.setState({completeLoader: false});
  };
  onCompleteHandler = async () => {
    const {select, code} = this.state;
    await this.completeQuiz(code, select);
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
      const win = index === this.state.data.quiz.answer;
      win && this.toast.fadeIn();
      this.setState({select: index, win});
    }
  };
  checkChoice = (select, index, isTitle = false) => {
    const answer = this.state.data.quiz.answer;
    if (select !== null && index === answer) {
      return isTitle ? styles.choiceTitleSuccess : styles.choiceSuccess;
    } else if (select === index && index !== answer) {
      return isTitle ? styles.choiceTitleWrong : styles.choiceWrong;
    }
    return {};
  };
  render() {
    const {
      load,
      completeLoader,
      select,
      code,
      win,
      data: {text, image, quiz, video, input},
    } = this.state;
    if (!load) {
      return (
        <View style={styles.loader}>
          <LottieView
            loop={true}
            autoPlay
            style={styles.layer}
            source={require('../assets/animation/loader-animation')}
          />
        </View>
      );
    }
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.container}>
          <KeyboardAwareScrollView
            keyboardVerticalOffset={40}
            keyboardOpeningTime={Number.MAX_SAFE_INTEGER}
            contentContainerStyle={styles.body}
            contentInsetAdjustmentBehavior="automatic"
            getTextInputRefs={() => {
              return [this._textInputRef];
            }}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{text.title}</Text>
              <YoutubePlayer
                webViewStyle={{marginVertical: 16}}
                height={220}
                play={false}
                videoId={this.getCode(video.content)}
              />
              <Lightbox>
                <Image
                  style={styles.image}
                  resizeMode="contain"
                  source={{uri: image.content}}
                />
              </Lightbox>
              <Text style={styles.sectionDescription}>{text.content}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{quiz.title}</Text>
              <Text style={styles.sectionDescription}>{quiz.content}</Text>
              <ResultAnimation result={win} />
              <View style={styles.choices}>
                {quiz.choices.map((choice, index) => (
                  <TouchableOpacity
                    key={`choice-${index}`}
                    disabled={select !== null}
                    style={[styles.choice, this.checkChoice(select, index)]}
                    onPress={() => this.onChoiceSelect(index)}>
                    <Text
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
              </View>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>{input.title}</Text>
              <View style={styles.textAreaContainer}>
                <TextInput
                  ref={(ref) => (this._textInputRef = ref)}
                  value={code}
                  style={styles.textArea}
                  underlineColorAndroid="transparent"
                  placeholder={input.content}
                  placeholderTextColor="grey"
                  numberOfLines={10}
                  multiline={true}
                  onChangeText={(code) => this.setState({code})}
                />
              </View>
            </View>
            {select !== null && code !== '' && (
              <Button style={styles.button} onPress={this.onCompleteHandler}>
                {completeLoader ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text style={styles.btnText}>Complete</Text>
                )}
              </Button>
            )}
          </KeyboardAwareScrollView>
          <Toast ref={(ref) => (this.toast = ref)} />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    backgroundColor: '#21232a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#21232a',
  },
  image: {
    flex: 1,
    height: 150,
  },
  button: {
    width: '60%',
    alignSelf: 'center',
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
    textAlignVertical: 'top',
  },
  scrollView: {},
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  body: {
    paddingBottom: 20,
    justifyContent: 'center',
    paddingHorizontal: 12,
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
  choices: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 8,
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
    color: 'black',
  },
  choiceTitleSuccess: {
    color: 'white',
  },
  choiceTitleWrong: {
    color: 'white',
  },
  choiceSuccess: {
    backgroundColor: '#36aa3d',
    shadowColor: '#36aa3d',
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
