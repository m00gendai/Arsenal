import { View } from "react-native"
import { Text, Switch, Checkbox } from "react-native-paper"
import { usePreferenceStore } from '../stores/usePreferenceStore';
import { defaultViewPadding } from "../configs";
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db } from "../db/client"
import { eq } from 'drizzle-orm';
import { CollectionType } from "interfaces";
import { determineTagSchema } from "functions/determinators";

interface Props{
    collection: CollectionType
}

export default function FilterMenu({collection}:Props){
console.log(`Filter: ${collection}`)
    const { filterOn, setFilterOn } = usePreferenceStore()

    const { data: tagData } = useLiveQuery(
        db.select()
        .from(determineTagSchema(collection))
    )

    async function handleFilterPressGuns(tag){
        
          await db.update(determineTagSchema(collection)).set({active: !tag.active}).where((eq(determineTagSchema(collection).label, tag.label)))

    }

    return(
        <View style={{flex: 1, padding: defaultViewPadding}}>
              <View style={{display: "flex", flexDirection: "row", justifyContent: "flex-start", alignItems: "center"}}>
                <Text>Filter:</Text>
                <Switch value={filterOn[collection]} onValueChange={()=>setFilterOn({...filterOn, [collection]: !filterOn[collection]})} />
              </View>
              <View>
              {tagData.map((tag, index)=>{
                return tag.label === "0" ? null : <Checkbox.Item mode="android" key={`filter_${tag.label}_${index}`} label={tag.label} status={tag.active ? "checked" : "unchecked"} onPress={()=>handleFilterPressGuns(tag)} />
              })}
              </View>
            </View>
    )
}