import { StyleSheet, View, ScrollView, TouchableNativeFeedback, Pressable, Platform, Dimensions, ColorValue, SectionList } from 'react-native';
import { Button, Appbar, Icon, Checkbox, Chip, Text, Portal, Dialog, Modal, IconButton } from 'react-native-paper';
import { checkBoxes } from "lib/DataTemplates/gunDataTemplate"
import { useEffect, useRef, useState} from "react"
import ImageViewer from "components/ImageViewer"
import { usePreferenceStore } from 'stores/usePreferenceStore';
import { useViewStore } from 'stores/useViewStore';
import { cleanIntervals, gunDeleteAlert, iosWarningText, itemViewTabBarLabels } from 'lib/textTemplates';
import { printSingleItem } from 'functions/printToPDF';
import { ItemType } from 'interfaces';
import { alarm, checkDate } from 'utils';
import { LinearGradient } from 'expo-linear-gradient';
import { colord } from "colord";
import { accessoryExceptions, caliberPickerTriggerFields, colorPickerTriggerFields, currencyPrefixFields, defaultViewPadding } from 'configs';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import { useItemStore } from 'stores/useItemStore';
import { determineDataTemplate, determineEmptyObject, determineRemarkDataTemplate } from 'functions/determinators';
import { StackActions } from '@react-navigation/native';
import Item_Accessories from './Item_accessories';
import Item_details from './Item_details';

export default function Item({navigation}){

    const [lightBoxIndex, setLightBoxIndex] = useState<number>(0)
    const [dialogVisible, toggleDialogVisible] = useState<boolean>(false)
    const [activeTab, setActiveTab] = useState<"details" | "accessories">("details")

    const { lightBoxOpen, setLightBoxOpen, setHideBottomSheet } = useViewStore()
    const { language, theme, generalSettings, caliberDisplayNameList } = usePreferenceStore()
    const { currentItem, setCurrentItem, currentCollection } = useItemStore()

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
        if(currentCollection.startsWith("accessoryCollection")){
            // Delete mount entry
            await db.delete(schema.accessoryMount).where(eq(schema.accessoryMount.accessoryId, item.id));
            // Delete master entry
            await db.delete(schema.accessoryCollection).where(eq(schema.accessoryCollection.id, item.id));
            // Delete individual entry
            await db.delete(schema[currentCollection]).where(eq(schema[currentCollection].id, item.id));
        } else {
            await db.delete(schema[currentCollection]).where(eq(schema[currentCollection].id, item.id));
        }
        
        toggleDialogVisible(false)
        navigation.navigate("itemCollection")
    }

    function handleIosPrint(){
        toggleiosWarning(true)
    }

    function handlePrintPress(){
        toggleiosWarning(false)
        try{
            printSingleItem(currentItem, currentCollection, language, generalSettings.caliberDisplayName, caliberDisplayNameList)
        }catch(e){
            alarm("Print Single Item Error", e)
        }
    }

    async function handleShareImage(img:string){
        await Sharing.shareAsync(img.includes(FileSystem.documentDirectory) ? img: `${FileSystem.documentDirectory}${img}`)
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
    setCurrentItem(determineEmptyObject(currentCollection))
    navigation.navigate("itemCollection")
}

function handleEdit(){
    setHideBottomSheet(true)
    navigation.navigate("editItem")
}

useEffect(() => {
  const unsubscribe = navigation.addListener("blur", () => {
    const nextRoute = navigation.getState().routes[navigation.getState().index];
    if (nextRoute.name === "QuickMount") return;
    if (nextRoute.name === "editItem") return;
    setHideBottomSheet(false);
    setCurrentItem(determineEmptyObject(currentCollection));
  });

  return unsubscribe;
}, [navigation]);






    return(
        <View style={{flex: 1}}>
            
            <Appbar style={{width: "100%"}}>
                <Appbar.BackAction  onPress={handleGoBack} />
                <Appbar.Content title={`${"manufacturer" in currentItem && currentItem.manufacturer ? currentItem.manufacturer : "title" in currentItem && currentItem.title ? currentItem.title : ""} ${"model" in currentItem ? currentItem.model : "designation" in currentItem && currentItem.designation ? currentItem.designation : ""}`} />
                <Appbar.Action icon="printer" onPress={()=>Platform.OS === "ios" ? handleIosPrint() : handlePrintPress()} />
                <Appbar.Action icon="pencil" onPress={()=>handleEdit()} />
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

                    <View style={{width: "100%", marginBottom: defaultViewPadding, gap: 5, display: "flex", justifyContent: "flex-start", flexDirection: "row", backgroundColor: theme.colors.surfaceVariant, padding: 0}}>
                        <Pressable 
                            style={{
                                display: "flex", 
                                flexDirection: "row", 
                                justifyContent: "center", 
                                width: "30%", 
                                height: "100%", 
                                backgroundColor: activeTab === "details" ? theme.colors.primary :  theme.colors.secondaryContainer
                            }} 
                            onPress={() => setActiveTab("details")}
                        >
                            <Text style={{padding: defaultViewPadding, color: activeTab === "details" ? theme.colors.onPrimary :  theme.colors.onSecondaryContainer}}>{itemViewTabBarLabels.details[language]}</Text>
                        </Pressable>
                        {accessoryExceptions.includes(currentCollection) ? null : <Pressable 
                            style={{
                                display: "flex", 
                                flexDirection: "row", 
                                justifyContent: "center", 
                                width: "30%", 
                                height: "100%", 
                                backgroundColor: activeTab === "accessories" ? theme.colors.primary :  theme.colors.secondaryContainer
                            }} 
                            onPress={() => setActiveTab("accessories")}
                        >
                            <Text style={{padding: defaultViewPadding, color: activeTab === "accessories" ? theme.colors.onPrimary :  theme.colors.onSecondaryContainer}}>{itemViewTabBarLabels.accessories[language]}</Text>
                        </Pressable>}
                    </View>


{activeTab === "details" ? 
                    // DETAILS PAGE
                    <Item_details />
:
                    // ACCESSORIES PAGE        
                    <Item_Accessories currentItem={currentItem}/>
}
{activeTab === "details" ? <View style={{width: "100%", display: "flex", flex: 1, flexDirection: "row", justifyContent:"center"}}>
                    <Button mode="contained" style={{width: "20%", backgroundColor: theme.colors.errorContainer, marginTop: 20}} onPress={()=>toggleDialogVisible(!dialogVisible)}>
                        <Icon source="delete" color={theme.colors.onErrorContainer} size={20}/>
                    </Button>
                </View> : null}
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
                        {`${"model" in currentItem ? currentItem.model : "designation" in currentItem ? currentItem.designation : currentItem.title} ${gunDeleteAlert.title[language]}`}
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