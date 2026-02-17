import { ScrollView, TouchableNativeFeedback, View, Dimensions } from "react-native"
import { useViewStore } from "stores/useViewStore"
import { Icon } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import { useEffect } from "react"
import Statistics from "./Statistics/Statistics"
import About from "./About"
import Settings from "./Settings/Settings"
import DatabaseOperations from "./DatabaseOperations"
import Lists from "./Lists"
import LanguageSelection from "./LanguageSelection"
import EditData from "./EditData/EditData"
import VersionHistory from "./VersionHistory/VersionHistory"
import QRCodes from "./QRCodes/QRCodes"

export default function MainMenu({navigation}){

    const { setMainMenuOpen, setHideBottomSheet } = useViewStore()
    const { theme } = usePreferenceStore()
   
    useEffect(()=>{
        const trigger = navigation.addListener("focus", function(){
            setMainMenuOpen()
        })
        return trigger
    },[navigation])

    useEffect(()=>{
        const trigger = navigation.addListener("blur", function(){
            setMainMenuOpen()
        })
        return trigger
    },[navigation])

    function handleCloseMenu(){
        setHideBottomSheet(false)
        navigation.goBack()
    }

    return(
        <View style={{height: "100%", width: Dimensions.get("window").width > Dimensions.get("window").height ? "60%" : "100%"}}>
            <View style={{width: "100%", height: "100%"}}>
                <TouchableNativeFeedback onPress={()=>handleCloseMenu()}>
                    <View style={{width: "100%", height: 50, display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center", paddingLeft: 20, backgroundColor: theme.colors.primary}}>
                        <Icon source="arrow-left" size={20} color={theme.colors.onPrimary}/>
                    </View>
                </TouchableNativeFeedback>
                <View style={{padding: 0, display: "flex", height: "100%", flexDirection: "column", flexWrap: "wrap"}}>
                    <View style={{width: "100%", flex: 15}}>
                        <ScrollView>

                            <LanguageSelection />

                            <DatabaseOperations />

                            <Lists />

                            <Settings />

                            <EditData />

                            <QRCodes />

                            <Statistics />

                            <About />

                            <VersionHistory />

                        </ScrollView>
                    </View>
                    <View style={{width: "100%", flex: 1, padding: 0, marginTop: 10, marginBottom: 10, elevation: 4, backgroundColor: theme.colors.primary}}>
                    </View>
                </View>
            </View>           
        </View>
    )
}