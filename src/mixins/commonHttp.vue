<script>
  import wepy from 'wepy';
  import {myTool} from '../common/myTool'
  import http from '../common/http';

  export default class commonHttp extends wepy.mixin {
    data = {
      input: {},
      scoreRange:[]
    };
    // 卸载页面
    onUnload() {

    }
    async getScoreRange(){
      let that = this;
      let res = await http.post('/module/getModuleDetail', {
      });
      if(res.code==200000){
        // get score select range
        let minScore = res.data.moduleDetail.minuxScore;
        let maxScore = res.data.moduleDetail.maxScore;
        let level = res.data.moduleDetail.level;
        that.scoreRange = myTool.getScoreRange(minScore,maxScore,level);
      }
    }
    methods = {

    }
  }
</script>
