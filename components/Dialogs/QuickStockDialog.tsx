import { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import { HelperText, Icon, IconButton, Portal, Text, TextInput } from "react-native-paper"
import { usePreferenceStore } from "../../stores/usePreferenceStore";
import { defaultViewPadding } from "../../configs/configs";
import { AmmoType, ItemType, ReloadingType_Bullet, ReloadingType_Powder, weightUnitNames } from "../../lib/interfaces";
import { ammoQuickUpdate, gunQuickShot, inStockLabel, shotLabel } from "../../lib/textTemplates";
import { db } from "../../db/client"
import * as schema from "../../db/schema"
import { eq } from 'drizzle-orm';
import { useItemStore } from "stores/useItemStore";
import { v4 as uuidv4 } from 'uuid';
import { convertSelectedUnitToMilligram, convertWeightUnitsToSelectedUnit } from "functions/utils";
import ModalContainer from ".././ModalContainer";
import { determineCostLoggerSchema } from "functions/determinators";
import { Dropdown } from "react-native-paper-dropdown";
import { weightUnits } from "lib/unitData";

interface Props{
  data?: string
  itemData?: ItemType
  setItemData?: React.Dispatch<React.SetStateAction<ItemType>>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>
  fromQuickAction?: boolean
}

export default function QuickStockDialog({data, itemData, setItemData, showModal, setShowModal, fromQuickAction}:Props){

    const { preferredUnits } = usePreferenceStore()

    const [error, displayError] = useState<boolean>(false)
    const [errorText, setErrorText] = useState<string>("")
    const [stockChange, setStockChange] = useState<"dec" | "inc" | "">("")
    const [powderConsumptionUnit, setPowderConsumptionUnit] = useState<weightUnitNames>(preferredUnits.powderWeightUnit)
    const [input, setInput] = useState<string>("")
    const [costInput, setConstInput] = useState<string>("")
    const { language, theme, } = usePreferenceStore()
    const { currentCollection, setCurrentCollection, currentItem, setCurrentItem } = useItemStore()
    const [negativeAmount, setNegativeAmount] = useState<boolean>(false)

    const quickStockItem = currentItem as AmmoType | ReloadingType_Bullet | ReloadingType_Powder

    const weightData = weightUnits.map(unit => {
        return(
            {label: `${unit[language]} - ${unit.iso}`, value: `${unit.iso}`}
        )
    })

    function insertErrorText(){
      if(stockChange === ""){
        setErrorText(ammoQuickUpdate.errorIncDec[language])
      }
      if(input === ""){
        setErrorText(ammoQuickUpdate.errorNoAmount[language])
      }
    }

    async function saveNewStock(item:AmmoType | ReloadingType_Bullet | ReloadingType_Powder){
      try{
        if(stockChange !== "" && input !== ""){
          let currentValue:number
          let total:number
          if("currentStock" in item){
            currentValue = parseInt(item.currentStock) ? parseInt(item.currentStock) : 0
            const increase:number = Number(input)
            total = stockChange === "inc" ? Number(currentValue) + Number(increase) : Number(currentValue) - Number(increase)
            await db.update(schema[currentCollection]).set({currentStock: `${total}`, lastTopUpAt_unix: Date.now()}).where(eq(schema[currentCollection].id, item.id))
          }
          if("powderWeight" in item){
            currentValue = parseInt(item.powderWeight) ? parseInt(item.powderWeight) : 0 // this is Milligram
            const increase:number = Number(convertSelectedUnitToMilligram(powderConsumptionUnit, input))
            total = stockChange === "inc" ? Number(currentValue) + Number(increase) : Number(currentValue) - Number(increase)
            await db.update(schema[currentCollection]).set({powderWeight: `${total}`, lastTopUpAt_unix: Date.now()}).where(eq(schema[currentCollection].id, item.id))
          }

          if(costInput && stockChange === "inc" ){
            await db.insert(determineCostLoggerSchema(currentCollection)).values({
              id: uuidv4(),
              createdAt: Date.now(),
              reference: quickStockItem.id,
              amountBought: `${"powderWeight" in quickStockItem ? convertSelectedUnitToMilligram(powderConsumptionUnit, input) : input}`,
              totalCost: `${costInput}`
            })
          }

          if(fromQuickAction){
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
          }

          if(data && stockChange === "inc"){

            setItemData({...itemData, [data]: (Number(itemData[data]) + Number(input)).toString()})
          }
          if(data && stockChange === "dec"){
            setItemData({...itemData, [data]: (Number(itemData[data]) - Number(input)).toString()})
          }

          displayError(false)
          setShowModal(false)
      }
      else {
          insertErrorText()
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
        setNegativeAmount((quickStockItem.powderWeight === undefined ? 0 : quickStockItem.powderWeight === null ? 0 : Number(convertWeightUnitsToSelectedUnit(powderConsumptionUnit, quickStockItem.powderWeight))) < Number(input))
      }
      setInput(input.replace(/[^0-9]/g, ''))
    }

    useEffect(()=>{
      handleInput(input)
    },[powderConsumptionUnit])

    function handleCostInput(input:string){
      setConstInput(input.replace(/[^0-9.,]/g, ''))
    }

    function setDetailText(){
      if("currentStock" in quickStockItem){
        return(
          <View style={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <Text>{`${quickStockItem.manufacturer} ${"designation" in quickStockItem ? quickStockItem.designation : quickStockItem.model} ${quickStockItem.caliber ?? ""}`}</Text>
            <View style={{width: "100%", display: "flex", flexDirection: "row"}}>
              <Text>{`${inStockLabel[language]} `}</Text>
              <Text style={{fontWeight: "bold"}}>{`${quickStockItem.currentStock} ${shotLabel[language]}`}</Text>
            </View>
          </View> 
        )
      }
      if("powderWeight" in quickStockItem){
        return(
          <View style={{width: "100%", display: "flex", flexDirection: "row", flexWrap: "wrap"}}>
            <Text>{`${quickStockItem.manufacturer} ${"designation" in quickStockItem ? quickStockItem.designation : quickStockItem.model} ${quickStockItem.caliber ?? ""}`}</Text>
            <View style={{width: "100%", display: "flex", flexDirection: "row"}}>
              <Text>{`${inStockLabel[language]} `}</Text>
              <Text style={{fontWeight: "bold"}}>{`${convertWeightUnitsToSelectedUnit(powderConsumptionUnit, quickStockItem.powderWeight)} ${powderConsumptionUnit}`}</Text>
            </View>
          </View> 
        )
      }
      
    }

    function setHelperText(){
      if("currentStock" in quickStockItem){
        return !quickStockItem.currentStock ? gunQuickShot.errorNoAmountDefined[language] : gunQuickShot.errorAmountTooLow[language].replace("{{AMOUNT}}", quickStockItem.currentStock)
        }
      if("powderWeight" in quickStockItem){
        return !quickStockItem.powderWeight ? gunQuickShot.errorNoAmountDefined[language] : gunQuickShot.errorAmountTooLow[language].replace("{{AMOUNT}}", `${convertWeightUnitsToSelectedUnit(powderConsumptionUnit, quickStockItem.powderWeight)} ${powderConsumptionUnit}`)
      }
    }
    
    return(
      <Portal>
        <ModalContainer
          title={"QuickStock"}
          subtitle={`${ammoQuickUpdate.title[language]}`}
          visible={showModal}
          setVisible={setShowModal}
          content={
            <View style={{display: "flex", flexDirection: "row", flexWrap: "wrap", width: "100%", height: "100%"}}>
              <View style={{width: "100%", display: "flex", flexDirection: "row", padding: defaultViewPadding, flexWrap: "wrap"}}>
                <View style={{width: "100%"}}>{setDetailText()}</View>
                {currentCollection === "reloadingCollection_Powder" ? <View style={{width: "100%", display: "flex", flexDirection: "row", gap: defaultViewPadding, marginTop: defaultViewPadding*2}}>
                  <View style={{width: "100%"}}>
                    <Dropdown
                      label={"Unit"}
                      options={weightData}
                      value={powderConsumptionUnit}
                      onSelect={setPowderConsumptionUnit}
                      menuContentStyle={{height: "100%"}}
                      style={{width: "100%"}}
                    />
                  </View>
                </View> : null}
                <View style={{width: "100%", display: "flex", flexDirection: "row", gap: defaultViewPadding, marginTop: defaultViewPadding*2}}>
                  <Pressable 
                    style={{
                      width: "15%", 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",
                      backgroundColor: stockChange === "dec" ? theme.colors.primary : theme.colors.surfaceVariant
                    }} 
                    onPress={()=>setStockChange("dec")}
                  >
                    <Icon source="minus" size={24} color={stockChange === "dec" ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}/>
                  </Pressable>

                  <TextInput 
                    placeholder={`${"powderWeight" in quickStockItem ? "" : ammoQuickUpdate.placeholder[language]}`} 
                    keyboardType={"number-pad"} 
                    value={input} 
                    onChangeText={input => handleInput(input)} 
                    inputMode='decimal' 
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    style={{flex: 1}}
                  />

                  <Pressable 
                    style={{
                      width: "15%", 
                      display: "flex", 
                      justifyContent: "center", 
                      alignItems: "center",
                      backgroundColor: stockChange === "inc" ? theme.colors.primary : theme.colors.surfaceVariant
                    }} 
                    onPress={()=>setStockChange("inc")}
                  >
                    <Icon source="plus" size={24} color={stockChange === "inc" ? theme.colors.onPrimary : theme.colors.onSurfaceVariant}/>
                  </Pressable>
                </View>
                {negativeAmount  && stockChange === "dec" ? 
                <View style={{width: "100%"}}>
                  <HelperText type="error" visible={negativeAmount}>
                    {setHelperText()}
                  </HelperText>
                </View> : null}
                {error ? 
                <View style={{width: "100%"}}>
                  <HelperText type="error" visible={error}>
                    {errorText}
                  </HelperText>
                </View> : null}
                <View style={{width: "100%", display: "flex", flexDirection: "row", gap: defaultViewPadding, marginTop: defaultViewPadding*2}}>
                  <TextInput 
                    style={{flex: 1}} 
                    placeholder={`${ammoQuickUpdate.cost[language]}`} 
                    keyboardType={"number-pad"} 
                    value={costInput} 
                    onChangeText={input => handleCostInput(input)} 
                    inputMode='decimal' 
                    returnKeyType='done'
                    returnKeyLabel='OK'
                    left={<TextInput.Affix text={`${preferredUnits.selectedCurrency} `} />}
                    disabled={stockChange === "inc" ? false : true}
                  />
                </View>
              </View>
            </View>
          }
          buttonACK={<IconButton disabled={negativeAmount && stockChange === "dec"} mode="contained" icon="check" onPress={() => saveNewStock(quickStockItem)} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
          buttonCNL={<IconButton mode="contained" icon="cancel" onPress={()=>setShowModal(false)} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} iconColor={theme.colors.onSecondaryContainer}/>}
          buttonDEL={null}
        />
      </Portal>
    )
}