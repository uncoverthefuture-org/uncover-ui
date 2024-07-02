import { MMKV } from 'react-native-mmkv'
import { app_theme_storage } from './constants'

export const themeStorage = new MMKV({
    id: `${app_theme_storage}`,
    // path: `${USER_DIRECTORY}/storage`,
    encryptionKey: 'hunter2',
    // mode: Mode.MULTI_PROCESS
})