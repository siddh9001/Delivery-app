import { View, ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient from "../sanity";
import { urlfor } from "../sanity";
import { useState, useEffect } from "react";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == "category"] 
    `
      )
      .then((data) => setCategories(data));
  }, []);
  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {/* Category Card */}
      {categories.map((category) => {
        return (
          <CategoryCard
            key={category._id}
            imgUrl={urlfor(category.image).url()}
            title={category.name}
          />
        );
      })}
    </ScrollView>
  );
};

export default Categories;
