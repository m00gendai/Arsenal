import { useState } from 'react';
import { View } from 'react-native';
import { IconButton, RadioButton, Text, TextInput } from "react-native-paper"
import { Camera, useCameraDevice, useCameraPermission, useFrameProcessor } from 'react-native-vision-camera';
import { useTextRecognition } from 'react-native-vision-camera-ocr-plus';
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
import { useRunOnJS } from 'react-native-worklets-core';

interface Props{
  ocrVisible: boolean
  setOcrVisible:React.Dispatch<React.SetStateAction<boolean>>
}

export default function Scanner({ocrVisible, setOcrVisible}:Props){

  const navigation = useNavigation<NativeStackNavigationProp<StackParamList>>()
  const device = useCameraDevice('back')
  const { hasPermission, requestPermission } = useCameraPermission()
  const [scannerResult, setScannerResult] = useState(null)
  const [scanTarget, setScanTarget] = useState<"id" | "qrCode">("id")
  const [errorTextVisible, setErrorTextVisible] = useState<boolean>(false)
  const [cameraLayout, setCameraLayout] = useState({ width: 1, height: 1 });
  const [frameSize, setFrameSize] = useState({ width: 1920, height: 1080 });

  const { scanText } = useTextRecognition({
    language: 'latin',
    frameSkipThreshold: 10,      // Process every 10th frame
    useLightweightMode: true,    // Skip detailed corner points and element processing
    /*scanRegion: {
      left: '5%',    // Start 5% from the left edge
      top: '25%',     // Start 25% from the top edge
      width: '80%',   // Span 80% of frame width
      height: '40%'   // Span 40% of frame height
    }*/
  });

  const { setCurrentItem } = useItemStore()
  const { theme, language } = usePreferenceStore()

  const updateResult = useRunOnJS((data: any, frameWidth: number, frameHeight: number) => {
    setScannerResult(data.blocks)
    setFrameSize({ width: frameWidth, height: frameHeight });
    console.log("frameSize from frame:", frameWidth, frameHeight)
    console.log("first block:", JSON.stringify(data.blocks?.[0]?.blockFrame))
  }, []);

  const frameProcessor = useFrameProcessor((frame) => {
    'worklet';
    const data = scanText(frame);
    if (data) {
      updateResult(data, frame.width, frame.height);
    }
  }, [updateResult]);
    

  if (!hasPermission) {
    requestPermission()
    return <View />;
  }

  function handleCancel(){
    setScannerResult(null)
    setErrorTextVisible(false)
    setOcrVisible(false)
  }

  return (
    <ModalContainer 
      visible={ocrVisible} 
      setVisible={setOcrVisible}
      title={scannerNavigate.title[language]}
      subtitle={scannerNavigate.subtitle[language]}
      content={
        <View style={{padding: defaultViewPadding}}>
          <View 
            style={{position: "relative", width: "100%", aspectRatio: "1/1", borderRadius: 20, overflow: "hidden"}} 
            onLayout={(e) => {
              const { width, height } = e.nativeEvent.layout;
              console.log("camera layout", width, height);
              setCameraLayout({ width, height });
            }}
          >
            <Camera
              style={{width: "100%", height: "100%"}}
              device={device}
              isActive
              frameProcessor={frameProcessor}
            />
            
            {scannerResult?.map((block, index) => {
              const frameAspect = frameSize.width / frameSize.height;
              const renderedHeight = cameraLayout.width / frameAspect;
              const offsetY = (cameraLayout.height - renderedHeight) / 2;
              const scaleX = cameraLayout.width / frameSize.width;
              const scaleY = renderedHeight / frameSize.height;
              return block.lines.map((line, indx) =>{
                const left = (line.lineFrame.boundingCenterX - line.lineFrame.width / 2) * scaleX;
                const top = (line.lineFrame.boundingCenterY - line.lineFrame.height / 2) * scaleY;
                const width = line.lineFrame.width * scaleX;
                const height = line.lineFrame.height * scaleY;
                
                return (
                  <View
                    key={`view_${indx}`}
                    style={{
                      position: "absolute",
                      top: top,
                      left: left,
                      backgroundColor: "rgba(255,0,0,0.4)",
                      padding: 2,
                    }}
                  >
                    <Text style={{color: "yellow", fontSize: height, backgroundColor: "black" }}>
                      {line.lineText}
                    </Text>
                  </View>
                )
              })
            })}
          </View>
          
          <View style={{position: "relative", width: "100%", flex: 1, marginTop: defaultViewPadding}}>
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
      buttonACK={<IconButton icon="check" onPress={() => null} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
      buttonCNL={<IconButton icon="cancel" onPress={() => handleCancel()} style={{width: 50, backgroundColor: theme.colors.primary}} iconColor={theme.colors.onPrimary}/>}
      buttonDEL={null} 
    />
  )
}
