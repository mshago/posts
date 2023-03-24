import { StyleSheet } from "react-native"
import { Colors } from "../../constants/index"

export const styles = StyleSheet.create({
    item:{
        alignSelf:'stretch',
        flexDirection:'row',
        paddingVertical:20,
        borderBottomColor:Colors.gray,
        borderBottomWidth:1
    },
    user:{
        fontSize:16,
        fontWeight:'700',
        marginRight:5,
        color:Colors.black,
    },
    username:{
      fontSize:16,
      color:Colors.darkenGray,
    },
    row:{
      flexDirection:'row',
      alignSelf:'stretch',
      alignItems:'center',
      justifyContent:'flex-start',
    },
    description:{
      fontSize:16,
      color:Colors.black,
    },
})