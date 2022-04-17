<template>
  <div class="Album">
    <div class="contain">
      <div class="margin">
        <div class="hoeRecomedt">
          <ul>
            <li
              v-for="item in albums"
              :key="item.id"
              @click="gethotAlbums(item.id)"
            >
              <img v-lazy="item.picUrl" />
              <a class="a"></a>
              <p>{{ cutString(item.name) }}</p>
              <p>{{ cutString(item.artist.name) }}</p>
            </li>
          </ul>
        </div>
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
  </div>
</template>

<script>
  import api from '../../../api/Api';
  export default {
    data() {
      return {
        total: 100,
        pageSize: 52,
        pageNo: 1,
        albums: [],
      };
    },

    mounted() {
      this.eventHub.$on('getAblum', (Ablum) => {
        this.getDataForSearchSingerAblum();
      });
    },

    methods: {
      //获取数据
      async getDataForSearchSingerAblum() {
        let res = await api.getDataForSearch(
          this.$route.params.keywords,
          this.$route.params.type,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );
        this.total = res.data.result.albumCount;
        this.albums = res.data.result.albums;
        //传递总数给父路由
        // await this.$store.commit('GetMusicData/GETSEARCHTOTAL', this.total);
        // this.eventHub.$emit('goData', 'Go');
           this.$emit('on-child',this.total)
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataForSearchSingerAblum();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getDataForSearchSingerAblum();
      },

      cutString(str) {
        if (str) {
          if (str.length > 8) {
            return str.substring(0, 7) + '...';
          }
          return str;
        }
        return '';
      },

      gethotAlbums(id) {
        this.$router.push(
          {
            name: 'singerablumsong',
            query: {
              id,
            },
          },
          // 'albumsong'
        );
      },
    },
  };
</script>

<style lang="less" scoped>
  .contain {
    width: 888px;
    margin: 0 auto;

    .hoeRecomedt {
      ul {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        li {
          position: relative;
          box-sizing: border-box;
          width: 20%;
          box-sizing: border-box;
          padding: 15px 20px;
          img {
            width: 150px;
            height: 150px;
          }
          p {
            font-size: 14px;
          }
          .a {
            width: 153px;
            height: 130px;
            position: absolute;
            top: 25px;
            left: 26px;
            background: url(./img/coverall.6cb90dbc.png) no-repeat 0 -845px;
          }
        }
      }
    }
    .pagination {
      display: flex;
      justify-content: center;
    }
  }
</style>
