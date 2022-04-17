<template>
  <div class="mymusic">
    <div class="contain" v-show="containImg">
      <div class="img">
        <div class="login"></div>
      </div>
    </div>

    <div class="mygz" v-show="!containImg">
      <div class="my-flex">
        <div class="my-left">
          <div class="title">
            <h3>动态</h3>
          </div>
          <div class="user-contain">
            <div class="list" v-for="item in event" :key="item.id">
              <div class="top">
                <img :src="item.user.avatarUrl" />
                <div class="text">
                  <div>
                    <span>云音乐小秘书</span>
                    <img
                      :src="item.user.avatarDetail.identityIconUrl"
                      style="width: 17px; height: 17px"
                    />
                    <span>分享单曲</span>
                  </div>
                  <a>232321312</a>
                  <p>{{ JSON.parse(item.json).msg }}</p>
                </div>
              </div>
              <div class="user-main">
                <div class="user-mv" v-if="handel2(JSON.parse(item.json))">
                  <img :src="handel2(JSON.parse(item.json))" />
                  <div class="mv-text">
                    <p>{{ handel(JSON.parse(item.json)).name }}</p>
                    <p class="name">{{ handel1(JSON.parse(item.json)) }}</p>
                  </div>
                </div>
                <div class="bigimg" v-if="handel3(item)">
                  <img :src="handel3(item)" />
                </div>
                <ul class="icons">
                  <li class="dz">
                    <i></i>
                    <span>点赞({{ item.info.likedCount }})</span>
                  </li>
                  <li class="zf">
                    <i></i>
                    <span>转发({{ item.info.shareCount }})</span>
                  </li>
                  <li class="pl">
                    <i></i>
                    <span>评论({{ item.info.commentCount }})</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="my-right">
          <div class="right-contain">
            <div class="img-p">
              <a><img :src="avatarUrl" /></a>
              <p>{{ nickname }}</p>
            </div>
            <ul class="right-user-list">
              <li>
                <span>{{ eventCount }}</span>
                <a>动态</a>
              </li>
              <li class="li2">
                <span>{{ follows }}</span>
                <a>关注</a>
              </li>
              <li>
                <span>{{ followeds }}</span>
                <a>粉丝</a>
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
        containImg: true,
        event: [],
        pageSize: 30,
        lasttime: -1,
        Height: 1000000,
        timer: [],
        flag: true,
        eventCount: 0,
        follows: 0,
        followeds: 0,
        avatarUrl: '',
        nickname: '',
      };
    },
    mounted() {
      this.userData();
      this.getUSerDetail();
      this.lisenEventScoll();
    },
    methods: {
      userData() {
        if (localStorage.getItem('USER')) {
          this.containImg = false;
          this.getFriendEvent();
        }
      },

      async getFriendEvent() {
        if (this.flag == false) return;
        this.flag = false;

        let res = await api.getFriendEvents(
          this.pageSize,
          localStorage.getItem('COOKIE'),
          this.lasttime,
        );
        //如果数据没有了就返回
        if (res.data.event.length == 0) {
          clearInterval(this.timer);
          return;
        } else {
          this.event = res.data.event;
        }

        this.lasttime = res.data.lasttime;

        // console.log(res.data);
        //  console.log(res.data.event[1]);
      },
      //处理数据,如果歌曲没有就返回空
      handel(data) {
        if (data.song) {
          return data.song;
        } else {
          return '';
        }
      },
      //处理数据,如果歌曲里面的名字，没有就返回空

      handel1(data) {
        if (data.song) {
          return data.song.artists[0].name;
        } else {
          return '';
        }
      },
      //处理数据,如果图片没有
      handel2(data) {
        if (data.song) {
          return data.song.album.picUrl;
        } else {
          return '';
        }
      },
      //处理数据,如果图片没有
      handel3(data) {
        if (data.pics[0]) {
          return data.pics[0].originUrl;
        } else {
          return '';
        }
      },

      //---------------------------------------------------------------------------方法一-------------------------------------------
      //滑动判断
      handleScrollx() {
        const h = window.pageYOffset;
        if (h >= this.Height - 2500) {
          this.getFriendEvent();
        }
        this.Height = document.body.scrollHeight;
      },
      //监听，定时器
      lisenEventScoll() {
        window.addEventListener('scroll', this.handleScrollx, true);
        this.timer = setInterval(() => {
          this.flag = true; //配合上面定义的flat使用
          // console.log(111)
        }, 1000);
      },
      //----------------------------------------------------------------------------------------------------------------------------------------
      // ---------------------------------方法二------------------------------------------------------------------
      //    //监听，定时器
      //   lisenEventScoll() {
      //
      //     window.addEventListener('scroll',this.throttle(this.getFriendEvent), true);
      //    console.log(111)
      //   },

      // //节流
      //   throttle(func){
      //     return function(){
      //       if(!this.timer){
      //         this.timer = setTimeout(function(){
      //           func()
      //           this.timer = null
      //           console.log(222)
      //         },1000)
      //       }

      //     }

      //   },
      //---------------------------------------------------------------------------------------------------------------------------
      async getUSerDetail() {
        let data = localStorage.getItem('USER');
        let cookie = localStorage.getItem('COOKIE');
        let uid = JSON.parse(data).userId;
        let res = await api.getUSerDetail(uid, cookie);
        let context = res.data.profile;
        this.eventCount = context.eventCount;
        this.follows = context.follows;
        this.followeds = context.followeds;
        this.avatarUrl = context.avatarUrl;
        this.nickname = context.nickname;
        console.log(res.data);
      },
    },
    unmounted() {
      clearInterval(this.timer);
      window.removeEventListener('scroll', this.handleScrollx);
    },
  };
</script>

<style lang="less" scoped>
  .mymusic {
    width: 982px;
    border: 1px solid #d3d3d3;
    margin: 0 auto;
    position: relative;
    background-color: #fff;
    .contain {
      .img {
        width: 902px;
        height: 430px;
        padding-top: 70px;
        margin: 0px auto;
        background: url(./img/notlogin.ee2c772f.jpg) 0px 70px no-repeat;

        .login {
          display: block;
          width: 157px;
          height: 48px;
          margin: 260px 0px 0px 535px;
          &:hover {
            cursor: pointer;
            background: url(./img/notlogin.ee2c772f.jpg) 0px -430px no-repeat;
          }
        }
      }
    }

    .mygz {
      width: 980px;
      .my-flex {
        margin: 20px;
        display: flex;
        .my-left {
          width: 680px;
          border-right: 1px solid #ddd;
          .title {
            border-bottom: 2px solid rgba(233, 14, 14, 0.867);
            padding-bottom: 10px;
            h3 {
              font-size: 20px;
            }
          }

          .user-contain {
            .list {
              border-bottom: 1px solid #ddd;
              margin: 20px;
              .top {
                display: flex;
                img {
                  width: 45px;
                  height: 45px;
                }
                .text {
                  margin-left: 5px;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  span {
                    font-size: 14px;
                    margin-right: 10px;
                  }
                  a {
                    color: black;
                    font-size: 12px;
                  }
                }
              }

              .user-main {
                margin: 10px 0 0 50px;

                .user-mv {
                  margin-top: 5px;
                  display: flex;
                  height: 60px;
                  background: #ddd;
                  img {
                    width: 45px;
                    height: 45px;
                    margin: 5px;
                  }
                  .mv-text {
                    margin: 3px 0 10px 5px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    p {
                      font-size: 14px;
                    }
                    .name {
                      font-size: 12px;
                    }
                  }
                }

                .bigimg {
                  margin-top: 10px;
                  img {
                    width: 50%;
                    height: 50%;
                  }
                }

                .icons {
                  display: flex;
                  justify-content: flex-end;
                  margin-bottom: 10px;

                  li {
                    padding-right: 5px;
                    font-size: 12px;
                  }
                }
              }
            }
          }
        }

        .my-right {
          .right-contain {
            margin: 20px;

            .img-p {
              display: flex;
              box-sizing: border-box;
              a {
                display: inline-block;
                width: 70px;
                height: 70px;
                border: 2px solid #ddd;
              }

              p {
                margin-left: 10px;
              }

              img {
                width: 100%;
              }
            }

            .right-user-list {
              margin-top: 20px;
              display: flex;
              li {
                display: flex;
                width: 33.3%;
                flex-direction: column;
                align-items: center;

                a {
                  color: black;
                  margin-top: 5px;
                }
              }

              .li2 {
                border-right: 2px solid #ddd;
                border-left: 2px solid #ddd;
              }
            }
          }
        }
      }
    }
  }
</style>
