import React from 'react';
import { Text, View, ScrollView,Dimensions, Image, TouchableOpacity, StyleSheet, TextInput, } from 'react-native';
import ImagePath from '../assets/ImagePath';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const Header = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',marginTop:hp(7),marginHorizontal:10,paddingBottom:5 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 0.9 }}>
                <TouchableOpacity onPress={props.onclick} style={{ backgroundColor: '#F8F8FB', justifyContent: 'center', alignItems: 'center', }}>
                        <Image style={{ height: 20, width: 20, resizeMode: 'contain' }}
                            source={props.Back_Arrow}
                        />
                </TouchableOpacity>
                <View style={{marginLeft:10}}>
                <Text style={{ color: '#000000',fontFamily: "Metropolis-SemiBold",  fontSize: 16,  }}>{props.tital}</Text>
                <Text style={{ color: '#000000', fontFamily: "Metropolis-SemiBold", fontSize: 12,  }}>{props.titalTwo}</Text>
                </View>
               
                {props.searchIcon&&
                 <View style={[styles.inputMain,{marginLeft:8} ]}>
                 <TextInput
                     style={[styles.textInput, { color: "rgba(0, 0, 0, 0.7)" }]}
                     placeholderTextColor="rgba(0, 0, 0, 0.7)"
                     placeholder={props.placeholder}
                 // onChangeText={onChangeText}
                 // value={value}
                 />
                 <TouchableOpacity activeOpacity={0.5} onPress={() => { ('') }}>
                     <Image source={props.searchIcon} style={styles.iconStyle} />
                 </TouchableOpacity>
             </View>}
             

            </View>
            <View style={{flex:0.3,alignItems:'flex-end'}}>
                    <Image style={{ width: 30,height:30,resizeMode:'contain' , borderRadius: 26,}}
                        source={props.profileIcon}
                    />
              
            </View>
            
        </View>
    );
}


export default Header;
const styles = StyleSheet.create({
    //
 
    inputMain: {
        backgroundColor: '#fff',
        flexDirection: "row",
        alignItems: "center",
        elevation: 16,
        width:'100%',
        // marginHorizontal: wp(2.5),
        borderRadius: 30,
        paddingHorizontal: wp(4), height: hp(4.6)
    },

    textInput: {
        
        fontFamily: 'Metropolis-Regular',
        fontSize: hp(2), padding: 0, height: hp(6), flex: 1, fontSize: 14, paddingRight: 10,
    },
    iconStyle: {
        tintColor: "#000000",
        width: 18,
        resizeMode: 'contain',
        height: 18,
    },
});