<template>
  <div class="searchsinger">
    <div class="contain">
      <div class="singer-list">
        <ul>
          <!-- @click="getSingers(item.id)" -->
          <li v-for="item in videos" :key="item.id">
            <span class="mv-time">{{timeHandel (item.playTime) }}</span>
            <div class="mv-icon">
              <i class="vidio"></i>
              <span>{{ item.durationms }}</span>
            </div>
            <img v-lazy="item.coverUrl" />
            <p>{{ cutString(item.title) }}</p>
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
  import api from '../../../api/Api';

  export default {
    data() {
      return {
        songlist: [],
        total: 0,
        pageSize: 52,
        pageNo: 1,
        videos: [],
      };
    },
    mounted() {
      this.eventHub.$on('getMv', (Mv) => {
        this.getDataForSearchMv();
      });
    },

    methods: {
      async getDataForSearchMv() {
        let res = await api.getDataForSearch(
          this.$route.params.keywords,
          this.$route.params.type,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );

        this.total = res.data.result.videoCount;
        this.videos = res.data.result.videos;
        console.log(res.data);

        // //传递总数给父路由
        // await this.$store.commit('GetMusicData/GETSEARCHTOTAL', this.total);
        // this.eventHub.$emit('goData', 'Go');
           this.$emit('on-child',this.total)
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataForSearchMv();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getDataForSearchMv();
      },

      // getSingers(id){
      //   this.$router.push({
      //     name:'singerdatil',
      //     params:{
      //       id
      //     }
      //   })
      // },

      cutString(str) {
        if (str) {
          if (str.length > 8) {
            return str.substring(0, 7) + '...';
          }
          return str;
        }
        return '';
      },
         //处理时间
      timeHandel(time) {
        let min = this.timeAdd0(parseInt((time / 60000) % 60));
        let sec = this.timeAdd0(parseInt(time /1000% 60));
        return `${min}:${sec}`;
      },
      //一位数就加0
      timeAdd0(mun) {
        if (mun < 9) {
          return `0${mun}`;
        }
        return mun;
      },

      
    },
  };
</script>

<style lang="less" scoped>
  .searchsinger {
    margin-top: 20px;
    width: 880px;
    .singer-list {
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          position: relative;
          box-sizing: border-box;
          padding: 10px;
          width: 20%;
          img {
            width: 150px;
            height: 120px;
          }

          .mv-time {
            position: absolute;
            bottom: 35px;
            left: 15px;
            color: white;
          }

          .mv-icon {
            position: absolute;
            top: 10px;
            right: 20px;
            color: white;
            background:rgba(0,0,0,.2);
            .vidio {
              width: 15px;
              height: 10px;
              display: inline-block;
              position: relative;
              top: 0;
              left: -3px;
              background: url(./img/icon2.ba32baac.png) no-repeat -60px -310px;
            }
          }
        }
      }
    }
    .pagination {
      margin-top: 20px;
      display: flex;
      justify-content: center;
    }
  }
</style>
