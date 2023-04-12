

import React, { useState } from "react";
import { Image, ImageBackground, Dimensions, FlatList, ScrollView, StatusBar, StyleSheet, Text, View, TouchableOpacity, Alert, TextInput, } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePath from "../../assets/ImagePath";

function FilterData(props) {
    const { label, onClick, image, bgColor } = props
    return (
        <TouchableOpacity onPress={() => { onClick() }}
            activeOpacity={0.6}
            style={[styles.filterText, { backgroundColor: bgColor, paddingLeft: wp(2) }]}>
            <Image style={styles.filterIcon} source={image} />
            <Text style={[styles.locationText, { marginLeft: 6 }]}>{label}</Text>
        </TouchableOpacity>
    )
}

const FilterScreen = (props) => {

    const [genreData, setgenreData] = useState([
        { label: "Pop", }, { label: "Rock", }, { label: "Doc" },
        { label: "Soc" }, { label: "Jik" }, { label: "Sam" },
        { label: "MAx" }, { label: "Min" },
    ])
    const [selectRight, setSelectRight] = useState("Location")

    const rendarItemGenre = ({ item, index }) => {
        return (
            <View style={{ flexDirection: 'row', marginHorizontal: 10, borderBottomWidth: 1, borderBottomColor: "rgba(214, 214, 214, 1)", paddingVertical: 12 }}>
                <Image style={{ height: 11, width: 11, resizeMode: 'contain' }} source={ImagePath.checkSelected} />
                <View style={{ flex: 0.6 }}>
                    <View style={{}}>
                        <Text style={styles.listinhHeading1}>{item.label}</Text>
                    </View>
                </View>
            </View>
        );
    }

    const onSelectRightUi = (label) => {
        setSelectRight(label)
    }

    return (
        <View style={{ flex: 1 }}>

            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
                <View style={{ backgroundColor: '#FFFFFF', elevation: 5, padding: 10, paddingTop: hp(5), }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Text style={styles.aboutText}>Filters </Text>
                        <TouchableOpacity style={{ marginTop: 10 }}><Text style={{ color: '#FE00B6', fontWeight: '600', marginLeft: 10, fontSize: 12, marginBottom: 12 }}>Clear<Text style={{ color: '#00BFBD' }}> All</Text></Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ flex: 1, flexDirection: 'row', borderTopWidth: 1 }}>
                    <View style={{ backgroundColor: 'rgba(205, 205, 205, 1)', height: "100%", flex: 0.4 }}>
                        <FilterData
                            label={"Location"}
                            onClick={() => { onSelectRightUi("Location") }}
                            image={ImagePath.location}
                            bgColor={selectRight === "Location" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />
                        <FilterData
                            label={"Genre"}
                            onClick={() => { onSelectRightUi("Genre") }}
                            image={ImagePath.menuUser3}
                            bgColor={selectRight === "Genre" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />
                        <FilterData
                            label={"Sheesha"}
                            onClick={() => { onSelectRightUi("Sheesha") }}
                            image={ImagePath.hookah}
                            bgColor={selectRight === "Sheesha" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />
                        <FilterData
                            label={"Stags"}
                            onClick={() => { onSelectRightUi("Stages") }}
                            image={ImagePath.deer}
                            bgColor={selectRight === "Stages" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />
                        <FilterData
                            label={"Veg/Non Veg"}
                            onClick={() => { onSelectRightUi("Veg/Non Veg") }}
                            image={ImagePath.menuUser2}
                            bgColor={selectRight === "Veg/Non Veg" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />
                        <FilterData
                            label={"Happy Hours"}
                            onClick={() => { onSelectRightUi("Happy Hours") }}
                            image={ImagePath.menuUser1}
                            bgColor={selectRight === "Happy Hours" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />

                        <FilterData
                            label={"Kids Friendly"}
                            onClick={() => { onSelectRightUi("Kids Friendly") }}
                            image={ImagePath.emog}
                            bgColor={selectRight === "Kids Friendly" ? "#fff" : 'rgba(205, 205, 205, 1)'}
                        />
                    </View>


                    <View style={{ flex: 0.6, backgroundColor: '#FFFFFF', }}>
                        {selectRight === "Location" &&
                            <Text style={{ color: "#000" }}>Location</Text>
                        }
                        {selectRight === "Genre" &&
                            <>
                                <View style={styles.clearInput}>
                                    <Image style={styles.searchIcon} source={ImagePath.searchIcon} />
                                    <TextInput
                                        style={{ padding: 0, color: '#A5A5A5', fontWeight: '600', marginLeft: 5 }}
                                        placeholder="Search"
                                        placeholderTextColor={"#A5A5A5"}
                                    />
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
                                    <Image style={[styles.searchIcon, { tintColor: "#000" }]} source={ImagePath.checkBox} />
                                    <Text style={{ color: '#A5A5A5', fontWeight: '600', marginLeft: 8 }}>selectAll</Text>
                                </View>
                                <FlatList
                                    data={genreData}
                                    renderItem={rendarItemGenre}
                                    extraData={genreData}
                                    showsVerticalScrollIndicator={false}
                                />
                            </>
                        }
                        {selectRight === "Sheesha" &&
                            <Text style={{ color: "#000" }}>Sheesha</Text>
                        }
                        {selectRight === "Stages" &&
                            <Text style={{ color: "#000" }}>Stages</Text>
                        }
                        {selectRight === "Veg/Non Veg" &&
                            <Text style={{ color: "#000" }}>Veg/Non Veg</Text>
                        }
                        {selectRight === "Happy Hours" &&
                            <Text style={{ color: "#000" }}>Happy Hours</Text>
                        }
                        {selectRight === "Kids Friendly" &&
                            <Text style={{ color: "#000" }}>Kids Friendly</Text>
                        }
                    </View>
                </View>

                
                <View  style={{ flexDirection: 'row',backgroundColor:'#000' ,justifyContent: 'space-between', marginBottom: hp(2) ,paddingVertical:10}}>
                    <TouchableOpacity activeOpacity={0.7} style={[styles.closeBtn,{borderRightWidth:1,borderRightColor:'#fff'}]} onPress={()=>{ props.navigation.goBack()}}>
                        <Text style={{color:'#fff'}}>CLOSE</Text>
                    </TouchableOpacity>
                   
                    <TouchableOpacity activeOpacity={0.7} style={styles.closeBtn} onPress={()=>{ props.navigation.goBack()}}>
                        <Text style={{color:'#fff'}}>APPLY</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
export default FilterScreen;
const styles = StyleSheet.create({
    closeBtn:{flex:0.6,paddingVertical:6,justifyContent:'center',alignItems:'center'},
    searchIcon: { height: 17, tintColor: '#A5A5A5', width: 17, resizeMode: 'cover' },
    locationText: { color: '#000', fontWeight: '600', marginLeft: 5 },
    filterIcon: { height: 17, tintColor: '#000000', width: 17, resizeMode: 'contain' },
    clearInput: { flexDirection: 'row', marginLeft: 10, marginBottom: 15, paddingVertical: 10, backgroundColor: '#FFFFFF', alignItems: 'center', borderBottomColor: "rgba(214, 214, 214, 1)", borderBottomWidth: 1 },
    filterText: { paddingVertical: hp(2.5), flexDirection: 'row', borderBottomWidth: 1 },
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