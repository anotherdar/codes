import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = '@KEEP_IT_SECRET_TOKEN';

/**
 * basic util to save the token in the async storage
 * @param value - an object with key and value e.g: {token}
 */
export async function setToken(value: Record<string, Object>) {
  try {
    const JSONValue = JSON.stringify(value);

    AsyncStorage.setItem(STORAGE_KEY, JSONValue);
  } catch (error) {
    throw new Error("We couldn't set the state, try again later.");
  }
}

export async function getToken() {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : {token: undefined};
  } catch (error) {
    return JSON.stringify({});
  }
}

export async function removeToken() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.log('ups');
  }
}

export async function setValue(value: Record<string, Object>, key: string) {
  try {
    const JSONValue = JSON.stringify(value);

    AsyncStorage.setItem(key, JSONValue);
  } catch (error) {
    throw new Error("We couldn't set the state, try again later.");
  }
}

export async function getValue(key: string) {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : undefined;
  } catch (error) {
    return JSON.stringify({});
  }
}

export async function removeValue(key: string) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    console.log('ups');
  }
}
