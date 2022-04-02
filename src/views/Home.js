import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useContext } from 'react';
import { 
  StyleSheet,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { AuthContext } from '../hooks/authContext'

//components
import ListItem from '../components/ListItem'
import AddPostModal from '../components/AddPostModal'
import ButtonAddPost from '../components/ButtonAddPost'

export default function Home({ navigation, route }) {

  useEffect(() => {
    if(route.params?.deleted){
      const found = posts.find(x => x._id === route.params.deleted)
      setPosts(posts.filter(x => {
        return x !== found
      }))
    }
  },[route.params?.deleted])

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const { user } = useContext(AuthContext)
  const userData = user()

  //console.log(userData)

  const fetchData = _ => {
      setLoading(true)
      fetch('https://auth-serverless-santiagolunav.vercel.app/api/posts',{
        method:'get',
      })
      .then(x => x.json())
      .then(x => {
        setPosts(x)
        setLoading(false)
      })
      .catch(e => {
        //setError(e)
        //console.log(error)
        setLoading(false)
      })
    }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      {
        loading?
        <ActivityIndicator color={'#000'} size={'large'} />
        :
        <>
        <AddPostModal 
          fetchData={() => fetchData()}
          handleModal={() => setModalVisible(false)}
          modalVisible={modalVisible}/>
        <FlatList
          style={{alignSelf:'stretch'}}
          data={posts.sort((a,b) => {
            return new Date(b.date) - new Date(a.date)
          })}
          renderItem={({item}) => 
            <ListItem 
              post={item} 
              user={item.user} 
              me={userData.userId}
              onPress={() => 
                navigation.navigate('Post',{
                  postData:item,
                  user: userData.userId
                }
              )} /> 
          }
          keyExtractor={item => item._id}
        />
        <ButtonAddPost 
        onPress={() => setModalVisible(true)}/>
        </>
      }
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title:{
    marginHorizontal:10,
    fontSize:18,
    fontWeight:'600'
  },
  input:{
    padding:10,
    alignSelf:'stretch',
    borderColor:'#c4c4c4',
    borderWidth:1,
    marginHorizontal:10,
    marginBottom:10
  },
  centered:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0,0,0,0.3)'
  },
  modal:{
    backgroundColor:'white',
    borderRadius:20,
    padding:35,
    width:'80%',
    alignItems:'center',
    shadowColor:'#000',
    shadowOffset:{
      width:0,
      height:2,
    },
    shadowOpacity:0.25,
    shadowRadius:4,
    elevation:5,
  },
  buttonContainer:{
    justifyContent:'space-between',
    alignSelf:'stretch',
    flexDirection:'row',
  },
  button: {
    borderRadius: 10,
    paddingHorizontal:20,
    paddingVertical:10,
    elevation: 2
  },
  buttonClose: {
    backgroundColor: "tomato",
  },
  textButton:{
    color:'white'
  }
});
