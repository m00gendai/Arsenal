import { List } from "react-native-paper";
import { usePreferenceStore } from "stores/usePreferenceStore";
import Settings_General from "./Settings_General";
import Settings_Units from "./Settings_Units";
import Settings_Display from "./Settings_Display";
import ColorPalette from "./ColorPalette";
import { preferenceTitles } from "lib/Text/text_settings";

export default function Settings(){

    const { theme, language } = usePreferenceStore()

    return(
        <List.Accordion id="Settings" left={props => <List.Icon {...props} icon="cog-outline" />} title={preferenceTitles.settings[language]} titleStyle={{fontWeight: "700", color: theme.colors.onBackground}}>
            
            <ColorPalette />
            
            <Settings_General />

            <Settings_Display />
        
            <Settings_Units />
        
        </List.Accordion>
    )
}