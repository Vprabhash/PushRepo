

import React from "react";
import { Image, ImageBackground, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePath from "../../assets/ImagePath";
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const FilterScreen = (props) => {

    const TimeData = [
        {
            mapIcon: ImagePath.watchIcon,
            title: "Fri Mar 24 at 8:00 PM  ",
        },
    ];
    const TimerenderItem = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', padding: 10, paddingLeft: 15 }}>
                <Image style={{ height: 17, tintColor: '#000000', width: 17, resizeMode: 'contain' }} source={item.mapIcon} />
                <View style={{ flex: 0.6 }}>
                    <View style={{}}>
                        <Text style={styles.listinhHeading1}>{item.title}</Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, paddingBottom: 10 }}>
          
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%", paddingBottom: 20 }}>
                    <View style={{backgroundColor: '#FFFFFF', elevation: 5, padding: 10,paddingTop:hp(5),}}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={styles.aboutText}>Filters </Text>
                            <TouchableOpacity style={{ marginTop: 10 }}><Text style={{ color: '#FE00B6', fontWeight: '600', marginLeft: 10, fontSize: 12, marginBottom: 12 }}>Clear<Text style={{ color: '#00BFBD' }}> All</Text></Text>
                            </TouchableOpacity>
                        </View>
                        {/* <FlatList
                            data={TimeData}
                            renderItem={TimerenderItem}
                        /> */}

                    </View>

                    <View style={{ flexDirection: 'row',alignItems:'center' }}>
                       <View style={{flex: 0.4, }}>
                       <View style={{ padding: 10, flexDirection: 'row', backgroundColor: 'rgba(205, 205, 205, 1)' }}>
                            <Image style={{ height: 17, tintColor: '#000000', width: 17, resizeMode: 'contain' }} source={ImagePath.location} />
                            <Text style={{ color: '#000', fontWeight: '600', marginLeft: 5 }}>Loction</Text>
                        </View>
                        
                       </View>
                       <View style={{flex: 0.6,backgroundColor:'#FFFFFF', }}>
                       <View style={{  flexDirection: 'row', paddingLeft:10,backgroundColor:'#FFFFFF',alignItems:'center' }}>
                            <Image style={{ height: 17, tintColor: '#A5A5A5', width: 17, resizeMode: 'contain' }} source={ImagePath.searchIcon} />
                            {/* <Text style={{ color: '#A5A5A5', fontWeight: '600', marginLeft: 5 }}>Search</Text> */}
                            <TextInput style={{ padding:0, color: '#A5A5A5', fontWeight: '600', marginLeft: 5 }}
                            placeholder="Search"
                            />
                        </View>
                       </View>

                    </View>
                </ImageBackground>
            </ScrollView>
            
        </View>
    );
}
export default FilterScreen;
const styles = StyleSheet.create({
    listinhHeading1: { fontSize: 14, marginLeft: 14, fontWeight: '400', color: '#000000' },
    aboutText: { color: '#000000', fontSize: 17, fontFamily: 'Metropolis-SemiBold' },
    btnIcon: { height: 16, width: 16, resizeMode: 'contain', tintColor: '#FF00B7' },
    //
    buttonText: { fontSize: 14, color: '#000000', marginLeft: 5, fontFamily: "Metropolis-Medium", letterSpacing: 0.3 },

    titleText: { marginLeft: wp(4), color: '#000', fontFamily: "Metropolis-SemiBold", fontSize: 16, marginTop: hp(1) },
    LoctionText: { fontWeight: '400', fontSize: 12, color: '#5B5959', marginLeft: wp(4), },
    //
    singerName: { fontSize: 12, marginLeft: 8, fontFamily: "Metropolis-SemiBold", color: '#5B5959' },



    listinhHeading: { fontSize: 18, fontWeight: '700', color: '#000000' },
    listinhText1: { fontSize: 14, fontWeight: '400', color: '#575757' },



});