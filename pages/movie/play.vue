<template>
  <div class="play">
    <div class="video-box">
      <video
        class="video"
        :title="title"
        :id="videoData.id"
        :ref="videoData.id"
        :src="videoUrl"
        :controls="true"
        :custom-cache="false"
        :loop="false"
        :enable-play-gesture="true"
        :show-center-play-btn="true"
        @ended="playEnd"
      ></video>
    </div>

    <div class="video-detail">
      <div class="title">
        <span>{{ videoData.title }}</span>
        <span class="desc">({{ videoData.desc }})</span>
      </div>
      <div class="indexes">
        <div
          class="indexes__item"
          :class="{ active: activeIndex == item.index }"
          v-for="item in videoData.videos"
          :key="item.index"
          @click="handleChange(item.index)"
        >
          {{ videoData.type === 'movie' ? `线路${item.index}` : `第${item.index}集` }}
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="collection" @click="handleCollect">
        <uni-icons
          v-if="isCollect"
          type="heart-filled"
          size="20"
          color="#007aff"
        ></uni-icons>
        <uni-icons v-else type="heart" size="20" color="#007aff"></uni-icons>
        <span>收藏</span>
      </div>

      <button class="share" open-type="share">
        <uni-icons type="redo-filled" size="20" color="#fff"></uni-icons>
        <span>分享</span>
      </button>
    </div>
  </div>
</template>

<script>
import { data } from './data'

export default {
  data() {
    return {
      videoData: {}, // 视频数据
      activeIndex: '', // 当前选中的集数
      isCollect: false, // 是否已收藏
    }
  },

  computed: {
    title() {
      const { title, type } = this.videoData
      const showTitle = type === 'movie' ? title : `${title} 第${this.activeIndex}集`
      return showTitle
    },
    videoUrl() {
      let url = ''
      this.videoData.videos.map((item) => {
        if (item.index == this.activeIndex) url = item.url
      })
      return url
    },
  },

  methods: {
    /**
     * 视频播放结束
     */
    playEnd() {
      this.activeIndex++
      const videoContext = uni.createVideoContext(this.videoData.id)
      setTimeout(() => {
        videoContext.play()
      }, 200)
    },

    /**
     * 切换集数
     */
    handleChange(index) {
      this.activeIndex = index
      const videoContext = uni.createVideoContext(this.videoData.id)
      setTimeout(() => {
        videoContext.play()
      }, 200)
    },

    /**
     * 收藏
     */
    handleCollect() {
      uni.showToast({
        icon: 'none',
        title: '功能暂未开放！',
        duration: 1500,
      })
    },
  },

  onLoad(option) {
    const { id, index } = option
    this.videoData = data[id]
    const videoIndex = data[id].videos[0].index
    this.activeIndex = videoIndex > index ? videoIndex : index
    const videoContext = uni.createVideoContext(id)
    setTimeout(() => {
      videoContext.play()
    }, 200)
  },

  onShareAppMessage: function () {
    const { videoData, activeIndex, title } = this
    return {
      title: `${title}-最新影视剧全集免费观看`,
      path: `/pages/movie/index?id=${videoData.id}&index=${activeIndex}`,
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

.video-box {
  height: 420rpx;
  width: 100%;
  .video {
    height: 100%;
    width: 100%;
  }
}

.video-detail {
  height: calc(100% - 520rpx);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  .title {
    height: 72rpx;
    line-height: 72rpx;
    padding: 0 30rpx;
  }
  .desc {
    font-size: 24rpx;
    margin-left: 20rpx;
  }
  .indexes {
    padding: 30rpx;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    grid-gap: 20rpx;
  }
  .indexes__item {
    height: 50rpx;
    width: 120rpx;
    line-height: 50rpx;
    border-radius: 25rpx;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
    background-color: #ccc;
    &.active {
      background-color: $uni-color-primary;
    }
  }
}

.bottom {
  height: 100rpx;
  width: 100%;
  display: flex;
  .collection,
  .share {
    height: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 32rpx;
    span {
      margin-left: 20rpx;
    }
  }
  .collection {
    color: $uni-color-primary;
    background-color: #fff;
    border-top: 1px solid #eee;
  }
  .share {
    color: #fff;
    background-color: $uni-color-primary;
    border-radius: 0;
    padding: 0;
  }
}
</style>
