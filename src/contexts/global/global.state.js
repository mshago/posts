import { authState } from "../auth/auth.state"
import { errorState  } from '../error/error.state'
import { networkState } from '../network/network.state'
import { userState } from '../user/user.state'

export const globalState = {
  auth:authState,
  error:errorState,
  network:networkState,
  user:userState,
}