import React, { useEffect } from "react";
import { Image, ImageBackground, View, StatusBar, } from "react-native";
import ImagePath from "../../assets/ImagePath";

const Splash_Screen = (props) => {
   useEffect(() => {
      setTimeout(async () => {
         props.navigation.navigate('Explore')
      }, 1000);
   }, [])
   
   return (
      <View style={{ flex: 1 }}>
         <StatusBar barStyle="dark-content" hidden={false} backgroundColor="transparent" translucent={true} />
         <ImageBackground source={ImagePath.Azzir_Bg} style={{ height: '100%',width:"100%",justifyContent:"center",alignItems:"center"}}>
            <Image source={ImagePath.star_logo} style={{ width: 228, resizeMode: 'contain' }} />
         </ImageBackground>
      </View>
   );
}
export default Splash_Screen;