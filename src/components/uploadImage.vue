<style lang="less">
  @import "../assets/css/common";
  .icon-upload{
    font-size: 150rpx;
    vertical-align: top;
    display: inline-block;
  }
  .imgList{
    image{
      width: 200rpx;
      height: 200rpx;
      .marginRight;
      .marginBottom;
    }
  }
</style>
<template>
  <view class=" marginTop bgWhite  fs30">
    <view class="paddingAll borderBottom">附加图片 <text class="gray">({{imageList.length}}/9)</text></view>
    <view class="overflow imgList paddingAll">

        <block wx:for="{{imageList}}" wx:key="">
          <image src="{{item}}" @tap="previewImage({{item}})"></image>
        </block>
        <text class=" iconfont icon-upload " @tap = "chooseImage" wx:if="{{imageList.length<9}}"></text>
    </view>
  </view>
</template>
<script>
  import wepy from 'wepy'
  import tips from '../common/tips';

  export default class UploadImage extends wepy.component {
    data = {
      imageList:[],
      imgLink:[]
    }
    props={
      imgUrl:{
        type:String,
        twoWay:true
      }
    }
    events = {

    }
    watch={
      imageList(val){
        console.log(val)
        this.imgUrl=this.imgLink.join(',')
      }
    }
    methods = {
      previewImage(currentImage){
        console.log(currentImage);
        wx.previewImage({
          current: currentImage, // 当前显示图片的http链接
          urls: this.imageList // 需要预览的图片http链接列表
        })
      },
      chooseImage(){
        let that = this;
        if(this.imageList.length>=9) return
        wx.chooseImage({
          count: 9-this.imageList.length, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            var tempFilePaths = res.tempFilePaths;
            tips.loading();
            let num = 0;
            for(let i = 0;i<tempFilePaths.length;i++){
              wx.uploadFile({
                url:wepy.$instance.globalData.baseUrl+'/imageUpload/imgUploadFile',
                filePath: tempFilePaths[i],
                name: 'file',
                success: function(resdata){
                  console.log(resdata);

                  if(resdata.statusCode==200){
                    let obj = JSON.parse(resdata.data);
                    console.log(that.imageList);
                    that.imageList.push(tempFilePaths[i]);
                    that.imgLink.push(obj.data.url);
                  }
                  num++;
                  if(num==tempFilePaths.length){
                    tips.loaded();
                  }
                  that.$apply();
                }
              })
            }

          }
        })
      }
    }

    onLoad () {
      if(this.imgUrl){
        this.imageList = this.imgUrl.split(',')
      }
    }
  }
</script>
