import { TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { defaultViewPadding, screenNameParamsLiterature } from "configs";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { mainCollectionCategories } from "lib/textTemplates";
import { CollectionType } from "interfaces";
import { useItemStore } from "stores/useItemStore";
import { determineAccessoryIcons, determineTabBarLabel } from "functions/determinators";

interface Props{
    handleNavigation:(target: "itemCollection", params:{ collectionType: CollectionType })=>void
}

export default function BottomBar_LiteratureCollection({handleNavigation}:Props){


    const { language, theme } = usePreferenceStore()
    const { currentCollection } = useItemStore()

    return(
        <View 
            style={{
                width: "100%",

                display: "flex", 
                justifyContent: "center", 
                alignItems: "flex-start", 
                flexWrap: "wrap", 
                flexDirection: "row",
                padding: defaultViewPadding,
                rowGap: 30,
                columnGap: "1%"
            }}
        >
            <Text variant={"headlineSmall"} style={{width: "100%", textAlign: "center"}}>
                {mainCollectionCategories.literatureCollection[language]}
            </Text>

            <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary}} />

            {screenNameParamsLiterature.map((collection, index) => {
                return(
                    <TouchableOpacity 
                    key={`${collection}_${index}`}
                        onPress={()=>
                            handleNavigation("itemCollection", {collectionType: collection})} 
                        style={{
                            width: "30%", 
                            alignItems: 'center'}}
                    >
                        <Icon 
                            source={determineAccessoryIcons(collection)}
                            size={48} 
                            color={currentCollection === collection ? theme.colors.primary : theme.colors.secondary} 
                        />
                        <Text 
                            style={{
                                textAlign: "center", 
                                color: currentCollection === collection ? theme.colors.primary : theme.colors.secondary, 
                                marginTop: 4 }}
                        >
                            {`${determineTabBarLabel(collection)[language]}`}
                        </Text>
                    </TouchableOpacity>
                )
            })}

        </View>
    )
}