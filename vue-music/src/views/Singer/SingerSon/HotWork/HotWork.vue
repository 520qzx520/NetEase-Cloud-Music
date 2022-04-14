<template>
  <div class="hotwork">
    <div class="margin-list">
      <div class="title">
        <div class="btns">
          <a title="播放" class="play">
            <i class="ply"></i>
            <span>播放</span>
          </a>
          <a class="add"></a>
          <a class="dis">
            <span>收藏全部热门</span>
          </a>
        </div>
      </div>

      <div class="list" ref="play">
        <ul class="header">
          <li class="w1"></li>
          <li class="w2">标题</li>
          <li class="w3">时长</li>
          <li class="w4">歌手</li>
        </ul>
        <ul
          v-for="(item, index) in hotSongs"
          :key="item.id"
          :class="{
            'pad2': index > 3,
            'list-contain': true,
            'background': index % 2 !== 0,
          }"
        >
          <li class="w1 pd1" @click="getUrl(item.id, $event)">
            {{ index + 1 }}
            <i></i>
          </li>
          <li class="w2" @click="getLyric(item.id)">
            <!-- <router-link :to="`/playmusic/${item.id}`" style="color: black"> -->
            <img v-lazy="item.al.picUrl" />
            <span>{{ cutString(item.name) }}</span>
            <!-- </router-link> -->
          </li>
          <li class="w3">
            {{ timeHandel(item.dt) }}
          </li>
          <li class="w4">{{ cutString(item.ar[0].name) }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import api from '../../../../api/Api';

  export default {
    data() {
      return {
        hotSongs: [],
      };
    },
    mounted() {
      this.getSongerSongList();
    },
    methods: {
      async getSongerSongList() {
        let res = await api.getSongerSongList(this.$route.params.id);
        this.hotSongs = res.data.hotSongs;
        console.log(res.data);
      },

      //传递id 给vuex (歌词)
      async getLyric(id) {
        this.$router.push(`/playmusic/${id}`);
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        //歌曲详情

        this.eventHub.$emit('goLyric', 'Lyric');
      },
      async getUrl(id, e) {
        //url
        await this.$store.dispatch('GetMusicData/getMusicUrl', id);
        //歌词
        await this.$store.dispatch('GetMusicData/getMusicLyric', id);
        //歌曲详情
        await this.$store.dispatch('GetMusicData/getSongDetail', id);
        this.eventHub.$emit('goData', 'Go');
        this.bagHandel(e);
      },

      bagHandel(event) {
        //清除所有颜色
        let lis = this.$refs.play.querySelectorAll('i');
        for (let i = 0; i < lis.length; i++) {
          lis[i].className = '';
        }
        // 点击的元素变色
        event.target.className = 'active';
      },
      cutString(str) {
        if (str) {
          if (str.length > 8) {
            return str.substring(0, 8) + '...';
          }
          return str;
        }
        return '';
      },
      //处理时间
      timeHandel(time) {
        let min = this.timeAdd0(parseInt((time / 60000) % 60));
        let sec = this.timeAdd0(parseInt((time / 1000) % 60));
        return `${min} : ${sec}`;
      },
      //一位数就加0
      timeAdd0(mun) {
        if (mun < 9) {
          return `0${mun}`;
        }
        return mun;
      },
    },
  };
</script>

<style lang="less" scoped>
  .hotwork {
    width: 640px;

    .title {
     
      align-items: center;
      border-bottom: 2px solid #ddd;
      padding-bottom: 10px;
      font-size: 12px;
      .btns{
         display: flex;
      
    
      .play {
        width: 66px;
        padding-left: 5px;
        background: url(./img/button2.30a1d480.png) no-repeat 0 -1652px;
        text-align: center;
        line-height: 31px;
        height: 31px;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px; 
         color: black;
        i {
          width: 20px;
          height: 18px;
          margin: 6px 2px 2px 0;
          float: left;
          background: url(./img/button2.30a1d480.png) no-repeat 0 -1622px;
        }
        
      }

      .add {
          width: 31px;
          height: 31px;
          margin-right: 5px;
           color: black;
          background: url(./img/button2.30a1d480.png) no-repeat 0 -1588px;
        }
        .dis {
          margin-right: 6px;
          height: 100%;
           color: black;
          background: url(./img/button2.30a1d480.png) no-repeat;
          background-position: 0 -1063px;
          span {
            padding-right: 10px;
            display: inline-block;
            height: 100%;
            width: 68%;
            background: url(./img/button2.30a1d480.png) no-repeat right -1106px;
            line-height: 30px;
            padding-left: 30px;
          }
        }


      }
    }
    .list {
      border: 1px solid #ddd;
      .header {
        display: flex;
        height: 40px;
        background: #ddd;
        line-height: 40px;
        li {
          border-right: 1px solid #cecece;
          text-align: center;
        }
      }

      .w1 {
        position: relative;
        width: 77px;
        height: 100%;
        text-align: center;
        i {
          position: absolute;
          top: 22px;
          right: 0;
          display: block;
          width: 17px;
          height: 17px;
          background: url(./img/bf.png) no-repeat 0 -103px;
          &:hover {
            background-position: 0 -128px;
          }
        }

        .active {
          background-position: -20px -128px;
        }
      }
      .w2 {
        width: 326px;
        height: 100%;
      }
      .w3 {
        width: 91px;
        height: 100%;
        text-align: center;
      }
      .w4 {
        width: 174px;
        height: 100%;
        text-align: center;
      }
    }

    .list-contain {
      display: flex;
      li {
        font-size: 12px;
        line-height: 58px;
      }

      .pad2 {
        padding-left: 30px;
        height: 20px;
      }
      img {
        padding: 5px 30px;
        width: 50px;
        height: 50px;
      }
    }
    .background {
      background: #e0e0e0;
    }
  }
</style>
