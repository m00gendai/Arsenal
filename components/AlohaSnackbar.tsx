import { useState } from 'react';
import { Text, Snackbar } from 'react-native-paper';
import { useViewStore } from 'stores/useViewStore';

export default function AlohaSnackbar(){

  const { alohaSnackbarVisible, setAlohaSnackbarVisible } = useViewStore()
  
  const onDismissSnackBar = () => setAlohaSnackbarVisible(false);
console.log("ALOHA")
console.log(alohaSnackbarVisible)
    return(
        <Snackbar
        visible={alohaSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Undo',
          onPress: () => {
            onDismissSnackBar
          },
        }}>
        Hey there! I'm a Snackbar.
      </Snackbar>
    )
}