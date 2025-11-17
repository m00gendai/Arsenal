import { db } from "db/client";
import { ItemType } from "interfaces";
import { useEffect, useState } from "react";
import { SectionList, TouchableOpacity, View } from "react-native";
import { Appbar, Icon, Text, ThemeProvider } from 'react-native-paper';
import ItemCard from "./ItemCard";
import { defaultBottomBarHeight, defaultViewPadding } from "configs";
import { DisplayVariants, usePreferenceStore } from "stores/usePreferenceStore";
import ItemCard_accessories from "./ItemCard_accessories";

interface Props{
    currentItem: ItemType
}

export default function Item_Accessories({ currentItem }: Props) {

    const [silencers, setSilencers] = useState([]);
    const [conversionKits, setConversionKits] = useState([]);
    const [optics, setOptics] = useState([]);
    const [lightLaser, setLightLaser] = useState([]);
    const [barrels, setBarrels] = useState([]);

    const { theme, displaySettings, setDisplaySettings } = usePreferenceStore()

    useEffect(() => {
        async function fetchAccessories() {
            const [silencersRes, conversionKitsRes] = await Promise.all([
                db.query.accessoryCollection_Silencer.findMany({
                    where: (a, { eq }) => eq(a.currentlyMountedOn, currentItem.id),
                }),
              
                db.query.accessoryCollection_ConversionKit.findMany({
                    where: (a, { eq }) => eq(a.currentlyMountedOn, currentItem.id),
                })
            ]);

            setSilencers(silencersRes);
            setConversionKits(conversionKitsRes);
        }

        fetchAccessories();
    }, [currentItem.id]);

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
    title: 'Silencers',
    data: silencers,
  },
  {
    title: 'Conversion Kits',
    data: conversionKits,
  },
  {
    title: 'Barrels',
    data: barrels,
  },
  {
    title: 'Light&Laser',
    data: lightLaser,
  },
  {
    title: 'Optics',
    data: optics,
  },
  
];


const filteredSections = DATA.filter(section => section.data && section.data.length > 0);

    return(
        <View>

            <View style={{
  flexDirection: "row",
  justifyContent: "flex-end",
}}>
  <TouchableOpacity style={{ padding: 0, margin: defaultViewPadding }} onPress={()=>handleDisplaySwitch("grid")}>
    <Icon source="view-grid" size={24} color={theme.colors.onBackground} />
  </TouchableOpacity>

  <TouchableOpacity style={{ padding: 0, margin: defaultViewPadding }} onPress={()=>handleDisplaySwitch("list")}>
    <Icon source="format-list-bulleted-type" size={24} color={theme.colors.onBackground} />
  </TouchableOpacity>

  <TouchableOpacity style={{ padding: 0, margin: defaultViewPadding}} onPress={()=>handleDisplaySwitch("compactList")}>
    <Icon source="format-list-group" size={24} color={theme.colors.onBackground} />
  </TouchableOpacity>
</View>

        <SectionList
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