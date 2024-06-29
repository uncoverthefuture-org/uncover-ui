import { app_theme_color_storage } from '../utilities/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUncoverThemeData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(app_theme_color_storage);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      return null;
    }
};
