/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
    Image,
    TouchableOpacity
} from 'react-native';
import axios from 'axios'
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


export default class App extends Component{
  state = {
    load:false,
    data:{}
  }
 async componentDidMount() {
   try{
     const response = await axios.get('https://run.mocky.io/v3/7268b856-16d9-42ab-9e69-53d41bf9666d');
     if(response.status >= 200 && response.status < 300){
       let data = {};
       response.data.map(el => data[el.type] = el);
       this.setState({data,load:true});
       console.log(this.state.data)
     }

   }catch (e) {
     console.error(e)
   }

 }

  render(){
    const {load,data:{text, image, quiz}} = this.state;
    if(!load)
      return null;

    return (
        <>
          <StatusBar barStyle="dark-content" />
          <SafeAreaView style={{flex:1}}>
            <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
              <View style={styles.body}>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{text.title}</Text>
                  <Text style={styles.sectionDescription}>
                    {text.content}
                  </Text>
                </View>
                <View style={styles.sectionContainer}>
                  <Text style={styles.sectionTitle}>{quiz.title}</Text>
                  <Text style={styles.sectionDescription}>
                    {quiz.content}
                  </Text>
                  <View style={{flexDirection:'row',flexWrap:'wrap',marginVertical: 8}}>
                    {quiz.choices.map((choice, index) => <TouchableOpacity style={styles.choice}>
                      <Text key={`choice-${index}`} style={{fontSize: 16,
                        fontWeight: '400',
                        color: Colors.dark,}} adjustsFontSizeToFit={true} numberOfLines={1}>
                        {choice}
                      </Text>
                    </TouchableOpacity>)}
                  </View>
                </View>
               {/* <Image
                    style={{width:180,aspectRatio:1.5}}
                    resizeMode="cover"
                    source={{uri: image.content}}

                />*/}
              </View>

            </ScrollView>
          </SafeAreaView>
        </>
    );
  }

}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "#21232a",
  },
  body: {
    //backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingVertical: 14,
    marginHorizontal:16,
    backgroundColor:'#2b3139',
    borderRadius:8,
    elevation:2
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
  choice:{
    flex:1,
    backgroundColor:'#fff',
    paddingHorizontal:4,
    paddingVertical:18,
    marginVertical:4,
    marginHorizontal:4,
    alignItems:'center',
    borderRadius:8,
    minWidth:'38%',
    elevation: 2

  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

