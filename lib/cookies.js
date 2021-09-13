import config from '../config'

const {
  ACCESS_TOKEN_COOKIE_NAME,
  REFRESH_TOKEN_COOKIE_NAME
} = config

function getRefreshToken () {
  return localStorage.getItem(REFRESH_TOKEN_COOKIE_NAME)
}

function getAccessToken () {
  return localStorage.getItem(ACCESS_TOKEN_COOKIE_NAME)
}

function setTokens ({ refreshToken, accessToken }) {
  if (refreshToken)
    localStorage.setItem(REFRESH_TOKEN_COOKIE_NAME, refreshToken)
  if (accessToken)
    localStorage.setItem(ACCESS_TOKEN_COOKIE_NAME, accessToken)
}

function setAccessToken (accessToken) {
  localStorage.setItem(ACCESS_TOKEN_COOKIE_NAME, accessToken)
}

export default {
  getRefreshToken,
  getAccessToken,
  setTokens,
  setAccessToken
}
