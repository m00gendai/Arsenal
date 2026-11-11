import ModalContainer from "components/ModalContainer"
import { defaultGridGap, defaultViewPadding } from "configs/configs"
import { dataTemplate_Translations } from "lib/DataTemplates/translations"
import { FlatList, View } from "react-native"
import { Card, DataTable, IconButton, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as schema from "db/schema"
import { db } from "db/client"
import { eq, asc, count, ne, and } from 'drizzle-orm';
import { useItemStore } from "stores/useItemStore"
import { CollectionType, StackParamList } from "lib/interfaces"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useNavigation } from "@react-navigation/native"

interface Props{
    collection: CollectionType
    topic: string
    modalTopic: string
    items: [string, string][]
    visible: boolean
    setVisible: React.Dispatch<React.SetStateAction<boolean>>
}

export default function GoToItemDialog({collection, topic, modalTopic, items, visible, setVisible}:Props){

    const { language, switchLanguage, theme, switchTheme, generalSettings, setGeneralSettings, caliberDisplayNameList } = usePreferenceStore()
    const { setCurrentItem } = useItemStore()
    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()

    function handleConfirm(){
        setVisible(prev => !prev)
    }

    function navigateToItem(id: string){
        const itemWithId = db.select().from(schema[collection]).where(eq(schema[collection].id, id)).all()
        setCurrentItem(itemWithId[0])
        navigation.navigate("item")
        setVisible(false)
    }

    return(
        <ModalContainer
            title={`${dataTemplate_Translations[topic][language]}: ${modalTopic}`}
            subtitle={null}
            visible={visible}
            setVisible={setVisible}
            content={
                <View style={{width: "100%", height: "100%", position: "relative", padding: defaultViewPadding}}>
                    <DataTable>
                        <FlatList
                            numColumns={1}
                            initialNumToRender={10}
                            contentContainerStyle={{ gap: defaultGridGap }}
                            columnWrapperStyle={undefined}
                            keyExtractor={(item, index) => `${item[0]}_${index}`}
                            style={{
                                height: "100%",
                                width: "100%",
                                paddingTop: defaultViewPadding,
                                paddingLeft: defaultViewPadding,
                                paddingRight: defaultViewPadding,
                                paddingBottom: 50,
                            }}
                            data={items}
                            renderItem={({ item, index }) => <DataTable.Row key={`dataTableRow_${index}`} >
                                <DataTable.Cell style={{flex: 5}} >
                                    <Text numberOfLines={10}>{item[1]}</Text>
                                </DataTable.Cell>
                                <DataTable.Cell style={{flex: 1}} >
                                    <IconButton icon="arrow-right" size={14} onPress={() => navigateToItem(item[0])} style={{backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>
                                </DataTable.Cell>
                            </DataTable.Row>}

                            ListHeaderComponent={null}
                            ListFooterComponent={<View style={{ width: "100%", height: 50 }} />}
                            ListEmptyComponent={null}
                            />
                    </DataTable>
                </View>
            }
            buttonACK={<IconButton icon="check" onPress={() => handleConfirm()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
            buttonCNL={null}
            buttonDEL={null}
        />
    )
}

