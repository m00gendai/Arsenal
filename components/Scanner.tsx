import { useState } from 'react';
import { Dimensions, TouchableNativeFeedback, View } from 'react-native';
import { Button, IconButton, Modal, Portal, RadioButton, Text, TextInput } from "react-native-paper"
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { useItemStore } from 'stores/useItemStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from 'lib/interfaces';
import { defaultModalBackdrop, defaultViewPadding, screenNameParamsAll } from 'configs/configs';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import ModalContainer from './ModalContainer';

interface Props{
  scannerVisible: boolean
  setScannerVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Scanner({scannerVisible, setScannerVisible}:Props){

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [scannerResult, setScannerResult] = useState<string>("")
    const [scanTarget, setScanTarget] = useState<"id" | "qrCode">("id")
    const [errorTextVisible, setErrorTextVisible] = useState<boolean>(false)
    

    const { currentCollection, setCurrentItem } = useItemStore()
    const { theme } = usePreferenceStore()
    

  if (!hasPermission) {
    requestPermission()
    return <View />;
  }

const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13'],
  onCodeScanned: (codes) => {
    setErrorTextVisible(false)
    setScannerResult(codes[0].value)
  }
})

  function navigateTo(){
    if(!scannerResult){
      return
    }
    let target
    
    for(const table of screenNameParamsAll){
      try{
        if(scannerResult){
          const found = db.select().from(schema[table]).where(eq(schema[table][scanTarget], scannerResult.trim())).all()
          if(found.length !== 0){
            target = found
            break
          } 
        }
      }catch(e){
        console.error(e)
      }
    }
    if(target && target.length !== 0){
      setCurrentItem(target[0])
      navigation.navigate("item")
      setScannerVisible(false)
    } else {
      setErrorTextVisible(true)
    }
  }

  return (
    <ModalContainer visible={scannerVisible} setVisible={setScannerVisible}
                title={"QR Scanner"}
                subtitle={`Scan a QR code and select if the app should navigate to an entry based on its ID or on the "QR Code" Field entry"`}
                content={
                  <View style={{padding: defaultViewPadding}}>
                    <View style={{position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 20, overflow: "hidden"}}>
                      <Camera
                        style={{width: "100%", height: "100%"}}
                        device={device}
                        isActive={true}
                        codeScanner={codeScanner}
                      />
                    </View>
                    <View style={{position: "relative", width: "100%", flex: 1, marginTop: defaultViewPadding}}>
                      <View style={{display: "flex", flexDirection: "row", justifyContent: "space-between", height: 50}}>
                          <TouchableNativeFeedback onPress={()=>setScanTarget("id")}>
                              <View style={{
                                  borderTopLeftRadius: 15, 
                                  borderBottomLeftRadius: 15, 
                                  position: "relative", 
                                  width: "50%", 
                                  height: "100%", 
                                  backgroundColor: scanTarget === "id" ? theme.colors.primary : "transparent", 
                                  borderWidth: 1, 
                                  borderColor: scanTarget === "qrCode" ? theme.colors.primary : "transparent", 
                                  display: "flex", 
                                  justifyContent: "flex-start", 
                                  flexDirection: "row", 
                                  alignItems: "center", 
                                  paddingLeft: defaultViewPadding
                              }}>
                                  <Text style={{color: scanTarget === "id" ? theme.colors.onPrimary : theme.colors.onBackground}}>
                                      ID
                                  </Text>
                              </View>
                          </TouchableNativeFeedback>
                          <TouchableNativeFeedback onPress={()=>setScanTarget("qrCode")}>
                              <View style={{
                                  borderTopRightRadius: 15, 
                                  borderBottomRightRadius: 15, 
                                  position: "relative", 
                                  width: "50%", 
                                  height: "100%", 
                                  backgroundColor: scanTarget === "qrCode" ? theme.colors.primary : "transparent", 
                                  borderWidth: 1, 
                                  borderColor: scanTarget === "id" ? theme.colors.primary : "transparent", 
                                  display: "flex", 
                                  justifyContent: "flex-end", 
                                  flexDirection: "row", 
                                  alignItems: "center", 
                                  paddingRight: defaultViewPadding
                              }}>
                                  <Text style={{color: scanTarget === "qrCode" ? theme.colors.onPrimary : theme.colors.onBackground}}>
                                      QR Code
                                  </Text>
                              </View>
                          </TouchableNativeFeedback>
                      </View>
                      <View style={{marginTop: defaultViewPadding}}>
                        <TextInput
                          mode="outlined"
                          value={scannerResult}
                          multiline={true}
                          editable={false}
                          placeholder='Scan QR code...'
                        />
                      </View>
                      <Text>{errorTextVisible ? `No valid navigation found for ${scanTarget}: ${scannerResult}` : ``}</Text>
                    </View>
                  </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => navigateTo()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => setScannerVisible(false)} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonDEL={null} 
        />
  )
}
