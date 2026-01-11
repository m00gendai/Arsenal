import { AccessibilityInfo, ScrollView, View } from "react-native";
import { Button, Dialog, HelperText, IconButton, List, Text, TextInput } from "react-native-paper";
import { usePreferenceStore } from "../stores/usePreferenceStore";
import { dateTimeOptions, defaultViewPadding } from "../configs";
import { gunQuickShot, shotLabel } from "../lib/textTemplates";
import { useEffect, useState } from "react";
import { AmmoType, GunType, ItemType } from "../interfaces";
import { useLiveQuery } from "drizzle-orm/expo-sqlite"
import { db } from "../db/client"
import * as schema from "../db/schema"
import { eq, or, inArray } from 'drizzle-orm';
import { useItemStore } from "stores/useItemStore";
import { access } from "fs";

export default function QuickShot({navigation}){

  const { language, theme } = usePreferenceStore()
  const { currentItem, setCurrentItem, currentCollection, setCurrentCollection } = useItemStore()
  const [shotCountFromStock, setShotCountFromStock] = useState<string[]>([])
  const [shotCountNonStock, setShotCountNonStock] = useState<string>("")
  const [seeInfo, toggleSeeInfo] = useState<boolean>(false)
  const [negativeAmmo, setNegativeAmmo] = useState<boolean>(false)
  const [negativeAmmoId, setNegativeAmmoId] = useState<string>("")

  const [silencerData, setSilencerData] = useState([])
  const [opticData, setOpticData] = useState([])
  const [scopeData, setScopeData] = useState([])
  const [lightLaserData, setLightLaserData] = useState([])
  const [magazineData, setMagazineData] = useState([])
  const [miscAccessoryData, setMiscAccessoryData] = useState([])
  const [conversionKitData, setConversionKitData] = useState([])
  const [barrelData, setBarrelData] = useState([])
  
useEffect(()=>{
  async function getAccessoryData(){
    const mountedData = await db.select()
      .from(schema.accessoryMount)
      .where(
        or(
          eq(schema.accessoryMount.parentGunId, currentItem.id),
          eq(schema.accessoryMount.parentAccessoryId, currentItem.id),
          eq(schema.accessoryMount.parentPartId, currentItem.id)
        )
        
      )

    const mountedIds = mountedData.map(d => d.accessoryId);

    const silencerData = await db.select()
      .from(schema.accessoryCollection_Silencer)
      .where(
        inArray(schema.accessoryCollection_Silencer.id, mountedIds)
      )

    setSilencerData(silencerData)

    const opticData = await db.select()
      .from(schema.accessoryCollection_Optic)
      .where(
        inArray(schema.accessoryCollection_Optic.id, mountedIds)
      )

    setOpticData(opticData)

    const scopeData = await db.select()
      .from(schema.accessoryCollection_Scope)
      .where(
        inArray(schema.accessoryCollection_Scope.id, mountedIds)
      )

    setScopeData(scopeData)

    const lightLaserData = await db.select()
      .from(schema.accessoryCollection_LightLaser)
      .where(
        inArray(schema.accessoryCollection_LightLaser.id, mountedIds)
      )

    setLightLaserData(lightLaserData)

    const magazineData = await db.select()
      .from(schema.accessoryCollection_Magazine)
      .where(
        inArray(schema.accessoryCollection_Magazine.id, mountedIds)
      )

    setMagazineData(magazineData)

    const miscAccessoryData = await db.select()
      .from(schema.accessoryCollection_Misc)
      .where(
        inArray(schema.accessoryCollection_Misc.id, mountedIds)
      )

    setMiscAccessoryData(miscAccessoryData)

  }
  
    async function getPartData(){
      const mountedData = await db.select()
        .from(schema.partMount)
        .where(
          or(
            eq(schema.partMount.parentGunId, currentItem.id),
            eq(schema.partMount.parentPartId, currentItem.id)
          )
          
        )

      const mountedIds = mountedData.map(d => d.partId);

      const conversionKitData = await db.select()
        .from(schema.partCollection_ConversionKit)
        .where(
          inArray(schema.partCollection_ConversionKit.id, mountedIds)
        )

      setConversionKitData(conversionKitData)

      const barrelData = await db.select()
        .from(schema.partCollection_Barrel)
        .where(
          inArray(schema.partCollection_Barrel.id, mountedIds)
        )

      setBarrelData(barrelData)

    }
    getAccessoryData()
    getPartData()
  },[])

  const { data: dataQuery } = useLiveQuery(
    db.select()
    .from(schema.ammoCollection)
  )

  const data = (dataQuery as AmmoType[]).filter(ammo => {
    if(ammo.caliber){
      return "caliber" in  currentItem && currentItem.caliber.includes(ammo.caliber[0])
    }
  })

  async function saveNewStock(id: string, count:number){
    const date:Date = new Date()
    await db.update(schema.ammoCollection).set({currentStock: `${count}`, lastTopUpAt_unix: Date.now()}).where(eq(schema.ammoCollection.id, id))
  }

  async function handleShotCount(){
    const date:Date = new Date()
    const mapped:number[] = Object.entries(shotCountFromStock).map(item => item[1] === "" ? 0 : Number(item[1]))
    const currentShotCount:number = "shotCount" in currentItem ? currentItem.shotCount ? Number(currentItem.shotCount) : 0 : 0
    const total: number = Number(shotCountNonStock) + mapped.reduce((acc, curr) => acc+Number(curr),0) + currentShotCount

    {/*@ts-expect-error*/}
    await db.update(schema[currentCollection]).set({shotCount: `${total}`, lastShotAt_unix: Date.now()}).where(eq(schema[currentCollection].id, currentItem.id))

    const accessoryData = {
      accessoryCollection_Silencer: silencerData,
      accessoryCollection_Optic: opticData,
      accessoryCollection_Scope: scopeData,
      accessoryCollection_LightLaser: lightLaserData,
      accessoryCollection_Magazine: magazineData,
      accessoryCollection_Misc: miscAccessoryData,
      partCollection_ConversionKit: conversionKitData,
      partCollection_Barrel: barrelData,
    }

    for (const [type, accessories] of Object.entries(accessoryData)) {
      for (const accessory of accessories) {
        if ("shotCount" in accessory) {
          try{
            const currentShotCountAccessory:number = "shotCount" in accessory ? accessory.shotCount ? Number(accessory.shotCount) : 0 : 0
            const totalAccessory: number = Number(shotCountNonStock) + mapped.reduce((acc, curr) => acc+Number(curr),0) + currentShotCountAccessory
            await db.update(schema[type]).set({shotCount: `${totalAccessory}`, lastShotAt_unix: Date.now()}).where(eq(schema[type].id, accessory.id))
          }catch(e){
            console.error(e)
          }
          }
      }
    }


    if (shotCountFromStock.length !== 0) {
      for (const count of Object.entries(shotCountFromStock)){
        const ammo = await db.selectDistinct().from(schema.ammoCollection).where(eq(schema.ammoCollection.id, count[0]))
        const newStock = parseInt(ammo[0].currentStock) - (count[1] === "" ? 0 : parseInt(count[1]))
        await saveNewStock(ammo[0].id, newStock)
      }
    }  

    setShotCountNonStock("")
    setShotCountFromStock([])
    navigation.goBack()
  }

  const handleInputChange = (ammoStock: number, ammoId:string, value:string) => {
    const newValue = value.replace(/[^0-9]/g, '');
    setNegativeAmmo((ammoStock === undefined ? 0 : ammoStock === null ? 0 : Number(ammoStock)) < Number(value))
    setNegativeAmmoId(ammoStock === undefined ? "" : ammoStock === null ? "" : Number(ammoStock) < Number(value) ? ammoId : "")
    setShotCountFromStock(prevState => ({
      ...prevState,
      [`${ammoId}`]: newValue
    }));
  };

  

return(
<View style={{width: "100%", height: "100%", display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center", flexWrap: "wrap", backgroundColor: theme.colors.backdrop}}>
                    <View style={{width: "85%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", flexWrap: "wrap"}}>
                        <View style={{backgroundColor: theme.colors.background, width: "100%", height: "75%"}}>
                            <List.Section style={{flex: 1}}>
                   <View style={{borderTopLeftRadius: 25, borderTopRightRadius: 25, width: "100%", backgroundColor: theme.colors.background, borderBottomColor: theme.colors.primary, borderBottomWidth: 1, marginBottom: 5}}>
                            <View style={{display: "flex", flexDirection: "row"}}><Text variant="titleLarge" style={{color: theme.colors.primary, padding: defaultViewPadding, flex: 9}}>{`QuickShot`}</Text><IconButton style={{flex: 1}} icon="help-circle-outline" onPress={()=>toggleSeeInfo(true)}/></View>
                        </View>
                  <ScrollView>
                  {"caliber" in currentItem && currentItem.caliber ? 
                    data.length === 0 ? null : <List.Accordion title={gunQuickShot.updateFromStock[language]} titleStyle={{color: theme.colors.onBackground}}>
                    <View style={{width: "100%", padding: defaultViewPadding, display: "flex", alignItems: "flex-start", flexDirection: "row", flexWrap: "wrap"}}>
                      {data.map(ammo =>{
                        if(parseInt(ammo.currentStock) !== 0 && ammo.currentStock !== null && ammo.currentStock !== ""){
                            const key = `${ammo.id}`;
                            const val = shotCountFromStock[key] || '';
                            return (
                              <View key={ammo.id} style={{width: "100%", marginTop: defaultViewPadding, marginBottom: defaultViewPadding}}>
                                <Text>{`${ammo.caliber}\n${ammo.currentStock !== null ? `${ammo.currentStock} ${shotLabel[language]}` : ""}`}</Text>
                                <TextInput 
                                  label={`${ammo.manufacturer ? ammo.manufacturer : ""} ${ammo.designation}`}
                                  value={val}
                                  onChangeText={val => handleInputChange(parseInt(ammo.currentStock), ammo.id, val)}
                                  returnKeyType='done'
                                  returnKeyLabel='OK'
                                  inputMode="decimal"
                                />
                                {negativeAmmo && negativeAmmoId === ammo.id ? <HelperText type="error" visible={negativeAmmo}>
                                  {ammo.currentStock === null ? gunQuickShot.errorNoAmountDefined[language] : ammo.currentStock === undefined ? gunQuickShot.errorNoAmountDefined[language] : gunQuickShot.errorAmountTooLow[language].replace("{{AMOUNT}}", ammo.currentStock)}
                                </HelperText> : null}
                              </View>
                            )
                          }
                        })
                      }
                    </View>
                    </List.Accordion> : null}
                  <List.Accordion title={gunQuickShot.updateNonStock[language]} titleStyle={{color: theme.colors.onBackground}}>
                    <View style={{width: "100%", padding: defaultViewPadding}}>
                      <TextInput
                        value={shotCountNonStock}
                        onChangeText={shotCountNonStock => setShotCountNonStock(shotCountNonStock.replace(/[^0-9]/g, ''))}
                        label={gunQuickShot.updateNonStockInput[language]}
                        inputMode="decimal"
                        returnKeyType='done'
                        returnKeyLabel='OK'
                      ></TextInput>
                    </View>
                    </List.Accordion>
                    </ScrollView>
                            </List.Section>
                            <View style={{width: "100%", marginTop: 10, display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <IconButton disabled={negativeAmmo} mode="contained" onPress={()=>handleShotCount()} icon={"check"} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>
                      <IconButton mode="contained" onPress={()=>navigation.goBack()} icon={"cancel"} style={{width: 50, backgroundColor: theme.colors.secondaryContainer}} />
                      </View>
                        </View>
                    </View>
                    <Dialog visible={seeInfo}>
             <Dialog.Content>
               <Text variant="bodyMedium">{`${gunQuickShot.title[language]}`}</Text>
             </Dialog.Content>
             <Dialog.Actions>
          <Button onPress={() => toggleSeeInfo(false)}>OK</Button>
        </Dialog.Actions>
             </Dialog>
                </View>
)
                    }