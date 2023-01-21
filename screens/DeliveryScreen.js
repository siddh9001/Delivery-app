import { useNavigation } from "@react-navigation/native";
import {
  Image,
  Platform,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../features/RestaurantSlice";
import { XMarkIcon } from "react-native-heroicons/outline";
import DeliveroColors from "../assets/Delivero-colors";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  return (
    <View className="bg-[#00ccbb] flex-1">
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
        className="z-50"
      >
        <View className="flex-row justify-between items-center p-5">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <XMarkIcon color="white" size={30} />
          </TouchableOpacity>
          <Text className="font-light text-white text-lg">Delivery Screen</Text>
        </View>
        <View className="bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View>
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold py-2">45-55 Minutes</Text>
            </View>
            <Image
              source={require("../assets/delivery-image.png")}
              className="h-16 w-16 rounded-full"
            />
          </View>
          <Progress.Bar
            size={30}
            color={DeliveroColors.primary}
            indeterminate={true}
          />
          <Text className="mt-3 text-gray-500">
            Your Order at {restaurant.title} is being prepared
          </Text>
        </View>
      </View>
      <MapView
        initialRegion={{
          latitude: 21.812876,
          longitude: 80.18383,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{ latitude: 21.812876, longitude: 80.18383 }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00ccbb"
        />
      </MapView>
      <View
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
          paddingBottom: 20,
        }}
        className="bg-white flex-row items-center space-x-5 h-28"
      >
        <Image
          source={require("../assets/deliveroo-favicon.png")}
          className="h-12 w-12 bg-gray-300 p-4 rounded-full ml-5"
        />
        <View className="flex-1">
          <Text className="text-lg">Siddhesh Patle</Text>
          <Text className="text-gray-400 ">Your Rider</Text>
        </View>
        <Text
          className="text-[#00ccbb] text-lg mr-5 font-bold
        "
        >
          Call
        </Text>
      </View>
    </View>
  );
};

export default DeliveryScreen;
