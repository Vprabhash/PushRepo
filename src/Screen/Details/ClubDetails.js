
import React from "react";
import { Image, ImageBackground, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../../Components/Header";
import ImagePath from "../../assets/ImagePath";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ClubDetails = (props) => {
    const ENTRIES1 = [
        {
            mapIcon: ImagePath.upcoming_Evn_Img,
            title: "Justice Tour",
            singerName: 'By Arijit Singh',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte: '07',
            cardDAte1: 'APR',
        },
        {
            mapIcon: ImagePath.upcoming_Evn_Img1,
            title: "Runaway",
            singerName: 'By Arijit Singh',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte: '07',
            cardDAte1: 'APR',
        },

        {
            mapIcon: ImagePath.upcoming_Evn_Img2,
            title: "Sweetener",
            singerName: 'By Ariana Grande',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte: '07',
            cardDAte1: 'APR',
        },
        {
            mapIcon: ImagePath.upcoming_Evn_Img3,
            title: "Red",
            singerName: 'By Taylor Swift',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte: '07',
            cardDAte1: 'APR',
        },
        {
            mapIcon: ImagePath.upcoming_Evn_Img4,
            title: "Happier Than Ever",
            singerName: 'By Billie Eilish',
            barLocation: 'Colaba, Mumbai',
            price: '₹1499',
            priceText: "onwards",
            cardDAte: '07',
            cardDAte1: 'APR',
        },
    ];
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: "100%", marginBottom: hp(3) }}>
                <View style={{ marginHorizontal: wp(2), borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 4, }}>
                    <Image style={{ height: hp(29), width: "100%", borderTopRightRadius: 10, borderTopLeftRadius: 10, }} source={item.mapIcon} />
                    <Image style={{ height: 20, width: 20, resizeMode: 'contain', position: 'absolute', top: 10, right: 10 }} source={item.heartIcon} />

                    <View style={{ height: 47, width: 38, justifyContent: 'center', borderRadius: 10, backgroundColor: '#FFFFFF', position: 'absolute', top: 10, right: 10 }}>
                        <Text style={{ color: "#666666", textAlign: 'center', fontFamily: 'Metropolis-Bold' }}>{item.cardDAte}</Text>
                        <Text style={{ color: "#666666", textAlign: 'center', fontFamily: 'Metropolis-Medium' }}>APR</Text>
                    </View>
                    <View style={{ paddingHorizontal: wp(2), paddingVertical: hp(1) }}>
                        <Text style={styles.listinhHeading}>{item.title}</Text>
                        <Text style={[styles.singerName,]}>{item.singerName}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={[styles.listinhText1, {}]}>{item.barLocation}</Text>
                            <View style={{ marginTop: -10 }}>
                                <Text style={[styles.listinhHeading1, { fontSize: 12, fontFamily: 'Metropolis-Medium' }]}>{item.price}</Text>
                                <Text style={[styles.listinhText, { marginTop: 0 }]}>{item.priceText}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    const MenuData = [
        {
            mapIcon: ImagePath.watchIcon,
            title: "Arambh ft. Nucleya",
            date: 'Fri, 09 Apr',
            time: '02:00 PM - 10:00 PM',
            location: 'Gomti Nagar, Lucknow',
            price: '₹1499',
            priceText: "onwards",
        },

    ];
    const MenuDataRenderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1,  backgroundColor:'red' }}>
                {/* <View style={{ marginHorizontal: wp(2),width: "98%", borderRadius: 10, backgroundColor: 'red', elevation: 4, }}> */}
                <View style={{ flexDirection: 'row',alignItems:'center', justifyContent: 'space-between', }}>
                    <View style={{flexDirection: 'row',alignItems:'center', justifyContent: 'space-between',}}>
                        <Image style={{ height: 22, width: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10, }} source={item.mapIcon} />
                        <Text style={[styles.listinhHeading1, { marginBottom: hp(1) }]}>{item.title}</Text>
                    </View>
                    <View>
                    <Image style={{ height: 22, width: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10, }} source={item.mapIcon} />
                        <Text style={[styles.listinhHeading1, { marginBottom: hp(1) }]}>{item.title}</Text>
                       
                    </View>
                </View>
                {/* <View style={{ padding: wp(3), }}>
                        <Text style={[styles.listinhHeading1, { marginBottom: hp(1) }]}>{item.title}</Text>
                        <Text style={styles.listinhText}>{item.date}</Text>
                        <Text style={styles.listinhText}>{item.time}</Text>
                        <Text style={styles.listinhText}>{item.location}</Text>
                        <Text style={[styles.listinhHeading1, { marginTop: hp(2) }]}>{item.price}</Text>
                        <Text style={[styles.listinhText, { marginTop: 0 }]}>{item.priceText}</Text>
                    </View> */}
                {/* </View> */}
            </View>
        );
    }
    return (
        <View style={{ flex: 1, paddingBottom: 10 }}>
            <Header
                // Back_Arrow={ImagePath.manueIcon}
                searchIcon={ImagePath.searchIcon}
                placeholder='Search'
            // profileIcon={ImagePath.profilePic}
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <ImageBackground source={ImagePath.Azzir_Bg} resizeMode="cover" style={{ height: "100%", }}>
                    <View style={{ marginHorizontal: 10 }}>
                        <Swiper style={styles.wrapper}
                            activeDotStyle={{ backgroundColor: "black", bottom: hp(-7), borderRadius: 4, }}
                            dotStyle={{ backgroundColor: "blue", padding: 4, width: 8, height: 8, borderRadius: 4, bottom: hp(-7) }}
                            showsButtons={true} >
                            <View style={styles.slide1}>
                                <Image style={{ resizeMode: 'contain', width: "100%" }} source={ImagePath.Explore} />
                            </View>
                            <View style={styles.slide2}>
                                <Image style={{ resizeMode: 'contain', width: "100%" }} source={ImagePath.eventImg} />
                            </View>
                            <View style={styles.slide3}>
                                <Image style={{ resizeMode: 'contain', width: "100%" }} source={ImagePath.eventImg1} />
                            </View>
                        </Swiper>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: hp(3), marginHorizontal: 10 }}>
                        <View>
                            <Text style={{ color: '#202020', fontSize: 18, fontFamily: 'Metropolis-SemiBold' }}>Effingut</Text>
                            <Text style={{ color: '#5B5959', fontSize: 12, }}>Restobar</Text>
                        </View>

                        <LinearGradient style={{ flexDirection: 'row', height: 20, width: 40, borderRadius: 8, justifyContent: 'center', backgroundColor: "red", alignItems: 'center' }}
                            start={{ x: 0.3, y: 0.5 }}
                            colors={['deeppink', 'dodgerblue']} >
                            <Text style={{ fontWeight: '700', color: '#FFFFFF', fontSize: 12 }}>5</Text>
                            <Image style={{ height: 13, width: 13, tintColor: '#FFFFFF', }} source={ImagePath.star} />
                        </LinearGradient>
                    </View>

                    <Text style={{ color: '#202020', fontSize: 18, marginLeft: 10, marginTop: hp(3), fontFamily: 'Metropolis-SemiBold' }}>About the Club </Text>

                    <SafeAreaView>
                        <FlatList
                            horizontal
                            data={MenuData}
                            renderItem={MenuDataRenderItem}
                        />
                    </SafeAreaView>
                   
                    <View style={{}}>
                        <Text style={[styles.cardText, { fontSize: 15 }]}>UPCOMING EVENTS IN TOWN</Text>
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
export default ClubDetails;
const styles = StyleSheet.create({
    //swiper
    // wrapper: {
    //     backgroundColor:'yellow',
    //      width: 8, height: 8,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3
    // },
    wrapper: { height: 200, },
    slide1: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#9DD6EB'
    },
    slide2: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#97CAE5'
    },
    slide3: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#92BBD9'
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    //
    singerName: { fontSize: 12, marginVertical: hp(0.7), fontFamily: "Metropolis-SemiBold", color: '#5B5959' },

    listinhHeading1: { fontSize: 12, fontFamily: "Metropolis-SemiBold", color: '#202020' },
    listinhText: { fontSize: 12, fontFamily: "Metropolis-Medium", color: '#575757', marginTop: hp(0.5) },



    listinhHeading: { fontSize: 18, fontWeight: '700', color: '#000000' },
    listinhText1: { fontSize: 14, fontWeight: '400', color: '#575757' },



});