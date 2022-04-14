<template>
  <div>
  
    <!-- 轮播 -->
    <div class="nav">
      <div class="nav-contain">
        <div class="img-div">
          <span class="left" @click="leftBtn">&lt;</span>
          <ul>
            <li v-for="(item, index) in imgUrl" :key="item.targetId">
              <img v-lazy="item.imageUrl" v-if="imgShow == index" />
            </li>
          </ul>
        </div>
        <div class="down"></div>
        <span class="right" @click="rightBtn">></span>
      </div>
      <div class="bigImg">
        <ul>
          <li v-for="(item, index) in imgUrl" :key="item.targetId">
            <img v-lazy="item.imageUrl" v-if="imgShow == index" />
          </li>
        </ul>
      </div>
    </div>

    <!-- 热门推荐 -->
    <div class="box">
      <div class="flex">
        <div class="margin">
          <div class="title">
            <h3>热门推荐华语|流行|摇滚|民谣|电子</h3>
            <span>
              <router-link to="/hotsong" style="color: black">
                更多>
              </router-link>
            </span>
          </div>

          <div class="hotRecomeng">
            <ul>
              <li v-for="item in hotImg" :key="item.id">
                <router-link
                  :to="`/playlist/${item.id}`"
                  tag="div"
                  style="color: black"
                >
                  <img v-lazy="item.picUrl" />
                  <p>{{ item.name }}</p>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 新碟 -->

          <div class="title title-margin">
            <h3>新碟上架</h3>
            <router-link to="/newsong" style="color: black">更多></router-link>
          </div>

          <div class="hotRecomeng">
            <ul class="newsong">
              <li v-for="item in newSong" :key="item.id">
                <router-link :to="`/playlist/${item.id}`" tag="div">
                  <img v-lazy="item.picUrl" />
                  <a class="ba"></a>
                  <p>{{ cutString(item.name) }}</p>
                  <p>{{ cutString(item.artist.name) }}</p>
                </router-link>
              </li>
            </ul>
          </div>

          <!-- 榜单 -->
          <div class="topSong">
            <div class="title title-margin">
              <h3>榜单推荐</h3>
              <router-link :to="`/topsong/${id}`" style="color: black">
                <span>更多></span>
              </router-link>
            </div>

            <div class="top">
              <ul class="top-img">
                <li v-for="item in topList" :key="item.id">
                  <router-link :to="`/topsong/${item.id}`">
                    <img :src="item.coverImgUrl" />
                  </router-link>
                  <div class="all-a">
                    <p>{{ item.name }}</p>
                    <a class="play"></a>
                    <a class="subs"></a>
                  </div>
                </li>
              </ul>
            </div>
            <div class="top-list">
              <ul>
                <li v-for="item in playlist[0]" :key="item.id">
                  <span @click="getLrc(item.id)">
                    {{ cutString(item.name) }}
                  </span>
                  <div class="open">
                    <a
                      title="播放"
                      class="play"
                      @click="playMusic(item.id)"
                    ></a>
                    <a title="添加到播放列表" class="add"></a>
                    <a title="收藏" class="subs"></a>
                  </div>
                </li>
              </ul>
              <ul>
                <li v-for="item in playlist[1]" :key="item.id">
                  <span @click="getLrc(item.id)">
                    {{ cutString(item.name) }}
                  </span>
                  <div class="open">
                    <a
                      title="播放"
                      class="play"
                      @click="playMusic(item.id)"
                    ></a>
                    <a title="添加到播放列表" class="add"></a>
                    <a title="收藏" class="subs"></a>
                  </div>
                </li>
              </ul>
              <ul>
                <li v-for="item in playlist[2]" :key="item.id">
                  <span @click="getLrc(item.id)">
                    {{ cutString(item.name) }}
                  </span>
                  <div class="open">
                    <a
                      title="播放"
                      class="play"
                      @click="playMusic(item.id)"
                    ></a>
                    <a title="添加到播放列表" class="add"></a>
                    <a title="收藏" class="subs"></a>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 用户登录 -->
        <div class="box-left">
          <div class="login">
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <a>用户登录</a>
          </div>
          <!-- 歌手 -->
          <div class="singer">
            <div class="title">
              <h3>榜单推荐</h3>
              <span>
                <router-link
                  to="/singer"
                  style="color: black"
                >
                  更多>
                </router-link>
              </span>
            </div>
            <ul class="singer-list">
              <li v-for="item in artists" :key="item.id">
                <img :src="item.picUrl" />
                <div>
                  <p>{{ item.name }}</p>
                  <p>{{ item.alias[0] }}</p>
                </div>
              </li>
            </ul>
          </div>
          <!-- 主播 -->
          <div class="singer">
            <div class="title">
              <h3>榜单推荐</h3>
              <span>更多></span>
            </div>
            <ul class="singer-list">
              <li v-for="item in DjTopList" :key="item.id">
                <img :src="item.avatarUrl" />
                <div>
                  <p>{{ item.nickName }}</p>
                  <p>{{}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  export default {
    data() {
      return {
        imgUrl: [],
        imgShow: 0,
        hotImg: [],
        newSong: [],
        topList: [],
        playlist: [],
        artists: [],
        DjTopList: [],
        id: 0,
      };
    },

    mounted() {
      //轮播图
      this.getBanner();
      //热门推荐
      this.getHotDecomment();

      //新碟推荐
      this.getNewSong();

      //榜单
      this.getTopList();

      //歌手
      this.getSinger();

      //主播
      this.getDjTopList();
    },

    methods: {
      //获取图片
      async getBanner() {
        let res = await api.getBanner();
        this.imgUrl = res.data.banners;
        this.imgLoop();
      },
      //点击左
      leftBtn() {
        this.imgShow++;
        if (this.imgShow > this.imgUrl.length - 1) {
          this.imgShow = 0;
        }
      },
      //点击右
      rightBtn() {
        this.imgShow--;
        if (this.imgShow < 0) {
          this.imgShow = this.imgUrl.length - 1;
        }
      },

      imgLoop() {
        let that = this;
        setInterval(() => {
          that.leftBtn();
        }, 3000);
      },
      //热门歌曲
      async getHotDecomment() {
        let res = await api.getHotDecomment(8);
        this.hotImg = res.data.result;
        // console.log(res.data);
      },
      //新歌
      async getNewSong() {
        let res = await api.getNewSong(8, 0, 'ZH', 'new');

        this.newSong = res.data.albums;
        // console.log(res);
      },
      //榜单
      async getTopList() {
        let res = await api.getTopList();
        this.topList = res.data.list.splice(0, 3);
        this.getPlayList();
        this.id = this.topList[0].id;
        console.log(this.id);
      },
      //榜单歌曲
      getPlayList() {
        this.topList.forEach(async (item) => {
          let res = await api.getPlayList(item.id);
          let data = res.data.playlist;
          let list = data.tracks.splice(0, 10);
          this.playlist.push(list);

          //  console.log( data)
        });
      },

      //歌手
      async getSinger() {
        let res = await api.getSinger(0, 6);
        this.artists = res.data.artists;
        console.log(res.data);
      },
      //主播

      async getDjTopList() {
        let res = await api.getDjTopList(6);
        this.DjTopList = res.data.data.list;
        console.log(res);
      },
      //通过传递id，得到url，并调用方法，播放

      async playMusic(id) {
        await this.$store.dispatch('GetMusicData/getMusicUrl', id);
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        this.eventHub.$emit('goData', 'Go');
      },

      async getLrc(id) {
        this.$router.push(`/playmusic/${id}`);
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        //歌曲详情
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        this.eventHub.$emit('goLyric', 'Lyric');
      },

      //字符串减截
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
    unmounted() {
      //       this.eventHub.$off('goLyric')
      //         this.eventHub.$off('goData')
      // console.log(3333)
    },
  };
</script>

<style lang="less" scoped>
 

  .nav {
    width: 100%;
    height: 285px;
    position: relative;
    .nav-contain {
      display: flex;
      position: relative;
      width: 985px;
      height: 100%;
      margin: 0 auto;
      z-index: 999;

      .img-div {
        position: relative;
        display: flex;
        height: 100%;
        width: 730px;
        ul {
          height: 100%;
          width: 100%;
          li {
            z-index: 99;
            overflow: hidden;
            height: 100%;
            width: 100%;
            position: absolute;
            img {
              width: 100%;
            }
          }
        }
      }

      span {
        position: absolute;
        z-index: 99;
        transform: translate(-50%, -50%);
        font-size: 30px;
      }
      .left {
        top: 50%;
        left: -50px;
        transform: translate(-50%, -50%);
      }
      .right {
        top: 50%;
        right: -50px;
        transform: translate(50%, -50%);
      }
    }

    .down {
      width: 254px;
      height: 100%;
      background: pink;
      z-index: 999;
      background: url('./img/download.png') no-repeat;
    }

    .bigImg {
      position: absolute;
      top: 0;
      z-index: 0;
      width: 100%;
      height: 285px;

      img {
        width: 100%;
        height: 285px;
        filter: blur(15px);
      }
    }
  }

  .box {
    width: 980px;
    margin: 0 auto;
    border: 1px solid rgb(102, 102, 102);
    border-top: none;
    background: white;
    .flex {
      display: flex;
      .margin {
        margin: 30px;
        width: 690px;
        .title {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid red;
          padding-bottom: 10px;
        }

        .hotRecomeng {
          ul {
            display: flex;
            flex-wrap: wrap;
            li {
              box-sizing: border-box;
              width: 25%;
              padding: 15px;
              p {
                font-size: 14px;
              }
            }
          }
        }
        .newsong {
          li {
            position: relative;
            a {
              color: black;
            }
            .ba {
              display: inline-block;
              width: 118px;
              height: 100px;
              position: absolute;
              top: 33px;
              left: 49px;
              background: url(./img/newsong.png) no-repeat 0 -570px;
            }
          }
        }

        .topSong {
          .top {
            border: 1px solid #ddd;
            .top-img {
              display: flex;
              li {
                display: flex;
                box-sizing: border-box;
                padding: 10px;
                width: 33.333%;
                border-right: 1px solid #ddd;
                img {
                  width: 80px;
                  height: 80px;
                }

                .all-a {
                  a {
                    display: inline-block;
                    height: 36%;
                    width: 27px;

                    margin: 10px;
                    font-weight: 700;
                    font-family: Arial, Helvetica, sans-serif;
                    background: url(./img/index.5556d9cf.png) no-repeat;
                  }

                  p {
                    margin-left: 20px;
                  }
                  .play {
                    background-position: -267px -205px;
                    &:hover {
                      background-position: -267px -235px;
                    }
                  }
                  .subs {
                    background-position: -300px -205px;
                    &:hover {
                      background-position: -300px -235px;
                    }
                  }
                }
              }
            }
          }

          .top-list {
            display: flex;
            ul {
              border: 1px solid #ddd;
              width: 33.333%;
              li {
                position: relative;
                display: flex;
                justify-content: center;

                align-items: center;
                padding: 6px 0;
                font-size: 12px;
                &:hover {
                  .open {
                    display: block;
                  }
                }
                span {
                  display: inline-block;
                  width: 136px;
                  box-sizing: border-box;
                  padding-left: 0px;
                }
                .open {
                  position: absolute;
                  right: -5px;
                  display: none;

                  a {
                    display: inline-block;
                    width: 17px;
                    height: 17px;
                    margin-right: 10px;
                    background: url(./img/index.5556d9cf.png) no-repeat;
                  }

                  .play {
                    background-position: -267px -268px;
                  }
                  .add {
                    margin-top: 2px;
                    margin-right: 3px;
                    background: url(./img/icon.29cd8439.png) no-repeat;
                    background-position: 0 -700px;
                  }
                  .subs {
                    background-position: -297px -268px;
                  }
                }
              }
            }
          }
        }

        .title-margin {
          margin-top: 52px;
        }
      }
      .box-left {
        .login {
          width: 255px;
          height: 126px;
          background: #dddd;
          border-left: 1px solid #ddd;
          p {
            width: 200px;
            padding: 20px;
            font-size: 13px;
          }
          a {
            display: block;
            float: left;
            width: 100px;
            height: 31px;
            margin: 0 75px;
            text-align: center;
            line-height: 31px;
            color: #fff;
            text-shadow: 0 1px 0 #8a060b;
            font-size: 12px;
            background: url(./img/index.5556d9cf.png) no-repeat 0 -195px;
            &:hover {
              cursor: pointer;
              background-position: -110px -195px;
            }
          }
        }

        .singer {
          margin: 20px 0;
          .title {
            display: flex;
            justify-content: space-between;
            font-size: 12px;
            border-bottom: 1px solid #ddd;
            padding-bottom: 10px;
          }
          .singer-list {
            width: 210px;
            margin: 10px;
            li {
              display: flex;
              height: 62px;
              margin-bottom: 20px;
              align-items: center;
              background: #ddd;
              border: 1px solid rgb(202, 202, 202);

              img {
                height: 100%;
                width: 62px;
              }

              p {
                font-size: 12px;
                margin-left: 10px;
              }
            }
          }
        }
      }
    }
  }
</style>
