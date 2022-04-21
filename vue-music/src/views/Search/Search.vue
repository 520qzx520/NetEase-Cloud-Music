<template>
  <div class="search">
    <div class="margin">
      <div class="contain">
        <div class="search-input">
          <input type="text" v-model="keywords" ref="input" />
          <span class="seah" @click="btnSearch"></span>
          <div class="search-box">
            <div class="title">
              <a>搜索到{{ total }}用户</a>
            </div>
            <div class="search-box-list">
              <ul>
                <li>
                  <div class="left">
                    <i class="songs"></i>
                    <span>单曲</span>
                  </div>
                  <div class="right">
                    <p v-for="item in songs" :key="item.id">{{ item.name }}</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="singer"></i>
                    <span>歌手</span>
                  </div>
                  <div class="right">
                    <p v-for="item in artists" :key="item.id">
                      {{ item.name }}
                    </p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="ablum"></i>
                    <span>专辑</span>
                  </div>
                  <div class="right">
                    <p v-for="item in albums" :key="item.id">{{ item.name }}</p>
                  </div>
                </li>
                <li>
                  <div class="left">
                    <i class="songlist"></i>
                    <span>歌单</span>
                  </div>
                  <div class="right">
                    <p v-for="item in playlists" :key="item.id">
                      {{ item.name }}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="nav">
          <span class="tip">共搜索到{{ total }}信息</span>
          <ul class="list">
            <li
              v-for="item in searchtab"
              :key="item.type"
              @click="btnClickList(item.type, keywords)"
            >
              {{ item.name }}
            </li>
          </ul>

          <!-- 固定结构   -->
          <!-- <router-view v-slot="{ Component }">
            <keep-alive>
              <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
          </router-view> -->
          <!--  include="SearchSong"  意思是，组件名 为 SearchSong的就缓存数据，路由切换后，不会更改页面内容，用于保存输入框的数据
        多个的话可以这样    include="SearchSong，song" ----用 ， 隔开 include="SearchSong"
        -->
          <!-- 这样是这个父组件的所有组件 -->
          <!-- <router-view v-slot="{ Component }">
            <keep-alive >
              <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
          </router-view> -->

          <router-view v-slot="{ Component }" @on-child="onChildTotal">
            <keep-alive :include="keepAlives" :max="4">
              <component :is="Component" v-if="$route.meta.keepAlive" />
            </keep-alive>
            <component :is="Component" v-if="!$route.meta.keepAlive" />
          </router-view> 
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  export default {
    name: 'Search',
    data() {
      return {
        searchtab: [
          {
            name: '单曲',
            type: 1,
          },
          {
            name: '歌手',
            type: 100,
          },
          {
            name: '专辑',
            type: 10,
          },
          {
            name: '歌单',
            type: 1000,
          },
          {
            name: '视频',
            type: 1014,
          },
        ],

        albums: [],
        artists: [],
        playlists: [],
        songs: [],
        total: '0',
        keepAlives:['Search'],
        type: 1,
        keywords: '',
      };
    },
    mounted() {
      // //获得搜索的总数
      // this.eventHub.$on('goData', (Go) => {
      //   this.total = this.$store.state.GetMusicData.searchtoatl;
      // });
      // // console.log(this.keywords);
    },

    methods: {
      // async search() {
      //   let res = await api.userSearch(this.keywords);
      //   let data = res.data.result;
      //   this.albums = data.albums;
      //   this.artists = data.artists;
      //   this.playlists = data.playlists;
      //   this.songs = data.songs;
      //   console.log(res.data);
      // },

      //单曲
      async songFunc(type, keywords) {
        await this.$router.replace({
          name: 'searchSong',
          params: {
            type,
            keywords,
          },
        })
         this.keepAlives[0] = 'SearchSong';
         this.eventHub.$emit('getSong', 'Song');
       
      },

      //点击nav发送不同请求，切换不同页面
      async btnClickList(type, keywords) {
        switch (type) {
          //单曲
          case 1:
            
            this.songFunc(type, keywords);
          
            
            break;
          //专辑
          case 10:
            await this.$router.replace({
              name: 'searchAblum',
              params: {
                keywords,
                type,
              },
            }); 
            
            this.keepAlives[0] = 'searchAblum';
            this.eventHub.$emit('getAblum', 'Ablum');
        
          
            break;
          //歌手
          case 100:
            await this.$router.replace({
              name: 'searchSinger',
              params: {
                keywords,
                type,
              },
            });
               this.keepAlives[0] = 'searchSinger';
            this.eventHub.$emit('getSinger', 'Singer');
            break;
          //歌单
          case 1000:
            await this.$router.replace({
              name: 'searchPlaylist',
              params: {
                keywords,
                type,
              },
            });
             this.keepAlives[0] = 'searchPlaylist';
            this.eventHub.$emit('getPlayList', 'Playlist');

            break;
          //视频
          case 1014:
            await this.$router.replace({
              name: 'searchMv',
              params: {
                keywords,
                type,
              },
            });
              this.keepAlives[0] = 'searchMv';
            this.eventHub.$emit('getMv', 'Mv');

            break;
        }
      },

      //   addEventKeyUp() {
      //     this.$refs.input.addEventListenner('keyup', this.search);
      //   },

      //点击搜索按钮,默认页面是单曲，所以调用单曲的方法
      async btnSearch() {
        // this.search();
        await this.songFunc(1, this.keywords);
        this.eventHub.$emit('getSong', 'Song');
      },

      onChildTotal(total) {
        this.total = total;
      },
    },
    
   
  };
</script>

<style lang="less" scoped>
  .search {
    width: 980px;
    margin: 0 auto;
    border: 1px solid rgb(90, 90, 90);
    background: white;
    .margin {
      margin: 50px;
      .contain {
        width: 880px;
        .search-input {
          position: relative;
          display: flex;
          justify-content: center;
          margin-bottom: 50px;
          input {
            box-sizing: border-box;
            padding-left: 10px;
            width: 420px;
            height: 40px;
            border: 1px solid #ddd;
          }
          .seah {
            display: inline-block;
            width: 50px;
            height: 40px;

            background: url(./img/sprite.4aec0aac.png) -430px 0px no-repeat;
          }

          .search-box {
            display: none;
            position: absolute;
            width: 420px;
            top: 45px;
            background: white;
            box-shadow: 0 0 5px rgba(88, 88, 88, 0.867);
            .title {
              height: 30px;
              line-height: 30px;
              font-size: 12px;
              padding-left: 20px;
              border-bottom: 1px solid #ddd;
              a {
                color: black;
              }
            }
            .search-box-list {
              ul {
                font-size: 12px;

                li {
                  display: flex;
                  border-bottom: 1px solid #ddd;
                  p {
                    padding: 5px 0;
                  }
                  .left {
                    width: 65px;
                    padding-left: 10px;
                    border-right: 1px solid rgb(231, 14, 14);

                    i {
                      display: inline-block;
                      margin: 2px 10px 0 0;
                      width: 14px;
                      height: 15px;
                      background: url(./img/icon.29cd8439.png);
                    }

                    .songs {
                      background-position: -35px -300px;
                    }
                    .singer {
                      background-position: -50px -300px;
                    }

                    .ablum {
                      background-position: -35px -320px;
                    }

                    .songlist {
                      background-position: -50px -320px;
                    }
                  }

                  .right {
                    padding-left: 20px;
                    p {
                      font-size: 12px;
                    }
                  }
                }
              }
            }
          }
        }

        .nav {
          .tip {
            font-size: 12px;
          }
          .list {
            margin-top: 10px;
            display: flex;
            li {
              box-sizing: border-box;
              border: 1px solid #ddd;
              width: 25%;
              height: 40px;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            .active {
              border-top: 2px solid red;
              border-bottom: none;
            }
          }
        }
      }
    }
  }
</style>
