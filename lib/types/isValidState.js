import {
  ValidState
} from '../enums'

export function isValidState (_validState) {
  return Object.values(ValidState).includes(_validState)
}
