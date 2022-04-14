<template>
  <div class="mymusic">
    <div class="contain">
      <div class="img">
        <div class="login"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="less" scoped>
  .mymusic {
    width: 982px;
    border: 1px solid #d3d3d3;
    margin: 0 auto;
    position: relative;
    height: 700px;
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
          &:hover{
              cursor: pointer;
    background-position: 0 -278px;

          }
        }
      }
    }
  }
</style>
