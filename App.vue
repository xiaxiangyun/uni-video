<script>
export default {
  onLaunch() {
    console.log('App Launch')
  },
  onShow() {
    console.log('App Show')
  },
  onHide() {
    console.log('App Hide')
  },
  onShareAppMessage() {},
  onShareTimeline() {},
}
</script>

<style lang="scss">
page {
  height: 100%;
  width: 100%;
  position: relative;
}

page, div, view, text, input {
  box-sizing: border-box;
}

.word-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
