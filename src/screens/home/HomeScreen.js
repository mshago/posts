import "react-native-gesture-handler";
import React, { useState, useEffect } from "react";

//components
import { HomeScreenView } from "./HomeScreen.view";

export const HomeScreen = ({ navigation, route }) => {
  useEffect(() => {
    if (route.params?.deleted) {
      const found = posts.find((x) => x._id === route.params.deleted);
      setPosts(
        posts.filter((x) => {
          return x !== found;
        })
      );
    }
  }, [route.params?.deleted]);

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      setLoading(true);
      fetch("https://auth-serverless-santiagolunav.vercel.app/api/posts", {
        method: "get",
      })
        .then((x) => x.json())
        .then((x) => {
          setPosts(x);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <HomeScreenView
      loading={loading}
      posts={posts}
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      navigation={navigation}
    />
  );
};
