import React from 'react';
import { Text, View, ScrollView, TouchableOpacity, Image, Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native';
// import Header from '../components/Header';
// import Swiper from 'react-native-swiper';
import Carousel from 'react-native-snap-carousel';
import ImagePath from '../assets/ImagePath';
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');
function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}
const slideWidth = wp(100);

const SliderCompo = ({ navigation }) => {
  
  const ENTRIES1 = [
  { mapIcon: ImagePath.Explore, },
  { mapIcon: ImagePath.slider_img, },
  { mapIcon: ImagePath.Explore, },
  { mapIcon: ImagePath.slider_img, },
  { mapIcon: ImagePath.Explore, },
];
  const _renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        {/* <Text style={styles.title}>{item.title}</Text> */}
        <Image style={{ height:180,width:'100%',borderRadius:10, }} source={item.mapIcon}
        />
        <View>

        </View>
      </View>
    );
  }
  return (
    <View >
          <Carousel 
          layout={'default'}
            data={ENTRIES1}
            renderItem={_renderItem}
            sliderWidth={slideWidth}
            itemWidth={300}
            autoplay={false}
          />
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    marginTop: 15,
    overflow: 'hidden',

  },
  //   title: {
  //     paddingHorizontal: 30,
  //     backgroundColor: 'transparent',
  //     color: 'rgba(255, 255, 255, 0.9)',
  //     fontSize: 20,
  //     fontWeight: 'bold',
  //     textAlign: 'center'
  // },
});
export default SliderCompo;