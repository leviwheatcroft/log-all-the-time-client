import {
  isUser
} from './isUser'
export function isUsers (_users) {
  return (
    Array.isArray(_users) &&
    _users.every(isUser)
  )
}
