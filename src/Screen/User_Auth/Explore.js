import React, {useEffect} from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePath from '../../assets/ImagePath';
import CustomButton from '../../Components/TextInput_And_Button/CustomButton';
import LinearGradient from 'react-native-linear-gradient';
import {COLORS, FONTS} from '../../Components/constants';

const Explore = props => {
  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: 'white'}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ImageBackground source={ImagePath.Explore} style={{flex: 1}}>
        <LinearGradient
          style={{flex: 1, justifyContent: 'flex-end'}}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 1}}
          colors={['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 1)']}>
          <View style={{}}>
            <Text
              style={{
                fontFamily: FONTS.AxiformaBold,
                fontSize: 24,
                textAlign: 'center',
                lineHeight: 37,
                color: COLORS.black,
              }}>
              Discover your new favorite{'\n'}club in just seconds.
            </Text>
            <Text
              style={{
                fontFamily: FONTS.RobotoRegular,
                fontSize: 15,
                paddingHorizontal: 20,
                textAlign: 'center',
                lineHeight: 19,
                marginTop: 10,
                color: COLORS.black,
              }}>
              Explore new clubs and events near you and make unforgettable
              memories with just one tap.
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 20,
                marginVertical: 25,
              }}>
              <CustomButton
                onclick={() => {
                  props.navigation.navigate('SignUp');
                }}
                title="Sign up"
                flex={0.47}
                bgColor="#fff"
                textColor={COLORS.black}
              />
              <CustomButton
                onclick={() => {
                  props.navigation.navigate('Login');
                }}
                flex={0.47}
                title="Sign in"
                borderColor="#000"
                bgColor="#000"
                textColor="#FAFAFA"
              />
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </ScrollView>
  );
};
export default Explore;
