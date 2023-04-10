import React, { useState } from 'react';
import { View, Text,Dimensions,TouchableOpacity, StyleSheet,ImageBackground } from 'react-native';
import OTPTextInput from 'react-native-otp-textinput';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePath from '../../assets/ImagePath';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height

const Otp = (props) => {



  const [Otp, setOtp] = useState("")

  return (
    <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10 }}>
    <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%",justifyContent:'center' }}>
      <Text style={styles.signIn}>Enter OTP</Text>
      <Text style={[styles.signIn, { fontWeight: '400', fontSize: 17, letterSpacing: 0.3, }]}>Check your email, we’ve sent you the pin at example@mail.com</Text>
      <OTPTextInput
        inputCount={4}
        returnKeyType={"next"}
        handleTextChange={(text) => setOtp(text)}
        defaultValue={Otp}
        tintColor={'gray'}
      
      />
      <CustomButton
        onclick={() => { props.navigation.navigate('Login') }}
        Top={30}
        title='Otp'
        bgColor='#000'
        Textcolor='#fff'
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center',marginTop:hp(4.2) }}>
                        <Text style={[styles.withText,]}>
                        Didn’t received pin  </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }}>
                            <Text style={[styles.withText, { color:'#000000' }]}>Resend</Text>
                        </TouchableOpacity>
                    </View>
                    </ImageBackground>
    </View>

  );
}
export default Otp;
const styles = StyleSheet.create({
   withText: { fontWeight: '500', fontSize: 13, alignSelf: "center", color: "#979797" },
  signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 28, color: '#000000', marginBottom: 15 },
});