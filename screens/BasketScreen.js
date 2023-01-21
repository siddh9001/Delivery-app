import { useNavigation } from "@react-navigation/native";
import { useMemo, useState } from "react";
import {
  View,
  Text,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/BasketSlice";
import { selectRestaurant } from "../features/RestaurantSlice";
import DeliveroColors from "../assets/Delivero-colors";
import { urlfor } from "../sanity";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  //   console.log(groupedItemsInBasket);

  return (
    <View
      style={{
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        // paddingBottom: 20,
      }}
      className="flex-1 bg-white"
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            onPress={navigation.goBack}
            className="bg-gray-100 absolute top-5 right-5 rounded-full"
          >
            <XCircleIcon color={DeliveroColors.primary} size={35} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={require("../assets/deliveroo-favicon.png")}
            className="h-9 w-9 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 50-70 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, items]) => {
            return (
              <View
                key={key}
                className="flex-row space-x-3 px-5 py-2 items-center bg-white"
              >
                <Text className="text-[#00ccbb]">
                  {items.length}
                  {" x"}
                </Text>
                <Image
                  source={{ uri: urlfor(items[0]?.image).url() }}
                  className="h-12 w-12 rounded-full"
                />
                <Text className="flex-1">{items[0]?.name}</Text>
                <Text className="text-gray-600">₹ {items[0]?.price}</Text>
                <TouchableOpacity>
                  <Text
                    className="text-[#00ccbb] text-xs"
                    onPress={() => dispatch(removeFromBasket({ id: key }))}
                  >
                    Remove
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>

        <View className="p-5 mt-5 space-y-4 bg-white">
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Subtotal</Text>
            <Text className="text-gray-400">
              {"₹ "}
              {basketTotal}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600">Delivery Charge</Text>
            <Text className="text-gray-400">
              {"₹ "}
              {50}
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-600 font-extrabold">Order Total</Text>
            <Text className="text-gray-400 font-extrabold">
              {"₹ "}
              {basketTotal + 50}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-lg bg-[#00ccbb] p-4"
            onPress={() => navigation.navigate("PreparingOrder")}
          >
            <Text className="text-center text-xl font-bold text-white">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BasketScreen;
