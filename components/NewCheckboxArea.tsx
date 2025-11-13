import { View } from "react-native"
import { Checkbox } from 'react-native-paper';
import { ItemType } from "interfaces"
import { checkBoxes } from "lib/DataTemplates/gunDataTemplate";
import { usePreferenceStore } from "stores/usePreferenceStore";

interface Props{
    itemData: ItemType
    setItemData: React.Dispatch<React.SetStateAction<ItemType>>
}

export default function NewCheckboxArea({itemData, setItemData}: Props){

    const { language } = usePreferenceStore()

    function handleCheckBoxCheck(checkBox:string){

        setItemData({...itemData, [checkBox]: !itemData[checkBox]})
    }

   

    return(
        <View>
            {checkBoxes.map(checkBox=>{
                return(
                    <Checkbox.Item mode={"android"} key={checkBox.name} label={checkBox[language]} status={itemData !== null && itemData[checkBox.name] ? "checked" : "unchecked"} onPress={()=>{handleCheckBoxCheck(checkBox.name)}}/>
                )
            })}
            
        </View>
    )
}