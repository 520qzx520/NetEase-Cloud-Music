<template>
  <div class="box">
    
    <div class="right">
      <div class="right-margin">
        <div class="right-img">
          <img :src="imgURl" />
          <span class="bgt"></span>
        </div>
        <div class="right-sub">
          <div>
            <i class="i"></i>
            <h3>{{ name }}</h3>
            <div class="singer">
              <span>歌手</span>
              <span class="span">{{ singer }}</span>
            </div>
            <div class="zj">
              <span>所属专辑:</span>
              <span>{{ zjname }}</span>
            </div>

            <div class="icon">
              <a class="play" @click="getUrl($route.params.id)">
                <i class="play-icon"></i>
                <span>播放</span>
              </a>
              <a class="add"></a>
              <a class="dis">
                <span>收藏</span>
              </a>
              <a class="share">
                <span>分享</span>
              </a>
              <a class="download"><span>下载</span></a>
              <a class="comment">
                <span>{{ com }}</span>
              </a>
            </div>
          </div>
          <!-- 歌词 -->
            <div class="lyric">
              <h4>歌词</h4>
          <p v-for="(item,index) in lyric" :key="index">
            {{item}}
          </p>
        </div>
        </div>

      


      </div>

      <!-- 评论 -->
      <Comment :id="this.$route.params.id" />
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  import Comment from './Comment.vue';
  export default {
    data() {
      return {
        imgURl: '',
        name: '',
        singer: '',
        zjname: '',
        com: '',
        lyric: {},
      };
    },
    components: {
      Comment,
    },
    mounted() {
      this.getSong(this.$route.params.id);

      this.eventHub.$on('goLyric', (Lyric) => {
        this.getlyric();
      });
    },

    methods: {
      async getSong(id) {
        let res = await api.getSong(id);

        let song = res.data.songs[0];

        this.imgURl = song.al.picUrl;
        this.name = song.name;
        this.singer = song.ar[0].name;
        this.zjname = song.al.name;
        this.com = song.cp;

        // console.log(res.data);
      },

      //传递id播放,调用其他页面的方法,播放
      async getUrl(id) {
        await this.$store.dispatch('GetMusicData/getMusicUrl', id);
        
        this.eventHub.$emit('goData', 'Go');
      },
      //通过vuex得到歌词
      async getlyric() {
        this.lyric = await this.$store.state.GetMusicData.lyric;
        // console.log(this.lyric,1111);
      },
      cutString(str) {
        if (str) {
          if (str.length > 8) {
            return str.substring(0, 8) + '...';
          }
          return str;
        }
        return '';
      },
    },
    //销毁
      unmounted () {
      //      console.log(1111)
      // this.eventHub.$off('goData')
    }
  };
</script>

<style lang="less" scoped>
  .box {
    width: 980px;
    margin: 0 auto;
    border: 1px solid #ddd;
    background: #fff;
  }
  .right {
    width: 710px;
    border-right: 1px solid #ddd;
    border-bottom: 1px solid #ddd;
    .right-margin {
      display: flex;
      margin: 0 40px;
      width: 660px;

      .right-img {
        position: relative;
        margin: 60px 40px;
        width: 196px;
        height: 196px;
        img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
        .bgt {
          display: block;
          width: 206px;
          height: 205px;
          position: absolute;
          top: -38px;
          left: -38px;
          background: url(./img/coverall.6cb90dbc.png) no-repeat -140px -580px;
        }
      }

      .right-sub {
        width: 410px;
        margin: 20px;
        .i {
          display: block;
          float: left;
          width: 54px;
          height: 24px;
          background: url(./img/icon.29cd8439.png) no-repeat 0 -463px;
        }
        h3 {
          font-size: 20px;
          padding: 0 0 20px 20px;
        }
        .singer {
          margin-bottom: 20px;
          img {
            width: 30px;
            height: 30px;
          }
          .span {
            padding: 0 10px;
          }
        }
        .zj {
          margin-top: 10px;
          span {
            padding-right: 10px;
          }
        }
        p {
          padding-top: 20px;
          font-size: 13px;
        }

        .icon {
          margin-top: 20px;
          a {
            color: black;
          }
          span {
            font-size: 12px;
          }
          display: flex;
          .play {
            width: 66px;
            padding-left: 5px;
            background: url(./img/button2.30a1d480.png) no-repeat 0 -1652px;
            text-align: center;
            line-height: 31px;
            height: 31px;
            border-top-left-radius: 5px;
            border-bottom-left-radius: 5px;
            i {
              width: 20px;
              height: 18px;
              margin: 6px 2px 2px 0;
              float: left;
              background: url(./img/button2.30a1d480.png) no-repeat 0 -1622px;
            }
          }
          .add {
            width: 31px;
            height: 31px;
            margin-right: 5px;
            background: url(./img/button2.30a1d480.png) no-repeat 0 -1588px;
          }
          .dis {
            width: 92.6px;
            margin-right: 6px;
            height: 100%;
            background: url(./img/button2.30a1d480.png) no-repeat;
            background-position: 0 -1063px;
            span {
              display: inline-block;
              height: 100%;
              width: 68%;
              background: url(./img/button2.30a1d480.png) no-repeat right -1106px;
              line-height: 30px;
              padding-left: 30px;
            }
          }
          .share {
            width: 79.8px;
            height: 31px;
            margin-right: 6px;
            float: left;
            line-height: 30px;
            min-width: 23px;
            cursor: pointer;
            background: url(./img/button2.30a1d480.png) no-repeat;
            background-position: 0 -1225px;
            span {
              width: 66%;
              height: 100%;
              display: inline-block;
              line-height: 30px;
              padding-left: 28px;
              background: url(./img/button2.30a1d480.png) no-repeat;
              background-position: right -1022px;
            }
          }
          .download {
            margin-right: 5px;
            width: 60px;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            cursor: pointer;
            background: url(./img/button2.30a1d480.png) no-repeat;
            background-position: 0 -2761px;
            span {
              width: 53%;
              height: 100%;
              display: inline-block;
              line-height: 30px;
              padding-left: 28px;
              background: url(./img/button2.30a1d480.png) no-repeat;
              background-position: right -1022px;
            }
          }
          .comment {
            margin-right: 5px;
            width: 90px;
            height: 31px;
            line-height: 30px;
            min-width: 23px;
            cursor: pointer;
            background: url(./img/button2.30a1d480.png) no-repeat;
            background-position: 0 -1465px;
            span {
              width: 70%;
              height: 100%;
              display: inline-block;
              line-height: 30px;
              padding-left: 28px;
              background: url(./img/button2.30a1d480.png) no-repeat;
              background-position: right -1022px;
            }
          }
        }
        .lyric{
          margin: 20px 0;
        }
      }
    }
    .margin-list {
      margin: 20px 40px 0 40px;

      .title {
        display: flex;
        align-items: center;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        p {
          margin-left: 20px;
          flex-grow: 1;
        }

        h2 {
          font-size: 20px;
        }
      }
      .list {
        border: 1px solid #ddd;
        .header {
          display: flex;
          height: 40px;
          background: #ddd;
          line-height: 40px;
          li {
            border-right: 1px solid #cecece;
            text-align: center;
          }
        }

        .w1 {
          width: 77px;
          height: 100%;
          text-align: center;
        }
        .w2 {
          width: 326px;
          height: 100%;
        }
        .w3 {
          width: 91px;
          height: 100%;
          text-align: center;
        }
        .w4 {
          width: 174px;
          height: 100%;
          text-align: center;
        }
      }

      .list-contain {
        display: flex;
        li {
          font-size: 12px;
          line-height: 58px;
        }

        .pad2 {
          padding-left: 30px;
          height: 20px;
        }
        img {
          padding: 5px 30px;
          width: 50px;
          height: 50px;
        }
      }
      .background {
        background: #e0e0e0;
      }
    }
  }
</style>
