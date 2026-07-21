import { View } from "react-native";
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { useEffect, useState } from "react";
import { ItemType } from "../lib/interfaces";
import AccessoryMountDialog from "./Dialogs/AccessoryMount/AccessoryMountDialog";
import { useRoute } from "@react-navigation/native";
import QuickStockDialog from "./Dialogs/QuickStockDialog";

export default function QuickStock({navigation}){

  const { language, theme } = usePreferenceStore()

  const [showModal, setShowModal] = useState<boolean>(true)

  useEffect(()=>{
    if(!showModal){
navigation.goBack()
    }
    
  },[showModal])

return(
  <View style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap", backgroundColor: theme.colors.backdrop}}>
    <View style={{width: "85%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
      <View style={{backgroundColor: theme.colors.background, width: "100%", height: "75%"}}>
        <QuickStockDialog showModal={showModal} setShowModal={setShowModal} fromQuickAction={true}/>
      </View>
    </View>
  </View>
)
                    }