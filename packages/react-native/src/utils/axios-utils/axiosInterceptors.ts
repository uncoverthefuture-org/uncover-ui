import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Auth, setCredential } from "stores/auth";
import { getDeviceInfo } from "../device";
import { ValidateResponseError } from "../errorValidations";
import { store } from "@stores/main";
import { app_storage } from "utils/constants";

const { getItem } = useAsyncStorage(app_storage);

export const initInterceptors = () => {

    axios.interceptors.request.use(
        async (config) => {
            const result = await getItem();
            const token = result ? (JSON.parse(result) as Auth).access_token : null;
            const deviceJson = (JSON.stringify(getDeviceInfo())).replace("’", "");

            // console.log(token)
            if (token) config.headers.Authorization = `Bearer ${token}`;
            config.headers.set('Current-Device', deviceJson);
            
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    axios.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const result = await getItem();
            const token = result ? (JSON.parse(result) as Auth).access_token : null;
            if (ValidateResponseError(error.response, token)) {
                store.dispatch(setCredential(null));
            }

            return Promise.reject(error);
        }
    );
}