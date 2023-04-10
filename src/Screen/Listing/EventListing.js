
import React, { useState } from "react";
import { Image, ImageBackground, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, TextInput } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../../Components/Header";
import ImagePath from "../../assets/ImagePath";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const EventListing = (props) => {
    const ENTRIES1 = [
        {
            mapIcon: ImagePath.upcoming_Evn_Img,
            title: "Justice Tour",
            singerName: 'By Arijit Singh',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte:'07',
            cardDAte1:'APR',
        },
        {
            mapIcon: ImagePath.upcoming_Evn_Img1,
            title: "Runaway",
            singerName: 'By Arijit Singh',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte:'07',
            cardDAte1:'APR',
        },
       
        {
            mapIcon: ImagePath.upcoming_Evn_Img2,
            title: "Sweetener",
            singerName: 'By Ariana Grande',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte:'07',
            cardDAte1:'APR',
        },
        {
            mapIcon: ImagePath.upcoming_Evn_Img3,
            title: "Red",
            singerName: 'By Taylor Swift',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte:'07',
            cardDAte1:'APR',
        },
        {
            mapIcon: ImagePath.upcoming_Evn_Img4,
            title: "Happier Than Ever",
            singerName: 'By Billie Eilish',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte:'07',
            cardDAte1:'APR',
        },
    ];
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: "100%", marginBottom: hp(3) }}>
                <View style={{ marginHorizontal: wp(2), borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 4, }}>
                    <Image style={{ height: hp(29), width: "100%", borderTopRightRadius: 10, borderTopLeftRadius: 10, }} source={item.mapIcon} />
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain', position: 'absolute', top: 10, right: 10 }} source={item.heartIcon} />
                    
                    <View style={{ height: 47, width: 38,justifyContent:'center',borderRadius:10, backgroundColor:'#FFFFFF', position: 'absolute', top: 10, right: 10 }}>
                    <Text style={{color:"#666666",textAlign:'center',fontFamily:'Metropolis-Bold'}}>{item.cardDAte}</Text>
                    <Text style={{color:"#666666",textAlign:'center',fontFamily:'Metropolis-Medium'}}>APR</Text> 
                    </View>
                    <View style={{ paddingHorizontal: wp(2), paddingVertical: hp(1) }}>
                        <Text style={styles.listinhHeading}>{item.title}</Text>
                        <Text style={[styles.singerName,]}>{item.singerName}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between',alignItems:'center' }}>
                            <Text style={[styles.listinhText1,{}]}>{item.barLocation}</Text>
                            <View style={{marginTop:-10 }}>
                                <Text style={[styles.listinhHeading1, { fontSize:12,fontFamily:'Metropolis-Medium' }]}>{item.price}</Text>
                                <Text style={[styles.listinhText, { marginTop: 0 }]}>{item.priceText}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    const EventListingData = [
        {
            mapIcon: ImagePath.Nucleya_Event,
            title: "Arambh ft. Nucleya",
            date: 'Fri, 09 Apr',
            time: '02:00 PM - 10:00 PM',
            location: 'Gomti Nagar, Lucknow',
            price: '₹1499',
            priceText: "onwards",
        },
        {
            mapIcon: ImagePath.Nucleya_Event1,
            title: "The Math ft. Dua",
            date: 'Fri, 09 Apr',
            time: '02:00 PM - 10:00 PM',
            location: 'Gomti Nagar, Lucknow',
            price: '₹1499',
            priceText: "onwards",
        }, {
            mapIcon: ImagePath.Nucleya_Event,
            title: "Night L. ft. Divine",
            date: 'Fri, 09 Apr',
            time: '02:00 PM - 10:00 PM',
            location: 'Gomti Nagar, Lucknow',
            price: '₹1499',
            priceText: "onwards",
        },
    ];
    const eventRenderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: "50%", marginBottom: hp(3) }}>
                <View style={{ marginHorizontal: wp(2), borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 4, }}>
                    <Image style={{ height: hp(22), width: "100%", borderTopRightRadius: 10, borderTopLeftRadius: 10, }} source={item.mapIcon} />
                    <View style={{ padding: wp(3), }}>
                        <Text style={[styles.listinhHeading1, { marginBottom: hp(1) }]}>{item.title}</Text>
                        <Text style={styles.listinhText}>{item.date}</Text>
                        <Text style={styles.listinhText}>{item.time}</Text>
                        <Text style={styles.listinhText}>{item.location}</Text>
                        <Text style={[styles.listinhHeading1, { marginTop: hp(2) }]}>{item.price}</Text>
                        <Text style={[styles.listinhText, { marginTop: 0 }]}>{item.priceText}</Text>
                    </View>
                </View>
            </View>
        );
    }
    return (
        <View style={{ flex: 1, paddingBottom: 10 }}>
            <Header
                Back_Arrow={ImagePath.manueIcon}
                searchIcon={ImagePath.searchIcon}
                placeholder='Search'
                profileIcon={ImagePath.profilePic}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%", }}>
                   
                    <View style={styles.hedingTextMain}>
                        <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
                        <View style={{}}>
                            <Text style={styles.cardText}>Events near me</Text>
                        </View>
                        <Image style={styles.hedingImg} source={ImagePath.rightLine} />
                    </View>
                    <SafeAreaView>
                        <FlatList
                            horizontal
                            data={EventListingData}
                            renderItem={eventRenderItem}
                        />
                    </SafeAreaView>
                    <View style={styles.hedingTextMain}>
                        <Image style={styles.hedingImg} source={ImagePath.rightLine1} />
                        <View style={{}}>
                            <Text style={[styles.cardText, { fontSize: 15 }]}>UPCOMING EVENTS IN TOWN</Text>
                        </View>
                        <Image style={styles.hedingImg} source={ImagePath.rightLine} />
                    </View>
                    <SafeAreaView>
                        <FlatList
                            data={ENTRIES1}
                            renderItem={_renderItem}
                        />
                    </SafeAreaView>
                </ImageBackground>
            </ScrollView>
        </View>
    );
}
export default EventListing;
const styles = StyleSheet.create({
    //
    singerName:{fontSize: 12, marginVertical:hp(0.7),fontFamily: "Metropolis-SemiBold",color:'#5B5959' },
    hedingTextMain: { marginTop: hp(3), flexDirection: 'row', alignItems: 'center', alignSelf: 'center', justifyContent: 'space-between' },
    hedingImg: { width: wp(30), resizeMode: 'contain' },
    cardText: { fontFamily: "Metropolis-SemiBold", fontSize: 18, color: 'rgba(32, 32, 32, 1)', },


    listinhHeading1: { fontSize: 15, fontFamily: "Metropolis-SemiBold", color: '#202020' },
    listinhText: { fontSize: 12, fontFamily: "Metropolis-Medium", color: '#575757', marginTop: hp(0.5) },



    listinhHeading: { fontSize: 18, fontWeight: '700', color: '#000000' },
    listinhText1: { fontSize: 14, fontWeight: '400', color: '#575757' },
  

   
});