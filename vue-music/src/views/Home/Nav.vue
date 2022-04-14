<template>
    <!-- //头部 -->
    <div class="header">
      <div class="contain">
        <ul>
         <router-link to="/music"> <li>推荐</li></router-link>
            <router-link to="/topsong">  <li >排行榜</li></router-link>
            <router-link to="/hotsong">  <li>歌单</li></router-link>
            <router-link to="/music">  <li>主播电台</li></router-link>
            <router-link to="/singer">  <li>歌手</li></router-link>
            <router-link to="/newsong">  <li>新碟上架</li></router-link>
        </ul>
      </div>
    </div>
</template>


<script>
// <router-link to="/about" custom v-slot="{ navigate }">
//   <span @click="navigate" @keypress.enter="navigate" role="link">About Us</span>
// </router-link>
export default {
    name:'Nav'
}
</script>

<style lang='less' scoped>
 .header {
    width: 100%;
    background: #c20c0c;
    .contain {
      margin: 0 auto;
      width: 1100px;

      height: 35px;
      ul {
        display: flex;
        margin: 0 auto;
        width: 600px;
        justify-content: space-around;
        align-items: center;
        font-size: 12px;
        height: 100%;
        color: white;
      }
    }
  }
</style>