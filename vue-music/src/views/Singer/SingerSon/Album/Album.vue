<template>
  <div class="Album">
    <div class="contain">
      <div class="margin">
        <div class="hoeRecomedt">
          <ul>
            <li v-for="item in hotAlbums" :key="item.id" @click="gethotAlbums(item.id)">
              <!-- <router-link :to="`/playlist/${item.id}`" style="color:black"> -->
              <!-- <router-link to="albumsong" custom v-slot="{ navigate }">
                <div @click="navigate" @keypress.enter="navigate" role="link"> -->
                  <img v-lazy="item.picUrl" />
                  <a class="a"></a>
                  <p>{{ cutString(item.name) }}</p>
                  <p>{{ cutString(item.artist.name) }}</p>
                <!-- </div> -->
              <!-- </router-link> -->

              <!-- </router-link> -->
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
  import api from '../../../../api/Api';
  export default {
    data() {
      return {
        total: 100,
        pageSize: 20,
        pageNo: 1,
        hotAlbums: [],
      };
    },

    mounted() {
      this.getSongerAlbum();
    },

    methods: {
      //获取数据
      async getSongerAlbum() {
        let result = await api.getSongerAlbum(
          this.$route.params.id,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );
        this.hotAlbums = result.data.hotAlbums;

        console.log(result.data);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getSongerAlbum();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getSongerAlbum();
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

      gethotAlbums(id){
          this.$router.push(
           {
             name: 'singerablumsong',
              query: {
                id
              },
           }
            // 'albumsong'
            );
      }
    },
  };
</script>

<style lang="less" scoped>
  .contain {
    width: 640px;
    margin: 0 auto;
    border: 1px solid #dddd;

    .hoeRecomedt {
      ul {
        display: flex;
        margin-top: 20px;
        flex-wrap: wrap;
        li {
          position: relative;
          box-sizing: border-box;
          width: 25%;
          box-sizing: border-box;
          padding: 15px 20px;

          p {
            font-size: 14px;
          }
          .a {
            width: 153px;
            height: 120px;
            position: absolute;
            top: 15px;
            left: 19px;
            background: url(./img/coverall.6cb90dbc.png) no-repeat -10px -850px;
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
