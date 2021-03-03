<template>
  <div class="play">
    <swiper
      class="swiper"
      :current="activeIndex"
      :vertical="true"
      @change="swiperChange"
      @animationfinish="animationfinish"
    >
      <swiper-item v-for="item in videoList" :key="item.id">
        <div class="swiper__item">
          <video
            class="video"
            :id="item.id"
            :ref="item.id"
            :src="item.videoUrl"
            :controls="true"
            :custom-cache="false"
            :loop="false"
            :show-fullscreen-btn="false"
            :enable-play-gesture="true"
            :show-center-play-btn="true"
            @ended="activeIndex++"
          ></video>

          <div class="title">{{ item.title }}</div>
          <button class="share" open-type="share">
            <uni-icons type="weixin" size="20" color="#fff"></uni-icons>
            <span>分享给好友</span>
          </button>
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { data } from './data'
import { mixData, getRandomData } from 'utils'

export default {
  data() {
    return {
      videoList: [], // 视频列表
      activeIndex: 0, // 当前索引
    }
  },

  methods: {
    /**
     * 获取视频列表
     * @param id 点击的视频id
     */
    getVideoList(id) {
      const list = mixData(Object.values(data)).slice(0, 6)
      const current = data[id]
      list.unshift(current)
      this.videoList = list
      const videoContext = uni.createVideoContext(list[0].id)
      setTimeout(() => {
        videoContext.play()
      }, 200)
    },

    /**
     * 滑块索引改变
     */
    swiperChange() {
      const id = this.videoList[this.activeIndex].id
      const videoContext = uni.createVideoContext(id)
      videoContext.pause()
    },

    /**
     * 滑动结束
     */
    animationfinish(e) {
      const current = e.detail.current
      const id = this.videoList[current].id
      if (current > 10) {
        this.activeIndex = 0
        this.getVideoList(id)
        return
      }
      if (
        current - this.activeIndex > 0 &&
        this.videoList.length - current <= 3
      ) {
        this.videoList.push(this.getDiff())
      }
      this.activeIndex = current
      const videoContext = uni.createVideoContext(id)
      setTimeout(() => {
        videoContext.play()
      }, 200)
    },

    /**
     * 获取不同的内容
     */
    getDiff() {
      const video = getRandomData(Object.values(data))
      if (this.isAlready(video)) {
        return this.getDiff()
      } else {
        return video
      }
    },

    /**
     * 判断视频是否存在于列表中
     * @param video 当前视频
     */
    isAlready(video) {
      let flag = false
      this.videoList.map((item) => {
        if (item.id === video.id) flag = true
      })
      return flag
    },
  },

  onLoad(option) {
    const { id } = option
    this.getVideoList(id)
  },

  onShareAppMessage: function () {
    const video = this.videoList[this.activeIndex]
    const { id, title } = video
    return {
      title,
      path: `/pages/video/index?id=${id}`,
    }
  },
}
</script>

<style lang="scss" scoped>
.play {
  height: 100%;
  width: 100%;
  position: relative;
}

.swiper {
  height: 100%;
  .swiper__item {
    height: 100%;
    position: relative;
  }
  .video {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .title {
    line-height: 42rpx;
    font-size: 32rpx;
    color: #fff;
    position: absolute;
    bottom: 110rpx;
    padding: 0 280rpx 0 40rpx;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  .share {
    height: 60rpx;
    width: 220rpx;
    display: flex;
    background-color: #2db200;
    justify-content: space-around;
    align-items: center;
    position: absolute;
    bottom: 110rpx;
    right: 40rpx;
    font-size: 24rpx;
    padding: 20rpx;
    color: #fff;
    z-index: 9999;
  }
}
</style>
