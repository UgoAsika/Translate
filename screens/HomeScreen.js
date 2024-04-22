import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, FlatList, ActivityIndicator} from 'react-native';
import React from 'react';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Foundation } from '@expo/vector-icons';
import colors from '../utils/colors';
import { useState, useEffect, useCallback } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import supportedLanguages from '../utils/supportedLanguages';
import axios from "axios";
import { translate } from '../utils/translate';
import * as Clipboard from 'expo-clipboard';
import { useDispatch } from 'react-redux';


export default function HomeScreen(props) {
  const [enteredText, setEnteredText] = useState("");
  const [resultText, setResultText] = useState("");
  const [languageTo, setLanguageTo] = useState("fr");
  const [languageFrom, setLanguageFrom] = useState("en");
  const [isLoading, setIsLoading] = useState(false);
  const params = props.route.params || {};
  const dispatch = useDispatch();

  useEffect(()=>{
      if (params.languageTo) {
        setLanguageTo(params.languageTo)
      }

      if (params.languageFrom) {
        setLanguageFrom(params.languageFrom)
      }
  },[params.languageTo, params.languageFrom])

  const onSubmit = useCallback(async () => {
    
      try{
        setIsLoading(true);
        const result = await translate(enteredText, languageFrom, languageTo);
        if (!result){
          setResultText('')
          return;
        }
        //dispatch here

        const textResult = result.translated_text[result.to];
        setResultText(textResult)
      } catch (error){
        console.log(error)
      } finally{
        setIsLoading(false)
      }
      
  }, [enteredText, languageFrom, languageTo]);

  let copyToClipBoard = useCallback(async () => {
    await Clipboard.setStringAsync(resultText);
  },[resultText]);



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
                onPress={isLoading ? undefined : onSubmit}
                style={styles.iconContainer}
                disabled={enteredText === ""}
              >
                {isLoading ?  <ActivityIndicator size={'small'} color={colors.primary}/> :
                 <Foundation name="arrow-right" size={24} color={enteredText !== "" ? colors.primary: "grey"} />}
                
              </TouchableOpacity>

          </View>
          <View style={styles.resultContainer}>
              <Text style={styles.resultText}>{resultText}</Text>

              <TouchableOpacity
                style={styles.iconContainer}
                disabled={resultText === ""}
                onPress={copyToClipBoard}
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