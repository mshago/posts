import React from 'react'
import { 
    StyleSheet, 
    Text, 
    View, 
    Image, 
    Button,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const monthNames = [
    'Jan','Feb','Mar','Apr','May','June',
    'July','Aug','Sep','Oct','Nov','Dec'
]

const getTimePosted = (date) => {
    const timeType = date.getHours() <= 11 ? 'AM' : 'PM'
    let hours = parseInt(date.getHours())
    hours = hours > 12 ? hours - 12 : hours
    const minutes = (date.getMinutes().toString().length === 1) ?
    '0'+date.getMinutes()
    :
    date.getMinutes()

    return hours+':'+minutes+' '+timeType
}

const getDatePosted = (date) => {
    const day = (date.getDate().toString().length === 1) ? 
        '0'+date.getDate() 
        : 
        date.getDate()
    const month = monthNames[date.getMonth()]
    let year = date.getFullYear().toString()
    year = year.substring(2,4)

    return day+' '+month+' '+year
}

const Post = ({ route, navigation }) => {

    const { postData, user } = route.params
    const date = new Date(postData.date)

    const deletePost = () => {
        AsyncStorage.getItem('userToken')
            .then(x => {
            fetch('https://auth-serverless-santiagolunav.vercel.app/api/posts/'+postData._id,{
                method:'delete',
                headers:{
                'Content-Type': 'application/json',
                authorization:x
                },
            })
            .then(x => {
                if(x.status !== 204){
                return alert(x)
                }
                navigation.navigate('Home',{
                    deleted:postData._id,
                })
            })
            })
    }

    return (
        <SafeAreaView style={{flex:1}}>
        <View style={styles.container}>
            <View style={styles.user}>
                <View style={{
                    flex:1, 
                    alignItems:'center', 
                    justifyContent:'center',
                    marginVertical:10
                    }}>
                    <Image
                    style={{width:60,height:60,borderRadius:50}}
                    source={{uri:'https://i.pinimg.com/originals/0c/3b/3a/0c3b3adb1a7530892e55ef36d3be6cb8.png'}}
                    />
                </View>
                <View style={{
                    flex:3,
                    alignItems:'flex-start', 
                    paddingVertical:10,
                    justifyContent:'space-evenly',
                    }}>
                    <Text style={styles.userName}>{postData.user.name+' '+postData.user.last_name}</Text>
                    <TouchableOpacity>
                        <Text style={styles.username}>{'@'+postData.user.username}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.post}>
                <Text style={styles.postText}>{postData.description}</Text>
            </View>
            <View style={styles.postInfo}>
                <Text style={styles.dateText}>{getTimePosted(date)}</Text>
                <View style={styles.dot} />
                <Text style={styles.dateText}>{getDatePosted(date)}</Text>
            </View>
            {
                postData.user._id === user ?
                <>
                <View style={styles.postInfo}>
                    <Button 
                        title='Delete'
                        onPress={() => deletePost()}
                    />
                </View>
                </>
                :
                null
            }
        </View>
        </SafeAreaView>
    )
}

export default Post

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'flex-start',
        backgroundColor:'#fff'
    },
    user:{
        flexDirection:'row',
        alignSelf:'stretch',
    },
    post:{
        alignSelf:'stretch',
        paddingHorizontal:10,
        paddingVertical:20,
    },
    postText:{
        fontSize:20,
    },
    postInfo:{
        flexDirection:'row',
        alignSelf:'stretch',
        alignItems:'center',
        borderBottomColor:'#9e9e9e',
        paddingVertical:15,
        borderBottomWidth:0.5,
    },
    userName:{
        fontSize:16,
        fontWeight:'700',
        color:'#000'
    },
    username:{
        fontSize:16,
        color:'#9e9e9e',
    },
    dateText:{
        marginHorizontal:10,
        fontSize:16,
        color:'#9e9e9e'
    },
    dot:{
        width:4,
        height:4,
        backgroundColor:'#9e9e9e',
        borderRadius:50,
    }
})
