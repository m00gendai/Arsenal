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

export default function ItemCard({ item }:Props){

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

      function setCardWith(){
        const divisor = displaySettings[currentCollection] === "grid" ? Dimensions.get("window").width > Dimensions.get("window").height ? 4 : 2 : 1;
        return (Dimensions.get("window").width / divisor) - (defaultGridGap + (displaySettings[currentCollection] === "grid" ? defaultViewPadding/2 : defaultViewPadding))
      }

    return(
        <View>
        <TouchableNativeFeedback 
                onPress={()=>handleCardPress(item)}
                onLongPress={()=>meloveyoulongtime()}
              >
        <Card 
            mode={displaySettings[currentCollection] === "compactList" ? "contained" : "elevated"}
            style={displaySettings[currentCollection] === "compactList" ? {
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
                style={displaySettings[currentCollection] === "compactList" ? {
                    margin: Number(`-${defaultViewPadding}`)
                } : {

                }}
                titleStyle={{
                    width: displaySettings[currentCollection] === "grid" ? "100%" : displaySettings[currentCollection] === "list" ? generalSettings.displayImagesInListViewGun ? "60%" : "80%" : "80%",
                    color: checkDate(item) ? theme.colors.error : theme.colors.onSurfaceVariant
                }}
                subtitleStyle={{
                    width: displaySettings[currentCollection] === "grid" ? "100%" : displaySettings[currentCollection] === "list" ? generalSettings.displayImagesInListViewGun ? "60%" : "80%" : "80%",
                    color: theme.colors.onSurfaceVariant,
                }}
                title={`${item.manufacturer && item.manufacturer.length != 0 ? `${item.manufacturer}` : ""}${item.manufacturer && item.manufacturer.length != 0 ? ` ` : ""}${"model" in item ? item.model : item.designation}`}
                subtitle={"serial" in item ? item.serial && item.serial.length != 0 ? item.serial : " " : " "} 
                titleVariant={displaySettings[currentCollection] === "compactList" ? "bodySmall" : "titleSmall"}
                subtitleVariant={displaySettings[currentCollection] === "compactList" ? "labelSmall" : "bodySmall"}
                titleNumberOfLines={displaySettings[currentCollection] === "compactList" ? 1 : 2} 
                subtitleNumberOfLines={displaySettings[currentCollection] === "compactList" ? 1 : 2}
            />
            {displaySettings[currentCollection] === "grid" ? 
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
            {displaySettings[currentCollection] === "list" ?
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
            </View>
            : null}
            {displaySettings[currentCollection] === "compactList" ?
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
                        size={36}
                    >
                        {setAmmoBadgeContent(item)}
                    </Badge>
                </TouchableRipple>      
                                 :
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
                />}
            </View>
            : null}
        </Card>
        </TouchableNativeFeedback> 

        </View>
    )
}