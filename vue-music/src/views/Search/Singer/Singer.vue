<template>
  <div class="searchsinger">
    <div class="contain">
      <div class="singer-list">
        <ul>
          <li
            v-for="item in singerlist"
            :key="item.id"
            @click="getSingers(item.id)"
          >
            <img v-lazy="item.img1v1Url" />
            <p>{{ cutString(item.name) }}</p>
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
    name:'searchSinger',
    data() {
      
      return {
        songlist: [],
        total: 0,
        pageSize: 52,
        pageNo: 1,
        singerlist: [],
        emitShow: true,
      };
    },
    mounted() {
      this.eventHub.$on('getSinger', (Singer) => {
        this.getDataForSearchSinger();
      });
    },

    methods: {
      async getDataForSearchSinger() {
        let res = await api.getDataForSearch(
          this.$route.params.keywords,
          this.$route.params.type,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );

        this.total = res.data.result.artistCount;
        this.singerlist = res.data.result.artists;

        // //传递总数给父路由
        // await this.$store.commit('GetMusicData/GETSEARCHTOTAL', this.total);
        // this.eventHub.$emit('goData', 'Go');
        if (this.emitShow) {
          this.$emit('on-child', this.total);
          this.emitShow = false;
          console.log('singer');
        }
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getDataForSearchSinger();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getDataForSearchSinger();
      },

      getSingers(id) {
        this.$router.push({
          name: 'singerdatil',
          params: {
            id,
          },
        });
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
    },

    unmounted() {
      this.eventHub.$off('getSinger');

      console.log(22);
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
          box-sizing: border-box;
          padding: 10px;
          width: 20%;
          img {
            width: 150px;
            height: 150px;
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
