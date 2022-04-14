<template>
  <div class="playmusicbar">
    <audio :src="url" autoplay ref="audio"></audio>
    <div class="contain">
      <div class="icon">
        <a title="上一首歌" class="pre"></a>
        <a title="暂停播放" class="pause" v-show="!playRef" @click="stop"></a>
        <a title="开始播放" class="stop" v-show="playRef" @click="play"></a>
        <a title="下一首歌" class="next"></a>
      </div>

      <div class="flex">
        <div class="img">
          <img :src="picUrl" v-if="picUrl" />
          <img src="./img/user.jpg" v-else />
        </div>
        <div class="left">
          <div class="text">
            <span v-if="singer">{{ singer }}</span>
            <span v-else>张敬轩</span>
            <span class="span2" v-if="songname">{{ songname }}</span>
            <span class="span2" v-else>嚣张</span>

            <!-- <a>专辑</a> -->
            <div></div>
          </div>
          <div class="bar">
            <div class="rdy" ref="rdy" @click="clickBar($event)">
              <div class="cur" ref="cur">
                <div class="btn"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <span class="time mar">{{ songcurrtime }} /</span>
      <span class="time">
        {{ songtime }}
      </span>
      <!-- 歌词 -->
      <div class="right-icons">
        <div class="lyric">
          <span @click="showLyric">三</span>
          <div class="lyric-box" v-show="showlyr">
            <div class="dw">
              <div class="lyric-magin" ref="scollLrc">
                <p
                  v-for="(item, key, index) in lyric"
                  :key="index"
                  :class="{
                    scool:
                      currentTime > parseInt(allKeys[index]) &&
                      currentTime < parseInt(allKeys[index + 1]),
                  }"
                >
                  {{ item }}{{ scrollLrc(index) }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //默认url
        url: '', //音频url
        playRef: true, //图标
        lyric: { 0: '暂无歌词' },
        showlyr: false, //展示歌词
        allKeys: [],
        currentTime: 0,
        totaltime: 0,
        time: 0,
        moveWidth: 0,
        singer: '',
        songname: '',
        picUrl: '',
        songtime: '00 : 00',
        songcurrtime: '00 : 00',
      };
    },
    mounted() {
      //全局事件总线 ，调用这个方法，得到url
      this.eventHub.$on('goData', (Go) => {
        this.getUrl();
        this.getlyric();
        this.getMusicData();
      });
    },
    methods: {
      //通过vuex得到url
      getUrl() {
        // 每次点击就从头开始
        this.$refs.audio.currentTime = 0;
        //得到url
        this.url = this.$store.state.GetMusicData.url;
        //改变图标
        this.playRef = false;
        //切换了音频，进度条为0
        this.$refs.cur.style.width = 0;
      },
      //歌曲详情
      getMusicData() {
        this.singer = this.$store.state.GetMusicData.singer;
        this.songname = this.$store.state.GetMusicData.songname;
        this.picUrl = this.$store.state.GetMusicData.picUrl;
      },

      //通过vuex得到歌词
      async getlyric() {
        this.lyric = await this.$store.state.GetMusicData.lyric;
        //歌词的时间
        this.getAllKeys();
        this.addEventPlay();
        //实时监听歌词时间
        this.addEventLyric();
      },
      //音频暂停
      stop() {
        //改变图标
        this.playRefFut();
        this.$refs.audio.pause();
        clearInterval(this.time);
      },
      // 音频播放
      play() {
        if (!this.url) return;
        //改变图标
        this.playRefFut();
        this.$refs.audio.play();
        clearInterval(this.time);
      },
      //改变图标
      playRefFut() {
        this.playRef = !this.playRef;
      },

      //开始播放的时候
      addEventPlay() {
        this.$refs.audio.addEventListener('play', () => {
          clearInterval(this.time);
          //总时间
          let totaltime = this.$refs.audio.duration;
          //处理时间，转化成 分，秒
          this.songtime = this.timeHandel(totaltime);
          //进度滚动
          this.barGo(totaltime);
          //监听结束
          this.addEventEnd();
        });
      },
      //处理时间
      timeHandel(time) {
        let min = this.timeAdd0(parseInt((time / 60) % 60));
        let sec = this.timeAdd0(parseInt(time % 60));
        return `${min} : ${sec}`;
      },
      //一位数就加0
      timeAdd0(mun) {
        if (mun < 9) {
          return `0${mun}`;
        }
        return mun;
      },

      //实时监听歌词时间
      addEventLyric() {
        this.$refs.audio.addEventListener('timeupdate', () => {
          //当前播放时间
          this.currentTime = this.$refs.audio.currentTime;
          //实时得到改变的时间，显示在页面
          this.songcurrtime = this.timeHandel(this.currentTime);
        });
      },

      //监听结束
      addEventEnd() {
        this.$refs.audio.addEventListener('ended', this.endToDO);
      },
      //播放结束要做的事情
      endToDO() {
        //图标改成暂停状态
        this.playRef = true;
        //清除定时器
        clearInterval(this.time);
        // 进度条改成0
        this.$refs.cur.style.width = 0;
        // 时间改成0
        this.songcurrtime = '00 : 00';
      },

      //进度条滚动
      barGo(time) {
        if (!this.url) return;
        var that = this;
        let clientWidth = this.$refs.rdy.clientWidth;
        this.moveWidth = (clientWidth - 15) / time;
        //进度条
        this.time = setInterval(() => {
          that.$refs.cur.style.width =
            this.moveWidth + that.$refs.cur.clientWidth + 'px';
        }, 1000);
      },
      //点击进度条
      clickBar(e) {
        if (!this.url) return;
        //距离浏览器左边的距离
        let leftWidh = this.$refs.rdy.getBoundingClientRect().x;
        // 点击距离浏览器的距离
        let clickWidth = e.x;
        let width = clickWidth - leftWidh;
        this.$refs.cur.style.width = width + 'px';
        this.$refs.audio.currentTime = width / this.moveWidth;
      },

      //展示歌词框
      showLyric() {
        this.showlyr = !this.showlyr;
      },
      //获取歌词前面的时间
      getAllKeys() {
        this.allKeys = Object.keys(this.lyric);
        //  console.log( this.allKeys)
      },
      //歌词滚动
      scrollLrc(index) {
        // console.log(this.currentTime,parseInt(this.allKeys[index]) )
        if (
          //大于上一句小于下一句
          this.currentTime > parseInt(this.allKeys[index]) &&
          this.currentTime < parseInt(this.allKeys[index + 1])
        ) {
          this.$refs.scollLrc.scrollTop = 32 * (index - 3);
        }
      },
    },
    //销毁
    unmounted() {
      //移除
      // this.$refs.audio.removeEventListener('ended', this.endToDO);
      // this.$refs.audio.removeEventListener('timeupdate', () => {
      //   this.currentTime = this.$refs.audio.currentTime;
      // });
    },
  };
</script>

<style lang="less" scoped>
  .playmusicbar {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 60px;
    background: rgb(17, 17, 17);
    z-index: 9999;
    .contain {
      display: flex;
      width: 980px;
      height: 100%;
      margin: 0 auto;

      .icon {
        display: flex;
        padding: 10px 0 0 0;
        a {
          display: block;
          width: 28px;
          height: 28px;
          margin-right: 8px;
          margin-top: 5px;
          text-indent: -9999px;
          background: url(./img/playbar.db568b1c.png) no-repeat;
        }
        .pre {
          background-position: 0 -130px;
          &:hover {
            background-position: -30px -130px;
          }
        }
        .pause {
          background-position: 0 -165px;
          width: 36px;
          height: 36px;
          margin-top: 0;
        }
        .stop {
          background-position: 0 -204px;
          width: 36px;
          height: 36px;
          margin-top: 0;
          &:hover {
            background-position: -40px -204px;
          }
        }
        .next {
          background-position: -80px -130px;
          &:hover {
            background-position: -110px -130px;
          }
        }
      }
      .flex {
        display: flex;
        .img {
          width: 45px;
          height: 45px;
          margin: 7px;
          img {
            width: 100%;
          }
        }
        .left {
          .text {
            margin: 7px 10px;
            font-size: 12px;
            color: white;
            .span2 {
              margin: 0 10px;
            }
          }
          .bar {
            margin-top: 5px;
            width: 466px;
            height: 9px;
            float: left;
            background: url(./img/bar.png) no-repeat 0 0;
            position: relative;

            .rdy {
              width: 466px;
              height: 9px;
              position: absolute;
              background: url(./img/bar.png) no-repeat right -30px;
            }
            .cur {
              height: 9px;
              width: 0;
              position: absolute;
              background: url(./img/bar.png) no-repeat 0 -66px;
              .btn {
                position: absolute;
                top: -6px;
                right: -16px;
                width: 10px;
                height: 10px;
                background-color: red;
                border-radius: 50%;
                box-shadow: 1px 0 0 rgb(0 0 0 / 10%);
                border: 4.5px solid #fff;
              }
            }
          }
        }
      }

      .right-icons {
        margin-left: 50px;
        width: 130px;
        height: 100%;
        .lyric {
          position: relative;
          span {
            margin-top: 15px;
            display: inline-block;
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #fff;
          }

          .lyric-box {
            position: absolute;
            top: -360px;
            left: -252px;
            width: 520px;
            height: 360px;
            background: #3d816b;

            .lyric-magin {
              position: absolute;
              top: 0;
              left: 0;
              box-sizing: border-box;
              width: 520px;
              height: 360px;
              padding: 66px;
              overflow-x: hidden;
              overflow-y: auto;
              &::-webkit-scrollbar {
                width: 8px;
                height: 8px;
              }
              &::-webkit-scrollbar-thumb {
                background-color: #868686;
                border-radius: 15px;
              }
              p {
                text-align: center;
                color: white;

                line-height: 32px;
                font-size: 14px;
              }
              .scool {
                color: tomato;
                font-size: 16px;
              }
            }
          }
        }
      }
      .time {
        display: inline-block;
        height: 100%;
        padding-top: 29px;
        color: white;
        font-size: 13px;
      }

      .mar {
        margin-left: 20px;
      }
    }
  }
</style>
