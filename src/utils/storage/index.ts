import AsyncStorage from '@react-native-async-storage/async-storage';

export const STORAGE_KEY = '@KEEP_IT_SECRET_TOKEN';
export const STORAGE_KEY_STATE = '@KEEP_IT_SECRET_STORAGE';
export const STORAGE_KEY_STATE_INITIALIZED = `${STORAGE_KEY_STATE}-INITIALIZED`;
export const STORAGE_KEY_STATE_FINGERPRINT = `${STORAGE_KEY_STATE}-FINGERPRINT`;
export const STORAGE_KEY_STATE_FINGERPRINT_FAIL = `${STORAGE_KEY_STATE}-FINGERPRINT-FAIL`;

const STORAGE_KEYS = [
  STORAGE_KEY,
  STORAGE_KEY_STATE,
  STORAGE_KEY_STATE_INITIALIZED,
  STORAGE_KEY_STATE_FINGERPRINT,
  STORAGE_KEY_STATE_FINGERPRINT_FAIL,
];

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

export async function clearAll() {
  try {
    const toClear = STORAGE_KEYS.map(async key => {
      return await removeValue(key);
    });

    await Promise.allSettled(toClear);
  } catch (error) {
    console.log('ups');
  }
}
