import React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { Container } from "../../components/container/Container";
import { styles } from "./PostScreen.style";
import { getTimePosted, getDatePosted  } from "../../utils/getTimePosted";

export const PostScreenView = ({date}) => {
  return (
    <Container>
      <View style={styles.container}>
        <View style={styles.user}>
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              marginVertical: 10,
            }}
          >
            <Image
              style={{ width: 60, height: 60, borderRadius: 50 }}
              source={{
                uri: "https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png",
              }}
            />
          </View>
          <View
            style={{
              flex: 3,
              alignItems: "flex-start",
              paddingVertical: 10,
              justifyContent: "space-evenly",
            }}
          >
            <Text style={styles.userName}>John Cena</Text>
            <TouchableOpacity>
              <Text style={styles.username}>@therealcena</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.post}>
          <Text style={styles.postText}>cool description</Text>
        </View>
        <View style={styles.postInfo}>
          <Text style={styles.dateText}>{getTimePosted(date)}</Text>
          <View style={styles.dot} />
          <Text style={styles.dateText}>{getDatePosted(date)}</Text>
        </View>
        {/* {postData?.user._id === user ? (
          <>
            <View style={styles.postInfo}>
              <Button title="Delete" onPress={() => deletePost()} />
            </View>
          </>
        ) : null} */}
      </View>
    </Container>
  );
};
