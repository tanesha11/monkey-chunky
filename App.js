import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Header } from 'react-native-elements';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import db from './localdb';
import PhonicSoundButton from './components/phonicsoundbutton';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      chunks: [],
      phonicSounds: [],
    };
  }

  displayAlert(){
    alert('This word does not exist in our database');
  }
  
  render() {
    return (
      <SafeAreaProvider>
        <View style={styles.container}>
          <Header
            backgroundColor={'#696969'}
            centerComponent={{
              text: 'Monkey Chunky',
              style: { color: '#f8f8ff', fontSize: 25, fontWeight: 'bold' },
            }}
          />

          <Image
            style={styles.img}
            source={{
              uri:
                'https://www.shareicon.net/data/128x128/2015/08/06/80805_face_512x512.png',
            }}
          />

          <TextInput
            style={styles.inputbox}
            onChangeText={(data) => {
              this.setState({ text: data });
            }}
            value={this.state.text}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              var word = this.state.text.toLowerCase().trim();

              db[word]
                ? (this.setState({ chunks: db[word].chunks }),
                  this.setState({ phonicSounds: db[word].phones }))
                : this.displayAlert();
            }}>
            <Text style={styles.text}> Go </Text>
          </TouchableOpacity>

          <View>
            {this.state.chunks.map((item, index) => {
              return (
                <PhonicSoundButton
                  wordChunk={this.state.chunks[index]}
                  soundChunk={this.state.phonicSounds[index]}
                />
              );
            })}
          </View>
        </View>
      </SafeAreaProvider>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 50,
    width: '20%',
    alignSelf: 'center',
    height: 35,
    textAlign: 'center',
    borderWidth: 5,
    outline: 'none',
    borderColor: '#696969',
    borderRadius: 5,
  },

  text: {
    width: '80%',
    alignSelf: 'center',
    height: 50,
    textAlign: 'center',
    color: '#77dd77',
    fontSize: 20,
    fontWeight: 'bold',
  },

  container: {
    flex: 1,
    backgroundColor: '#a19ca9',
  },
  inputbox: {
    marginTop: 50,
    width: '80%',
    alignSelf: 'center',
    height: 50,
    textAlign: 'center',
    borderWidth: 5,
    outline: 'none',
    borderColor: '#696969',
    color: 'white',
    fontSize: 20,
    borderRadius: 5,
  },
  img: {
    width: 200,
    height: 200,
    marginLeft: 70,
  },
  textbutton: {
    backgroundColor: '#696969',
    width: 200,
    marginTop: 30,
    marginLeft: 65,
  },
  text1: {
    color: '#f8f8ff',
    fontSize: 20,
    textAlign: 'center',
  },
});
