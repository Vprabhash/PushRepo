
import React from "react";
import { Image, ImageBackground, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Header from "../../Components/Header";
import ImagePath from "../../assets/ImagePath";
import { SafeAreaView } from "react-native-safe-area-context";
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper'
import MenuCard from "../../Components/MenuCard";



const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const ClubDetails = (props) => {
    const ENTRIES1 = [
        {
            mapIcon: ImagePath.upcoming_Evn_Img,
            title: "Fabulous friday",
            singerName: 'By AVGSS Group',
            singerNameIcon:ImagePath.Explore,
            musicIcon:ImagePath.Explore,
            musicText:'Bollywood, Commercial',  
        },

    ];
    const _renderItem = ({ item, index }) => {
        return (
            <View style={{ flex: 1, width: "100%", marginBottom: hp(3) }}>
                <View style={{ marginHorizontal: wp(2), borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 4, }}>
                    <Image style={{ height: hp(29), width: "100%", borderTopRightRadius: 10, borderTopLeftRadius: 10, }} source={item.mapIcon} />
                    <View style={{ paddingHorizontal: wp(3), paddingVertical: hp(3) }}>
                        <Text style={styles.listinhHeading}>{item.title}</Text>
                        <View style={{ flexDirection: 'row',marginTop:hp(2) }}>
                            <Image style={{ height: 17, width: 17, borderRadius: 10, resizeMode: 'contain' }} source={item.singerNameIcon} />
                            <Text style={[styles.singerName,]}>{item.singerName}</Text>
                        </View>
                        <View style={{ flexDirection: 'row',marginTop:10 }}>
                            <Image style={{ height: 17, width: 17, borderRadius: 10, resizeMode: 'contain' }} source={item.mapIcon} />
                            <Text style={[styles.singerName,]}>{item.musicText}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
    const MenuData = [
       
        { menuImg: ImagePath.clubLocation, title: 'Food' },
        { menuImg: ImagePath.food, title: 'Beverages' },
    ];
    const MenuDatarenderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                <Image style={{ height: hp(20), width: wp(50), marginLeft: wp(4), resizeMode: 'cover', borderRadius: 10 }} source={item.menuImg} />
                <Text style={styles.titleText}>{item.title}</Text>
            </View>
        );
    }
    
    const ClubNarData = [
        { menuImg: ImagePath.lightHoush, 
            title: 'Light house- the club',
            Loction:'6.9 km| Sayaji Hotel, Vijay nagar'
         },
         { menuImg: ImagePath.lightHoush, 
            title: 'Light house- the club',
            Loction:'6.9 km| Sayaji Hotel, Vijay nagar'
         },
         { menuImg: ImagePath.lightHoush, 
            title: 'Light house- the club',
            Loction:'6.9 km| Sayaji Hotel, Vijay nagar'
         },
      
    ];
    const ClubNarDatarenderItem = ({ item, index }) => {
        return (
            <View style={{}}>
                <Image style={{ height: hp(20), width: wp(50), marginLeft: wp(4), resizeMode: 'cover', borderRadius: 10 }} source={item.menuImg} />
                <Text style={styles.titleText}>{item.title}</Text>
                <Text style={styles.LoctionText}>{item.Loction}</Text>

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
                    <Text style={{ fontSize: 14, lineHeight: hp(3), marginTop: hp(1.7), color: '#000000', marginHorizontal: 10, fontFamily: 'Metropolis-Medium' }}>
                        Dhanraj Mahal, Next to The Bentley Showroom, Colaba, Mumbai, Maharashtra 400005
                    </Text>
                    <Text style={styles.aboutText}>About the Club </Text>
                    <MenuCard />

                    <Text style={styles.aboutText}>Whats Happening Today </Text>

                    <SafeAreaView>
                        <FlatList
                            data={ENTRIES1}
                            renderItem={_renderItem}
                        />
                    </SafeAreaView>
                    <TouchableOpacity style={{alignSelf:'center'}}>
                    <LinearGradient style={{height: hp(6), width: wp(50), justifyContent: 'center',  alignItems: 'center',borderRadius:20 }}
                            start={{ x: 0.3, y: 0.5 }}
                            colors={['mediumorchid', 'dodgerblue']} >
                            <Text style={{ fontWeight: '700', color: '#FFFFFF', fontSize: 12 }}>Events For the month</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Text style={styles.aboutText}>Menu </Text>

                    <SafeAreaView>
                        <FlatList
                            horizontal={true}
                            data={MenuData}
                            renderItem={MenuDatarenderItem}
                        />
                    </SafeAreaView>
                    <Text style={styles.aboutText}>Clubs Nearby </Text>
                    <SafeAreaView>
                        <FlatList
                            horizontal={true}
                            data={ClubNarData}
                            renderItem={ClubNarDatarenderItem}
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
    aboutText: { color: '#202020', fontSize: 18, marginLeft: 10, marginVertical: hp(3), fontFamily: 'Metropolis-SemiBold' },
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
    titleText: { marginLeft: wp(4), color: '#000', fontFamily: "Metropolis-SemiBold", fontSize: 16, marginTop: hp(1) },
    LoctionText:{fontWeight:'400',fontSize:12,color: '#5B5959',marginLeft: wp(4),},
    //
    singerName: { fontSize: 12, marginLeft: 8, fontFamily: "Metropolis-SemiBold", color: '#5B5959' },
    listinhHeading1: { fontSize: 12, fontFamily: "Metropolis-SemiBold", color: '#202020' },
    listinhText: { fontSize: 12, fontFamily: "Metropolis-Medium", color: '#575757', marginTop: hp(0.5) },



    listinhHeading: { fontSize: 18, fontWeight: '700', color: '#000000' },
    listinhText1: { fontSize: 14, fontWeight: '400', color: '#575757' },



});