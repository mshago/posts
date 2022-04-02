import React, { useContext, useState, useEffect } from 'react'
import { 
    ActivityIndicator,
    Pressable, 
    StyleSheet, 
    Text, 
    View,
    FlatList,
    StatusBar,
    Platform,
    SafeAreaView,
} from 'react-native'
import { AuthContext } from '../hooks/authContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

//components
import ListItem from '../components/ListItem'

const User = ({navigation}) => {
    const { signOut } = useContext(AuthContext)
    const [user, setUser] = useState([])
    const [posts, setPosts] = useState([])
    const [error, setError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        AsyncStorage.getItem('userToken')
            .then(token => {
                fetch('https://auth-serverless-santiagolunav.vercel.app/api/auth/me',{
                    method:'get',
                    headers:{
                    'Content-Type': 'application/json',
                    authorization:token
                    },
                })
                .then(x => x.json())
                .then(x => {
                    //console.log(x)
                    setUser(x)
                    fetchPosts(x._id)
                })
                .catch(x => {
                    setError('Error pa')
                    setLoading(false)
                })
            })
        const fetchPosts = (id) => {
            fetch('https://auth-serverless-santiagolunav.vercel.app/api/posts',{
                method:'get',
            })
            .then(x => x.json())
            .then(data => {
                setPosts(data.filter(x => {
                    return x.user._id === id ? x : null
                }))
                setLoading(false)
            })
            .catch(e => {
                setError(e)
                console.log(error)
                setLoading(false)
            })
        }
    },[])

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={loading ? styles.loading : styles.container}>
            {
            loading?
            <ActivityIndicator color='dodgerblue' size='large' />
            :
            <>
                <View style={styles.userInfo}>
                    <View style={{
                        marginVertical:10,
                        height:100,
                        width:100,
                        backgroundColor:'dodgerblue',
                        borderRadius:50,
                        }}/>
                        <Text style={styles.name}>{user.name+' '+user.last_name}</Text>
                        <Text style={styles.username}>{'@'+user.username}</Text>

                        <View
                         style={{
                            alignSelf:'stretch',
                            backgroundColor:'pink',
                            flexDirection:'row',
                         }}>
                             <Text>100 Following</Text>
                             <Text>100 Followers</Text>
                        </View>
                </View>
                {/*{error?<Text>{error}</Text>:<Text>{user.username}</Text>}
                <Pressable 
                style={({ pressed }) => [
                    {
                        backgroundColor:pressed
                        ? 'rgba(30,144,255,0.3)'
                        : 'dodgerblue'
                    },
                    styles.button
                ]}
                onPress={() => signOut()}>
                    <Text style={{color:'#fff'}}>Log out</Text>
                </Pressable>*/}
                <FlatList
                    style={{alignSelf:'stretch'}}
                    data={posts.sort((a,b) => {
                        return new Date(b.date) - new Date(a.date)
                    })}
                    renderItem={({item}) => 
                        <ListItem 
                        post={item} 
                        user={item.user} 
                        onPress={() => 
                            navigation.navigate('Post',{
                            postData:item,
                            //user: userData.userId
                            }
                        )} /> 
                    }
                    keyExtractor={item => item._id}
                />
            </>
            }
        </View>
        </SafeAreaView>
    )
}

export default User

const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        backgroundColor:'#fff',
        justifyContent:'flex-start',
        alignItems:'center',
    },
    loading:{
        backgroundColor:'#fff',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
    },
    userInfo:{
        flex:1,
        alignSelf:'stretch',
        justifyContent:'center',
        alignItems:'center',
        borderBottomWidth:1,
        borderBottomColor:'gray',
    },
    button:{
        paddingHorizontal:40,
        paddingVertical:10,
        borderRadius:20,
    },
    name:{
        fontSize:20,
        fontWeight:'bold',
    },
    username:{
        fontSize:16,
        color:'#a4a4a4'
    }
})
