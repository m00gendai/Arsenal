import { TouchableOpacity, View } from "react-native";
import { Divider, Icon, Text } from "react-native-paper";
import { defaultViewPadding, ScreenNames } from "configs";
import { useViewStore } from "stores/useViewStore";
import { usePreferenceStore } from "stores/usePreferenceStore";
import { mainCollectionCategories, tabBarLabels } from "lib/textTemplates";

interface Props{
    handleNavigation:(target:ScreenNames)=>void
}

export default function BottomBar_AccessoryCollection({handleNavigation}:Props){

    const { currentCollectionScreen, setCurrentCollectionScreen } = useViewStore()
    const { language, theme } = usePreferenceStore()

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
          <Text variant={"headlineSmall"} style={{width: "100%", textAlign: "center"}}>{mainCollectionCategories.literatureCollection[language]}</Text>
           <Divider style={{height: 2, width: "100%", backgroundColor: theme.colors.primary}} />
            <TouchableOpacity onPress={()=>handleNavigation("LiteratureCollection_Books")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="book-open-page-variant" size={48} color={currentCollectionScreen === "LiteratureCollection_Books" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "LiteratureCollection_Books" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.bookCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("LiteratureCollection_Magazines")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="book-open-blank-variant" size={48} color={currentCollectionScreen === "LiteratureCollection_Magazines" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "LiteratureCollection_Magazines" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.printMagazineCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("LiteratureCollection_Rulebooks")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="notebook" size={48} color={currentCollectionScreen === "LiteratureCollection_Rulebooks" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "LiteratureCollection_Rulebooks" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.swissMilitaryRegulationCollection[language]}`}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>handleNavigation("LiteratureCollection_Misc")} style={{width: "30%", alignItems: 'center'}}>
              <Icon source="bookshelf" size={48} color={currentCollectionScreen === "LiteratureCollection_Misc" ? theme.colors.primary : theme.colors.secondary} />
              <Text style={{textAlign: "center", color: currentCollectionScreen === "LiteratureCollection_Misc" ? theme.colors.primary : theme.colors.secondary, marginTop: 4 }}>{`${tabBarLabels.literatureMiscCollection[language]}`}</Text>
            </TouchableOpacity>
        </View>
    )
}