<template>
  <div class="video">
    <div
      class="video__item"
      v-for="(item, index) in videoList"
      :key="index"
      @click="handlePlay(item.id)"
    >
      <div
        class="image"
        :style="{
          backgroundImage: `url(${item.imageUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center 50%',
        }"
      >
        <div class="times">
          <uni-icons type="videocam-filled" size="20" color="#fff"></uni-icons>
          <span>{{ item.desc }}</span>
        </div>
      </div>
      <div class="title word-ellipsis">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { data } from './data'
import { mixData } from 'utils'

export default {
  data() {
    return {
      list: [], // 视频列表
      page: 1,
    }
  },

  computed: {
    allpage() {
      return Math.ceil(this.list.length / 10)
    },
    videoList() {
      return this.list.slice(0, this.page * 10)
    },
  },

  methods: {
    /**
     * 获取视频列表
     */
    getVideoList() {
      this.list = mixData(Object.values(data)).slice(0, 100)
    },

    /**
     * 播放视频
     */
    handlePlay(id) {
      const url = `/pages/video/play?id=${id}`
      uni.navigateTo({ url })
    },
  },

  onReachBottom() {
    if (this.page >= this.allpage) {
      this.page = 1
      this.getVideoList()
      return
    }
    this.page++
  },

  onLoad(option) {
    const { id } = option
    if (id) {
      const url = `/pages/video/play?id=${id}`
      uni.navigateTo({ url })
    }
    this.getVideoList()
  },

  onPullDownRefresh() {
    setTimeout(() => {
      this.page = 1
      this.getVideoList()
      uni.stopPullDownRefresh()
    }, 1000)
  },
}
</script>

<style lang="scss" scoped>
.video {
  width: 100%;
  position: relative;
}

.video__item {
  height: 494rpx;
  width: 100%;
  .image {
    height: 422rpx;
    width: 100%;
    position: relative;
    background-color: #191f25;
    background-repeat: no-repeat;
  }
  .times {
    position: absolute;
    bottom: 25rpx;
    right: 25rpx;
    height: 44rpx;
    width: 120rpx;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 24rpx;
    padding-right: 2px;
  }
  .title {
    height: 72rpx;
    line-height: 72rpx;
    padding: 0 30rpx;
  }
}
</style>
