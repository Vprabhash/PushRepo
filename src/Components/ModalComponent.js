import React, {useState} from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  Modal,
} from 'react-native';
import CustomButton from './TextInput_And_Button/CustomButton';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {COLORS, FONTS} from './constants';
import ImagePath from '../assets/ImagePath';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const ModalComponent = ({visible = false, onPress}) => {
  const [modalVisible, setModalVisible] = useState(visible);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                height: 2,
                marginTop: 10,
                width: wp(16),
                backgroundColor: '#000',
                alignSelf: 'center',
              }}></View>
            <View
              style={[
                styles.textModal,
                {borderBottomWidth: 1, paddingBottom: hp(3)},
              ]}>
              <Text
                style={{
                  color: '#000000',
                  fontWeight: '600',
                  fontSize: 16,
                }}>
                Sort By
              </Text>
              <TouchableOpacity
                onPress={() => {
                  ('');
                }}>
                <Text style={{color: 'red'}}>Clear All</Text>
              </TouchableOpacity>
            </View>
            <View style={[styles.textModal, {}]}>
              <Text style={styles.redioText}>Top Rated</Text>
              <TouchableOpacity>
                <Image
                  style={[styles.redioImg, {tintColor: 'red'}]}
                  source={ImagePath.redioRed}
                />
              </TouchableOpacity>
            </View>
            <View style={[styles.textModal, {}]}>
              <Text style={styles.redioText}>Rating High to Low</Text>
              <TouchableOpacity>
                <Image style={[styles.redioImg, {}]} source={ImagePath.redio} />
              </TouchableOpacity>
            </View>
            <View style={[styles.textModal, {}]}>
              <Text style={styles.redioText}>Nearest</Text>
              <TouchableOpacity>
                <Image style={[styles.redioImg, {}]} source={ImagePath.redio} />
              </TouchableOpacity>
            </View>
            <View style={[styles.textModal, {}]}>
              <Text style={styles.redioText}>Event</Text>
              <TouchableOpacity>
                <Image style={[styles.redioImg, {}]} source={ImagePath.redio} />
              </TouchableOpacity>
            </View>
            <View style={[styles.textModal, {}]}>
              <Text style={styles.redioText}>Artist</Text>
              <TouchableOpacity>
                <Image style={[styles.redioImg, {}]} source={ImagePath.redio} />
              </TouchableOpacity>
            </View>
            <View style={[styles.textModal, {}]}>
              <Text style={styles.redioText}>Distance</Text>
              <TouchableOpacity>
                <Image style={[styles.redioImg, {}]} source={ImagePath.redio} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: hp(3),
              }}>
              <CustomButton
                onclick={() => {
                  setModalVisible(!modalVisible);
                }}
                title="Cancel"
                flex={0.47}
                bgColor="#fff"
                textColor="#000000"
              />
              <CustomButton
                onclick={() => {
                  props.navigation.navigate('');
                }}
                flex={0.47}
                title="Submit"
                borderColor="#000"
                bgColor="#000"
                textColor="#FAFAFA"
              />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default ModalComponent;
const styles = StyleSheet.create({
  hedingTextMain: {
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  hedingImg: {width: '30%', resizeMode: 'contain'},
  cardText: {
    fontFamily: FONTS.AxiformaBold,
    fontSize: 12,
    marginHorizontal: 5,
    textAlign: 'center',
    color: COLORS.black,
    letterSpacing: 2.5,
  },

  // modal css
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    opacity: 0.9,
    backgroundColor: '#000',
  },
  modalView: {
    // margin: 20,
    width: wp(100),
    height: hp(65),
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: wp(4),
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  redioText: {color: COLORS.black},
  textModal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  redioImg: {height: 15, width: 15, tintColor: COLORS.black},
});
