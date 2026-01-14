import { TouchableNativeFeedback, View } from "react-native"
import { List, Text } from "react-native-paper"
import { usePreferenceStore } from "stores/usePreferenceStore"
import * as SystemUI from "expo-system-ui"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { colorThemes } from "lib/colorThemes"
import { PREFERENCES } from "configs_DB"
import { preferenceTitles } from "lib/textTemplates"
import { defaultViewPadding } from "configs"

export default function ColorPalette(){
    
    const { language, theme, switchTheme } = usePreferenceStore()

    async function handleThemeSwitch(color:string){
        switchTheme(color)
        SystemUI.setBackgroundColorAsync(colorThemes[color].background)
        const preferences:string = await AsyncStorage.getItem(PREFERENCES)
        const newPreferences:{[key:string] : string} = preferences == null ? {"theme": color} : {...JSON.parse(preferences), "theme":color} 
        await AsyncStorage.setItem(PREFERENCES, JSON.stringify(newPreferences))
    }

    return(<View style={{backgroundColor: theme.colors.tertiaryContainer}}>
            <List.Accordion left={props => <List.Icon {...props} icon="palette" />} title={preferenceTitles.colors[language]} titleStyle={{fontWeight: "700", color: theme.colors.onTertiaryContainer}} style={{paddingLeft: defaultViewPadding*2, backgroundColor: theme.colors.tertiaryContainer}}>
        
            <View style={{marginLeft: 5, marginRight: 5, padding: defaultViewPadding, backgroundColor: theme.colors.secondaryContainer, borderColor: theme.colors.primary, borderLeftWidth: 5}}>
                <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between"}}>
                    {Object.entries(colorThemes).map(colorTheme =>{
                        return(    
                            <TouchableNativeFeedback onPress={()=>handleThemeSwitch(colorTheme[0])} key={colorTheme[0]}>
                                <View style={{elevation: 4, backgroundColor: colorTheme[1].background, borderColor: theme.name === colorTheme[0] ? colorTheme[1].primary : colorTheme[1].primaryContainer, borderWidth: theme.name === colorTheme[0] ? 5 : 0, paddingTop: 5, paddingBottom: 5, paddingLeft:2, paddingRight:2, width: "45%", height: 50, display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-evenly", marginTop: 10, marginBottom: 10, borderRadius: 30}}>
                                
                                    <View style={{height: "100%", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorTheme[1].primaryContainer, borderBottomLeftRadius: 50, borderTopLeftRadius: 50}}>
                                        <Text style={{color:colorTheme[1].onPrimaryContainer, fontSize: 10}}>A</Text>
                                    </View>
                                    <View style={{height: "100%", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorTheme[1].surfaceVariant}}>
                                        <Text style={{color:colorTheme[1].onSurfaceVariant, fontSize: 10}}>B</Text>
                                    </View>
                                    <View style={{height: "100%", width: "30%", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: colorTheme[1].primary, borderBottomRightRadius: 50, borderTopRightRadius: 50}}>
                                        <Text style={{color:colorTheme[1].onPrimary, fontSize: 10}}>C</Text>
                                    </View>

                                </View>
                            </TouchableNativeFeedback>
                        )
                    })}
                </View>
            </View>
        </List.Accordion>
        </View>
)
}