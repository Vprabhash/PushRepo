import React, { useState } from "react";
import { Image, ImageBackground, Dimensions, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImagePath from "../../assets/ImagePath";
import CustomTextInput from "../../Components/TextInput_And_Button/CustomTextInput";
import CustomButton from "../../Components/TextInput_And_Button/CustomButton";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ResetPassword = (props) => {
    const [creatPassword, setCreatPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [eyeShow, setEyeShow] = useState('');

    const onClickEye = () => {
        setEyeShow(!eyeShow)
    }
    return (
        <View style={{ flex: 1, }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%", justifyContent: 'center' }}>

                    <View style={{ marginHorizontal: 20, }}>
                        <Text style={styles.signIn}>Reset Password </Text>
                        <Text style={[styles.signIn, { fontWeight: '400', fontSize: 18, letterSpacing: 0.3, }]}>Your new password must be different from previous password</Text>
                        <CustomTextInput
                            marginTop={20}
                            title='Create new password'
                            onChangeText={(text) => { setCreatPassword(text) }}
                            value={creatPassword}
                            iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
                            secureTextEntry={eyeShow ? false : true}
                            onClickEye={() => { onClickEye() }}
                        />
                        <CustomTextInput
                            marginTop={20}
                            title='Enter new password again'
                            onChangeText={(text) => { setNewPassword(text) }}
                            value={newPassword}
                            iconPath={eyeShow ? ImagePath.eyeIcon : ImagePath.closeEye}
                            secureTextEntry={eyeShow ? false : true}
                            onClickEye={() => { onClickEye() }}
                        />
                        <CustomButton
                            onclick={() => { props.navigation.navigate('PasswordSuccessful') }}
                            // flex={1}
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
export default ResetPassword;
const styles = StyleSheet.create({
    // signIn: { fontWeight: '500', fontSize: 24, color: '#000000', marginBottom: 22 },
    signIn: { fontFamily: "Metropolis-SemiBold", fontSize: 28, color: '#000000', marginBottom: 15 },


});