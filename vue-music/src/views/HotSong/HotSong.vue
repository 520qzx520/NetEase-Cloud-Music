<template>
  <div class="contain">
    <div class="margin">
      <div class="title">
        <h3>全部</h3>
        <div class="cate">
          <div class="option" @click="listBtn">选择分类</div>
          <div class="list" v-if="listShow">
            <ul class="bigul">
              <li
                class="bigli"
                v-for="(item, index) in categories"
                :key="index"
              >
                <div class="left">
                  <i :class="`icon${index}`"></i>
                  {{ item }}
                  </div>
                <ul class="right">
                 
                  <li v-for="(item1, index1) in handelarr[index]" :key="index1" @click=" clickListBtnChange(item1)">
                    {{ item1 }}  
                  </li>
               
                </ul>
              </li>
            </ul>
          </div>
        </div>
        <span>热门</span>
      </div>

      <div class="hoeRecomedt">
        <ul>
          <li v-for="item in hotSong" :key="item.id">
            <router-link :to="`/playlist/${item.id}`" style="color:black">
            <img v-lazy="item.coverImgUrl" />
            <a></a>
            <p>{{ item.name }}</p>
            </router-link>
          </li>
        </ul>
      </div>

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
        total: 1000,
        pageSize: 35,
        pageNo: 1,
        cat: '全部',
        order: 'hot',
        listShow: false,
        categories: {},
        sub: [],
        handelarr: [],
      };
    },

    mounted() {
      this.getHotDecomment();
    },

    methods: {
      //获取数据
      async getHotDecomment() {
        let result = await api.getPlayListCat(
          this.pageSize,
         this.order, 
          this.cat,
          (this.pageNo - 1) * this.pageSize,
        );
        this.hotSong = result.data.playlists;

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
//分类
      async getCatList() {
        let res = await api.getCatList();
        this.categories = res.data.categories;
        this.sub = res.data.sub;
        // console.log(res)
        this.handle();
      },

//处理分类，把他弄成二位数组
      handle() {
        var i = 0;

        var arr0 = [];
        for (i in this.categories) {
          var arr1 = [];
          this.sub.forEach((item) => {
            if (i == item.category) {
              arr1.push(item.name);
            }
            arr0[i] = arr1;
          });
        }
        this.handelarr = arr0;
      },

      clickListBtnChange(cat){
        this.cat= cat
        this.listShow = !this.listShow
        this.getHotDecomment()
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
        .cate {
          position: relative;

          margin-left: 20px;
          flex-grow: 1;

          .option {
            width: 100px;
            text-align: center;
            height: 36px;
            line-height: 36px;
            background: #ddd;
          }
          .list {
            position: absolute;
            width: 666px;
            height: 452px;
            top: 45px;
            left: -68px;
            box-shadow: 0px 2px 10px #0e25f9dd;
            background: #ddd;

            .bigul {
              margin: 30px;

              .bigli {
                display: flex;
                .left {
                  width: 100px;
                  margin-bottom: 20px;
                  .icon0 {    background-position: -20px -735px;

                   }
                    .icon1 {     background-position: 0 -60px;

                   }
                    .icon2 {   background-position: 0 -88px;

                   }
                    .icon3 {   background-position: 0 -117px;
                   }
                    .icon4 {       background-position: 0 -141px;
                   }
                  
                  i{
                     display: block;
                    float: left;
                    width: 23px;
                    height: 23px;
                    margin: 0 8px 4px 0;
                    background: url(./img/icon.29cd8439.png) no-repeat;
                  } 
                 
                }
                .right {
                  width: 600px;
                  display: flex;
                  flex-wrap: wrap;
                  li {
                    box-sizing: border-box;
                    width: 15%;
                    padding: 0 10px 10px 10px;

                    font-size: 12px;
                  }
                }
              }
            }
          }
        }
      }
      .hoeRecomedt {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            box-sizing: border-box;
            width: 20%;
            padding: 15px;
            p {
              font-size: 14px;
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
