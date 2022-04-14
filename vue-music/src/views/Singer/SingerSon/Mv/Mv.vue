<template>
  <div class="Album">
    <div class="contain">
      <div class="margin">
        <div class="hoeRecomedt">
          <ul>
            <li v-for="item in mvs" :key="item.id">
              <!-- <router-link :to="`/playlist/${item.id}`" style="color:black"> -->

              <img v-lazy="item.imgurl" />
              <p>{{ cutString(item.name) }}</p>
              <p>{{ cutString(item.artistName) }}</p>
              <!-- </router-link> -->
            </li>
          </ul>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api/Api';
  export default {
    data() {
      return {
      mvs:[],
      };
    },

    mounted() {
      this.getSongerMv();
    },

    methods: {
      //获取数据
      async getSongerMv() {
        let result = await api.getSongerMv(this.$route.query.id)
        this.mvs = result.data.mvs;

        console.log(result.data);
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
        
        }
      }
    }
   
  }
</style>
