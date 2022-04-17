<template>
  <div class="search-song">
    <div class="search-song-list">
      <ul ref="play">
        <li
          v-for="(item, index) in songlist"
          :key="item.id"
          :class="{ bg: index % 2 == 0 }"
        >
          <div class="songname pa">
            <i class="play" @click="getUrl(item.id, $event)"></i>
            <span>{{ cutString(item.name, 16) }}</span>
            <div class="disp">
              <div class="icon">
                <i class="i1"></i>
                <i class="i2"></i>
                <i class="i3"></i>
                <i class="i4"></i>
              </div>
            </div>
          </div>
          <div class="singername pa" @click="getSinger(item.ar[0].id)">
            {{ cutString(item.ar[0].name, 8) }}
          </div>
          <div class="singerabulm pa" @click="getSongDetail(item.al.id)">
            《{{ cutString(item.al.name, 8) }}》
          </div>
          <div class="songtime pa">{{ timeHandel(item.dt) }}</div>
        </li>
      </ul>
      <!-- 分页 -->
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model="pageNo"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        class="pagination"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/Api';
  export default {
    name: 'SearchSong',
    data() {
      return {
        songlist: [],
        total: 0,
        pageSize: 52,
        pageNo: 1,
        emitShow: true,
      };
    },
    mounted() {
      this.eventHub.$on('getSong', (Song) => {
        this.getDataForSearch();
      });
    },

    methods: {
      //发送请求
      async getDataForSearch() {
        let res = await api.getDataForSearch(
          this.$route.params.keywords,
          this.$route.params.type,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );

        // console.log(this.$route.params.keywords, this.$route.params.type);
        this.songlist = res.data.result.songs;
        this.total = await res.data.result.songCount;
        //传递总数给父路由
        // await this.$store.commit('GetMusicData/GETSEARCHTOTAL', this.total);
        // this.eventHub.$emit('goData', 'Go');
        if (this.emitShow) {
          this.$emit('on-child', this.total);
          this.emitShow = false;
          console.log('song');
        }
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataForSearch();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getDataForSearch();
      },

      //传递id，让vuex的方法得到歌曲，歌词，歌曲详情
      async getUrl(id, e) {
        await this.$store.dispatch('GetMusicData/getMusicUrl', id);
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        this.eventHub.$emit('goData', 'Go');
        //点击播放按钮的样式
        this.playbg(e);
      },

      //跳转到歌手详情
      getSinger(id) {
        this.$router.push({
          name: 'singerdatilhotwork',
          params: {
            id,
          },
        });
      },

      //切换到歌手专辑的歌曲列表页面
      getSongDetail(id) {
        this.$router.push({
          name: 'singerablumsong',
          query: {
            id,
          },
        });
      },

      playbg(evnet) {
        //清除所有颜色
        let lis = this.$refs.play.querySelectorAll('.play');
        for (let i = 0; i < lis.length; i++) {
          lis[i].classList.remove('active');
        }
        // 点击的元素变色
        evnet.target.className += ' active';
      },

      //防止字符串过程，页面撑开
      cutString(str, lengs) {
        if (str) {
          if (str.length > lengs) {
            return str.substring(0, lengs) + '...';
          }
          return str;
        }
        return '';
      },
      //处理时间
      timeHandel(time) {
        let min = this.timeAdd0(parseInt((time / 60000) % 60));
        let sec = this.timeAdd0(parseInt((time / 1000) % 60));
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
    // unmounted() {
    //   this.eventHub.$off('getSong');

    //   console.log(22)
    // },
  };
</script>

<style lang="less" scoped>
  .search-song {
    margin-top: 20px;
    .search-song-list {
      ul {
        .bg {
          background: #eaeaea;
        }
        li {
          display: flex;

          font-size: 13px;

          .pa {
            padding: 15px 5px;
          }
          .songname {
            display: flex;
            width: 360px;
            box-sizing: border-box;
            height: 100%;
            color: #22b8ff;

            span {
              flex-grow: 1;
              padding-left: 5px;
            }
            .play {
              float: left;
              width: 17px;
              height: 17px;
              margin-right: 5px;
              background: url(./img/bf.png) no-repeat 0 -103px;
              cursor: pointer;

              &:hover {
                background: url(./img/bf.png) no-repeat 0 -128px;
              }
            }
            .disp {
              display: none;

              .icon {
                display: flex;
                padding-right: 10px;
                i {
                  margin: 2px 0 0 4px;
                  width: 18px;
                  height: 16px;
                  display: block;

                  background: url(./img/bf.png) no-repeat;
                }
                .i1 {
                  display: inline-block;
                  width: 13px;
                  height: 13px;
                  margin-top: 2px;
                  margin-left: 0;
                  background: url(../img/icon.29cd8439.png) no-repeat;
                  background-position: 0 -700px;
                  &:hover {
                    background-position: -22px -700px;
                  }
                }
                .i2 {
                  background-position: 0 -174px;
                  &:hover {
                    background-position: -20px -174px;
                  }
                }

                .i3 {
                  background-position: 0 -195px;
                  &:hover {
                    background-position: -20px -195px;
                  }
                }
                .i4 {
                  background-position: -81px -174px;
                  &:hover {
                    background-position: -104px -174px;
                  }
                }
              }
            }

            .active {
              background-position: -20px -128px;
            }
          }
          .singername {
            width: 180px;
          }

          .singerabulm {
            width: 200px;
          }

          .songtime {
            width: 140px;
          }
          &:hover {
            background: powderblue;
            .disp {
              display: block;
            }
          }
        }
      }
      .pagination {
        display: flex;
        margin-top: 20px;
        justify-content: center;
      }
    }
  }
</style>
