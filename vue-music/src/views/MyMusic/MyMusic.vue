<template>
  <div class="mymusic">
    <div class="contain" v-show="containImg">
      <div class="img">
        <div class="login"></div>
      </div>
      
    </div>

    <div class="box"  v-show="!containImg">
      <div class="contain">
        <!-- z左边 -->
        <div class="left">
          <div>
            <i class="sj"  @click="leftBtn" v-show="btnFT"></i>
            <h3>新建的歌单</h3>
            <i class="sjx" @click="bottomBtn" v-show="!btnFT"></i>
          </div>
          <div class="left-list" v-show="!btnFT">
            <ul ref="list">
              <!-- 第一个高亮 -->
              <li v-for="(item,index) in userplaylist" :key="item.id" @click="UserPlayIdBtn(item.id,$event)" :class="{'active':index==0}">
                <img :src="item.coverImgUrl"/>
                <p>{{item.name}}</p>
              </li>
            </ul>
          </div>
        </div>

        <!-- 右边 -->
      <router-view />
     
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../api/Api';
  import Header from '../../components/Header/Header.vue';
import RightPlayList from './RightPlayList/RightPlayList.vue'
  export default {
    components: { Header },
    data() {
      return {
        containImg: true,
        btnFT:false,
        userplaylist:[],
        playlistId:''
      };
    },
    components: {
      RightPlayList
    },

    mounted() {
      this.userData();
      
    },

    methods: {
      userData() {
        if (localStorage.getItem('USER')) {
          this.containImg = false;
          this.getUserPlayList();
        }
      },
      //h获取歌单
      async getUserPlayList() {
        let data = localStorage.getItem('USER');
        let userId = JSON.parse(data).userId;
        let cookie = localStorage.getItem('COOKIE');
        let res = await api.getUserPlayList(userId, cookie);
        this.playlistId = res.data.playlist[0].id
        this.userplaylist = res.data.playlist

        //首次进入
        this.eventHub.$emit("getUserPlayIdfirst", this.playlistId)
      },

     async UserPlayIdBtn(id,e){

       await this.$router.push({
          name:'MyMusicPlist',
          path:'mymusicplist',
          query:{
            id
          }
        })
        //点击路由
        this.eventHub.$emit("getUserPlayId","getUPId")
        //点击的颜色高亮
        this.addAndClearBg(e)
},

  addAndClearBg(e){
     //清除所有颜色
        let lis = this.$refs.list.querySelectorAll('li');
        for (let i = 0; i < lis.length; i++) {
          //移除类名
          lis[i].classList.remove('active');
        }
        //添加一个类名
     
       if(e.target.tagName !== 'LI' ){
           e.target.parentNode.className += ' active'
           
       }
       else{
           e.target.className += ' active'
       }
  },
  

        
    //左边的三角按钮
      leftBtn(){
        this.btnFT = !this.btnFT
      },
    //左边的三角按钮
       bottomBtn(){
        this.btnFT = !this.btnFT
      },

      
    },

     //避免反复调用,销毁
    unmounted() {
       this.eventHub.$off('getUserPlayIdfirst')
         this.eventHub.$off('getUserPlayId')
    },
  };
</script>

<style lang="less" scoped>
  .mymusic {
    width: 982px;
    border: 1px solid #d3d3d3;
    margin: 0 auto;
    position: relative;
    background-color: #fff;
    .contain {
      .img {
        width: 807px;
        height: 278px;
        padding-top: 104px;
        margin: 0 auto;
        background: url(./img/mymusic.3a845703.png) no-repeat 0 104px;

        .login {
          margin: 202px 0 0 482px;
          width: 167px;
          height: 45px;
          background: url(./img/mymusic.3a845703.png) no-repeat 0 9999px;
          &:hover {
            cursor: pointer;
            background-position: 0 -278px;
          }
        }
      }
    }

    .box {
      margin: 0 auto;
      width: 980px;
      border: 1px solid #ddd;
      .contain {
        display: flex;
        .left {
          width: 240px;
          background: #ddd;
          position: relative;
          .sj {
            position: absolute;
            top: 23px;
            left: 8px;
            display: block;
            border: 8px solid #ccc;
            border-color: transparent transparent transparent rgb(14, 97, 223);
            border-style: dashed dashed dashed solid;
            margin-right: 0;
          }

          .sjx {
            position: absolute;
            top: 28px;
            left: 2px;
            border-color: rgb(231, 10, 10) transparent transparent;
            border-style: solid dashed dashed;
            border-width: 8px 7px 0;
          }
          h3 {
            padding: 20px 0 0 20px;
          }
          .left-list {
            ul {
              box-sizing: border-box;
              width: 240px;
            }
            li {
              padding: 5px 20px;
              height: 62px;
          
                display: flex;
                align-items: center;
              
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
            .active{
              background:#cdcdcd;
            }
          }
        }
      }
    }
  }
</style>
