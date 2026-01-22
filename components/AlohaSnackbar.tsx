import { defaultBottomBarHeight, defaultViewPadding } from 'configs/configs';
import { Snackbar } from 'react-native-paper';
import { useTextStore } from 'stores/useTextStore';
import { useViewStore } from 'stores/useViewStore';

export default function AlohaSnackbar(){

  const { alohaSnackbarVisible, setAlohaSnackbarVisible, hideBottomSheet } = useViewStore()
  const { alohaSnackbarText } = useTextStore()
  
  const onDismissSnackBar = () => setAlohaSnackbarVisible(false);

    return(
        <Snackbar
        wrapperStyle={{
          marginBottom: hideBottomSheet ? 0 : defaultBottomBarHeight,
        }}
        visible={alohaSnackbarVisible}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'OK',
          onPress: () => {
            onDismissSnackBar
          },
        }}>
        {alohaSnackbarText}
      </Snackbar>
    )
}