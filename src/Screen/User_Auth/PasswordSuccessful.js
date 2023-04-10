import React, { useState } from "react";
import { Image, ImageBackground,Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePath from "../../assets/ImagePath";
import CustomTextInput from "../../Components/TextInput_And_Button/CustomTextInput";
import CustomButton from "../../Components/TextInput_And_Button/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const PasswordSuccessful = (props) => {
   
    return (
        <View style={{ flex: 1, }}>
            {/* <ScrollView contentContainerStyle={{flexGrow:1}}> */}
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%",}}>
                
                    <View style={{ marginHorizontal: 20, top:hp(20) }}>
                       <Text style={[styles.signIn,{textAlign:'center',lineHeight:hp(6)}]}>Password Reset Successful </Text>
                        <Text style={[styles.signIn,{fontWeight:'400',fontSize:17,letterSpacing:0.3,textAlign:'center'}]}> Now you can login</Text>
                      <Image source={ImagePath.doneIcon} style={{height:100,width:100,alignSelf:'center',marginTop:hp(8)}}/>
                       
                       
                    </View>
                    <View style={{position:'absolute',bottom:hp(3),width:'96%',right: wp(2),left:wp(2)}}>
                       <CustomButton
                            onclick={() => {props.navigation.navigate('Login') }}
                            // flex={1}
                            Top={30}
                            title='Done'
                            bgColor='#000'
                            Textcolor='#fff'
                        />
                       </View>
                </ImageBackground>
            {/* </ScrollView> */}
        </View>
    );
}
export default PasswordSuccessful;
const styles = StyleSheet.create({
    signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 28, color: '#000000', marginBottom: 15 },
    // signIn: { fontWeight: '500', fontSize: 24, color: '#000000', marginBottom: 22 },

});