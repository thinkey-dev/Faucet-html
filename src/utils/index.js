import {getChainInfoStruct} from '../api/interface'

export default {
  install(Vue, opt) {
    /*hash截取*/
    Vue.prototype.slice_hash = function (e) {
      if (e == '' || e == null || e == undefined) {
        return ''
      } else {
        let a = e.slice(0, 5)
        let b = e.substring(e.length - 5)
        let c = a + '*****' + b
        return c

      }

    }
    /*时间戳转换*/
    Vue.prototype.timestampToTime = function (timestamp) {
      if (timestamp == '' || timestamp == null || timestamp == undefined) {
        return ''
      } else {
        let Y, M, D, h, m, s
        let date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
        Y = date.getFullYear() + '-';
        M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        D = date.getDate() + ' ';
        h = date.getHours() + ':';
        m = date.getMinutes() + ':';
        s = date.getSeconds();
        return Y + M + D + h + m + s;
      }

    }

  }
}
