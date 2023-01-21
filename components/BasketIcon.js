import { Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/BasketSlice";
import { useNavigation } from "@react-navigation/native";
import DeliveroColors from "../assets/Delivero-colors";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotal = useSelector(selectBasketTotal);
  return (
    <>
      {items.length > 0 && (
        <View className="absolute bottom-10 w-full z-50">
          <TouchableOpacity
            onPress={() => navigation.navigate("Basket")}
            className="flex-row items-center mx-5 bg-[#00ccbb] p-4 rounded-lg space-x-2"
          >
            <Text className="text-lg text-white font-extrabold bg-[#01A296] py-1 px-2">
              {items.length}
            </Text>
            <Text className="flex-1 text-white font-extrabold text-lg text-center">
              View Basket
            </Text>
            <Text className="text-lg text-white font-extrabold">
              ₹ {basketTotal}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default BasketIcon;
