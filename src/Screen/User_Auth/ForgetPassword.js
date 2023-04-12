import React, { useState } from "react";
import { Image, ImageBackground, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePath from "../../assets/ImagePath";
import CustomTextInput from "../../Components/TextInput_And_Button/CustomTextInput";
import CustomButton from "../../Components/TextInput_And_Button/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ForgetPassword = (props) => {
    const [email, setEmail] = useState('');
    return (
        <View style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%", justifyContent: 'center' }}>
                    <View style={{ marginHorizontal: 20, }}>
                        <Text style={styles.signIn}>Forget Password</Text>
                        <Text style={[styles.signIn, { fontWeight: '400', fontSize: 17, letterSpacing: 0.3, }]}>Don't worry, we'll help you get back into your account in no time!</Text>
                        <CustomTextInput
                            title='Enter your email'
                            value={email}
                            iconPath={ImagePath.msgIcon}
                            onChangeText={(text) => { setEmail(text) }}
                        />
                        <CustomButton
                            onclick={() => { props.navigation.navigate('ResetPassword') }}
                            top={30}
                            title='Submit'
                            bgColor='#000'
                            textColor='#fff'
                        />
                    </View>

                </ImageBackground>
            </ScrollView>
        </View>
    );
}
export default ForgetPassword;
const styles = StyleSheet.create({
    withText: { fontWeight: '500', fontSize: 13, alignSelf: "center", color: "#979797" },
    signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 28, color: '#000000', marginBottom: 15 },
});