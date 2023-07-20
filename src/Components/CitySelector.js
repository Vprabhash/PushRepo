import React, {useState, useEffect, memo} from 'react';
import {COLORS, FONTS} from './constants';
//import DropDownPicker from 'react-native-dropdown-picker';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {currentCity, setSelected} from '../redux/reducers/citySelectorSlice';
import Toast from 'react-native-simple-toast';
import {RFPercentage, RFValue} from 'react-native-responsive-fontsize';

const data = [
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Pune', value: 'Pune'},
];
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ApiCall from '../redux/CommanApi';
import {setData} from './Helper';

const CitySelector = ({
  width = '50%',
  height = hp(6),
  isSelected = () => {},
}) => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const [isFocus, setIsFocus] = useState(false);
  const [cities, setCities] = useState([]);

  const renderLabel = () => {
    if (isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: COLORS.black}]}>
          Select City
        </Text>
      );
    }
    return null;
  };
  useEffect(() => {
    fetchCities();
  }, []);
  useEffect(() => {
    let check = cities?.some(e => e?.label === selectedCity);
    dispatch(setSelected(check));
    isSelected(check);
  }, [cities, selectedCity]);

  const fetchCities = () => {
    try {
      ApiCall('api/cities', 'GET').then(res => {
        if (res?.data?.length) {
          let temp = res?.data?.map(e => ({
            label: e.name,
            value: e.name,
          }));
          console.log('clubsnearbydata ----', res?.data, temp);
          setCities(temp);
        }
      });
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  return (
    <View style={[styles.container, {flexBasis: width}]}>
      {/* //{renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, {flexBasis: width}]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={cities}
        // search
        maxHeight={200}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'Select City' : 'Select City'}
        searchPlaceholder="Search"
        value={selectedCity}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          // setData('currentCity', item.value);
          global.currentCity = item.value;
          dispatch(currentCity(item.value));
          setIsFocus(false);
        }}
        itemTextStyle={styles.textItem}
        containerStyle={{
          marginTop: width != '50%' ? -5 : 6,
          flexBasis: '50%',
        }}
      />
    </View>
  );
};

export default memo(CitySelector);

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
    elevation: 99,
    height: hp(6),
    borderRadius: 30,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  dropdown: {
    height: hp(6),
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '50%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: COLORS.black,
    width: wp(48),
    // marginTop:10
  },
  textItem: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: RFValue(14, Dimensions.get('window').height),
    color: COLORS.black,
    flex: 1,
  },
  icon: {
    marginRight: 5,
  },
  itemContainerStyle: {
    paddingVertical: 5,
  },
  itemTextStyle: {
    paddingVertical: 5,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.black,
  },
  placeholderStyle: {
    fontSize: RFValue(14, Dimensions.get('window').height),
    color: COLORS.black,
    fontFamily: FONTS.RobotoRegular,
  },
  selectedTextStyle: {
    fontSize: RFValue(14, Dimensions.get('window').height),
    color: COLORS.black,
    fontFamily: FONTS.RobotoRegular,
  },
  inputSearchStyle: {
    fontSize: 16,
    color: COLORS.black,
    fontFamily: FONTS.RobotoRegular,
  },
});
