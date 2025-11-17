import { StyleSheet, View, ScrollView, TouchableNativeFeedback, Pressable, Platform, Dimensions, ColorValue, SectionList } from 'react-native';
import { Button, Appbar, Icon, Checkbox, Chip, Text, Portal, Dialog, Modal, IconButton } from 'react-native-paper';
import { checkBoxes } from "lib/DataTemplates/gunDataTemplate"
import { useEffect, useRef, useState} from "react"
import ImageViewer from "components/ImageViewer"
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { useViewStore } from 'stores/useViewStore';
import { cleanIntervals, gunDeleteAlert, iosWarningText } from 'lib/textTemplates';
import { printSingleItem } from 'functions/printToPDF';
import { ItemType } from 'interfaces';
import { alarm, checkDate } from 'utils';
import { LinearGradient } from 'expo-linear-gradient';
import { colord } from "colord";
import { caliberPickerTriggerFields, colorPickerTriggerFields, currencyPrefixFields, defaultViewPadding } from 'configs';
import { GetColorName } from 'hex-color-to-color-name';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useItemStore } from 'stores/useItemStore';
import { determineDataTemplate, determineRemarkDataTemplate } from 'functions/determinators';
import { StackActions } from '@react-navigation/native';
import Item_Accessories from './Item_accessories';

export default function Item({navigation}){

    const [lightBoxIndex, setLightBoxIndex] = useState<number>(0)
    const [dialogVisible, toggleDialogVisible] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<"details" | "accessories">("details")

    const { lightBoxOpen, setLightBoxOpen, setHideBottomSheet } = useViewStore()
    const { language, theme, generalSettings, caliberDisplayNameList } = usePreferenceStore()
    const { currentItem, currentCollection } = useItemStore()

    const [iosWarning, toggleiosWarning] = useState<boolean>(false)

    const showModal = (index:number) => {
        setLightBoxOpen()
        setLightBoxIndex(index)
    }

    const styles = StyleSheet.create({
        container: {
            display: "flex",
            flex: 1,
            flexWrap: "wrap",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "flex-start",
            alignContent: "flex-start",
            gap: 5,
            padding: 5,
            backgroundColor: theme.colors.background
        },
        imageContainer: {
            width: "100%",
            aspectRatio: "21/10",
            flexDirection: "row",
            flex: 1,
            alignContent: "center",
            alignItems: "center",
            justifyContent: "center"
        },
        data: {
            flex: 1,
            height: "100%",
            width: "100%",
            marginTop: 10
        },
    })

    async function deleteItem(item:ItemType){
        await db.delete(schema[currentCollection]).where(eq(schema[currentCollection].id, item.id));
        toggleDialogVisible(false)
        navigation.navigate(currentCollection)
    }

    function handleIosPrint(){
        toggleiosWarning(true)
    }

    function handlePrintPress(){
        toggleiosWarning(false)
        try{
            printSingleItem(currentItem, language, generalSettings.caliberDisplayName, caliberDisplayNameList)
        }catch(e){
            alarm("Print Single Item Error", e)
        }
    }

    async function handleShareImage(img:string){
        console.log(img)
        await Sharing.shareAsync(img.includes(FileSystem.documentDirectory) ? img: `${FileSystem.documentDirectory}${img}`)
    }

    function checkColor(color:string){
        if(color.length === 9){
            return color.substring(0,8)
        }
        return color
    }

    function generateGradient(item: ItemType){
        if("mainColor" in item && item.mainColor){
            const color = item.mainColor
            return [color, 
                    `${colord(color).isDark() ? 
                        colord(color).lighten(0.2).toHex() : 
                        colord(color).darken(0.2).toHex()}`, 
                    color]
        } else {
            const color = theme.colors.background
            return [color, color, color]
        }
    }

    function getShortCaliberName(calibers:string[]){
        const outputArray = calibers.map(item => {
            // Find an object where displayName matches the item
            const match = caliberDisplayNameList.find(obj => obj.name === item)
            // If a match is found, return the displayName, else return the original item
            return match ? match.displayName : item;
        });
        return outputArray
    }

    const ref = useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);
  
  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  function handleGoBack(){   
    setHideBottomSheet(false);
    navigation.dispatch(
        StackActions.replace('itemCollection', {
            collectionType: 'gunCollection'
        })
    );
}

useEffect(() => {
  const unsubscribe = navigation.addListener('blur', () => {
    setHideBottomSheet(false);
  });
  
  return unsubscribe;
}, [navigation]);


    

  

    return(
        <View style={{flex: 1}}>
            
            <Appbar style={{width: "100%"}}>
                <Appbar.BackAction  onPress={handleGoBack} />
                <Appbar.Content title={`${currentItem.manufacturer ? currentItem.manufacturer : ""} ${"model" in currentItem ? currentItem.model : currentItem.designation}`} />
                <Appbar.Action icon="printer" onPress={()=>Platform.OS === "ios" ? handleIosPrint() : handlePrintPress()} />
                <Appbar.Action icon="pencil" onPress={()=>navigation.navigate("editItem")} />
            </Appbar>
        
            <View style={styles.container}>   
                <ScrollView style={{width: "100%"}}>
                    <LinearGradient 
                        start={{x: 0.0, y:0.0}} end={{x: 1.0, y: 1.0}} 
                        colors={generateGradient(currentItem) as [ColorValue, ColorValue, ...ColorValue[]]}
                    >
                        <View style={{width: "100%", aspectRatio: "21/10"}}>
                            <Carousel
                                loop={false}
                                width={Dimensions.get("screen").width-(defaultViewPadding)}
                                snapEnabled={true}
                                pagingEnabled={true}
                                onProgressChange={progress}
                                data={Array.from(Array(currentItem.images ? currentItem.images.length : 1))}
                                onSnapToItem={(index) => console.log("current index:", index)}
                                renderItem={({ index }) => 
                                    {
                                        if(currentItem.images && index <= currentItem.images.length-1){
                                            return(
                                                <TouchableNativeFeedback key={`slides_${index}`} onPress={()=>showModal(index)}>
                                                    <View style={styles.imageContainer} >
                                                    <ImageViewer isLightBox={false} selectedImage={currentItem.images[index]} /> 
                                                    </View>
                                                </TouchableNativeFeedback>
                                            )
                                        }      
                                        if(!currentItem.images || currentItem.images.length === 0){
                                            return(
                                                <TouchableNativeFeedback key={`slides_${index}`}>
                                                    <View style={styles.imageContainer} >
                                                    <ImageViewer isLightBox={false} selectedImage={null} /> 
                                                    </View>
                                                </TouchableNativeFeedback>
                                            )
                                        }          
                                    }
                                }
                            />
                        </View>
                        <Pagination.Basic
                            progress={progress}
                            data={Array.from(Array(currentItem.images ? currentItem.images.length : 1))}
                            dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50, height: 5, width: 5 }}
                            containerStyle={{ gap: 5, marginTop: 0, position: "absolute", bottom: 2.5 }}
                            onPress={onPressPagination}
                        />
                    </LinearGradient>

                    <View style={styles.data}>
                        <View style={{flex: 1, flexDirection: "row", flexWrap: "wrap", marginBottom: 10}}>
                            {currentItem.tags?.map((tag, index) =>{
                                return <View key={`${tag}_${index}`} style={{padding: 5}}><Chip >{tag}</Chip></View>
                            })}
                        </View>
                    </View>

{ /* Tab Bar */}

                    <View style={{width: "100%", marginBottom: defaultViewPadding, gap: 5, display: "flex", justifyContent: "flex-start", flexDirection: "row", backgroundColor: theme.colors.tertiary, padding: defaultViewPadding/2}}>
                        <Pressable 
                            style={{
                                display: "flex", 
                                flexDirection: "row", 
                                justifyContent: "center", 
                                width: "30%", 
                                height: "100%", 
                                backgroundColor: activeTab === "details" ? theme.colors.tertiaryContainer :  theme.colors.onTertiary
                            }} 
                            onPress={() => setActiveTab("details")}
                        >
                            <Text style={{padding: defaultViewPadding}}>Details</Text>
                        </Pressable>
                        <Pressable 
                            style={{
                                display: "flex", 
                                flexDirection: "row", 
                                justifyContent: "center", 
                                width: "30%", 
                                height: "100%", 
                                backgroundColor: activeTab === "accessories" ? theme.colors.tertiaryContainer :  theme.colors.onTertiary
                            }} 
                            onPress={() => setActiveTab("accessories")}
                        >
                            <Text style={{padding: defaultViewPadding}}>Accessories</Text>
                        </Pressable>
                    </View>


{activeTab === "details" ? 
                    // DETAILS PAGE
                    <View>
                        {determineDataTemplate(currentCollection).map((dataItem, index)=>{
                            if(!generalSettings.emptyFields){
                                return(
                                    <View key={`${dataItem.name}`} style={{flex: 1, flexDirection: "column"}} >
{/* Textfield Label in selected language */}
                                        <Text style={{width: "100%", fontSize: 12,}}>{`${dataItem[language]}:`}</Text>
                {/* Textfield content */}
                                        <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>
                                            {caliberPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? 
                                                generalSettings.caliberDisplayName ? 
                                                    getShortCaliberName(Array.isArray(currentItem[dataItem.name]) ? 
                                                        currentItem[dataItem.name] : [currentItem[dataItem.name]]).join("\n") 
                                                : Array.isArray(currentItem[dataItem.name]) ? 
                                                    currentItem[dataItem.name].join("\n") : 
                                                    [currentItem[dataItem.name]] 
                                            : colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? GetColorName(`${checkColor(currentItem[dataItem.name]).split("#")[1]}`)
                                            : currencyPrefixFields.includes(dataItem.name) ? `CHF ${currentItem[dataItem.name] ? currentItem[dataItem.name] :  ""}` 
                                            : dataItem.name === "cleanInterval" && currentItem[dataItem.name] ? cleanIntervals[currentItem[dataItem.name]] ? cleanIntervals[currentItem[dataItem.name]][language] : ""
                                            : currentItem[dataItem.name]}</Text>
            {/* Interval Warning Icons */}
                                        {dataItem.name === "lastCleanedAt" && checkDate(currentItem) ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <IconButton icon="spray-bottle" iconColor={theme.colors.error} /><IconButton icon="toothbrush" iconColor={theme.colors.error} />
                                            </View> 
                                        : 
                                        null}
                    {/* Color splotch */}
                                        {colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <View style={{height: "50%", aspectRatio: "5/1", borderRadius: 50, backgroundColor: `${currentItem[dataItem.name]}`, transform:[{translateY: -5}]}}>
                                                </View>
                                            </View> 
                                        : 
                                        null}
                                    </View>
                                )
                            } else if(currentItem[dataItem.name]){
                            return(
                                <View key={`${dataItem.name}`} style={{flex: 1, flexDirection: "column"}} >
                                    {/* Textfield Label in selected language */}
                                        <Text style={{width: "100%", fontSize: 12,}}>{`${dataItem[language]}:`}</Text>
                {/* Textfield content */}
                                        <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>
                                            {caliberPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? 
                                                generalSettings.caliberDisplayName ? 
                                                    getShortCaliberName(Array.isArray(currentItem[dataItem.name]) ? 
                                                        currentItem[dataItem.name] : [currentItem[dataItem.name]]).join("\n") 
                                                : Array.isArray(currentItem[dataItem.name]) ? 
                                                    currentItem[dataItem.name].join("\n") : 
                                                    [currentItem[dataItem.name]] 
                                            : colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? GetColorName(`${checkColor(currentItem[dataItem.name]).split("#")[1]}`)
                                            : currencyPrefixFields.includes(dataItem.name) ? `CHF ${currentItem[dataItem.name] ? currentItem[dataItem.name] :  ""}` 
                                            : dataItem.name === "cleanInterval" && currentItem[dataItem.name] ? cleanIntervals[currentItem[dataItem.name]] ? cleanIntervals[currentItem[dataItem.name]][language] : ""
                                            : currentItem[dataItem.name]}</Text>
            {/* Interval Warning Icons */}
                                        {dataItem.name === "lastCleanedAt" && checkDate(currentItem) ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <IconButton icon="spray-bottle" iconColor={theme.colors.error} /><IconButton icon="toothbrush" iconColor={theme.colors.error} />
                                            </View> 
                                        : 
                                        null}
                    {/* Color splotch */}
                                        {colorPickerTriggerFields.includes(dataItem.name) && dataItem.name in currentItem && currentItem[dataItem.name] ? 
                                            <View style={{position:"absolute", top: 0, right: 0, bottom: 0, left: 0, display: "flex", flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}}>
                                                <View style={{height: "50%", aspectRatio: "5/1", borderRadius: 50, backgroundColor: `${currentItem[dataItem.name]}`, transform:[{translateY: -5}]}}>
                                                </View>
                                            </View> 
                                        : 
                                        null}
                                </View>
                            )
                                }
                        })}

                        <View style={{flex: 1, flexDirection: "column"}} >
                            {currentCollection === "gunCollection" ? checkBoxes.map(checkBox=>{
                                return(
                                    <Checkbox.Item mode="android" key={checkBox.name} label={checkBox[language]} status={currentItem[checkBox.name] ? "checked" : "unchecked"}/>
                                )
                            }) : null}
                        </View>
                        <View style={{flex: 1, flexDirection: "column"}} >
                            <Text style={{width: "100%", fontSize: 12,}}>{determineRemarkDataTemplate(currentCollection)[language]}</Text>
                            <Text style={{width: "100%", fontSize: 18, marginBottom: 5, paddingBottom: 5, borderBottomColor: theme.colors.primary, borderBottomWidth: 0.2}}>{currentItem.remarks}</Text>
                        </View>
                    </View>
:
                    // ACCESSORIES PAGE        
                    <Item_Accessories currentItem={currentItem}/>
}
<View style={{width: "100%", display: "flex", flex: 1, flexDirection: "row", justifyContent:"center"}}>
                    <Button mode="contained" style={{width: "20%", backgroundColor: theme.colors.errorContainer, marginTop: 20}} onPress={()=>toggleDialogVisible(!dialogVisible)}>
                        <Icon source="delete" color={theme.colors.onErrorContainer} size={20}/>
                    </Button>
                </View>
                </ScrollView>

                <Portal>
                    <Modal visible={lightBoxOpen} onDismiss={setLightBoxOpen}>
                        <View style={{width: "100%", height: "100%", padding: 0, display: "flex", flexDirection: "row", flexWrap: "wrap", backgroundColor: "green"}}>
                            <View style={{padding: 0, margin: 0, position: "absolute", top: defaultViewPadding, right: defaultViewPadding, left: defaultViewPadding, zIndex: 999, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                                <Pressable onPress={()=>handleShareImage(currentItem.images[lightBoxIndex])}><Icon source="share-variant" size={40} color={theme.colors.inverseSurface}/></Pressable>
                                <Pressable onPress={setLightBoxOpen} ><Icon source="close-thick" size={40} color={theme.colors.inverseSurface}/></Pressable>
                            </View>
                            {lightBoxOpen ? <ImageViewer isLightBox={true} selectedImage={currentItem.images[lightBoxIndex]}/> : null}
                        </View>
                    </Modal>    
                </Portal>   

                <Portal>
                    <Dialog visible={dialogVisible} onDismiss={()=>toggleDialogVisible(!dialogVisible)}>
                        <Dialog.Title>
                        {`${"model" in currentItem ? currentItem.model : currentItem.designation} ${gunDeleteAlert.title[language]}`}
                        </Dialog.Title>
                        <Dialog.Content>
                            <Text>{`${gunDeleteAlert.subtitle[language]}`}</Text>
                        </Dialog.Content>
                        <Dialog.Actions>
                            <Button onPress={()=>deleteItem(currentItem)} icon="delete" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{gunDeleteAlert.yes[language]}</Button>
                            <Button onPress={()=>toggleDialogVisible(!dialogVisible)} icon="cancel" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{gunDeleteAlert.no[language]}</Button>
                        </Dialog.Actions>
                    </Dialog>
                </Portal>                  
        
            </View>

            <Dialog visible={iosWarning} onDismiss={()=>toggleiosWarning(false)}>
                <Dialog.Title>
                {iosWarningText.title[language]}
                </Dialog.Title>
                <Dialog.Content>
                    <Text>{iosWarningText.text[language]}</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={()=>handlePrintPress()} icon="heart" buttonColor={theme.colors.errorContainer} textColor={theme.colors.onErrorContainer}>{iosWarningText.ok[language]}</Button>
                    <Button onPress={()=>toggleiosWarning(false)} icon="heart-broken" buttonColor={theme.colors.secondary} textColor={theme.colors.onSecondary}>{iosWarningText.cancel[language]}</Button>
                </Dialog.Actions>
            </Dialog>
        </View>
    )
}