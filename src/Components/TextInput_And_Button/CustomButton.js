import React, {useState} from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CustomButton = ({onclick, title,bgColor,Textcolor,flex,Top,   }) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onclick} style={{ flex:flex,marginTop:Top, backgroundColor:bgColor,borderWidth:1,height:hp("5.5%"),borderRadius:hp(1), borderColor:"#00000",justifyContent:"center"}}>
        <Text style={[styles.buttonText,{color:Textcolor}]}>{title}</Text>
    </TouchableOpacity>
  );
};
export default CustomButton;
const styles = StyleSheet.create({
  buttonText:{ textAlign:'center', fontSize: hp(2.1), fontFamily:"Metropolis-Medium",letterSpacing:0.3 },
});
