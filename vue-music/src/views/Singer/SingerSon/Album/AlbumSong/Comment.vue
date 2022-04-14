<template>
  <div class="comment-box">
    <div class="comment-contain">
      <div class="comment-contain-title">
        <h3>热门评论</h3>
        <span>({{hotComments}})</span>
      </div>
      <div class="user-input">
        <div class="input">
          <img src="./img/user.jpg" />
          <textarea class="text" placeholder="评论"></textarea>
        </div>
        <div class="user-input-icon">
          <i class="emjoy"></i>
          <i class="at"></i>

          <span>（520字）</span>
          <a>评论</a>
        </div>
      </div>

      <div class="comment-contain-title newcomment">
        <h3>最新评论</h3>
        <span>({{commenttotal}})</span>
      </div>

      <div
        class="comment-list"
        v-for="item in commentList"
        :key="item.commentId"
      >
        <div class="comment-list-flex">
          <img v-lazy="item.user.avatarUrl" />
          <div class="lists">
            <a style="color:red">{{ item.user.nickname }}</a>
            <p>{{ item.content }}</p>
            <!-- 回复 -->
            <div
              class="comment-list-flex"
              v-for="(item1, index) in item.beReplied"
              :key="index"
            >
              <img v-lazy="item1.user.avatarUrl" />
              <div class="lists">
                <a style="color:blue">{{ item1.user.nickname }}</a>
                <p>{{ item1.content }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="btm">
          <span class="btm-left">{{ item.timeStr }}</span>
          <i class="zan"></i>
          ({{ item.likedCount }})
          <span>| 回复</span>
        </div>
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
  import api from '../../../../../api/Api';
  export default {
    data() {
      return {
        commentList: [],
        total: 1000,
        pageSize: 20,
        pageNo: 1,
        commenttotal:0,
        hotComments:0,
      };
    },
    props: ['id'],
    mounted() {
      this.getAlbumSongComment(); //id, limit, offset
    },
    methods: {
      async getAlbumSongComment() {
        let res = await api.getAlbumSongComment(
          this.id,
          this.pageSize,
          (this.pageNo - 1) * this.pageSize,
        );
        this.commentList = res.data.comments;
        this.commenttotal = res.data.total;
        this.total =  res.data.total;
        this.hotComments = res.data.hotComments.length
        console.log(res.data);
      },

      handleSizeChange(val) {
        this.pageSize = val;
        this.getAlbumSongComment();
      },
      // 页面改变
      handleCurrentChange(val) {
        this.pageNo = val;
        this.getAlbumSongComment();
      },
    },
  };
</script>

<style scoped lang="less">
  .comment-box {
    width: 710px;
    margin-top: 52px;
    background: #fff;
    border-right: 1px solid #ddd;
    .comment-contain {
      margin-left: 40px;
      width: 640px;
      .comment-contain-title {
        display: flex;
        border-bottom: 2px solid #ddd;
        padding-bottom: 10px;
        align-items: center;
        h3 {
          font-size: 20px;
          padding-right: 20px;
        }
      }
      .user-input {
        .input {
          display: flex;
          .text {
            font-size: 12px;
            color: #333;
            font-family: Arial, Helvetica, sans-serif;
            -webkit-text-size-adjust: none;
            width: 100%;
            height: 63px;
            margin: 20px 0;
            padding-left: 20px;
            border: 1px solid #cdcdcd;
            border-radius: 2px;
            line-height: 19px;
            resize: none;
            outline: none;
          }
          img {
            margin: 20px 20px 0 0;
            width: 50px;
            height: 50px;
          }
        }

        .user-input-icon {
          display: flex;
          width: 610;
          height: 50px;
          margin-left: 70px;
          i {
            display: block;
            float: left;
            width: 18px;
            height: 18px;
            margin-right: 10px;
            background: url(./img/icon.29cd8439.png) no-repeat;
          }
          .emjoy {
            background-position: -40px -490px;
          }
          .at {
            flex-grow: 1;
            background-position: -60px -490px;
          }

          a {
            width: 46px;
            height: 25px;
            text-align: center;
            line-height: 24px;
            background: url(./img/button.52c2a54a.png) no-repeat -84px -94px;
            color: #fff;
            &:hover {
              background-position: -84px -64px;
              cursor: pointer;
            }
          }
          span {
            margin-right: 10px;
            line-height: 25px;
          }
        }
      }
      .newcomment {
        h3 {
          font-size: 16px;
        }
      }

      .comment-list {
        width: 640px;
        font-size: 12px;
        border-bottom: 2px solid #ddd;
        padding-bottom: 5px;
        a {
          color: black;
        }
        .comment-list-flex {
          display: flex;
          margin-top: 20px;
          img {
            width: 50px;
            height: 50px;
          }
          .lists {
            margin-left: 20px;
          }
        }

        .btm {
          display: flex;
          margin-top: 10px;
          align-items: center;
          .btm-left {
            padding-left: 70px;
            flex-grow: 1;
          }
          .zan {
            margin-right: 5px;
            vertical-align: -2px;
            margin-top: -2px;
            width: 15px;
            height: 14px;
            display: inline-block;
            background: url(./img/icon2.ba32baac.png) no-repeat;
            background-position: -150px 0;
          }
        }
      }
    }
    .pagination{
        display: flex;
        justify-content: center;
        margin: 20px 0;
    }
  }
</style>
