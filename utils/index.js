/**
 * Created by xxy on 2021/2/24.
 * @description 项目中的公共方法
 */

/**
 * 从数组中随机取一个值
 * @param arr 数组
 */
export function getRandomData(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

/**
 * 将数组打乱
 * @param arr 数组
 */
export function mixData(arr) {
  return arr.sort(() => {
    return .5 - Math.random()
  })
}

/**
 * 取范围内的随机数
 * @param m 最小数
 * @param n 最大数
 */
export function getRandomNum(m, n) {
  return Math.floor(Math.random() * (m - n) + n)
}

/**
 * 复制文本
 * @param data 内容
 */
export function copyText(data = '') {
  uni.setClipboardData({
    data,
    success: function () {
      uni.showToast({
        icon: 'none',
        title: '复制成功！',
        duration: 1500
      })
    }
  })
}