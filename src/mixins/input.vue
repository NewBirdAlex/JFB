<script>
  import wepy from 'wepy';
  export default class input extends wepy.mixin {
    data = {
      input: {}
    };
    // 卸载页面
    onUnload() {
      this.input = {};
    }
    onInput(e) {
      const fieldName = e.currentTarget.id;
      this.input[fieldName] = e.detail.value;
    }
    methods = {
      // 处理输入事件
      input(e) {
        const fieldName = e.currentTarget.id;
        this.input[fieldName] = e.detail.value;
      },
      // 处理单选事件
      radio(e) {
        const fieldName = e.currentTarget.id;
        this.input[fieldName] = e.detail.value;
      }
    };
  }
</script>
