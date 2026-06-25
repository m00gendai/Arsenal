import { useState } from "react";
import { View } from "react-native";
import { Button, Dialog, HelperText, IconButton, Text, TextInput } from "react-native-paper"
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { dateTimeOptions, defaultViewPadding } from "../configs/configs";
import { AmmoType, ReloadingType_Bullet, ReloadingType_Powder } from "../lib/interfaces";
import { ammoQuickUpdate, gunQuickShot } from "../lib/textTemplates";
import { db } from "../db/client"
import * as schema from "../db/schema"
import { eq } from 'drizzle-orm';
import { useItemStore } from "stores/useItemStore";
import { v4 as uuidv4 } from 'uuid';
import { convertWeightUnitsToMilligram, convertWeightUnitsToPreferredUnit } from "functions/utils";

export default function QuickStock({navigation}){

    const [error, displayError] = useState<boolean>(false)
    const [stockChange, setStockChange] = useState<"dec" | "inc" | "">("")
    const [stockValue, setStockValue] = useState<number>(0)
    const [input, setInput] = useState<string>("")
    const { language, theme, } = usePreferenceStore()
    const { currentCollection, setCurrentCollection, currentItem, setCurrentItem } = useItemStore()
    const [seeInfo, toggleSeeInfo] = useState<boolean>(false)
    const [negativeAmount, setNegativeAmount] = useState<boolean>(false)

    const { preferredUnits } = usePreferenceStore()

    const quickStockItem = currentItem as AmmoType | ReloadingType_Bullet | ReloadingType_Powder


    async function saveNewStock(item:AmmoType | ReloadingType_Bullet | ReloadingType_Powder){
      try{
        if(stockChange !== ""){
          let currentValue:number
          let total:number
          if("currentStock" in item){
            console.log("currentStock")
            currentValue = parseInt(item.currentStock) ? parseInt(item.currentStock) : 0
            const increase:number = Number(input)
            total = stockChange === "inc" ? Number(currentValue) + Number(increase) : Number(currentValue) - Number(increase)
            await db.update(schema[currentCollection]).set({currentStock: `${total}`, lastTopUpAt_unix: Date.now()}).where(eq(schema[currentCollection].id, item.id))
          }
          if("powderWeight" in item){
            console.log("powderWeight")
            currentValue = parseInt(item.powderWeight) ? parseInt(item.powderWeight) : 0 // this is Milligram
            const increase:number = Number(convertWeightUnitsToMilligram(preferredUnits, "powderWeight", input))
            total = stockChange === "inc" ? Number(currentValue) + Number(increase) : Number(currentValue) - Number(increase)
            await db.update(schema[currentCollection]).set({powderWeight: `${total}`, lastTopUpAt_unix: Date.now()}).where(eq(schema[currentCollection].id, item.id))
          }
          await db.insert(schema.logger).values({
              id: uuidv4(),
              createdAt: Date.now(), 
              reference: quickStockItem.id,
              collection: currentCollection,
              changedField: "currentStock" in item ? "currentStock" : "powderWeight",
              value_old: `${currentValue}`,
              value_new: `${total}`,
              snapshot: JSON.stringify(quickStockItem)
          })
          navigation.goBack()
          displayError(false)
      }
      else {
          displayError(true)
      }
      }catch(e){
              console.error(e)
            }
    }

    function handleInput(input:string){
       if("currentStock" in quickStockItem){
        setNegativeAmount((quickStockItem.currentStock === undefined ? 0 : quickStockItem.currentStock === null ? 0 : Number(quickStockItem.currentStock)) < Number(input))
        }
      if("powderWeight" in quickStockItem){
        setNegativeAmount((quickStockItem.powderWeight === undefined ? 0 : quickStockItem.powderWeight === null ? 0 : Number(convertWeightUnitsToPreferredUnit(preferredUnits, "powderWeight", quickStockItem.powderWeight))) < Number(input))
      }
      setInput(input.replace(/[^0-9]/g, ''))
    }

    function setHelperText(){
      if("currentStock" in quickStockItem){
        return !quickStockItem.currentStock ? gunQuickShot.errorNoAmountDefined[language] : gunQuickShot.errorAmountTooLow[language].replace("{{AMOUNT}}", quickStockItem.currentStock)
        }
      if("powderWeight" in quickStockItem){
        return !quickStockItem.powderWeight ? gunQuickShot.errorNoAmountDefined[language] : gunQuickShot.errorAmountTooLow[language].replace("{{AMOUNT}}", convertWeightUnitsToPreferredUnit(preferredUnits, "powderWeight", quickStockItem.powderWeight))
      }
    }
    
    return(
        <View style={{flex: 1}}>
        <View style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap", backgroundColor: theme.colors.backdrop}}>
            <View style={{width: "85%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
                <View style={{backgroundColor: theme.colors.background, width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
                <View style={{borderTopLeftRadius: 25, borderTopRightRadius: 25, width: "100%", backgroundColor: theme.colors.background, borderBottomColor: theme.colors.primary, borderBottomWidth: 1, marginBottom: 5}}>
                            <View style={{display: "flex", flexDirection: "row"}}><Text variant="titleLarge" style={{color: theme.colors.primary, padding: defaultViewPadding, flex: 9}}>{`QuickStock`}</Text><IconButton style={{flex: 1}} icon="help-circle-outline" onPress={()=>toggleSeeInfo(true)}/></View>
                        </View>
                  <View style={{width: "100%", display: "flex", flexDirection: "row", padding: defaultViewPadding, flexWrap: "wrap"}}>
                    <Text>{`${quickStockItem.manufacturer} ${"designation" in quickStockItem ? quickStockItem.designation : quickStockItem.model}\n${quickStockItem.caliber ?? ""}`}</Text>
                    <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "center",  marginBottom: 10}}>
                      <IconButton mode="contained" icon="plus" selected={stockChange === "inc" ? true : false} onPress={()=>setStockChange("inc")}/>
                      <IconButton mode="contained" icon="minus" selected={stockChange === "dec" ? true : false} onPress={()=>setStockChange("dec")} />
                    </View>
                    <TextInput 
                      style={{width: "100%"}} 
                      placeholder={`${"powderWeight" in quickStockItem ? "" : ammoQuickUpdate.placeholder[language]}`} 
                      keyboardType={"number-pad"} 
                      value={input} 
                      onChangeText={input => handleInput(input)} 
                      inputMode='decimal' 
                      returnKeyType='done'
                      returnKeyLabel='OK'
                      left={"powderWeight" in quickStockItem ? <TextInput.Affix text={`${preferredUnits.powderWeightUnit} `} />  : null}
                    />
                        {negativeAmount  && stockChange === "dec" ? <HelperText type="error" visible={negativeAmount}>
                                  {setHelperText()}
                                </HelperText> : null}
                    <View style={{width: "100%", display: "flex", flexDirection: "row", justifyContent: "space-between", marginTop: 10}}>
                    <IconButton disabled={negativeAmount && stockChange === "dec"} mode="contained" icon="check" onPress={() => saveNewStock(quickStockItem)} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>
                      <IconButton mode="contained" icon="cancel" onPress={()=>navigation.goBack()} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer}/>
                    </View>
                  </View>
                  {error ? 
                  <View style={{width: "100%", display: "flex", flexDirection: "row"}}>
                    <Text style={{color: theme.colors.error}}>{ammoQuickUpdate.error[language]}</Text>
                  </View> 
                  : 
                  null}
                  </View>
              </View>
          </View>
          <Dialog visible={seeInfo}>
             <Dialog.Content>
               <Text variant="bodyMedium">{`${ammoQuickUpdate.title[language]}`}</Text>
             </Dialog.Content>
             <Dialog.Actions>
          <Button onPress={() => toggleSeeInfo(false)}>OK</Button>
        </Dialog.Actions>
             </Dialog>
          </View>
    )
}