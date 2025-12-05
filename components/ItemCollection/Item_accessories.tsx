import { db } from "db/client";
import { ItemType } from "interfaces";
import { useEffect, useState } from "react";
import { SectionList, TouchableOpacity, View } from "react-native";
import { Appbar, Icon, Text, ThemeProvider } from 'react-native-paper';
import ItemCard from "./ItemCard";
import { defaultBottomBarHeight, defaultViewPadding } from "configs";
import { DisplayVariants, usePreferenceStore } from "stores/usePreferenceStore";
import ItemCard_accessories from "./ItemCard_accessories";
import { useLiveQuery } from "drizzle-orm/expo-sqlite";
import * as schema from "db/schema"
import { eq, or, inArray } from 'drizzle-orm';
import { useViewStore } from "stores/useViewStore";
import { tabBarLabels } from "lib/textTemplates";

interface Props{
    currentItem: ItemType
}

export default function Item_Accessories({ currentItem }: Props) {

    const { theme, displaySettings, setDisplaySettings, language } = usePreferenceStore()
    const { cardOptionsMenuVisible_accessories, alohaSnackbarVisible } = useViewStore()
    const [silencerData, setSilencerData] = useState([])
    const [opticData, setOpticData] = useState([])
    const [lightLaserData, setLightLaserData] = useState([])
    const [conversionKitData, setConversionKitData] = useState([])

    useEffect(()=>{
      async function getAccessoryData(){
        const mountedData = await db.select()
          .from(schema.accessoryMount)
          .where(
            or(
              eq(schema.accessoryMount.parentGunId, currentItem.id),
              eq(schema.accessoryMount.parentAccessoryId, currentItem.id),
              eq(schema.accessoryMount.parentPartId, currentItem.id)
            )
            
          )

        const mountedIds = mountedData.map(d => d.accessoryId);

        const silencerData = await db.select()
          .from(schema.accessoryCollection_Silencer)
          .where(
            inArray(schema.accessoryCollection_Silencer.id, mountedIds)
          )

        setSilencerData(silencerData)

        const opticData = await db.select()
          .from(schema.accessoryCollection_Optic)
          .where(
            inArray(schema.accessoryCollection_Optic.id, mountedIds)
          )

        setOpticData(opticData)

        const lightLaserData = await db.select()
          .from(schema.accessoryCollection_LightLaser)
          .where(
            inArray(schema.accessoryCollection_LightLaser.id, mountedIds)
          )

        setLightLaserData(lightLaserData)

      }
      async function getPartData(){
        const mountedData = await db.select()
          .from(schema.partMount)
          .where(
            or(
              eq(schema.partMount.parentGunId, currentItem.id),
              eq(schema.partMount.parentPartId, currentItem.id)
            )
            
          )

        const mountedIds = mountedData.map(d => d.partId);

        const conversionKitData = await db.select()
          .from(schema.partCollection_ConversionKit)
          .where(
            inArray(schema.partCollection_ConversionKit.id, mountedIds)
          )

        setConversionKitData(conversionKitData)

      }
      getAccessoryData()
      getPartData()
    },[cardOptionsMenuVisible_accessories, alohaSnackbarVisible])

    function handleDisplaySwitch(type:DisplayVariants){

    setDisplaySettings({
      ...displaySettings,
      accessoryView: type,
    });
}

type Section = {
  title: string;
  data: ItemType[];
};

      const DATA:Section[] = [
        {
    title: tabBarLabels.conversionCollection[language],
    data: conversionKitData,
  },
  {
    title: tabBarLabels.silencerCollection[language],
    data: silencerData,
  },
  {
    title: tabBarLabels.conversionCollection[language],
    data: null,
  },
  {
    title: tabBarLabels.lightLaserCollection[language],
    data: lightLaserData,
  },
  {
    title: tabBarLabels.opticCollection[language],
    data: opticData,
  },
  
];


const filteredSections = DATA.filter(section => section.data && section.data.length > 0);

    return(
        <View>

            <View style={{
  flexDirection: "row",
  justifyContent: "flex-end",
}}>
  <TouchableOpacity style={{ padding: 0, marginLeft: defaultViewPadding }} onPress={()=>handleDisplaySwitch("grid")}>
    <Icon source="view-grid" size={24} color={theme.colors.onBackground} />
  </TouchableOpacity>

  <TouchableOpacity style={{ padding: 0, marginLeft: defaultViewPadding }} onPress={()=>handleDisplaySwitch("list")}>
    <Icon source="format-list-bulleted-type" size={24} color={theme.colors.onBackground} />
  </TouchableOpacity>

  <TouchableOpacity style={{ padding: 0, marginLeft: defaultViewPadding}} onPress={()=>handleDisplaySwitch("compactList")}>
    <Icon source="format-list-group" size={24} color={theme.colors.onBackground} />
  </TouchableOpacity>
</View>

        <SectionList
        scrollEnabled={false} 
        sections={filteredSections}
        SectionSeparatorComponent={() => (<View style={{ height: defaultViewPadding}} />)}
        style={{width: "100%"}}
        keyExtractor={(item) => item.id}
        renderItem={({item}) => <ItemCard_accessories item={item} />}
        renderSectionHeader={({section: {title}}) => (
          <Text variant="titleLarge" style={{borderBottomColor: theme.colors.onBackground, borderBottomWidth: 1}}>{title}</Text>
        )}
      />
      </View>
    )
}