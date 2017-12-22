import wepy from 'wepy'
import Tips from './tips';
const app = getApp();

// HTTP工具类
export default class http {
  static async request (method, url, data) {
    var newObj = {};
    if(wepy.$instance.globalData.userData){
      newObj.userId=wepy.$instance.globalData.userData.userId;
      newObj.token=wepy.$instance.globalData.userData.token;
      for(let i in data){
        if(!newObj[i]){
          newObj[i]=data[i]
        }
      }
    }
    const param = {
      url:wepy.$instance.globalData.baseUrl+ url,
      method: method,
      data: newObj
    };
    Tips.loading();
    const res = await wepy.request(param);
    Tips.loaded();
    if (this.isSuccess(res)) {
      return res.data;
    } else {
      return '请求失败'
      console.error(method, url, data, res);
      throw this.requestException(res);
    }
  }

  /**
   * 判断请求是否成功
   */
  static isSuccess(res) {
    const wxCode = res.statusCode;
    // 微信请求错误
    if (wxCode !== 200) {
      return false;
    }else{
      return true;
    }

    const wxData = res.data;
    return !(wxData && wxData.code != 0);
  }

  /**
   * 异常
   */
  static requestException(res) {
    const error = {};
    error.statusCode = res.statusCode;
    const wxData = res.data;
    const serverData = wxData.data;
    if (serverData) {
      error.serverCode = wxData.code;
      error.message = serverData.message;
      error.serverData = serverData;
    }
    return error;
  }

  static get (url, data) {
    return this.request('GET', url, data)
  }

  static put (url, data) {
    return this.request('PUT', url, data)
  }

  static post (url, data) {
    return this.request('POST', url, data)
  }

  static patch (url, data) {
    return this.request('PATCH', url, data)
  }

  static delete (url, data) {
    return this.request('DELETE', url, data)
  }
}
