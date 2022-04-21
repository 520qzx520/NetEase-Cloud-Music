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
        <ul class="icons">
          <a class="like">
            <i>
              <em></em>
              ({{ likedCount }})
            </i>
          </a>
          <a class="collection">
            <i>
              <em></em>
              ({{ commentCount }})
            </i>
          </a>
          <a class="share">
            <i>
              <em></em>
              ({{ shareCount }})
            </i>
          </a>
        </ul>

        <!-- 评论 -->
        <Comment :type="this.$route.query.type" :id="this.$route.query.id" />
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  import Comment from './Comment.vue';
  export default {
    data() {
      return {
        url: '',
        commentCount: 0,
        likedCount: 0,
        shareCount: 0,
      };
    },
    components: {
      Comment,
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
          let detail = await api.getVdioDetail(id);
          this.commentCount = detail.data.commentCount;
          this.likedCount = detail.data.likedCount;
          this.shareCount = detail.data.shareCount;
        } else {
          //mv
          let res = await api.getMvUrl(id);
          this.url = res.data.data.url;
          let detail = await api.getMvDetail(id);
          this.commentCount = detail.data.commentCount;
          this.likedCount = detail.data.likedCount;
          this.shareCount = detail.data.shareCount;
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .playMvAndVdio {
    margin: 0 auto;
    width: 980px;
    border: 1px solid #ddd;
    background: white;
    .play-flex {
      display: flex;
      width: 710px;
      border-right: 1px solid #ddd;
      .play-contain {
        margin: 30px 0 50px 30px;
        width: 640px;

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

        .icons {
          margin: 10px 5px;
          a {
            color: black;
            margin-right: 10px;
            height: 31px;

            background: url(./img/button2.png) no-repeat 0 9999px;
          }
          i {
            background: url(./img/button2.png) no-repeat 0 9999px;

            height: 31px;
            display: inline-block;
          }
          .like {
            background-position: right -100px;
            padding: 4.5px 5px 6px 0;
            height: 31px;

            i {
              background-position: 0 -59px;
              em {
                display: inline-block;
                width: 17px;
                height: 15px;
                margin: 6px 0 0 5px;
                background: url(./img/button2.png) no-repeat 0 9999px;

                background-position: 0 -95px;
              }
            }
          }

          .collection {
            background-position: right -100px;
            padding: 4.5px 5px 6px 0;
            height: 31px;

            i {
              background-position: 0 -977px;
              em {
                display: inline-block;
                width: 17px;
                height: 15px;
                margin: 6px 0 0 5px;
              }
            }
          }
          .share {
            background-position: right -100px;
            padding: 4.5px 5px 6px 0;
            height: 31px;

            i {
              background-position: 0 -1225px;
              em {
                display: inline-block;
                width: 17px;
                height: 15px;
                margin: 6px 0 0 5px;
              }
            }
          }
        }
      }
    }
  }
</style>
