<template>
  <div class="movie">
    <div
      class="movie__item"
      v-for="(item, index) in movieList"
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
        <div class="desc">{{ item.desc }}</div>
      </div>
      <div class="title word-ellipsis">{{ item.title }}</div>
    </div>
  </div>
</template>

<script>
import { data } from './data'

export default {
  data() {
    return {
      movieList: Object.values(data),
    }
  },

  methods: {
    /**
     * 播放视频
     */
    handlePlay(id) {
      const url = `/pages/movie/play?id=${id}&index=1`
      uni.navigateTo({ url })
    },
  },

  onLoad(option) {
    const { id, index } = option
    if (id && index) {
      const url = `/pages/movie/play?id=${id}&index=${index}`
      uni.navigateTo({ url })
    }
  },
}
</script>

<style lang="scss" scoped>
.movie {
  height: 100%;
  width: 100%;
  position: relative;
}

.movie__item {
  height: 494rpx;
  width: 100%;
  .image {
    height: 422rpx;
    width: 100%;
    position: relative;
    background-color: #191f25;
    background-repeat: no-repeat;
  }
  .desc {
    position: absolute;
    bottom: 25rpx;
    right: 25rpx;
    height: 44rpx;
    width: 160rpx;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24rpx;
  }
  .title {
    height: 72rpx;
    line-height: 72rpx;
    padding: 0 30rpx;
  }
}
</style>
