<style lang="less">

  @import './assets/css/stylesheet.wxss';
  @import 'assets/css/common';
  @import 'assets/css/reset.wxss';

</style>

<script>
import wepy from 'wepy'
import 'wepy-async-function'

export default class extends wepy.app {
  config = {
    pages: [
      'pages/login/login',
      'pages/index/index'
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    }
  }

  globalData = {
    userInfo: null,
    baseUrl: 'http://120.25.177.192/jfbApi'//test
//    baseUrl: 'https://jfb.vshi5.com/jfbApi';//正式
  }

  constructor () {
    super()
    this.use('requestfix')
  }

  onLaunch() {
    this.testAsync()
  }

  sleep (s) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('promise resolved')
      }, s * 1000)
    })
  }

  async testAsync () {
    const data = await this.sleep(3)
    console.log(data)
  }

  getUserInfo(cb) {
    const that = this
    if (this.globalData.userInfo) {
      return this.globalData.userInfo
    }
    wepy.getUserInfo({
      success (res) {
        that.globalData.userInfo = res.userInfo
        cb && cb(res.userInfo)
      }
    })
  }
}
</script>
