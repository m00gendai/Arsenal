import { useEffect, useRef, useState } from 'react';
import { View } from 'react-native';
import { IconButton, RadioButton, Text, TextInput } from "react-native-paper"
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { useItemStore } from 'stores/useItemStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from 'lib/interfaces';
import { defaultViewPadding, screenNameParamsAll } from 'configs/configs';
import { usePreferenceStore } from 'stores/usePreferenceStore';
import ModalContainer from './ModalContainer';
import { scannerNavigate } from 'lib/Text/textTemplates_scanner';
import { useAudioPlayer } from 'expo-audio';

const audioSource = require('../assets/beep.wav');

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
    const isScanning = useRef(false)
    const lastScannedValue = useRef<string | null>(null);

    const { setCurrentItem } = useItemStore()
    const { theme, language, generalSettings } = usePreferenceStore()
    
    const player = useAudioPlayer(audioSource);

    useEffect(() => {
  if (scannerVisible) {
    isScanning.current = false;
    lastScannedValue.current = null;
  }
}, [scannerVisible]);
  

const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13'],
  onCodeScanned: (codes) => {
    if (isScanning.current) return;
    isScanning.current = true;  // lock immediately

    const value = codes[0]?.value;
    if (!value) {
      isScanning.current = false;
      return;
    }

    if (lastScannedValue.current !== value) {
      lastScannedValue.current = value;
      if(generalSettings.scanBeep){
        player.seekTo(0);
        player.play();
      } 
      setScannerResult(value);
      setErrorTextVisible(false);
    }

    setTimeout(() => {
      isScanning.current = false;
    }, 1000)
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
      setErrorTextVisible(false)
      setScannerVisible(false)
    } else {
      setErrorTextVisible(true)
    }
  }

  function handleScanTarget(target: "id" | "qrCode"){
    setErrorTextVisible(false)
    setScanTarget(target)
  }

  function handleCancel(){
  isScanning.current = false;
  lastScannedValue.current = null;
  setScannerResult(null)
  setErrorTextVisible(false)
  setScannerVisible(false)
  }

  if (!hasPermission) {
    requestPermission()
    return <View />;
  }

  return (
    <ModalContainer visible={scannerVisible} setVisible={setScannerVisible}
                title={scannerNavigate.title[language]}
                subtitle={scannerNavigate.subtitle[language]}
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
                        <View style={{display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
                          <RadioButton.Android
                            value="id"
                            status={ scanTarget === 'id' ? 'checked' : 'unchecked' }
                            onPress={() => handleScanTarget('id')}
                          />
                          <Text>Arsenal Code</Text>
                        </View>
                        <View style={{display: "flex", justifyContent: "flex-start", alignItems: "center", flexDirection: "row"}}>
                          <Text>QR Code</Text>
                          <RadioButton.Android
                            value="qrCode"
                            status={ scanTarget === 'qrCode' ? 'checked' : 'unchecked' }
                            onPress={() => handleScanTarget('qrCode')}
                          />
                          
                        </View>
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
                      <Text>{errorTextVisible ? `${scannerNavigate.error[language].replace("{{{A}}}", scanTarget)} ${scannerResult}` : ``}</Text>
                    </View>
                  </View>
                }
                buttonACK={<IconButton icon="check" onPress={() => navigateTo()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
                buttonDEL={null} 
        />
  )
}
