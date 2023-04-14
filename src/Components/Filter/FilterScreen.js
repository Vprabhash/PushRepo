import React, {useState} from 'react';
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
import ImagePath from '../../assets/ImagePath';
import {COLORS, FONTS} from '../constants';
import GradientText from '../GradientText';
function FilterData(props) {
  const {label, onClick, image, bgColor} = props;
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
      <Text style={[styles.locationText, {marginLeft: 6}]}>{label}</Text>
    </TouchableOpacity>
  );
}
const FilterScreen = props => {
  const [serachFriends, setSerachFriends] = useState('');
  const [genreData, setgenreData] = useState([
    {label: 'Pop', checked: false},
    {label: 'Rock', checked: false},
    {label: 'Doc', checked: false},
    {label: 'Soc', checked: false},
    {label: 'Jik', checked: false},
    {label: 'Sam', checked: false},
    {label: 'MAx', checked: false},
    {label: 'Min', checked: false},
  ]);
  const [teamArray, setTeamArray] = useState(genreData);
  const friendSearchFilter = text => {
    if (text) {
      const newData = teamArray.filter(function (item) {
        const itemData = item.label
          ? item.label.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setgenreData(newData);
      setSerachFriends(text);
    } else {
      setgenreData(teamArray);
      setSerachFriends(text);
    }
  };
  const checkAll = () => {
    let temp = genreData.map(item => {
      return {...item, checked: true};
    });
    setgenreData(temp);
  };
  const checkOne = index => {
    let temp = [...genreData];
    temp[index].checked = !temp[index].checked;
    setgenreData(temp);
  };
  const [selectRight, setSelectRight] = useState('Location');
  const rendarItemGenre = ({item, index}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          checkOne(index);
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
          style={{height: 11, width: 11, resizeMode: 'contain'}}
          source={item.checked ? ImagePath.checkSelected : ImagePath.checkBox}
        />
        <View style={{flex: 0.6}}>
          <View style={{}}>
            <Text style={styles.listinhHeading1}>{item.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const onSelectRightUi = label => {
    setSelectRight(label);
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
            padding: 10,
            paddingTop: hp(5),
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.aboutText}>Filters </Text>
            <GradientText
              style={[styles.textStyle, {fontFamily: FONTS.InterMedium}]}>
              Clear All
            </GradientText>
          </View>
        </View>
        <View style={{flex: 1, flexDirection: 'row', borderTopWidth: 1}}>
          <View
            style={{
              backgroundColor: 'rgba(205, 205, 205, 1)',
              height: '100%',
              flex: 0.4,
            }}>
            <FilterData
              label={'Location'}
              onClick={() => {
                onSelectRightUi('Location');
              }}
              image={ImagePath.location}
              bgColor={
                selectRight === 'Location' ? '#fff' : 'rgba(205, 205, 205, 1)'
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
                selectRight === 'Sheesha' ? '#fff' : 'rgba(205, 205, 205, 1)'
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
              label={'Veg/Non Veg'}
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
          </View>
          <View style={{flex: 0.6, backgroundColor: '#FFFFFF'}}>
            {selectRight === 'Location' && (
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
                    value={serachFriends}
                    onChangeText={text => {
                      friendSearchFilter(text);
                    }}
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
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
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
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
            {selectRight === 'Sheesha' && (
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
                    checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
            {selectRight === 'Stages' && (
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
                    checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
            {selectRight === 'Veg/Non Veg' && (
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
                    checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
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
                    checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
              </>
            )}
            {selectRight === 'Kids Friendly' && (
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
                    checkAll();
                  }}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Image
                    style={[styles.searchIcon, {tintColor: '#000'}]}
                    source={ImagePath.checkBox}
                  />
                  <Text
                    style={{
                      color: '#A5A5A5',
                      fontWeight: '600',
                      marginLeft: 8,
                    }}>
                    selectAll
                  </Text>
                </TouchableOpacity>
                <FlatList
                  data={genreData}
                  renderItem={rendarItemGenre}
                  extraData={genreData}
                  showsVerticalScrollIndicator={false}
                />
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
              props.navigation.goBack();
            }}>
            <Text style={{color: COLORS.white, fontFamily: FONTS.InterMedium}}>
              CLOSE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.closeBtn}
            onPress={() => {
              props.navigation.goBack();
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
    height: 17,
    tintColor: '#A5A5A5',
    width: 17,
    resizeMode: 'cover',
  },
  locationText: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.InterMedium,
    marginLeft: 5,
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
  },
  listinhHeading1: {
    fontSize: 12,
    marginLeft: 14,
    fontFamily: FONTS.InterMedium,
    color: COLORS.black,
  },
  aboutText: {
    color: COLORS.black,
    fontSize: 17,
    fontFamily: 'Metropolis-SemiBold',
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
