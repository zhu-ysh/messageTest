import { AsyncStorage } from 'react-native'

export const getString = async (key) => {
  const value = await AsyncStorage.getItem(key)

  return value
}

export const getObject = async (key) => {
  const value = await AsyncStorage.getItem(key)

  return JSON.parse(value)
}

export const setString = async (key, value) => {
  await AsyncStorage.setItem(key, value)
}

export const setObject = async (key, object) => {
  await AsyncStorage.setItem(key, JSON.stringify(object))
}

export const remove = async (key) => {
  await AsyncStorage.removeItem(key)
}

export const clear = async () => {
  await AsyncStorage.clear()
}

