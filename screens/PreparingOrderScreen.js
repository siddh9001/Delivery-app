import { useNavigation } from "@react-navigation/native";
import { Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import DeliveroColors from "../assets/Delivero-colors";
import { useEffect } from "react";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);

  return (
    <View className="bg-[#01ccbd] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/deliveroo-animation.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-80 w-80"
      />
      <Animatable.Text
        animation="slideInUp"
        iterationCount={2}
        className="text-lg text-white font-bold text-center my-10"
      >
        Waiting for Restaurant to Accept your Order
      </Animatable.Text>
      <Progress.Circle indeterminate={true} size={60} color="white" />
    </View>
  );
};

export default PreparingOrderScreen;
