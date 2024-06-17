import * as Device from 'expo-device';


export const getDeviceInfo = () => {
    // console.log(Device);
    const basicDeviceInfo = {
        "brand": Device.brand,
        "designName": Device.designName,
        "deviceName": Device.deviceName,
        "deviceYearClass": Device.deviceYearClass,
        "isDevice": Device.isDevice,
        "manufacturer": Device.manufacturer,
        "modelId": Device.modelId,
        "modelName": Device.modelName,
        "osBuildFingerprint": Device.osBuildFingerprint,
        "osBuildId": Device.osBuildId,
        "osInternalBuildId": Device.osInternalBuildId,
        "osName": Device.osName,
        "osVersion": Device.osVersion,
        "platformApiLevel": Device.platformApiLevel,
        "productName": Device.productName,
        "supportedCpuArchitectures": Device.supportedCpuArchitectures,
        "totalMemory": Device.totalMemory,
    };

    return basicDeviceInfo;
}
