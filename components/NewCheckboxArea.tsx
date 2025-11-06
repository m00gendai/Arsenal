import { View } from "react-native"
import { Checkbox } from 'react-native-paper';
import { GunType } from "interfaces"
import { checkBoxes } from "lib/DataTemplates/gunDataTemplate";
import { usePreferenceStore } from "stores/usePreferenceStore";

interface Props{
    gunData: GunType
    setGunData: React.Dispatch<React.SetStateAction<GunType>>
}

export default function NewCheckboxArea({gunData, setGunData}: Props){

    const { language } = usePreferenceStore()

    function handleCheckBoxCheck(checkBox:string){

        setGunData({...gunData, [checkBox]: !gunData[checkBox]})
    }

   

    return(
        <View>
            {checkBoxes.map(checkBox=>{
                return(
                    <Checkbox.Item mode={"android"} key={checkBox.name} label={checkBox[language]} status={gunData !== null && gunData[checkBox.name] ? "checked" : "unchecked"} onPress={()=>{handleCheckBoxCheck(checkBox.name)}}/>
                )
            })}
            
        </View>
    )
}