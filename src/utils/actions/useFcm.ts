import { useSelector, useDispatch } from 'react-redux'

export const useFcm = () => {
    const fcmSettings = useSelector((state) => state.fcmSettings)
    const fcmEnabled = useSelector((state) => state.fcmEnabled)
    const dispatch = useDispatch()
    const setFcmSettings = (fcmSettings: any) => {
        dispatch({ type: 'SET_FCM_SETTINGS', fcmSettings })
    }
    const setFcmEnabled = (enabled: boolean) => {
        dispatch({ type: 'SET_FCM_ENABLED', enabled })
    }
    return { fcmSettings, fcmEnabled, setFcmSettings, setFcmEnabled }
}
