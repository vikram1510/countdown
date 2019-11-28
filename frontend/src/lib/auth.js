
class Auth {

  static setToken(melCode) {
    localStorage.setItem('melCode', melCode)
  }
  
  static getToken() {
    return localStorage.getItem('melCode')
  }

  static removeToken(){
    localStorage.removeItem('melCode')
  }

  static isItMel() {
    const checkToken = this.getToken()
    if (!checkToken) return false

    return checkToken === 'mel25th'
  }

  static verifyCode(code){
    return code === '1510'
  }
}

export default Auth
