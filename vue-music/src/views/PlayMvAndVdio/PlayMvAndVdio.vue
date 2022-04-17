<template>
  <div class="playMvAndVdio">
    <div class="play-flex">
      <div class="play-contain">
        <div class="title">
          <h3>{{ $route.query.title }}</h3>
          <a>{{ $route.query.name }}</a>
        </div>
        <div class="play-mv">
          <video :src="url" controls class="video"></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  export default {
    data() {
      return {
        url: '',
      };
    },
    mounted() {
      this.getUrl(this.$route.query.type, this.$route.query.id);
    },
    methods: {
      async getUrl(type, id) {
        if (type == 1) {
          //视频
          let res = await api.getVideoUrl(id);
         this.url = res.data.urls[0].url;
          console.log(type,res.data);
        } else {
          //mv
          let res = await api.getMvUrl(id);
        this.url = res.data.data.url;
        console.log(type);
         console.log(res.data);
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .playMvAndVdio {
    margin: 0 auto;
    width: 980px;
    background: white;
    .play-flex {
      display: flex;
      .play-contain {
        margin: 30px 30px 50px 30px;
        width: 710px;
        .title {
            height: 32px;
          h3 {
            float: left;
            font-size: 20px;
            margin-right: 10px;
            line-height: 32px;
          }
          a {
            float: left;
            line-height: 32px;
            color: rgb(112, 109, 109);
          }
        }
        .play-mv {
          width: 640px;
          height: 360px;
              background: #eaeaea;
          .video {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
</style>
