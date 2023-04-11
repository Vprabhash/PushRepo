import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import ImagePath from '../assets/ImagePath';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const MenuCard = ({ navigation },props) => {

    const MenuData = [

        {
            menuIcon: ImagePath.watchIcon,
            menuTitle: "Mon-Fri",
            menuTitleText: '(6:00pm - 11:00pm)',
            menuIcon1: ImagePath.menuUser,
            menuTitle1: "₹ 2000",
            menuTitleText1: '(for two)',

        },
        {
            menuIcon: ImagePath.menuUser1,
            menuTitle: "Fri, Sat",
            menuTitleText: '(6:00pm - 11:00pm)',
            menuIcon1: ImagePath.menuUser2,
            menuTitle1: "VEG & NON-VEG",
        },
        {
            menuIcon: ImagePath.menuUser3,
            menuTitle: "POP, BLUES, EDM",
            menuIcon1: ImagePath.doneIcon,
            menuTitle1: "Stags ",
        },
        {
            menuIcon: ImagePath.doneIcon,
            menuTitle: "Sheesha",
            menuIcon1: ImagePath.menuUser4,
            menuTitle1: "Kids Friendly",
        },

    ];
    const MenuDataRenderItem = ({ item, index }) => {
        return (
            <View style={{ width: '100%', marginVertical: hp(2),paddingHorizontal:wp(5), flexDirection: 'row', justifyContent: 'space-between', }}>
                <View style={{ flexDirection: 'row', flex: 0.45, alignItems: 'center' }}>
                    <Image style={styles.menuIconCss} source={item.menuIcon} />
                    <View>
                        <Text style={styles.menuText}>{item.menuTitle}</Text>
                        {item.menuTitleText && <Text style={styles.menuText2}>{item.menuTitleText}</Text>}
                    </View>
                </View>
                <View style={{ flexDirection: 'row', flex: 0.45, alignItems: 'center' }}>
                    <Image style={styles.menuIconCss} source={item.menuIcon1} />
                    <View>
                        <Text style={styles.menuText}>{item.menuTitle1}</Text>
                        {item.menuTitleText1 && <Text style={styles.menuText2}>{item.menuTitleText1}</Text>}
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={{ backgroundColor: '#FFFFFF', marginHorizontal: 10, elevation: 4, borderRadius: 10 }}>
            <SafeAreaView>
                <FlatList

                    data={MenuData}
                    renderItem={MenuDataRenderItem}
                />
            </SafeAreaView>
            <View style={{flexDirection:'row',marginTop:hp(4)}}>
                <TouchableOpacity activeOpacity={0.7} onPress={props.onclick} style={[styles.btnmain,{borderBottomLeftRadius:10,}]}>
                 <Image style={styles.btnIcon} source={ImagePath.direction} />
                    <Text style={[styles.buttonText, {  }]}>Direction</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={props.onclick1} style={[styles.btnmain,{marginHorizontal:1}]}>
                 <Image style={styles.btnIcon} source={ImagePath.WhatsApp} />
                    <Text style={[styles.buttonText, {  }]}>WhatsApp</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} onPress={props.onclick2} style={[styles.btnmain,{borderBottomRightRadius:10}]}>
                 <Image style={styles.btnIcon} source={ImagePath.callIcon} />
                    <Text style={[styles.buttonText, {  }]}>Call</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    menuIconCss: { height: 20, width: 20, resizeMode: 'contain', },
    menuText: { color: '#5B5959', fontSize: 14, fontWeight: '500', marginLeft: hp(1.6) },
    menuText2: { color: '#BBBBBB', fontSize: 12, fontWeight: '500', marginLeft: hp(1.6) },
    //btn
    btnmain:{flexDirection:'row',flex:0.4, alignItems:'center',  backgroundColor: "#000", borderWidth: 1, height: hp("5.5%"),  borderColor: "#00000",justifyContent:'center' },
    buttonText: {fontSize: 14,marginLeft:5, fontFamily: "Metropolis-Medium", letterSpacing: 0.3 },
    btnIcon :{height:16,width:16,resizeMode:'contain'},
});
export default MenuCard;