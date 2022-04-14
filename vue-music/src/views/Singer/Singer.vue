<template>
  <div class="singer">
    <div class="singer-flex">
      <div class="left">
        <div class="left-margin" ref="bg">
          <ul>
            <h3>推荐</h3>
            <li @click="listBtn(-1, -1, $event)" ref="moren">推荐歌手</li>
            <li @click="listBtn(-1, 7, $event)">入驻歌手</li>
          </ul>
          <ul>
            <h3>华语</h3>
            <li @click="listBtn(1, 7, $event)">华语男歌手</li>
            <li @click="listBtn(2, 7, $event)">华语女歌手</li>
            <li @click="listBtn(0, 7, $event)">华语组合</li>
          </ul>
          <ul>
            <h3>欧美</h3>
            <li @click="listBtn(1, 96, $event)">欧美男歌手</li>
            <li @click="listBtn(2, 96, $event)">欧美女歌手</li>
            <li @click="listBtn(0, 96, $event)">欧美组合</li>
          </ul>
          <ul>
            <h3>日本</h3>
            <li @click="listBtn(1, 8, $event)">日本男歌手</li>
            <li @click="listBtn(2, 8, $event)">日本女歌手</li>
            <li @click="listBtn(0, 8, $event)">日本组合</li>
          </ul>
          <ul>
            <h3>韩哥</h3>
            <li @click="listBtn(1, 16, $event)">韩哥男歌手</li>
            <li @click="listBtn(2, 16, $event)">韩哥女歌手</li>
            <li @click="listBtn(0, 16, $event)">韩哥组合</li>
          </ul>
          <ul>
            <h3>其他</h3>
            <li @click="listBtn(1, 0, $event)">其他男歌手</li>
            <li @click="listBtn(2, 0, $event)">其他女歌手</li>
            <li @click="listBtn(0, 0, $event)">其他组合</li>
          </ul>
        </div>
      </div>

      <div class="right">
        <div class="right-margin">
          <div class="right-title">
            <h3>歌手</h3>
          </div>
          <ul class="zm">
            <li
              v-for="(item, index) in zm"
              :key="index"
              @click="clickZmBtn(item)"
            >
              <!-- <router-link to="/singer" exact style="color:black">   -->
              {{ item }}
              <!-- </router-link> -->
            </li>
          </ul>

          <ul class="right-list">
            <!--  @click="clickSinger(item.id)" -->
            <li
              v-for="item in artists"
              :key="item.id"
              @click="goSingeriId(item.id)"
            >
              <img v-lazy="item.picUrl" />
              <p>{{ item.name }}</p>
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
  </div>
</template>

<script>
  import api from '../../api/Api';

  export default {
    data() {
      return {
        artists: [],
        total: 1000,
        pageSize: 35,
        pageNo: 1,
        type: -1,
        area: -1,
        initial: -1,
        zm: [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z',
          '其他',
        ],
      };
    },
    mounted() {
      this.getSingerList(this.type, this.area, this.initial);
      //默认颜色
      this.$refs.moren.style.background = '#8fd6d1';
    },

    methods: {
      //一开始就获取数据
      async getSingerList(type, area, initial) {
        let res = await api.getSingerList(
          type,
          area,
          initial,
          this.pageSize, //limiot
          (this.pageNo - 1) * this.pageSize, //offset
        );
        this.artists = res.data.artists;
      },
      //d点击左边的分类
      listBtn(type, area, event) {
        //   保存值
        this.type = type;
        this.area = area;

        //清除所有颜色
        let lis = this.$refs.bg.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
          lis[i].style.background = '#d7e8e8';
        }
        //点击的元素变色
        event.target.style.background = '#8fd6d1';

        this.getSingerList(this.type, this.area, this.initial);
      },

      //点击字母
      clickZmBtn(item) {
        this.getSingerList(this.type, this.area, item);
      },

      //分页
      handleSizeChange(val) {
        this.pageSize = val;
        this.getSingerList(this.type, this.area, this.initial);
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getSingerList(this.type, this.area, this.initial);
      },

      // clickSinger(id){
      //   this.$router.push(`/singerdatil/${id}`)
      // }
      goSingeriId(id) {
        this.$router.push({
          path: 'singerdatil',
          name: 'singerdatil',
          params: {
            id: id,
          },
        });
      },
    },
  };
</script>

<style scoped lang="less">
  .singer {
    width: 980px;
    margin: 0 auto;
    border: 1px solid #ddd;
    .singer-flex {
      display: flex;

      .left {
        width: 180px;
        background: #d7e8e8;

        .left-margin {
          box-sizing: border-box;
          padding: 20px;

          ul {
            margin: 20px 0;
            h3 {
              padding-bottom: 10px;
            }
            li {
              font-size: 12px;
              padding: 10px 0;
            }
          }
        }
      }

      .right {
        width: 800px;

        .right-margin {
          margin: 10px 30px 0 30px;
          .zm {
            display: flex;
            margin: 20px 0;
            li {
              width: 28px;
              font-size: 13px;
              text-align: center;
            }
          }
          .right-title {
            h3 {
              font-size: 20px;
            }
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
          }
          .right-list {
            display: flex;
            flex-wrap: wrap;
            li {
              width: 20%;
              box-sizing: border-box;
              padding: 10px;

              img {
                width: 130px;
                height: 120px;
              }
            }
          }
        }
        .pagination {
          display: flex;
          justify-content: center;
        }
      }
    }

    .active {
      display: inline-block;
      background: red;
      width: 100%;
      height: 100%;
    }
  }
</style>
