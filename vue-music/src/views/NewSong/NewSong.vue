<template>
  <div class="contain">
    <div class="margin">
      <div class="title">
        <h3>全部新碟 | 华语 | 欧美 | 韩国 | 日本</h3>

        <span>热门</span>
      </div>

      <div class="hoeRecomedt">
        <ul>
          <li v-for="item in hotSong" :key="item.id">
                             <router-link :to="`/playlist/${item.id}`" style="color:black">

            <img v-lazy="item.picUrl" />
            <a class="a"></a>
            <p>{{cutString( item.name )}}</p>
            <p>{{cutString (item.artist.name) }}</p> 
            </router-link>
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
</template>

<script>
  import api from '../../api/Api';
  export default {
    data() {
      return {
        hotSong: [],
        total: 10000,
        pageSize: 50,
        pageNo: 1,
        area: 'All',
        type: 'new',
        listShow: false,
        categories: {},
        sub: [],
      };
    },

    mounted() {
      this.getHotDecomment();
    },

    methods: {
      //获取数据
      async getHotDecomment() {
        let result = await api.getNewSong(
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
          this.area,
          this.type,
        );
        this.hotSong = result.data.albums;

        console.log(result.data);
      },
      handleSizeChange(val) {
        this.pageSize = val;
        this.getHotDecomment();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getHotDecomment();
      },

      // 展示分类
      listBtn() {
        this.listShow = !this.listShow;
        this.getCatList();
      },

      async getCatList() {
        let res = await api.getCatList();
        this.categories = res.data.categories;
        this.sub = res.data.sub;
        // console.log(res)
        this.handle();
      },

      handle() {
        this.sub.forEach((item) => {
          console.log(item);
        });
      },

         cutString(str) {
  if (str) {
      if (str.length > 8) {
          return str.substring(0, 8) + "...";
      }
      return str;
  }
  return ""
}

    },
  };
</script>

<style lang="less" scoped>
  .contain {
    width: 980px;
    margin: 0 auto;
    border: 1px solid #dddd;
    .margin {
      margin: 30px;

      .title {
        display: flex;
        align-items: center;
        border-bottom: 2px solid red;
        padding-bottom: 10px;

        h3 {
          flex-grow: 1;
        }
      }
      .hoeRecomedt {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            position: relative;
            box-sizing: border-box;
            width: 20%;
            padding: 15px;
            p {
              font-size: 14px;
            }
            .a {
              width: 153px;
              height: 130px;
              position: absolute;
              top: 28px;
              left: 33px;
              background: url(./img/coverall.6cb90dbc.png) no-repeat 0 -845px;
            }
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
