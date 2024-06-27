import moment from "moment";
import { heightPercentageToDP, widthPercentageToDP } from "react-native-responsive-screen";


export const hp = (height: number | string) => heightPercentageToDP(height);

export const wp = (width: number | string) => widthPercentageToDP(width);

export const filterWordCount = (name: string, count: number = 2) => {
    let splitNames = name.split(" ").filter(text => text.length);
    return (splitNames.length > count) ? splitNames.slice(0, count).join(" ") : name;
}

export const Greeting = () => {
    let presentTime = new Date();
    let hrs = presentTime.getHours();
    if (hrs < 12) {
        return "Good morning";
    } else if (hrs >= 12 && hrs < 17) {
        return "Good afternoon";
    } else return "Good evening";
};

export function sterilizeNumber(text: string): string {
    let value = parseInt(text.replace(/[^0-9]/g, ''));
    return (value) ? value.toString() : '';
}


export const heatCheck = (dob: string) => {
    const today = moment().format("YYYY-MM-DD");
    const maturityDate = moment(dob).add(6, 'months').format("YYYY-MM-DD");
    return {
        mature: today > maturityDate,
        maturityDate: maturityDate,
        formattedDate: moment(maturityDate).format("dddd, Do MMM YYYY")
    }
}

export const randomString = (length: number = 16, chars: string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ') => {
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    return result;
}


export const maxItems = (data:any[] = [], count?: number) => {
    if (count && count <= data.length) return data.slice(0, count)
    return data;
}

export const convertObjectToURLParams = (data: any) => {
    const params = Object.keys(data).map(key => {
        const rc = data[key];
        if(rc !== undefined && rc !== null){
            return `${key}=${encodeURIComponent(rc)}`;
        }
    }).join('&');
    // console.log(params)
    return params;
}

