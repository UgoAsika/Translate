import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput } from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import colors from '../utils/colors';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import supportedLanguages from '../utils/supportedLanguages';


export default function HomeScreen(props) {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("fr");
  const [languageFrom, setLanguageFrom] = useState("en");
  const params = props.route.params || {};

  useEffect(()=>{
      if (params.languageTo) {
        setLanguageTo(params.languageTo)
      }

      if (params.languageFrom) {
        setLanguageFrom(params.languageFrom)
      }
  },[params.languageTo, params.languageFrom])

  return (
      <View style={styles.container}>
          <View style={styles.languageContainer}>
            <TouchableOpacity
              style={styles.languageOption}
              onPress={() => props.navigation.navigate("languageSelect", {title: "Translate from", selected: languageFrom, mode: 'from' })}>
                <Text style={styles.languageOptionText}>{supportedLanguages[languageFrom]}</Text>
            </TouchableOpacity>

                <View style={styles.arrowContainer}>
                    <AntDesign name="arrowright" size={24} color= {colors.primary} />
                </View>

            <TouchableOpacity style={styles.languageOption}
            onPress={() => props.navigation.navigate("languageSelect", {title: "Translate to", selected: languageTo, mode: 'to'})}>
                <Text style={styles.languageOptionText}>{supportedLanguages[languageTo]}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
              <TextInput
                placeholder='Enter Text'
                multiline = {true}
                style={styles.textInput}
                onChangeText={(text) => setEnteredText(text)}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                disabled={enteredText === ""}
              >
                
                <Foundation name="arrow-right" size={24} color={enteredText !== "" ? colors.primary: "grey"} />
              </TouchableOpacity>

          </View>
          <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{resultText}</Text>

              <TouchableOpacity
                style={styles.iconContainer}
                disabled={resultText === ""}
              >
                
                <FontAwesome name="copy" size={24} color="black" />
              </TouchableOpacity>
          </View>
          <View style={styles.historyContainer}>

          </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  languageContainer:{
    flexDirection: 'row',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1
  },
  languageOption: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15
  },
  arrowContainer:{
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageOptionText: {
    color: colors.primary,
    fontFamily: 'regular',
    letterSpacing: 0.3
  },
  iconContainer:{
      paddingHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
  },
  textInput:{
      flex:1,
      marginTop: 10,
      paddingHorizontal: 20,
      paddingVertical: 15,
      fontFamily: 'regular',
      letterSpacing: 0.3,
      height: 90,
      color: colors.textColor,

  },
  inputContainer:{
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1
  },
  resultContainer:{
    flexDirection: 'row',
    borderBottomColor: colors.lightGrey,
    borderBottomWidth: 1,
    height: 90,
    paddingVertical: 15
  },
  resultText:{
    color: colors.primary,
    fontFamily: 'regular',
    letterSpacing: 0.3,
    flex: 1,
    marginHorizontal: 20,

  },
  historyContainer:{
  backgroundColor: colors.greyBackground,
  flex: 1,
  padding: 10,
}
});