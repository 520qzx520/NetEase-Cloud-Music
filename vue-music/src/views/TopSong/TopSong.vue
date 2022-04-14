<template>
  <div class="box">
    <div class="contain">
      <!-- z左边 -->
      <div class="left">
        <h3>云排行榜</h3>
        <div class="left-list">
          <ul>
            <li v-for="item in toplist" :key="item.id">
              <router-link
                :to="`/topsong/${item.id}`"
                @click="btnGoid(item.id)"
                active-class="active"
              >
                <div class="flex">
                  <img v-lazy="item.coverImgUrl" />
                  <p>{{ item.name }}</p>
                </div>
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <!-- 右边 -->
      <RightTopSong ref="child" />
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  import RightTopSong from './RightTopSong.vue';
  export default {
    data() {
      return {
        toplist: [],
      };
    },
    components: {
      RightTopSong,
    },

    mounted() {
      this.getTopList();
    },
    methods: {
      //榜单列表分类
      async getTopList() {
        let res = await api.getTopList();
        this.toplist = res.data.list;
        console.log(res.data);
      },

      btnGoid(id) {
        this.$refs.child.clickList(id);
      },
    },
  };
</script>

<style lang="less" scoped>
  .box {
    margin: 0 auto;
    width: 980px;
    border: 1px solid #ddd;
    .contain {
      display: flex;
      .left {
        width: 240px;
        background: #ddd;
        h3 {
          padding: 20px;
        }
        .left-list {
          ul {
            box-sizing: border-box;
            width: 240px;
          }
          li {
            padding: 5px 20px;
            height: 62px;
            .flex {
              display: flex;
              align-items: center;
            }
            img {
              width: 40px;
              height: 40px;
              z-index: 99;
            }

            p {
              z-index: 99;
              margin-left: 10px;
              font-size: 12px;
            }
            .active {
              .flex {
                position: relative;
                &::after {
                  content: '';
                  position: absolute;
                  top: -13px;
                  left: -19px;
                  width: 238px;
                  height: 58px;
                  background-color: #b0cdca;
                  z-index: 0;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
