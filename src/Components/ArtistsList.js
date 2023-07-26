import React from 'react';
import {Text} from 'react-native';
import {COLORS, FONTS} from './constants';

const ArtistsList = ({artistData, navigation}) => {
  if (!artistData || !artistData.artists || artistData.artists.length === 0) {
    return null;
  }

  return artistData.artists.map((e, i) => (
    <>
      <Text
        key={i}
        style={[
          styles.singerName,
          {
            textDecorationLine:
              e?.type?.toLowerCase() === 'guest' ? 'none' : 'underline',
            marginLeft: 0,
            marginTop: 0,
          },
        ]}
        onPress={() => {
          if (e?.type?.toLowerCase() === 'guest') {
            return;
          }
          navigation.navigate('ArtistEventDetail', {
            artistListDetail: e,
          });
        }}>
        {i >= 1 ? <Text style={{textDecorationLine: 'none'}}>, </Text> : null}
        {e?.name}
      </Text>
    </>
  ));
};

const styles = {
  singerName: {
    fontSize: 16,
    fontFamily: FONTS.RobotoRegular,
    color: COLORS.black,
    marginTop: 6,
  },
};

export default ArtistsList;
