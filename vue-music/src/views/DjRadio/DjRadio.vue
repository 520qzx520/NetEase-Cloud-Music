<template>
  <div class="dj">
    <div class="dj-contain">
      <div class="dj-top-list">
        <ul>
          <li
            v-for="(item, index) in categories"
            :key="item.id"
            @click="bgBtn(index)"
          >
            <a ref="abg">
              <i
                :style="`background-image:url(${item.picWebUrl})`"
                ref="ibg"
              ></i>
              <span>{{ item.name }}</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="dj-flex">
        <div class="dj-left">
          <div class="title">
            <h3>推荐节目</h3>
            <span>更多 ></span>
          </div>
          <ul class="list">
            <li
              v-for="(item, index) in recom"
              :key="item.id"
              :class="{ bglist: index % 2 == 0 }"
            >
              <img :src="item.coverUrl" />
              <div class="list-left">
                <a class="tl">{{ cutString(item.name ,20)}}</a>
                <a class="name">{{ cutString(item.radio.name,10 )}}</a>
              </div>
              <p>{{item.radio.category}}</p>
            </li>
          </ul>
        </div>
        <div class="dj-right dj-left">
          <div class="title">
            <h3>节目排行榜</h3>
            <span>更多 ></span>
          </div>
          <ul class="list">
            <li
              v-for="(item, index) in list"
              :key="item.id"
              :class="{ bglist: index % 2 == 0 }"
            >
              <img :src="item.program.coverUrl" />
              <div class="list-left">
                <a class="tl">{{ cutString(item.program.description, 20) }}</a>
                <a class="name">{{ cutString(item.program.name,20)  }}</a>
              </div>
                            <p>{{item.program.radio.category}}</p>


            </li>
          </ul>
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
        categories: [],
        bglength: 0,
        recom: [],
        list: [],
      };
    },
    mounted() {
      this.getDjCateList();
      this.getPorgramRecommend();
      this.getDjPerRecommend();
    },

    methods: {
      //分类列表
      async getDjCateList() {
        let res = await api.getDjCateList();
        this.categories = res.data.categories;
        this.bglength = res.data.categories.length;
        // console.log(res);
      },

      //点击的样式
      bgBtn(index) {
        for (let i = 0; i < this.bglength; i++) {
          this.$refs.ibg[i].className = ' ';
          //   this.$refs.abg[i].classList.remove('bg');
          this.$refs.abg[i].className = ' ';
        }

        this.$refs.ibg[index].className += ' active';
        this.$refs.abg[index].className += ' bg';
      },

      async getDjPerRecommend() {
        let res = await api.getDjPerRecommend(10);
        this.list = res.data.data.list;
        console.log(res.data);
      },
      async getPorgramRecommend() {
        let res = await api.getPorgramRecommend();
        this.recom = res.data.programs;
        console.log(res.data);
      },

      cutString(str, len) {
        if (str) {
          if (str.length > len) {
            return str.substring(0, len) + '...';
          }
          return str;
        }
        return '';
      },
    },
  };
</script>

<style lang="less" scoped>
  .dj {
    margin: 0 auto;
    width: 980px;
    border: 1px solid #ddd;
    background-color: white;
    .dj-contain {
      margin: 30px;
      .dj-top-list {
        ul {
          display: flex;
          flex-wrap: wrap;
          li {
            display: flex;
            justify-content: center;
            width: 11.111%;
            margin: 20px 0;
            i {
              display: inline-block;
              width: 48px;
              height: 48px;
            }
            .active {
              background-position: -48px 0;
            }
            span {
              font-size: 12px;
            }

            a {
              display: flex;
              flex-direction: column;
              align-items: center;
              height: 70px;
              color: #777;
            }
            .bg {
              background-image: url(./img/radio_bg.png);
              background-position: -70px 0;
              color: #d35757;
              width: 70px;
              height: 70px;
            }
          }
        }
      }
      .dj-flex {
        margin: 20px 20px 20px 10px;
        display: flex;
        width: 900px;
        .dj-left {   
          width: 426px;
          .title {
            display: flex;
            border-bottom: 2px solid #ddd;
            padding-bottom: 10px;
            align-items: center;
            justify-content: space-between;
            h3 {
              font-size: 20px;
            }
          }

          .list {
            margin-top: 10px;
           

            li { 
              font-size: 13px;
              display: flex;
              padding: 5px;
              align-items: center;
              p{
                
                margin-right: 10px;
                border: 1px solid #ddd;
                padding: 2px;
              }

              img {
                width: 45px;
                height: 45px;
              }

              .list-left {
                margin-left: 10px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                flex-grow: 1;
                a {
                  color: black;
                  font-size: 12px;
                  //   margin-top: 5px;
                }
              }
            }

            .bglist {
              background-color: #f7f7f7;
            }
          }
        }
        .dj-right {
          margin-left: 40px;
        }
      }
    }
  }
</style>
