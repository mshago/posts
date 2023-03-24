import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    backgroundColor: "#fff",
  },
  user: {
    flexDirection: "row",
    alignSelf: "stretch",
  },
  post: {
    alignSelf: "stretch",
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  postText: {
    fontSize: 20,
  },
  postInfo: {
    flexDirection: "row",
    alignSelf: "stretch",
    alignItems: "center",
    borderBottomColor: "#9e9e9e",
    paddingVertical: 15,
    borderBottomWidth: 0.5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#000",
  },
  username: {
    fontSize: 16,
    color: "#9e9e9e",
  },
  dateText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#9e9e9e",
  },
  dot: {
    width: 4,
    height: 4,
    backgroundColor: "#9e9e9e",
    borderRadius: 50,
  },
});
