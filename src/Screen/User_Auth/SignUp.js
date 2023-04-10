import React, { useState } from "react";
import { Image, ImageBackground, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePath from "../../assets/ImagePath";
import CustomTextInput from "../../Components/TextInput_And_Button/CustomTextInput";
import CustomButton from "../../Components/TextInput_And_Button/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [creatPassword, setCreatpassword] = useState('');
    const [password, setPassword] = useState('');
    const [eyeShow, setEyeShow] = useState('');
    const onClickEye = () => {
        setEyeShow(!eyeShow)
    }
    return (
        <View style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                {/* <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: 900 }}>
                    <Image source={ImagePath.dancePic} style={{ resizeMode: 'contain', width: 395, height: 328, top: 0 }} />
                    <View style={styles.dot}>
                        <Image source={ImagePath.star_logo} style={{ resizeMode: 'contain', height: 100, width: 100, alignSelf: 'center', }} />
                    </View> */}
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%" }}>
                    <ImageBackground source={ImagePath.dancePic} style={{ resizeMode: "cover", width: width, height: height / 2.2 }}>
                        <View style={styles.dot}>
                            <Image source={ImagePath.star_logo} style={{ resizeMode: 'contain', height: 70, width: 70, alignSelf: 'center', }} />
                        </View>
                    </ImageBackground>
                    <View style={{ marginHorizontal: 20, marginTop: hp(5) }}>
                        <Text style={styles.signIn}>Sign Up</Text>
                        <CustomTextInput
                            title='Enter your email'
                            iconPath={ImagePath.msgIcon}
                            onChangeText={(text) => { setEmail(text) }}
                            value={email}
                        />
                        <CustomTextInput
                            marginTop={20}
                            title='Create password'
                            onChangeText={(text) => { setCreatpassword(text) }}
                            value={creatPassword}
                            iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
                            secureTextEntry={eyeShow ? false : true}
                            onClickEye={() => { onClickEye() }}
                        />
                        <CustomTextInput
                            marginTop={20}
                            title=' Enter password again'
                            onChangeText={(text) => { setPassword(text) }}
                            value={password}
                            iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
                            secureTextEntry={eyeShow ? false : true}
                            onClickEye={() => { onClickEye() }}
                        />
                        <CustomButton
                             onclick={() => {props.navigation.navigate('Otp') }}
                            Top={30}
                            title='Sign up'
                            bgColor='#000'
                            Textcolor='#fff'
                        />
                        <Text style={[styles.withText, { color: "#797979", top: hp(4) }]}>Or Sign up with</Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 15, marginHorizontal: wp(7) }}>
                        <Image source={ImagePath.google} style={styles.googleLogo} />
                        <Image source={ImagePath.apple} style={styles.googleLogo} />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={[styles.withText, { color: "#000000" }]}>
                            Already have an account Sign In </Text>
                        <TouchableOpacity onPress={() => { props.navigation.navigate('Login') }}>
                            <Text style={[styles.withText, { textDecorationLine: "underline" }]}>Sign Ip</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}
export default SignUp;
const styles = StyleSheet.create({
    dot: { backgroundColor: '#FFFFFF', width: 100, height: 100, borderRadius: 100, alignSelf: 'center', justifyContent: 'center', position: "absolute", bottom: hp(-6) },
    signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 18, color: '#000000', marginBottom: 15 },
    googleLogo: { height: 90, width: 90, resizeMode: 'contain' },
    forgetText: {
        fontWeight: '400',
        fontSize: 14,
        color: '#797979', alignSelf: 'flex-end', marginVertical: 20,
    },
    withText: { fontWeight: '500', fontSize: 13, alignSelf: "center", color: "#000" }

    // withText: { fontWeight: '500', fontSize: 14, alignSelf: "center", top: 20 }
});