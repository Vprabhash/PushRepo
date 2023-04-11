

import React from "react";
import { Image, ImageBackground, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../../Components/Header";
import ImagePath from "../../assets/ImagePath";
import { SafeAreaView } from "react-native-safe-area-context";
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ArtistPlayingDetail = (props) => {
    const ENTRIES1 = [
        {
            mapIcon: ImagePath.aadat,
            title: "Worth The Shot",
            singerName: 'By AVGSS Group',
            singerNameIcon: ImagePath.Explore,
            price: '₹1499',
            priceText: 'onwards',

        },

    ];
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: "100%", marginBottom: hp(3) }}>
                <View style={{ marginHorizontal: wp(2), borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 4, }}>
                    <Image style={{ height: hp(29), width: "100%", borderRadius: 10 }} source={item.mapIcon} />
                    <View style={{ paddingHorizontal: wp(3), paddingVertical: hp(2) }}>
                        <Text style={styles.listinhHeading}>{item.title}</Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <View style={{ flexDirection: 'row' }}>
                                <Image style={{ height: 17, width: 17, borderRadius: 10, resizeMode: 'contain' }} source={item.singerNameIcon} />
                                <Text style={[styles.singerName,]}>{item.singerName}</Text>
                            </View>
                            <View style={{ backgroundColor: '#FAFAFA', elevation: 5, padding: 1, borderRadius: 5 }}>
                                <Text style={{ fontFamily: "Metropolis-SemiBold", fontSize: 14, marginBottom: -4, color: "#292929" }}>{item.price}</Text>
                                <Text style={{ fontFamily: "Metropolis-Reglur", fontSize: 10, color: "#292929" }}>{item.priceText}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    const TimeData = [
        {
            mapIcon: ImagePath.watchIcon,
            title: "Fri Mar 24 at 8:00 PM  ",
        },
        {
            mapIcon: ImagePath.location,
            title: "Ametrine24, Bhopal",

        },
        {
            mapIcon: ImagePath.play_pause,
            title: "Live Music Concert",
            btn: 'Free',
            btnText: 'Onwards'
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
                {item.btnText && <TouchableOpacity style={{ position: 'absolute', borderWidth: 1, borderColor: "#DD2AFB", borderRadius: 10, paddingHorizontal: 2, paddingVertical: 10, right: 10, bottom: 10 }}>
                    <Text style={{ color: "#DD2AFB", textAlign: 'center', fontFamily: "Metropolis-Bold", fontSize: 12 }}> {item.btn}</Text>
                    <Text style={{ color: "#DD2AFB", textAlign: 'center', fontSize: 12, }}>{item.btnText}</Text>
                </TouchableOpacity>}


            </View>
        );
    }
    return (
        <View style={{ flex: 1, paddingBottom: 10 }}>
            <Header
                Back_Arrow={ImagePath.goBack}
                tital='Artist playing Nearby'
            //  profileIcon={ImagePath.profilePic}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%",paddingBottom:20 }}>
                    <SafeAreaView>
                        <FlatList
                            data={ENTRIES1}
                            renderItem={_renderItem}
                        />
                    </SafeAreaView>
                    <View style={{ marginHorizontal: 10, backgroundColor: '#FFFFFF', elevation: 5, borderRadius: 10 }}>
                        <Text style={styles.aboutText}>Worth The Shot  </Text>
                        <Text style={{ color: '#000', marginLeft: 10, fontSize: 12, marginBottom: 12 }}>By DJ NYK</Text>

                        <FlatList
                            data={TimeData}
                            renderItem={TimerenderItem}
                        />
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center', borderTopWidth: 1, borderTopColor: '#9D9D9D', paddingVertical: 8, marginTop: 20 }}>
                            <Image style={styles.btnIcon} source={ImagePath.direction} />
                            <Text style={styles.buttonText}>Get Direction</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{backgroundColor:'#FFFFFF',paddingVertical:10, marginTop:10,borderRadius:10,elevation:5,marginHorizontal:10}}>
                    <Text style={styles.aboutText}>About the event  </Text>
                    <Text style={{color:'#000',marginHorizontal:10,fontSize:14,marginVertical:12}}>
                    Experience the Mesmerizing Voice of Darshan Raval Live in Concert!
                    </Text>
                    <Text style={{color:'#000',marginHorizontal:10,fontSize:14,marginBottom:12}}>
                    The concert will be held on Saturday, October 1st, 2022. Gates will open at 6:00 PM, and the show will start at 8:00 PM.                    </Text>
                    </View>

                </ImageBackground>
            </ScrollView>
        </View>
    );
}
export default ArtistPlayingDetail;
const styles = StyleSheet.create({
    listinhHeading1: { fontSize: 14, marginLeft: 14, fontWeight: '400', color: '#000000' },
    aboutText: { color: '#000000', fontSize: 20, marginLeft: 10, marginTop: 10, fontFamily: 'Metropolis-SemiBold' },
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