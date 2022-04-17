<template>
  <div class="search-song">
    <div class="search-song-list">
      <ul ref="play">
        <li
          v-for="(item, index) in playlist"
          :key="item.id"
          :class="{ bg: index % 2 == 0 }"
        >
          <div class="songname pa">
            <i class="play"></i>
            <img v-lazy="item.coverImgUrl" />
            <span @click="getPlayList(item.id)">
              {{ cutString(item.name, 16) }}
            </span>
            <div class="disp">
              <div class="icon">
                <i class="i1"></i>
                <i class="i2"></i>
                <i class="i3"></i>
                <i class="i4"></i>
              </div>
            </div>
          </div>
          <div class="singername pa fl">{{ item.trackCount }}首</div>
          <div class="singerabulm pa fl" @click="getUser(item.creator.userId)">
            by 《{{ cutString(item.creator.nickname, 8) }}》
          </div>
          <div class="songtime pa fl">{{ item.playCount }}次播放</div>
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
    name: 'searchPlaylist',
    data() {
      return {
        total: 100,
        pageSize: 52,
        pageNo: 1,
        playlist: [],
        emitShow: true,
      };
    },

    mounted() {
      this.eventHub.$on('getPlayList', (Playlist) => {
        this.getDataForSearchPlayList();
      });
    },

    methods: {
      //获取数据
      async getDataForSearchPlayList() {
        let res = await api.getDataForSearch(
          this.$route.params.keywords,
          this.$route.params.type,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );
        console.log(res);
        this.total = res.data.result.playlistCount;
        this.playlist = res.data.result.playlists;
        //传递总数给父路由
        // await this.$store.commit('GetMusicData/GETSEARCHTOTAL', this.total);
        // this.eventHub.$emit('goData', 'Go');
        if (this.emitShow) {
          this.$emit('on-child', this.total);
          this.emitShow = false;
          console.log('playlist');
        }
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataForSearchPlayList();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getDataForSearchPlayList();
      },

      getUser(id) {
        this.$router.push(
          {
            name: 'singerdatil',
            params: {
              id,
            },
          },
          // 'albumsong'
        );
      },
      getPlayList(id) {
        this.$router.push(
          {
            name: 'playlist',
            params: {
              id,
            },
          },
          // 'albumsong'
        );
      },
      cutString(str, len) {
        if (str) {
          if (str.length > len) {
            return str.substring(0, len) + '...';
          }
          return str;
        }
        return '';
      },
    },

    unmounted() {
      this.eventHub.$off('getPlayList');

      console.log(22);
    },
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
            position: relative;
            display: flex;
            align-items: center;
            width: 360px;
            box-sizing: border-box;
            height: 100%;
            color: #22b8ff;
            img {
              margin: 0 10px;
              width: 50px;
              height: 50px;
            }

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
                position: absolute;
                top: 50%;
                transform: translate(5%, -50%);
                right: 0;
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

          .fl {
            display: flex;
            align-items: center;
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
