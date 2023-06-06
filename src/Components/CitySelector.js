import React, {useState, useEffect} from 'react';
import {COLORS, FONTS} from './constants';
//import DropDownPicker from 'react-native-dropdown-picker';
import {StyleSheet, Text, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useDispatch, useSelector} from 'react-redux';
import {currentCity} from '../redux/reducers/citySelectorSlice';
import Toast from 'react-native-simple-toast';

const data = [
  {label: 'Mumbai', value: 'Mumbai'},
  {label: 'Pune', value: 'Pune'},
];
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import ApiCall from '../redux/CommanApi';

const CitySelector = () => {
  const dispatch = useDispatch();
  const selectedCity = useSelector(state => state.citySelector.selectedCity);
  const [isFocus, setIsFocus] = useState(false);
  const [cities, setCities] = useState([]);

  const renderLabel = () => {
    if (isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: '#000000'}]}>
          Select City
        </Text>
      );
    }
    return null;
  };
  useEffect(() => {
    fetchCities()
  }, [])

  const fetchCities = () => {
    try {
      ApiCall('api/cities', 'GET').then(res => {
        if(res?.data?.length){
          let temp = res?.data?.map((e) => ({
            label: e.name, value: e.name
          }))
          console.log('clubsnearbydata ----', res?.data, temp);
          setCities(temp);
        }
      });
    } catch (error) {
      Toast.showWithGravity(error?.message, Toast.LONG, Toast.BOTTOM);
    }
  };

  return (
    <View style={styles.container}>
      {/* //{renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
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
          dispatch(currentCity(item.value));
          setIsFocus(false);
        }}
        itemTextStyle={styles.textItem}
      />
    </View>
  );
};

export default CitySelector;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '35%',
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
    flexBasis: '35%',
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    color: '#000000',
  },
  textItem: {
    fontFamily: FONTS.RobotoRegular,
    fontSize: 14,
    color: '#000000',
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
    color: '#000000',
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: FONTS.RobotoRegular,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: FONTS.RobotoRegular,
  },
  inputSearchStyle: {
    fontSize: 16,
    color: '#000000',
    fontFamily: FONTS.RobotoRegular,
  },
});
