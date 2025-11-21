import { Dimensions, TouchableNativeFeedback, View } from 'react-native';
import { AmmoType, ItemType, StackParamList } from 'interfaces';
import { Badge, Card, IconButton, TouchableRipple } from 'react-native-paper';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { dateLocales, defaultGridGap, defaultViewPadding } from 'configs';
import { useViewStore } from 'stores/useViewStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { checkDate } from 'utils';
import * as FileSystem from 'expo-file-system';
import { useItemStore } from 'stores/useItemStore';

interface Props{
    item: ItemType
    index?: number
}

export default function ItemCard_accessories({ item }:Props){

    const { displaySettings, language, theme, generalSettings } = usePreferenceStore()
    const { currentItem, setCurrentItem, currentCollection } = useItemStore()  
      const { setHideBottomSheet, setCardOptionsMenuVisible_accessories } = useViewStore()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

      function setCardWith(){
        const divisor = displaySettings.accessoryView === "grid" ? Dimensions.get("window").width > Dimensions.get("window").height ? 4 : 2 : 1;
        return (Dimensions.get("window").width / divisor) - (defaultGridGap + (displaySettings.accessoryView === "grid" ? defaultViewPadding/2 : defaultViewPadding))
      }

      function meloveyoulongtime(){
        setCardOptionsMenuVisible_accessories(true)
        
      }

    return(
        <View>
        <Card 
            mode={displaySettings.accessoryView === "compactList" ? "contained" : "elevated"}
            style={displaySettings.accessoryView === "compactList" ? {
                width: setCardWith(),
                borderRadius: 0,
                marginBottom: Number(`-${defaultViewPadding}`),
                borderBottomWidth: 1,
                backgroundColor: theme.colors.background

            } : {
                width: setCardWith(),
                backgroundColor: theme.colors.surfaceVariant
            }}
            
        >
            <Card.Title
                style={displaySettings.accessoryView === "compactList" ? {
                    margin: Number(`-${defaultViewPadding}`)
                } : {

                }}
                titleStyle={{
                    width: displaySettings.accessoryView === "grid" ? "100%" : displaySettings.accessoryView === "list" ? generalSettings.displayImagesInListViewGun ? "60%" : "80%" : "80%",
                    color: checkDate(item) ? theme.colors.error : theme.colors.onSurfaceVariant
                }}
                subtitleStyle={{
                    width: displaySettings.accessoryView === "grid" ? "100%" : displaySettings.accessoryView === "list" ? generalSettings.displayImagesInListViewGun ? "60%" : "80%" : "80%",
                    color: theme.colors.onSurfaceVariant,
                }}
                title={`${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${"model" in item ? item.model : item.designation}`}
                subtitle={"serial" in item ? item.serial && item.serial.length != 0 ? item.serial : " " : " "} 
                titleVariant={displaySettings.accessoryView === "compactList" ? "bodySmall" : "titleSmall"}
                subtitleVariant={displaySettings.accessoryView === "compactList" ? "labelSmall" : "bodySmall"}
                titleNumberOfLines={displaySettings.accessoryView === "compactList" ? 1 : 2} 
                subtitleNumberOfLines={displaySettings.accessoryView === "compactList" ? 1 : 2}
            />
            {displaySettings.accessoryView === "grid" ? 
            <View>
                <Card.Cover 
                    source={item.images && item.images.length != 0 ? { uri: `${FileSystem.documentDirectory}${item.images[0].split("/").pop()}`} : require(`../../assets//775788_several different realistic rifles and pistols on _xl-1024-v1-0.png`)} 
                    style={{
                        height: 100,
                    }}
                />
                <View style={{
                position: "absolute",
                left: 0,
                marginTop: 0,
                marginBottom: 0,

                width: 40,
                height: "100%",
                display: "flex", 
                flexDirection: "column",
                justifyContent: "flex-start", 
                flexWrap: "wrap",
                alignItems: "center",
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5
            }}>
               
                  </View>
                
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
                />
            </View>
            : 
            null}
            {displaySettings.accessoryView === "list" ?
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
                />
            </View>
            : null}
            {displaySettings.accessoryView === "compactList" ?
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
               
                <IconButton 
                    mode="contained" 
                    icon={"dots-vertical"} 
                    onPress={()=>meloveyoulongtime()} 
                    size={12}
                    style={{
                        backgroundColor: theme.colors.primary,
                        marginLeft: 10,
                        marginRight: 6
                    }}
                    iconColor={theme.colors.onPrimary}
                />
            </View>
            : null}
        </Card>
        </View>
    )
}