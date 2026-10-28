import * as Device from 'expo-device';

export const defaultBottomBarHeight:number = Device.deviceType === 1 ? 60 : Device.deviceType === 2 ? 90 : 60
export const defaultBottomBarMainIconSize: number = Device.deviceType === 1 ? 24 : Device.deviceType === 2 ? 48 : 24
export const defaultBottomBarIconSize: number = Device.deviceType === 1 ? 48 : Device.deviceType === 2 ? 60 : 48
