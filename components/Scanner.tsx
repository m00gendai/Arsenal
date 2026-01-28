import { useState } from 'react';
import { View } from 'react-native';
import { Button, Text } from "react-native-paper"
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
import * as schema from "db/schema"
import { db } from "db/client"
import { eq } from 'drizzle-orm';
import { useItemStore } from 'stores/useItemStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackParamList } from 'lib/interfaces';
import { screenNameParamsAll } from 'configs/configs';

interface Props{
  setScannerVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Scanner({setScannerVisible}:Props){

    const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
    const device = useCameraDevice('back')
    const { hasPermission, requestPermission } = useCameraPermission()
    const [scannerResult, setScannerResult] = useState<string>("")
    const [scanTarget, setScanTarget] = useState<"id" | "qrCode">("qrCode")

    const { currentCollection, setCurrentItem } = useItemStore()
    

  if (!hasPermission) {
    requestPermission()
    return <View />;
  }

const codeScanner = useCodeScanner({
  codeTypes: ['qr', 'ean-13'],
  onCodeScanned: (codes) => {
    setScannerResult(codes[0].value)
  }
})

  function navigateTo(){
    if(!scannerResult){
      return
    }
    let target
    console.log(scannerResult)
    for(const table of screenNameParamsAll){
      try{
        if(scannerResult){
          const found = db.select().from(schema[table]).where(eq(schema[table][scanTarget], scannerResult)).all()
          if(found.length !== 0){
            target = found
            return
          } else {
            return
          }
        }
      }catch(e){
        console.error(e)
      }
    }
    console.log(target)
    if(target?.length !== 0){
      setCurrentItem(target[0])
      navigation.navigate("item")
      setScannerVisible(false)
    }
  }

  return (
    <View style={{width: "80%", aspectRatio: "1/2", backgroundColor: "red"}}>
      <Camera
      style={{width: "100%", height: "50%"}}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
    />
      <View >
        <Text>{scannerResult}</Text>
        <Button onPress={()=>navigateTo()}>Navigate to</Button>
      </View>
    </View>
  );
}
