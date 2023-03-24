import "react-native-gesture-handler";
import React from "react";
import { View, FlatList, Text } from "react-native";
//components
import { Container } from "../../components/container/Container";
import { ListItem } from "../../components/listItem/ListItem";
import AddPostModal from "../../components/AddPostModal";
import ButtonAddPost from "../../components/ButtonAddPost";

export const HomeScreenView = ({
  loading,
  modalVisible,
  posts,
  setModalVisible,
  navigation,
}) => {
  return (
    <Container isLoading={loading}>
      <AddPostModal
        fetchData={() => fetchData()}
        handleModal={() => setModalVisible(false)}
        modalVisible={modalVisible}
      />
      <FlatList
        data={posts.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        })}
        renderItem={({ item }) => (
          <ListItem
            post={item}
            user={item.user}
            onPress={() => navigation.navigate("Post",{postId:item._id})}
          />
        )}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={
          <View
            style={{
              minHeight: "100%",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>Whoops... Seems there's nothing to see :/</Text>
          </View>
        }
      />
      <ButtonAddPost onPress={() => setModalVisible(true)} />
    </Container>
  );
};
