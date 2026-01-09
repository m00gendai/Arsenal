import { Pressable, View } from "react-native"
import { Portal, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc } from 'drizzle-orm';
import { useLiveQuery } from 'drizzle-orm/expo-sqlite';
import { useRef, useState } from "react"
import { defaultViewPadding } from "configs"
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';

interface Props{
    title: string
    data: string
    inputText: string | string[]
    updateItemData: (text: string) => void
    charCount: number
    isFocus: boolean
}

export default function Autocomplete({title, data, inputText, updateItemData, charCount, isFocus}:Props){

    const { theme } = usePreferenceStore()

    const [rerender, setRerender] = useState(0)

    const bottomSheetRef = useRef<BottomSheet>(null);

    const {data: autocompleteData } = useLiveQuery(db.select()
        .from(schema.autocomplete)
        .where(
          eq(
              schema.autocomplete.field, data
          )
        )
        .orderBy(asc(schema.autocomplete.label))
    )

    function handleAutocomplete(text: string){
        updateItemData(text)
        setRerender(rerender => rerender + 1)
    }

    return(
        <Portal>
            {charCount >= 2 && isFocus && autocompleteData.length > 0 ? <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[
                    "5%", "25%", "50%"
                ]}
                index={1}
                handleComponent={null}   
                enableDynamicSizing={false}
                overDragResistanceFactor={1}
            >
                <View 
                    style={{
                        backgroundColor: theme.colors.primary,
                        padding: defaultViewPadding,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15
                    }}
                >
                    <Text style={{color: theme.colors.onPrimary}}>{`Autocomplete: ${title}`}</Text>
                </View>
                
                <BottomSheetScrollView  
                    keyboardShouldPersistTaps="handled"
                >
                    {autocompleteData.map((data, index) =>{
                        if(data.label.toLowerCase().includes((inputText as string).toLowerCase())){
                            return (
                                <Pressable 
                                    style={{
                                        padding: defaultViewPadding, 
                                        backgroundColor: index%2 === 1 ? theme.colors.surfaceVariant : theme.colors.surface
                                    }}
                                    onPress={()=>handleAutocomplete(data.label)}
                                    key={data.id}
                                >
                                    <Text>{data.label}</Text>
                                </Pressable>
                            )
                        }
                    })}
                </BottomSheetScrollView >

            </BottomSheet> : null}
        </Portal>
    )
}