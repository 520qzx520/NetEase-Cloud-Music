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
        width: 902px;
        height: 430px;
        padding-top: 70px;
        margin: 0px auto;
        background: url(./img/notlogin.ee2c772f.jpg) 0px 70px no-repeat;

        .login {
          display: block;
          width: 157px;
          height: 48px;
          margin: 260px 0px 0px 535px;
          &:hover {
            cursor: pointer;
            background: url(./img/notlogin.ee2c772f.jpg) 0px -430px no-repeat;
          }
        }
      }
    }
  }
</style>
