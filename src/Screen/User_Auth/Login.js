import React, { useState } from "react";
import { Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Dimensions } from "react-native";
import ImagePath from "../../assets/ImagePath";
import CustomTextInput from "../../Components/TextInput_And_Button/CustomTextInput";
import CustomButton from "../../Components/TextInput_And_Button/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Login = (props) => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const [eyeShow, setEyeShow] = useState('');
   const onClickEye = () => {
      setEyeShow(!eyeShow)
   }

   return (
      <View style={{ flex: 1, }}>
         <ScrollView>
            <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
            <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%" }}>
               <ImageBackground source={ImagePath.dancePic} style={{ resizeMode: "cover", width: width, height: height / 2.2 }}>
                  <View style={styles.dot}>
                     <Image source={ImagePath.star_logo} style={{ resizeMode: 'contain', height: 70, width: 70, alignSelf: 'center', }} />
                  </View>
               </ImageBackground>

               <View style={{ marginHorizontal: 20, marginTop: hp(5) }}>
                  <Text style={styles.signIn}>Sign In</Text>
                  <CustomTextInput
                     title='Enter your email'
                     iconPath={ImagePath.msgIcon}
                     onChangeText={(text) => { setEmail(text) }}
                     value={email}
                     keyboardType={"email-address"}
                     returnKeyType={"next"}
                  />
                  <CustomTextInput
                     marginTop={20}
                     title='Enter password'
                     onChangeText={(text) => { setPassword(text) }}
                     value={password}
                     iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
                     secureTextEntry={eyeShow ? false : true}
                     onClickEye={() => { onClickEye() }}
                  />
                  <CustomButton
                     onclick={() => { props.navigation.navigate('BottomTab') }}
                     top={30}
                     title='Sign in'
                     bgColor='#000'
                     textColor='#fff'
                  />
                  <TouchableOpacity style={{ alignSelf: "flex-end" }} onPress={() => { props.navigation.navigate('ForgetPassword') }}>
                     <Text style={styles.forgetText}>Forgot password</Text>
                  </TouchableOpacity>
                  <Text style={[styles.withText, { color: "#797979" }]}>Or Sign in with</Text>
               </View>
               <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginHorizontal: wp(7) }}>
                  <Image source={ImagePath.google} style={styles.googleLogo} />
                  <Image source={ImagePath.apple} style={styles.googleLogo} />
               </View>

               <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 10 }}>
                  <Text style={styles.withText}>
                     Don’t have an account </Text>
                  <TouchableOpacity onPress={() => { props.navigation.navigate('SignUp') }}>
                     <Text style={[styles.withText, { textDecorationLine: "underline" }]}>Sign Up</Text>
                  </TouchableOpacity>
               </View>
            </ImageBackground>
         </ScrollView>
      </View>
   );
}

export default Login;

const styles = StyleSheet.create({
   dot: { backgroundColor: '#FFFFFF', width: 100, height: 100, borderRadius: 100, alignSelf: 'center', justifyContent: 'center', position: "absolute", bottom: hp(-6) },
   signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 18, color: '#000000', marginBottom: 15 },
   googleLogo: { height: 90, width: 90, resizeMode: 'contain' },
   forgetText: {
      fontWeight: '400',
      fontSize: 13,
      color: '#797979', marginVertical: 20,
   },
   withText: { fontWeight: '500', fontSize: 13, alignSelf: "center", color: "#000" }
});