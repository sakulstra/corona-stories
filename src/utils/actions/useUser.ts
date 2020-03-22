import { useSelector, useDispatch } from 'react-redux'

export const useUser = () => {
    const user = useSelector((state) => state.user)
    const profileImg = useSelector((state) => state.profileImg)
    const dispatch = useDispatch()
    const setUser = (user: any) => {
        dispatch({ type: 'SET_USER', user })
    }
    const unsetUser = () => {
        dispatch({ type: 'UNSET_USER' })
    }
    const setProfilePicture = (url) => {
        dispatch({ type: 'SET_PROFILE_IMAGE', url: url })
    }
    return { user, profileImg, setUser, unsetUser, setProfilePicture }
}
