// 封装基于ls存取删三个方法

const TOKENKEY = 'HUGS_USER_TOKEN'

function setToken (token:string) {
  return localStorage.setItem(TOKENKEY, token)
}

function getToken () {
  return localStorage.getItem(TOKENKEY)
}

function removeToken () {
  return localStorage.removeItem(TOKENKEY)
}

export {
  setToken,
  getToken,
  removeToken
}