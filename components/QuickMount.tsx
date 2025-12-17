import { ScrollView, View } from "react-native";
import { Button, Dialog, HelperText, IconButton, List, Text, TextInput } from "react-native-paper";
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { dateLocales, dateTimeOptions, defaultViewPadding } from "../configs";
import { gunQuickShot, shotLabel } from "../lib/textTemplates";
import { useGunStore } from "../stores/useGunStore";
import { useAmmoStore } from "../stores/useAmmoStore";
import { useEffect, useState } from "react";
import { AmmoType, GunType, ItemType } from "../interfaces";
import { drizzle, useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db } from "../db/client"
import * as schema from "../db/schema"
import { eq, lt, gte, ne, and, or, like, asc, desc, exists, isNull, sql, inArray } from 'drizzle-orm';
import { useItemStore } from "stores/useItemStore";
import AccessoryMountDialog from "./Dialogs/AccessoryMountDialog";
import { useRoute } from "@react-navigation/native";

interface RouteParams {
  item: ItemType  
}

export default function QuickMount({navigation}){

  const route = useRoute()

const params = route.params as RouteParams

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
        <AccessoryMountDialog data={"currentlyMountedOn"} showModal={showModal} setShowModal={setShowModal} itemData={params.item}/>
      </View>
    </View>
  </View>
)
                    }