/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * 
 * Generated with the TypeScript template
 * https://github.com/emin93/react-native-template-typescript
 * 
 * @format
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
// import SQLite from 'react-native-sqlite-storage';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

var SQLite = require('react-native-sqlite-storage')
var db = SQLite.openDatabase({
  name: "TestDatabase",
  createFromLocation: '~example.db'
})

// interface Props {}
export default class App extends Component<{}> {

  public componentDidMount() {
    SQLite.DEBUG(true);
    SQLite.enablePromise(true);

    SQLite.openDatabase({
      name: "TestDatabase",
      location: "default"
    }).then((db) => {
      console.log("Database open!");
    });
  }

  constructor(props) {
    super(props)

    this.state = {
      petname: "",
    };

    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM pet WHERE owner=?', ['John'], (tx, results) => {
          var len = results.rows.length;
          if (len > 0) {
            var row = results.rows.item(0);
            this.setState({ petname: row.petname });
          }
        });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{'John \'s pet is ' + this.state.petname + '!'}</Text>
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Text style={styles.instructions}>To get started, edit App.tsx</Text>
        <Text style={styles.instructions}>{instructions}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
