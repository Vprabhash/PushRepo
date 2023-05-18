import React, {useState, useEffect} from 'react';
import {COLORS, FONTS} from './constants';
//import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import {useDispatch,useSelector} from 'react-redux';
import {currentCity} from '../redux/reducers/citySelectorSlice';


const data = [
  { label: 'Mumbai', value: 'Mumbai' },
  { label: 'Pune', value: 'Pune' },
];
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';



const CitySelector = () => {
    const dispatch = useDispatch();
    const selectedCity = useSelector(state=>state.citySelector.selectedCity);
    const [value, setValue] = useState(selectedCity || null);
    const [isFocus, setIsFocus] = useState(false);
    useEffect(()=>{
        console.log(selectedCity)
    },[selectedCity])
    const renderLabel = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: '#000000' }]}>
            Select City
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {/* //{renderLabel()} */}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data}
          search
          maxHeight={200}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select City' : 'Select City'}
          searchPlaceholder="Search"
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            dispatch(currentCity(item.value));
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );    
}

export default CitySelector;

const styles = StyleSheet.create({
    container: {
         backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center', 
        flexBasis: '35%', 
        elevation: 16, 
        height: hp(6), 
        borderRadius: 30, 
        marginVertical: 10, 
        paddingHorizontal: 10, 
        elevation: 16, 
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
        fontSize: 16, 
        padding: 0, 
        height: hp(6), 
        color: 'rgba(0, 0, 0)', 
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
    }, 
    placeholderStyle: {
      fontSize: 16, 
      color: '#000000'
    }, 
    selectedTextStyle: {
      fontSize: 16, 
      color: '#000000', 
    }, 
    inputSearchStyle: {
      fontSize: 16, 
      color: '#000000'
    }, 
  });