import { defaultViewPadding } from "configs/configs"
import { determineCardSubtitle, determineCardTitle } from "functions/determinators"
import { CollectionType, ItemType } from "lib/interfaces"
import { TouchableNativeFeedback, View } from "react-native"
import { Card, RadioButton, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as FileSystem from 'expo-file-system/legacy';

interface Props{
    checked: string
    setChecked: React.Dispatch<React.SetStateAction<string>>
    setCollection: React.Dispatch<React.SetStateAction<"" | "guns" | "accessories" | "parts">>
    item: ItemType
    index: number
    listLength: number
    category: "guns" | "accessories" | "parts"
    collection: CollectionType
}

export default function SelectRow({checked, setCollection, setChecked, item, index, listLength, category, collection}:Props){

    const { language, theme, caliberDisplayNameList, preferredUnits } = usePreferenceStore()

    function handleSelect(id:string, collection: "guns" | "accessories" | "parts"){
        if(checked === id){
            setChecked("")
            setCollection("")
        } else {
            setChecked(id)
            setCollection(collection)
        }
    }

    function getListItemBackgroundColor(id, index){
        if(index % 2 !== 0){
            return theme.colors.secondaryContainer
        }
        return theme.colors.background
    }

    function getListEntryTitle(collection: CollectionType, item: ItemType){
        return `${determineCardTitle(collection, item, language)}\n${determineCardSubtitle(collection, item, language, caliberDisplayNameList, preferredUnits)}`
    }

    function validateImage(item:ItemType){
            if(!item.images){
                return false
            }
            if(!Array.isArray(item.images)){
                return false
            }
            if(item.images.length === 0){
                return false
            }
            if(!item.images[0]){
                return false
            }
            if(item.images[0].split("/").pop() === ""){
                return false
            }
            return true
        }

    return(
        <TouchableNativeFeedback onPress={() => handleSelect(item.id, category)} key={item.id} >
            <View 
            key={item.id} 
                style={{
                    paddingLeft: defaultViewPadding, 
                    paddingRight: defaultViewPadding, 
                    backgroundColor: getListItemBackgroundColor(item.id, index), 
                    width: "100%",
                    display: "flex", 
                    flexDirection: "row", 
                    alignItems: "center", 
                    marginBottom: index === listLength ? 10 : 0,
                }}
            >
                <Text style={{padding: defaultViewPadding, flex: 1}}>{getListEntryTitle(collection, item as unknown as ItemType)}</Text>
                <View style={{width: "40%", padding: defaultViewPadding}}>
                    <Card>
                        <Card.Cover style={{height: 75}} source={validateImage(item) ? { uri: `${FileSystem.documentDirectory}${item.images[0].split("/").pop()}`} : require(`../../../assets//775788_several different realistic rifles and pistols on _xl-1024-v1-0.png`)} />
                    </Card>
                </View>
                <View>
                    <RadioButton.Android
                        value={item.id}
                        status={ checked === item.id ? 'checked' : 'unchecked' }
                        onPress={() => handleSelect(item.id, category)}
                    />
                </View>
            </View>
        </TouchableNativeFeedback>
    )
}