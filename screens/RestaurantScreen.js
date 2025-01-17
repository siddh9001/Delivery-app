import { useNavigation, useRoute } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ArrowLeftIcon,
  QuestionMarkCircleIcon,
} from "react-native-heroicons/outline";
import DeliveroColors from "../assets/Delivero-colors";
import { urlfor } from "../sanity";
import { MapPinIcon } from "react-native-heroicons/outline";
import { ChevronRightIcon, StarIcon } from "react-native-heroicons/solid";
import DishRow from "../components/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestaurant } from "../features/RestaurantSlice";
import { useEffect } from "react";

const RestaurantScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {
    params: {
      id,
      imgUrl,
      title,
      rating,
      genre,
      address,
      short_description,
      dishes,
      long,
      lat,
    },
  } = useRoute();

  useEffect(() => {
    dispatch(
      setRestaurant({
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      })
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView
        style={{
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View className="relative">
          <Image
            source={{ uri: urlfor(imgUrl).url() }}
            className="w-full h-56 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="absolute top-5 left-5 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeftIcon size={20} color={DeliveroColors.primary} />
          </TouchableOpacity>

          <View className="bg-white">
            <View className="px-4 pt-4">
              <Text className="text-3xl font-bold">{title}</Text>
              <View className="flex-row space-x-2 my-1">
                <View className="flex-row items-center space-x-1">
                  <StarIcon
                    color={DeliveroColors.primary}
                    opacity={0.5}
                    size={22}
                  />
                  <Text className="text-xs text-gray-500">
                    <Text style={{ color: `${DeliveroColors.primary}` }}>
                      {rating}
                    </Text>{" "}
                    . {genre}
                  </Text>
                </View>

                <View className="flex-row items-center space-x-1">
                  <MapPinIcon color="gray" opacity={0.5} size={22} />
                  <Text className="text-xs text-gary-500 overflow-hidden truncate w-48">
                    Nearby . {address}
                  </Text>
                </View>
              </View>
              <Text className="text-gray-500 mt-2 pb-2">
                {short_description}
              </Text>
            </View>

            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-300">
              <QuestionMarkCircleIcon color="gray" opacity={0.6} size={22} />
              <Text className="pl-2 flex-1 text-md font-bold">
                Have a Food Allergy ?
              </Text>
              <ChevronRightIcon color={DeliveroColors.primary} size={22} />
            </TouchableOpacity>

            <View className="pb-36">
              <Text className="px-4 pt-6 mb-3 font-bold text-xl">Menu</Text>

              {/* Dish rows */}
              {dishes.map((dish) => {
                return (
                  <DishRow
                    key={dish._id}
                    id={dish._id}
                    name={dish.name}
                    description={dish.short_description}
                    price={dish.price}
                    image={dish.image}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default RestaurantScreen;
