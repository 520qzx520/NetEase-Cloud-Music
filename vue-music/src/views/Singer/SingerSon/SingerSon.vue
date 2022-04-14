<template>
  <div class="singerDetail">
    <div class="flex">
      <div class="left-contain">
        <div class="margin">
          <div class="title">
            <h3>{{ name }}</h3>
            <img :src="imgurl" />
          </div>

          <ul class="nav">
            <li @click="goMv(this.$route.params.id)">热门作品</li>
            <li @click="goAblum(this.$route.params.id)">所有专辑</li>
            <li @click="goHotWork(this.$route.params.id)">相关MV</li>
            <li @click="goRecommed(this.$route.params.id)">艺人介绍</li>
          </ul>
          <div class="router">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../api/Api';

  export default {
    data() {
      return {
        artist: {},
        imgurl: '',
        name: '',
        ID: '',
      };
    },
    mounted() {
      this.getSingerDetail();
      this.ID = this.$route.params.id;
    },
    methods: {
      async getSingerDetail() {
        let res = await api.getSingerDetail(this.$route.params.id);
        let artist = res.data.data.artist;
        this.imgurl = artist.cover;
        this.name = artist.name;
        console.log(res);
      },

      goMv(id) {
        this.$router.push({
          name: 'singerdatilmv',
          query: {
            id,
          },
        });
      },
       goAblum(id) {
        this.$router.push({
          name: 'singerdatilablum',
          query: {
            id,
          },
        });
      },
       goHotWork(id) {
        this.$router.push({
          name: 'singerdatilhotwork',
          query: {
            id,
          },
        });
      },
       goRecommed(id) {
        this.$router.push({
          name: 'singerdatilrecommend',
          query: {
            id,
          },
        });
      },


    },
  };
</script>

<style lang="less" scoped>
  .singerDetail {
    width: 980px;
    margin: 0 auto;
    background: pink;
    .flex {
      display: flex;
      .left-contain {
        width: 710px;
        background: aliceblue;
        .margin {
          margin: 35px;
          width: 640px;
          h3 {
            font-size: 20px;
          }
          .nav {
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
          .router {
            margin-top: 20px;
          }
        }
      }
    }
  }
</style>
