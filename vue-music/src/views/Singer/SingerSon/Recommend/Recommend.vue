<template>
  <div class="recomment">
    <div class="recomment-contain">
      <h3>歌手简介</h3>
      <div class="context">
        <p>{{ briefDesc }}</p>
        <div class="txt" v-for="(item,index) in introduction" :key="index">
          <h4>{{item.ti}}</h4>
          <p style="white-space: pre-wrap;">{{item.txt}}</p>
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
        briefDesc: '',
        introduction:'',
      };
    },
    mounted() {
      this.getSongerDeec();
    },
    methods: {
      async getSongerDeec() {
        let res = await api.getSongerDeec(this.$route.params.id);
        
        this.briefDesc = res.data.briefDesc;
        this.introduction = res.data.introduction
        // .split('\n')
        console.log(res.data);
      },
    },
  };
</script>

<style lang="less" scoped>
  .recomment {
    .recomment-contain {
      h3 {
        font-size: 18px;
      }
      .context {
        margin: 20px;
        p{
          font-size: 13px;
          line-height: 30px;
          text-align: justify;
        }

        .txt{
          margin: 20px 0;
          p{
            padding-top: 10px;
          }
        }
      }
    }
  }
</style>
