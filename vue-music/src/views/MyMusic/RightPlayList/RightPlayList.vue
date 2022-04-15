<template>
  <div>
    <div class="right">
      <div class="right-margin">
        <div class="right-img">
          <img :src="imgURl" />
        </div>
        <div class="right-sub">
          <div>
            <h3>{{ name }}</h3>
            <img :src="userImg" class="userimg"/>
            <span class="usertext">{{nickname}}</span>
            <span class="usertext">创建时间: {{formatData(createTime)}}</span>
            <div class="icon">
              <a class="play">
                <i class="play-icon"></i>
                <span>播放</span>
              </a>
              <a class="add"></a>
              <a class="dis">
                <span>收藏</span>
              </a>
              <a class="share">
                <span>
                  分享
                </span>
              </a>
              <a class="download"><span>下载</span></a>
              <a class="comment">
                <span>讨论</span>
              </a>
            </div>
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
            <li :class="{ height: index > 3, w1: true, pd1: true }">
              {{ index + 1 }}
            </li>
            <li :class="{ height: index > 3, w2: true }">
              <img v-lazy="item.al.picUrl" v-if="index < 4" />
              <i
                :class="{ bf: true, bf1: index < 4 }"
                @click="getUrl(item.id,$event)"
              ></i>
              <span
                :class="{ pad2: index > 3, height: index > 3 }"
                @click="getLrc(item.id)"
              >
                {{ cutString(item.name) }}
              </span>
            </li>
            <li :class="{ height: index > 3, w3: true }">
              {{ timeHandel(item.dt) }}
            </li>
            <li :class="{ height: index > 3, w4: true }" @click="goSingeriId(item.ar[0].id)">
              {{ item.ar[0].name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/Api';

  export default {
    data() {
      return {
        imgURl: '',
        name: '',
        nickname:'',
        userImg:"",
        description: '',
        trackslist: '',
        createTime:'',
      };
    },
    mounted() {
      //首次进入页面
      var that = this
        this.eventHub.$on("getUserPlayIdfirst", function(id){
              that.getUsePlayListDetail(id);
        })

      //点击
        this.eventHub.$on("getUserPlayId",(getUPId)=>{
            this.getUsePlayListDetail(this.$route.query.id);
        })
    },
    methods: {
      async getUsePlayListDetail(id) {
         let cookie = localStorage.getItem('COOKIE');
        let res = await api.getUsePlayListDetail(id, cookie);
        let data = res.data.playlist;
        this.playlist = data.tracks;
        this.imgURl = data.coverImgUrl;
        this.userImg = data.creator.avatarUrl
        this.name = data.name;
        this.nickname = data.creator.nickname
        this.description = data.description;
        this.trackslist = data.tracks;
        this.createTime = data.createTime
         this.name = this.name.replace(this.nickname,"我")
      },
      //点击左边的导航栏

    
      //传递i播放
      async getUrl(id,e) {
        await this.$store.dispatch('GetMusicData/getMusicUrl', id);
        //歌曲详情
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        //歌词
          await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        this.eventHub.$emit('goData', 'Go');
       //清除所有颜色
        let lis = this.$refs.play.querySelectorAll('i');
        for (let i = 0; i < lis.length; i++) {
          //移除类名
          lis[i].classList.remove('active');
        }
        //添加一个类名
       e.target.className += ' active'
      },

      //点击歌名
      async getLrc(id) {
        this.$router.push(`/playmusic/${id}`);
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        //歌曲详情
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        this.eventHub.$emit('goLyric', 'Lyric');
      },

      //歌手页面
       goSingeriId(id) {
        this.$router.push({
          path: 'singerdatil',
          name: 'singerdatil',
          params: {
            id: id,
          },
        });
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

        //处理时间
      timeHandel(time) {
        let min = this.timeAdd0(parseInt((time / 60000) % 60));
        let sec = this.timeAdd0(parseInt(time /1000% 60));
        return `${min} : ${sec}`;
      },
      //一位数就加0
      timeAdd0(mun) {
        if (mun < 10) {
          return `0${mun}`;
        }
        return mun;
      },

      formatData(time){
        let date = new Date(time)
        let year = this.timeAdd0(date.getFullYear())
         let month  =this.timeAdd0(date.getMonth()+1)
         let day = this.timeAdd0(date.getDate())

         return `${year}-${month}-${day}`
      }
    },
  };
</script>

<style lang="less" scoped>
  .right {
    width: 740px;

    .right-margin {
      display: flex;
      margin: 40px;
      width: 660px;

      .right-img {
        width: 150px;
        height: 150px;
        img {
          width: 100%;
          height: 150px;
        }
      }

      .right-sub {
        margin:0 20px 0 20px;
        width: 413px;
        font-size: 12px;
        h3{
          font-size:  18px;
        }

        .usertext{
         margin-left: 10px;
        }

        .userimg{
          margin-top: 5px;
          width: 50px;
          height: 50px;
        }

        .icon {
          margin-top: 10px;
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
              width: 66%;
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
              width: 64%;
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
              width: 52%;
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
              width: 68%;
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
        .height {
          line-height: 36px;
        }

        span {
          margin-left: 20px;
        }

        .w1 {
          width: 77px;
          height: 100%;
          text-align: center;
        }
        .w2 {
          width: 326px;
          height: 100%;
          .bf {
            position: absolute;
            top: 10px;
            left: 0;
            display: block;
            width: 17px;
            height: 17px;
            margin-right: 8px;
            background: url('./img/bf.png') no-repeat 0 -103px;
          }

          .bf1 {
            top: 22px;
          }
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
        .active {
            background-position: -20px -128px !important;
          }
      }

      .list-contain {
        display: flex;
        li {
          font-size: 12px;
          line-height: 58px;
          position: relative;
        }

        .pad2 {
          padding-left: 15px;
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

    .active {
      background: #ddd;
    }
  }
</style>
