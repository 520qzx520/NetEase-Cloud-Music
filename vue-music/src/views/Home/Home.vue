<template>
  <div>
    <Header />
    <Nav />
    <!-- <router-view></router-view>  -->
    <!-- 组件为Search 的页面数据缓存，搜索框的数据不会因为切换页面而清除 -->
    <router-view v-slot="{ Component }">
      <keep-alive include="Search">
        <component :is="Component" v-if="$route.meta.keepAlive" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" />
    </router-view>

    <MyFooter />
    <PlayMusicBar />
  </div>
</template>

<script>
  import Header from '../../components/Header/Header.vue';
  import Nav from './Nav.vue';
  import MyFooter from '../../components/MyFooter/Footer.vue';
  import PlayMusicBar from '../PlayMusic/PlayMusicBar.vue';
  export default {
    data() {
      return {};
    },
    components: {
      Header,
      MyFooter,
      PlayMusicBar,
      Nav,
    },
  };
</script>

<style></style>
