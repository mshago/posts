import React, { useState } from 'react'
import { 
    StyleSheet, 
    Text, 
    View,
    Modal,
    TouchableOpacity,
    ActivityIndicatorBase,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Icon} from 'react-native-elements'
import { TextInput } from 'react-native-gesture-handler'

const AddPostButton = ({ post, onPress }) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            disabled={post?false:true}
            style={post?styles.button:styles.buttonDisabled}>
            <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
    )
}

const AddPostModal = ({ modalVisible, handleModal, fetchData }) => {

    const [loading, setLoading] = useState(false)
    const [postText, setPostText] = useState('')
    const addPost = () => {
        if(!postText){
        //
        }else{
        setLoading(true)
        AsyncStorage.getItem('userToken')
            .then(x => {
            fetch('https://auth-serverless-santiagolunav.vercel.app/api/posts',{
                method:'post',
                headers:{
                'Content-Type': 'application/json',
                authorization:x
                },
                body: JSON.stringify({
                description: postText,
                })
            })
            .then(x => {
                if(x.status !== 201){
                return alert(x)
                }
                fetchData()
                setPostText('')
                handleModal()
            })
            })
        }
    }

    return (
        <Modal
        
        animationType='slide'
        transparent={true}
        visible={modalVisible}>
        <SafeAreaView style={{flex:1}}>
          <View style={styles.modalContainer}>
            {
                loading?
                <ActivityIndicator color='dodgerblue' size='large' />
                :
                <>
                    <View style={styles.actions}>
                    <TouchableOpacity
                        onPress={handleModal}>
                        <Icon 
                            name='ios-close-outline'
                            type='ionicon'
                            color='dodgerblue'
                            size={32}/>
                    </TouchableOpacity>
                    <AddPostButton 
                    post={postText}
                    onPress={() => addPost()} 
                    />
                    </View>
                    <View style={{
                    alignSelf:'stretch',
                    marginHorizontal:20,
                    marginTop:10,
                    //backgroundColor:'dodgerblue',
                    flex:1}}>
                    <TextInput
                    value={postText}
                    onChangeText={x => setPostText(x)}
                    placeholderTextColor='#9e9e9e'
                    placeholder="What's happening?"
                    multiline={true}
                    maxLength={150}
                    style={styles.input} />
                    </View>
                </>
            }
          </View>
          </SafeAreaView>
        </Modal>
    )
}

export default AddPostModal

const styles = StyleSheet.create({
    modalContainer:{
        backgroundColor:'#fff',
        flex:1,
    },
    actions:{
        alignSelf:'stretch',
        height:50,
        //backgroundColor:'dodgerblue',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginHorizontal:10,
    },
    button:{
        backgroundColor:'dodgerblue',
        paddingHorizontal:20,
        paddingVertical:7,
        borderRadius:20,
    },
    buttonDisabled:{
        backgroundColor:'rgba(30,144,255,0.6)',
        paddingHorizontal:20,
        paddingVertical:7,
        borderRadius:20,
    },
    buttonText:{
        color:'#fff',
        fontSize:16,
        fontWeight:'bold',
    },
    input:{
        alignSelf:'stretch',
        fontSize:22
    }
})
