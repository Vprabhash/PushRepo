import React from 'react';
import {Text} from 'react-native';
import {COLORS, FONTS} from './constants';

const ArtistsList = ({artistData, navigation, style}) => {
  if (
    !artistData ||
    !artistData?.artists ||
    artistData?.artists?.length === 0
  ) {
    return null;
  }

  return (
    <>
      <Text
        style={[
          styles.singerName,
          {
            // textDecorationLine:
            //   artistData?.artists[0]?.type?.toLowerCase() === 'guest'
            //     ? 'none'
            //     : 'underline',
            marginLeft: 0,
            marginTop: 0,
          },
          style,
        ]}
        // onPress={() => {
        //   if (artistData?.artists[0]?.type?.toLowerCase() === 'guest') {
        //     return;
        //   }
        //   navigation.navigate('ArtistEventDetail', {
        //     artistListDetail: artistData?.artists[0],
        //   });
        // }}
      >
        {artistData?.artists[0]?.name}
        {Array.isArray(artistData?.artists) && artistData?.artists?.length > 1
          ? ` +${artistData?.artists?.length - 1}`
          : null}
      </Text>
    </>
  );
};

const styles = {
  singerName: {
    fontSize: 16,
    fontFamily: FONTS.AxiformaBold,
    color: COLORS.black,
    marginTop: 6,
  },
};

export default ArtistsList;
