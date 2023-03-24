import AsyncStorage from "@react-native-async-storage/async-storage";

const isJson = (str) => {
  try {
    JSON.parse(str);
  } catch (error) {
    return false;
  }
  return true;
};

export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return isJson(value) ? JSON.parse(value) : value;
  } catch (error) {
    console.log(error);
  }
};

export const storeData = async (key, value) => {
  try {
    if (typeof value === "object") {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  } catch (error) {
    console.log('async', error);
  }
};

export const removeData = async (key) => {
  try{
    await AsyncStorage.removeItem(key)
  } catch (error){
    console.log(error)
  }
}
