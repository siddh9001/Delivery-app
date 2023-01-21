import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import DeliveroColors from "../assets/Delivero-colors";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../sanity";

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type == "featured" && _id == $id]{
        ...,
        restaurants[]->{
          ...,    
          dishes[]->{...,},
          type->{
            name,
          }   
        }
      }[0]
      `,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants));
  }, [id]);
  // console.log(restaurant);
  return (
    <View>
      <View className="mt-4 flex-row justify-between items-center px-4">
        <Text>{title}</Text>
        <ArrowRightIcon color={DeliveroColors.primary} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => {
          return (
            <RestaurantCard
              key={restaurant._id}
              id={restaurant._id}
              imgUrl={restaurant.image}
              title={restaurant.name}
              rating={restaurant.rating}
              genre={restaurant.type.name}
              address={restaurant.address}
              short_description={restaurant.short_description}
              dishes={restaurant.dishes}
              long={20}
              lat={30}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
