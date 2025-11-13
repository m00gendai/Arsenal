import { Dimensions, Pressable, TouchableNativeFeedback, View } from 'react-native';
import { AmmoType, CollectionType, GunType, ItemType, StackParamList } from 'interfaces';
import { Badge, Button, Card, Dialog, Icon, IconButton, Modal, Portal, Text, TouchableRipple } from 'react-native-paper';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { dateLocales, defaultGridGap, defaultViewPadding } from 'configs';
import { useViewStore } from 'stores/useViewStore';
import { useGunStore } from 'stores/useGunStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { checkDate } from 'utils';
import { useState } from 'react';
import { gunDeleteAlert, longPressActions } from 'lib/textTemplates';
import * as FileSystem from 'expo-file-system';

import { useItemStore } from 'stores/useItemStore';
import CardOptionsMenu from 'components/CardOptionsMenu';

interface Props{
    item: ItemType
    index?: number
}

export default function GunCard({ item }:Props){

    const { displaySettings, language, theme, generalSettings } = usePreferenceStore()
    const { currentItem, setCurrentItem, currentCollection } = useItemStore()  
      const { setHideBottomSheet, setCardOptionsMenuVisible } = useViewStore()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

    

    function handleCardPress(item:ItemType){
        setCurrentItem(item)
        navigation.navigate("item")
        setHideBottomSheet(true)
      }

      

      function meloveyoulongtime(){
        console.log("TWO DOLLA")
        setCardOptionsMenuVisible(true)
        setCurrentItem(item)
      }

      function setAmmoBadgeBackgroundColor(item: ItemType){
        const ammo = item as AmmoType
        return ammo.currentStock !== null && ammo.currentStock !== undefined && ammo.criticalStock ? Number(ammo.currentStock.toString()) <= Number(ammo.criticalStock.toString()) ? theme.colors.errorContainer : theme.colors.primary : theme.colors.primary
      }

      function setAmmoBadgeColor(item: ItemType){
        const ammo = item as AmmoType
        return ammo.currentStock !== null && ammo.currentStock !== undefined && ammo.criticalStock ? Number(ammo.currentStock.toString()) <= Number(ammo.criticalStock.toString()) ? theme.colors.onErrorContainer : theme.colors.onPrimary : theme.colors.onPrimary
      }

      function setAmmoBadgeContent(item: ItemType){
        const ammo = item as AmmoType
        return ammo.currentStock !== null && ammo.currentStock !== undefined && ammo.currentStock.toString() !== "" ? new Intl.NumberFormat(dateLocales[language]).format(parseInt(ammo.currentStock)) : "- - -" 
      }
      

    return(
        <View>
        <TouchableNativeFeedback 
                onPress={()=>handleCardPress(item)}
                onLongPress={()=>meloveyoulongtime()}
              >
        <Card 
            style={{
                width: (Dimensions.get("window").width / (displaySettings[currentCollection] === "grid" ? Dimensions.get("window").width > Dimensions.get("window").height ? 4 : 2 : 1)) - (defaultGridGap + (displaySettings[currentCollection] === "grid" ? defaultViewPadding/2 : defaultViewPadding)),
            }}
        >
            <Card.Title
                titleStyle={{
                width: displaySettings[currentCollection] === "grid" ? "100%" : generalSettings.displayImagesInListViewGun ? "60%" : "80%",
                color: checkDate(item) ? theme.colors.error : theme.colors.onSurfaceVariant
                }}
                subtitleStyle={{
                width: displaySettings[currentCollection] === "grid" ? "100%" : generalSettings.displayImagesInListViewGun ? "60%" : "80%",
                color: theme.colors.onSurfaceVariant
                }}
                title={`${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${"model" in item ? item.model : item.designation}`}
                subtitle={"serial" in item ? item.serial && item.serial.length != 0 ? item.serial : " " : " "} 
                subtitleVariant='bodySmall' 
                titleVariant='titleSmall' 
                titleNumberOfLines={2} 
                subtitleNumberOfLines={2}
            />
            {displaySettings[currentCollection] === "grid" ? 
            <View>
                <Card.Cover 
                    source={item.images && item.images.length != 0 ? { uri: `${FileSystem.documentDirectory}${item.images[0].split("/").pop()}`} : require(`../../assets//775788_several different realistic rifles and pistols on _xl-1024-v1-0.png`)} 
                    style={{
                        height: 100
                    }}
                /> 
                {currentCollection === "ammoCollection" ? 
                <TouchableRipple onPress={() => meloveyoulongtime()} style={{borderRadius: 0, position: "absolute", bottom: 1, right: 1}}>
                    <Badge
                        style={{
                            backgroundColor: setAmmoBadgeBackgroundColor(item),
                            color: setAmmoBadgeColor(item),
                            aspectRatio: "1/1",
                            fontSize: 10,
                            margin: 6,
                            elevation: 4,
                        }}
                        size={40}
                    >
                        {setAmmoBadgeContent(item)}
                    </Badge>
                </TouchableRipple>      
                                 :
                <IconButton 
                    mode="contained" 
                    icon={"dots-vertical"} 
                    onPress={()=>meloveyoulongtime()} 
                    style={{
                        position: "absolute", 
                        bottom: 1, 
                        right: 1,
                        backgroundColor: theme.colors.primary
                    }} 
                    iconColor={theme.colors.onPrimary}
                />}
            </View>
            : 
            null}
            {displaySettings[currentCollection] === "grid" ?
            null 
            :
            <View 
                style={{
                    position: "absolute", 
                    top: 0, 
                    left: 0, 
                    bottom: 0, 
                    right: 0, 
                    display: "flex", 
                    justifyContent: "flex-end", 
                    alignItems: "center", 
                    flexDirection: "row"
                }}
            >
                {generalSettings.displayImagesInListViewGun ? <Card.Cover 
                    source={item.images && item.images.length != 0 ? { uri: `${FileSystem.documentDirectory}${item.images[0].split("/").pop()}` } : require(`../../assets//775788_several different realistic rifles and pistols on _xl-1024-v1-0.png`)} 
                    style={{
                        height: "75%",
                        aspectRatio: "4/3"
                    }}
                /> : null}
                
                {currentCollection === "ammoCollection" ? 
                <TouchableRipple onPress={() => meloveyoulongtime()} style={{borderRadius: 0}}>
                    <Badge
                        style={{
                            backgroundColor: setAmmoBadgeBackgroundColor(item),
                            color: setAmmoBadgeColor(item),
                            aspectRatio: "1/1",
                            fontSize: 10,
                            marginTop: "auto",
                            marginBottom: "auto",
                            marginLeft: 10,
                            marginRight: 6,
                        }}
                        size={48}
                    >
                        {setAmmoBadgeContent(item)}
                    </Badge>
                </TouchableRipple>      
                                 :
                <IconButton 
                    mode="contained" 
                    icon={"dots-vertical"} 
                    onPress={()=>meloveyoulongtime()} 
                    size={32}
                    style={{
                        backgroundColor: theme.colors.primary,
                        marginLeft: 10,
                        marginRight: 6
                    }}
                    iconColor={theme.colors.onPrimary}
                />}
            </View>}
        </Card>
        </TouchableNativeFeedback> 

        </View>
    )
}