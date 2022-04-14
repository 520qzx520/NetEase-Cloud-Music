<template>
  <div class="contain">
    <div class="header">
      <div class="image"></div>
      <div class="heaer-list">
        <ul>
          <li>
            <router-link to="/music" tag="div" exact>
              <a>发现音乐</a>
            </router-link>
          </li>
          <li>
            <router-link to="/mymusic" tag="div"><a>我的音乐</a></router-link>
          </li>
          <li>
            <router-link to="/fouceon" tag="div"><a>关注</a></router-link>
          </li>
          <li>商城</li>
          <li>音乐人</li>
          <li>
            下载客户端
            <i class="hot"></i>
          </li>
        </ul>
      </div>
      <div class="right-list">
        <ul>
           <!-- <li> <input type="text" style="width: 158px" placeholder="音乐/专辑/歌手" /></li>  -->
          <router-link to="/search" custom v-slot="{ navigate }">
            <div @click="navigate" @keypress.enter="navigate" role="link">
              <li>
                <input
                  type="text"
                  style="width: 158px"
                  placeholder="音乐/专辑/歌手"
                />
              </li>
            </div>
          </router-link>
          <li>创作者中心</li>
          <li><a>登录</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped lang="less">
  .contain {
    width: 100%;
    height: 70px;
    background: #242424;
    .header {
      margin: 0 auto;
      display: flex;
      width: 1100px;
      height: 70px;
      color: white;

      .image {
        width: 166px;
        height: 69px;
        padding-right: 20px;
        line-height: 70px;
        background: url(./img/header.png);
      }

      .heaer-list {
        width: 550px;
        height: 70px;
        ul {
          display: flex;
          height: 100%;
          li {
            position: relative;
            width: 16.666%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            a {
              display: flex;
              height: 100%;
              width: 100%;
              justify-content: center;
              align-items: center;
            }

            .hot {
              display: inline-block;
              padding: 0 19px;
              width: auto;
              font-size: 14px;
              background: url(./img/header.png) no-repeat -153px 0;
              width: 28px;
              height: 19px;
              position: absolute;
              left: 23px;
              top: 7px;
            }
          }
        }
      }

      .right-list {
        height: 100%;
        ul {
          height: 100%;
          display: flex;
          align-items: center;
          li {
            font-size: 12px;
            margin: 0 20px;
            input {
              box-sizing: border-box;
              height: 30px;
              padding-left: 30px;
              background: url(./img/header.png) no-repeat 0 -99px;
              border-radius: 32px;
              font-size: 12px;
              background-color: white;
            }
          }
        }
      }
    }
    .active {
      background: rgb(22, 22, 22);
    }
  }
</style>
