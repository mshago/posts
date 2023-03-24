import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PostScreenView } from "./PostScreen.view";
import useFetch from "../../hooks/useFetch";

export const PostScreen = ({ route, navigation }) => {
  const [post, setPost] = useState(null);
  const date = new Date();

  useEffect(() => {
    const getPost = async () => {
      let response = await fetch(
        "https://auth-serverless-santiagolunav.vercel.app/api/posts?id=603fdc09dfbe510008da6fa0"
      );
      setPost(response)
      console.log('AAAAAA',response)
    };
    getPost();
  }, []);

  // const { postData, user } = route.params
  // const date = new Date(postData.date)

  // const deletePost = () => {
  //     AsyncStorage.getItem('userToken')
  //         .then(x => {
  //         fetch('https://auth-serverless-santiagolunav.vercel.app/api/posts/'+postData._id,{
  //             method:'delete',
  //             headers:{
  //             'Content-Type': 'application/json',
  //             authorization:x
  //             },
  //         })
  //         .then(x => {
  //             if(x.status !== 204){
  //             return alert(x)
  //             }
  //             navigation.navigate('Home',{
  //                 deleted:postData._id,
  //             })
  //         })
  //         })
  // }

  return <PostScreenView date={date} />;
};
