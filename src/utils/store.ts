import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

type State = {
    light: boolean
    user: any
    profileImg: string
    fcmEnabled: boolean
    fcmSettings: {
        tokens: { [key: string]: string }
        topics: { [key: string]: string }
    }
}

const initialState: State = {
    light: true,
    user: null,
    profileImg: null,
    fcmEnabled: false,
    fcmSettings: null,
}

const reducer = (state: State = initialState, action): State => {
    switch (action.type) {
        case 'TURN_OFF_LIGHT':
            return {
                ...state,
                light: false,
            }
        case 'TURN_ON_LIGHT':
            return {
                ...state,
                light: true,
            }
        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            }
        case 'UNSET_USER':
            return {
                ...state,
                user: null,
                profileImg: null,
            }
        case 'SET_PROFILE_IMAGE':
            return {
                ...state,
                profileImg: action.url,
            }
        case 'SET_FCM_SETTINGS':
            return {
                ...state,
                fcmSettings: action.fcmSettings,
            }
        case 'SET_FCM_ENABLED':
            return {
                ...state,
                fcmEnabled: action.enabled,
            }
        default:
            return state
    }
}

export const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware())
)
