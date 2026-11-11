import { View } from "react-native";
import { Icon } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import Svg, { Path } from "react-native-svg"

interface Props{
    data: "chart-pie" | "chart-bar" | "chart-areaspline-variant"
}

export default function NoDataPlaceHolder({data}:Props){

    const { theme } = usePreferenceStore()

    const magnifyerPath = "M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z"
    
    return(
        <View style={{flex: 1, justifyContent: "center", alignItems: "center", position: "relative"}}>
            <View style={{position: "relative", justifyContent: "center", alignItems: "center"}}>
                <Icon source={data} size={200} color={theme.colors.primary} />
                <View style={{position: "absolute", bottom: -50, right: -50, justifyContent: "flex-end", alignItems: "flex-end"}}>
                    <Svg width={150} height={150} viewBox={"0 0 24 24"}>
                        <Path stroke={theme.colors.surfaceVariant} strokeWidth={2} strokeLinejoin={"round"} d={magnifyerPath} />
                        <Path fill={theme.colors.primary} d={magnifyerPath} />
                    </Svg>
                </View>
            </View>
        </View>
    )
}