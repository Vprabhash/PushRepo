import React, {useEffect, useState} from 'react';
import {
  Image,
  FlatList,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../constants';
import GradientText from '../GradientText';
import ApiCall from '../../redux/CommanApi';
function FilterData({label, onClick, image, bgColor}) {
  return (
    <TouchableOpacity
      onPress={() => {
        onClick();
      }}
      activeOpacity={0.6}
      style={[
        styles.filterText,
        {backgroundColor: bgColor, paddingLeft: wp(2)},
      ]}>
      <Image style={styles.filterIcon} source={image} />
      <Text style={[styles.locationText, {marginLeft: 7}]}>{label}</Text>
    </TouchableOpacity>
  );
}
const FilterScreen = ({onPressApply, onPressCancel, isArtistFilter}) => {
  const [, forceUpdate] = useState();
  const [searchLocality, setSearchLocality] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [genreData, setgenreData] = useState([]);
  const [localities, setLocalities] = useState([]);
  const [generes, setGeneres] = useState([]);
  const [happyHourTimings, setHappyHourTimings] = useState('');
  const [kidsFriendly, setKidsFriendly] = useState('');
  const [vegNonVeg, setVegNonVeg] = useState('');
  const [stages, setStages] = useState('');
  const [sheesha, setSheesha] = useState('');
  const [selectAllLocality, setSelectAllLocality] = useState(false);
  const [selectAllGenre, setSelectAllGenre] = useState(false);

  useEffect(() => {
    filterApi();
  }, []);

  // select all localities
  useEffect(() => {
    const temp = localities.map(item => {
      return {...item, checked: selectAllLocality};
    });
    setLocalities(temp);
  }, [selectAllLocality]);

  // select all genres
  useEffect(() => {
    const genre = generes.map(item => {
      return {...item, checked: selectAllGenre};
    });
    setLocalities(genre);
  }, [selectAllGenre]);

  const filterApi = async () => {
    const res = await ApiCall('api/filters', 'GET');
    setLocalities(res?.data?.localities);
    setGeneres(res?.data?.generes);
    setHappyHourTimings(res?.data?.happyHourTimings);
  };

  const clearLocalities = () => {
    const temp = localities.map(item => {
      return {...item, checked: false};
    });
    setLocalities(temp);
    setSelectAllLocality(false);
  };

  const clearAllData = () => {
    clearLocalities();
    setKidsFriendly('');
    setVegNonVeg('');
    setStages('');
    setSheesha('');
  };

  console.log('-----', kidsFriendly, vegNonVeg, stages, sheesha);

  const [teamArray, setTeamArray] = useState([]);
  const searchLocalityFilter = text => {
    setSearchLocality(text);
    if (text) {
      const newData = teamArray.filter(function (item) {
        const itemData = item.label
          ? item.label.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setLocalities(newData);
    } else {
      setLocalities(teamArray);
    }
  };

  const checkAllLocality = () => {
    setSelectAllLocality(!selectAllLocality);
  };
  const checkAllGenre = () => {
    setSelectAllGenre(!selectAllGenre);
  };

  const checkLocalityData = item => {
    let temp = [...localities];
    const itemIndex = temp.findIndex(e => e.label === item?.label);

    if (itemIndex !== -1) {
      temp[itemIndex].checked = !temp[itemIndex].checked;
      setLocalities(temp);
    }
  };

  const [selectRight, setSelectRight] = useState(
    isArtistFilter ? 'Genre' : 'Locality',
  );
  const rendarItemLocality = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          checkLocalityData(item);
        }}
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(214, 214, 214, 1)',
          paddingVertical: 12,
        }}>
        <Image
          style={{
            height: 11,
            width: 11,
            resizeMode: 'contain',
            tintColor: '#202020',
            borderWidth: item.checked ? 0 : 0.3,
            borderColor: item.checked ? '#202020' : '#202020',
          }}
          source={item.checked ? ImagePath.checkSelected : ImagePath.checkBox}
        />
        <View style={{flex: 0.6}}>
          <Text style={styles.listinhHeading1}>{item.label}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const checkGenreData = item => {
    console.log(item);
    let temp = [...generes];
    const itemIndex = temp.findIndex(e => e.label === item?.label);

    if (itemIndex !== -1) {
      temp[itemIndex].checked = !temp[itemIndex].checked;
      setGeneres(temp);
    }
  };

  const rendarItemGenre = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          checkGenreData(item);
        }}
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(214, 214, 214, 1)',
          paddingVertical: 12,
        }}>
        <Image
          style={{
            height: 11,
            width: 11,
            resizeMode: 'contain',
            tintColor: '#202020',
            borderWidth: item.checked ? 0 : 0.3,
            borderColor: item.checked ? '#202020' : '#202020',
          }}
          source={item.checked ? ImagePath.checkSelected : ImagePath.checkBox}
        />
        <Text numberOfLines={1} style={styles.listinhHeading1}>
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  const checkhappyData = index => {
    let temp = [...happyHourTimings];
    temp[index].checked = !temp[index].checked;
    setHappyHourTimings(temp);
  };

  const happyrendarItemGenre = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          checkhappyData(index);
        }}
        activeOpacity={0.5}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
          borderBottomWidth: 1,
          borderBottomColor: 'rgba(214, 214, 214, 1)',
          paddingVertical: 12,
        }}>
        <Image
          style={{
            height: 11,
            width: 11,
            resizeMode: 'contain',
            tintColor: '#202020',
            borderWidth: item.checked ? 0 : 0.3,
            borderColor: item.checked ? '#202020' : '#202020',
          }}
          source={item.checked ? ImagePath.checkSelected : ImagePath.checkBox}
        />
        <View style={{}}>
          <View style={{}}>
            <Text numberOfLines={1} style={styles.listinhHeading1}>
              {item.label}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const onSelectRightUi = label => {
    setSelectRight(label);
  };

  const stagesSelect = label => {
    setStages(label);
  };

  const sheeshaSelect = label => {
    setSheesha(label);
  };

  const vegNonVegSelect = label => {
    setVegNonVeg(label);
  };

  const kidsFriendlySelect = label => {
    setKidsFriendly(label);
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
      />
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            elevation: 5,
            paddingVertical: 10,
            paddingTop: hp(7),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 24,
              justifyContent: 'space-between',
            }}>
            <Text style={styles.aboutText}>Filters </Text>
            <TouchableOpacity onPress={clearAllData}>
              <GradientText
                style={[
                  styles.textStyle,
                  {fontFamily: FONTS.InterSemiBold, fontSize: 12},
                ]}>
                CLEAR ALL
              </GradientText>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', borderTopWidth: 1}}>
          <View
            style={{
              backgroundColor: 'rgba(205, 205, 205, 1)',
              height: '100%',
              flex: 0.4,
            }}>
            {isArtistFilter ? (
              <FilterData
                label={'Genre'}
                onClick={() => {
                  onSelectRightUi('Genre');
                }}
                image={ImagePath.menuUser3}
                bgColor={
                  selectRight === 'Genre' ? '#fff' : 'rgba(205, 205, 205, 1)'
                }
              />
            ) : (
              <>
                <FilterData
                  label={'Locality'}
                  onClick={() => {
                    onSelectRightUi('Locality');
                  }}
                  image={ImagePath.location}
                  bgColor={
                    selectRight === 'Locality'
                      ? '#fff'
                      : 'rgba(205, 205, 205, 1)'
                  }
                />
                <FilterData
                  label={'Genre'}
                  onClick={() => {
                    onSelectRightUi('Genre');
                  }}
                  image={ImagePath.menuUser3}
                  bgColor={
                    selectRight === 'Genre' ? '#fff' : 'rgba(205, 205, 205, 1)'
                  }
                />
                <FilterData
                  label={'Sheesha'}
                  onClick={() => {
                    onSelectRightUi('Sheesha');
                  }}
                  image={ImagePath.hookah}
                  bgColor={
                    selectRight === 'Sheesha'
                      ? '#fff'
                      : 'rgba(205, 205, 205, 1)'
                  }
                />
                <FilterData
                  label={'Stags'}
                  onClick={() => {
                    onSelectRightUi('Stages');
                  }}
                  image={ImagePath.deer}
                  bgColor={
                    selectRight === 'Stages' ? '#fff' : 'rgba(205, 205, 205, 1)'
                  }
                />
                <FilterData
                  label={'Veg/Non-Veg'}
                  onClick={() => {
                    onSelectRightUi('Veg/Non Veg');
                  }}
                  image={ImagePath.menuUser2}
                  bgColor={
                    selectRight === 'Veg/Non Veg'
                      ? '#fff'
                      : 'rgba(205, 205, 205, 1)'
                  }
                />
                <FilterData
                  label={'Happy Hours'}
                  onClick={() => {
                    onSelectRightUi('Happy Hours');
                  }}
                  image={ImagePath.menuUser1}
                  bgColor={
                    selectRight === 'Happy Hours'
                      ? '#fff'
                      : 'rgba(205, 205, 205, 1)'
                  }
                />
                <FilterData
                  label={'Kids Friendly'}
                  onClick={() => {
                    onSelectRightUi('Kids Friendly');
                  }}
                  image={ImagePath.emog}
                  bgColor={
                    selectRight === 'Kids Friendly'
                      ? '#fff'
                      : 'rgba(205, 205, 205, 1)'
                  }
                />
              </>
            )}
          </View>
          <View style={{flex: 0.6, backgroundColor: '#FFFFFF'}}>
            {selectRight === 'Locality' && (
              <>
                <View style={styles.clearInput}>
                  <Image
                    style={styles.searchIcon}
                    source={ImagePath.searchIcon}
                  />
                  <TextInput
                    style={{
                      padding: 0,
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 5,
                      flex: 1,
                    }}
                    placeholder="Search"
                    placeholderTextColor={'#A5A5A5'}
                    value={searchLocality}
                    onChangeText={text => {
                      // searchLocalityFilter(text);
                      setSearchLocality(text);
                    }}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    checkAllLocality();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[
                      styles.searchIcon,
                      {borderWidth: 0.6, borderColor: '#000'},
                    ]}
                    source={
                      selectAllLocality
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <Text style={styles.selectAllText}>Select All</Text>
                </TouchableOpacity>
                <View style={{maxHeight: hp(59)}}>
                  <FlatList
                    data={localities?.filter(e =>
                      e.label.includes(searchLocality),
                    )}
                    nestedScrollEnabled={true}
                    renderItem={rendarItemLocality}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </>
            )}
            {selectRight === 'Genre' && (
              <>
                <View style={styles.clearInput}>
                  <Image
                    style={styles.searchIcon}
                    source={ImagePath.searchIcon}
                  />
                  <TextInput
                    style={{
                      padding: 0,
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                    placeholder="Search"
                    placeholderTextColor={'#A5A5A5'}
                    onChangeText={text => setSearchGenre(text)}
                  />
                </View>
                {/* <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    checkAllGenre();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[
                      styles.searchIcon,
                      {borderWidth: 0.6, borderColor: '#000'},
                    ]}
                    source={
                      selectAllGenre
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <Text style={styles.selectAllText}>Select All</Text>
                </TouchableOpacity> */}
                <View style={{maxHeight: hp(59)}}>
                  <FlatList
                    data={generes.filter(e => e.label.includes(searchGenre))}
                    nestedScrollEnabled={true}
                    renderItem={rendarItemGenre}
                    extraData={generes}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </>
            )}
            {selectRight === 'Sheesha' && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    sheeshaSelect('yes');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      sheesha == 'yes'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>Yes</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    sheeshaSelect('no');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      sheesha == 'no'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>No</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            {selectRight === 'Stages' && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    stagesSelect('yes');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      stages == 'yes'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>Yes</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    stagesSelect('no');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      stages == 'no'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>No</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            {selectRight === 'Veg/Non Veg' && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    vegNonVegSelect('veg');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      vegNonVeg == 'veg'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>Veg</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    vegNonVegSelect('non-Veg');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      vegNonVeg == 'non-Veg'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>Non-Veg</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </>
            )}
            {selectRight === 'Happy Hours' && (
              <>
                <View style={styles.clearInput}>
                  <Image
                    style={styles.searchIcon}
                    source={ImagePath.searchIcon}
                  />
                  <TextInput
                    style={{
                      padding: 0,
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                    placeholder="Search"
                    placeholderTextColor={'#A5A5A5'}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    // checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[
                      styles.searchIcon,
                      {borderWidth: 0.6, borderColor: '#000'},
                    ]}
                    source={ImagePath.checkBox}
                  />
                  <Text style={styles.selectAllText}>Select All</Text>
                </TouchableOpacity>
                <View style={{maxHeight: hp(59)}}>
                  <FlatList
                    data={happyHourTimings}
                    nestedScrollEnabled={true}
                    renderItem={happyrendarItemGenre}
                    extraData={happyHourTimings}
                    showsVerticalScrollIndicator={false}
                  />
                </View>
              </>
            )}
            {selectRight === 'Kids Friendly' && (
              <>
                <TouchableOpacity
                  onPress={() => {
                    kidsFriendlySelect('yes');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      kidsFriendly == 'yes'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>Yes</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    kidsFriendlySelect('no');
                  }}
                  activeOpacity={0.5}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: 'rgba(214, 214, 214, 1)',
                    paddingVertical: 12,
                  }}>
                  <Image
                    style={{
                      height: 11,
                      width: 11,
                      resizeMode: 'contain',
                      tintColor: '#202020',
                      borderWidth: 1,
                      borderColor: '#202020',
                    }}
                    source={
                      kidsFriendly == 'no'
                        ? ImagePath.checkSelected
                        : ImagePath.checkBox
                    }
                  />
                  <View style={{flex: 0.6}}>
                    <View style={{}}>
                      <Text style={styles.listinhHeading1}>No</Text>
                    </View>
                  </View>
                </TouchableOpacity>
                {/* <View style={styles.clearInput}>
                  <Image
                    style={styles.searchIcon}
                    source={ImagePath.searchIcon}
                  />
                  <TextInput
                    style={{
                      padding: 0,
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 5,
                    }}
                    placeholder="Search"
                    placeholderTextColor={'#A5A5A5'}
                  />
                </View>
                <TouchableOpacity
                  activeOpacity={0.5}
                  onPress={() => {
                    checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[
                      styles.searchIcon,
                      {borderWidth: 0.6, borderColor: '#000'},
                    ]}
                    source={ImagePath.checkBox}
                  />
                  <Text style={styles.selectAllText}>Select All</Text>
                </TouchableOpacity> */}
                {/* <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                /> */}
              </>
            )}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: COLORS.black,
            justifyContent: 'space-between',
            marginBottom: hp(2),
            paddingVertical: 10,
          }}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={[
              styles.closeBtn,
              {borderRightWidth: 1, borderRightColor: '#fff'},
            ]}
            onPress={() => {
              onPressCancel();
            }}>
            <Text style={{color: COLORS.white, fontFamily: FONTS.InterMedium}}>
              CLOSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.closeBtn}
            onPress={() => {
              var tempdata = [];
              for (var i = 0; i < localities.length; i++) {
                if (localities[i].checked == true) {
                  var detaisl = {};
                  detaisl = localities[i].value;
                  tempdata.push(detaisl);
                }
              }

              var tempdataGenres = [];
              for (var i = 0; i < generes.length; i++) {
                if (generes[i].checked == true) {
                  var detaisl = {};
                  detaisl = generes[i].value;
                  tempdataGenres.push(detaisl);
                }
              }

              onPressApply({
                locality: tempdata,
                sheesha: sheesha,
                vegNonVeg: vegNonVeg,
                stagsAllowed: stages,
                musicGenre: tempdataGenres,
                kidsFriendly: kidsFriendly,
              });
            }}>
            <GradientText
              style={[styles.textStyle, {fontFamily: FONTS.InterMedium}]}>
              <Text>APPLY</Text>
            </GradientText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default FilterScreen;
const styles = StyleSheet.create({
  closeBtn: {
    flex: 0.6,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchIcon: {
    height: 11,
    tintColor: '#A5A5A5',
    width: 11,
    resizeMode: 'contain',
  },
  locationText: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.InterMedium,
    marginLeft: 5,
  },
  selectAllText: {
    fontFamily: FONTS.InterMedium,
    color: '#202020',
    marginLeft: 12,
  },
  filterIcon: {
    height: 17,
    tintColor: COLORS.black,
    width: 17,
    resizeMode: 'contain',
  },
  clearInput: {
    flexDirection: 'row',
    marginLeft: 10,
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderBottomColor: 'rgba(214, 214, 214, 1)',
    borderBottomWidth: 1,
  },
  filterText: {
    paddingVertical: hp(2),
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    alignItems: 'center',
  },
  listinhHeading1: {
    fontSize: 12,
    marginLeft: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.black,
  },
  aboutText: {
    color: COLORS.black,
    fontSize: 20,
    fontFamily: FONTS.InterSemiBold,
  },
  btnIcon: {height: 16, width: 16, resizeMode: 'contain', tintColor: '#FF00B7'},
  //
  buttonText: {
    fontSize: 14,
    color: COLORS.black,
    marginLeft: 5,
    fontFamily: 'Metropolis-Medium',
    letterSpacing: 0.3,
  },

  titleText: {
    marginLeft: wp(4),
    color: COLORS.black,
    fontFamily: 'Metropolis-SemiBold',
    fontSize: 16,
    marginTop: hp(1),
  },
  LoctionText: {
    fontWeight: '400',
    fontSize: 12,
    color: '#5B5959',
    marginLeft: wp(4),
  },
  //
  singerName: {
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'Metropolis-SemiBold',
    color: '#5B5959',
  },

  listinhHeading: {fontSize: 18, fontWeight: '700', color: COLORS.black},
  listinhText1: {fontSize: 14, fontWeight: '400', color: '#575757'},
});
