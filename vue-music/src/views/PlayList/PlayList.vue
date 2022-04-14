<template>
  <div class="box">
    <!-- 右边 -->
    <div class="right">
      <div class="right-margin">
        <div class="right-img">
          <img :src="imgURl" />
        </div>
        <div class="right-sub">
          <div>
            <h3>{{ name }}</h3>
            <div class="singer">
              <img :src="creator.avatarUrl" />
              <span class="span">{{ creator.nickname }}</span>
              <span>{{ createTime }}</span>
            </div>

            <div class="icon">
              <a class="play">
                <i class="play-icon"></i>
                <span>播放</span>
              </a>
              <a class="add"></a>
              <a class="dis">
                <span>{{ subscribedCount }}</span>
              </a>
              <a class="share">
                <span>
                  {{ shareCount }}
                </span>
              </a>
              <a class="download"><span>下载</span></a>
              <a class="comment">
                <span>{{ commentCount }}</span>
              </a>
            </div>
            <p>{{ description }}</p>
          </div>
        </div>
      </div>

      <div class="margin-list">
        <div class="title">
          <h2>歌曲列表</h2>
          <p>100首歌播放：</p>
          <span>4912770560 次</span>
        </div>

        <div class="list" ref="play">
          <ul class="header">
            <li class="w1"></li>
            <li class="w2">标题</li>
            <li class="w3">时长</li>
            <li class="w4">歌手</li>
          </ul>
          <ul
            v-for="(item, index) in trackslist"
            :key="item.id"
            :class="{
              'pad2': index > 3,
              'list-contain': true,
              'background': index % 2 !== 0,
            }"
          >
            <li class="w1 pd1" @click="getUrl(item.id, $event)">
              {{ index + 1 }}
              <i></i>
            </li>
            <li class="w2" @click="getLyric(item.id)">
              <!-- <router-link :to="`/playmusic/${item.id}`" style="color: black"> -->
              <img v-lazy="item.al.picUrl" />
              <span>{{ cutString(item.name) }}</span>
              <!-- </router-link> -->
            </li>
            <li class="w3">
              {{ timeHandel(item.dt) }}
            </li>
            <li class="w4">{{ cutString(item.ar[0].name) }}</li>
          </ul>
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
        playCount: 0,
        shareCount: 0,
        commentCount: 0, //讨论
        subscribedCount: '', //收藏
        description: '',
        trackslist: '',
        creator: {},
        createTime: 0,
      };
    },
    components: {
      Comment,
    },
    mounted() {
      this.getPlayList(this.$route.params.id);
    },

    methods: {
      async getPlayList(id) {
        let res = await api.getPlayList(id);

        let data = res.data.playlist;
        this.playlist = data.tracks;
        this.playCount = data.playCount;
        this.shareCount = data.shareCount;
        this.commentCount = data.commentCount;
        this.subscribedCount = data.subscribedCount;
        this.imgURl = data.coverImgUrl;
        this.name = data.name;
        this.description = data.description;
        this.trackslist = data.tracks;
        this.creator = data.creator;
        this.createTime = data.createTime;
        console.log(res.data);
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

      //传递id 给vuex (url)
      async getUrl(id, e) {
        //url
        await this.$store.dispatch('GetMusicData/getMusicUrl', id);
        //歌词
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        //歌曲详情
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        this.eventHub.$emit('goData', 'Go');

        //清除所有颜色
        let lis = this.$refs.play.querySelectorAll('i');
        for (let i = 0; i < lis.length; i++) {
          lis[i].className = '';
        }
        // 点击的元素变色
        e.target.className = 'active';
      },
      //传递id 给vuex (歌词)
      async getLyric(id) {
        this.$router.push(`/playmusic/${id}`);
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        //歌曲详情

        this.eventHub.$emit('goLyric', 'Lyric');
      },

      //防止字符串过程，页面撑开
       cutString(str) {
        if (str) {
          if (str.length > 8) {
            return str.substring(0, 8) + '...';
          }
          return str;
        }
        return '';
      },
       //处理时间
      timeHandel(time) {
        let min = this.timeAdd0(parseInt((time / 60000) % 60));
        let sec = this.timeAdd0(parseInt(time /1000% 60));
        return `${min} : ${sec}`;
      },
      //一位数就加0
      timeAdd0(mun) {
        if (mun < 9) {
          return `0${mun}`;
        }
        return mun;
      },
    },

    //避免反复调用,销毁
    unmounted() {
      // this.eventHub.$off('goLyric')
      //  this.eventHub.$off('goData')
      //  console.log(22222)
    },
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
        margin-top: 30px;
        width: 200px;
        height: 200px;
        img {
          width: 100%;
        }
      }

      .right-sub {
        width: 410px;
        margin: 20px;
        h3 {
          font-size: 20px;
          padding: 5px 0 20px 0;
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
        p {
          padding-top: 20px;
          font-size: 13px;
        }

        .icon {
          //   margin-top: 20px;
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
          position: relative;
          width: 77px;
          height: 100%;
          text-align: center;
          i {
            position: absolute;
            top: 22px;
            right: 0;
            display: block;
            width: 17px;
            height: 17px;
            background: url(./img/bf.png) no-repeat 0 -103px;
            &:hover {
              background-position: 0 -128px;
            }
          }

          .active {
            background-position: -20px -128px;
          }
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
