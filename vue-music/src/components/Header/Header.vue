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
                  class="input"
                />
              </li>
            </div>
          </router-link>
          <li>创作者中心</li>
          <li class="login">
            <a @click="LoginBtn">登录</a>
            <div class="login-box" v-show="LoginTF">
              <div class="title">
                <a>登录</a>
                <a class="close" @click="Close">X</a>
              </div>
              <div class="login-contain">
                <!-- 扫码登录 -->
                <div v-show="LoginIndex" class="LoginIndex">
                  <div class="flex">
                    <div class="img"></div>
                    <div class="right">
                      <h3 style="font-size: 16px">扫码登录</h3>
                      <img src="./img/user.jpg" />
                      <a>使用 网易云音乐APP扫码登录</a>
                    </div>
                  </div>
                  <div class="morelogin" @click="moreLoginBtn">
                    <a>其他登录方式</a>
                  </div>
                </div>
                <!-- 各种登录页面 -->
                <div class="moreLoginBox" v-show="everyLogin">
                  <div class="moreLoginBox-flex">
                    <div class="more-left">
                      <img src="./img/morelogin.png" />
                      <div class="phoneBox">
                        <a class="phonelogin" @click="phoneLoginBtn">
                          手机登录
                        </a>
                        <a class="phoneresgin">手机注册</a>
                      </div>
                    </div>
                    <div class="more-right">
                      <div class="icons">
                        <ul>
                          <li class="wx">
                            <i></i>
                            <a>微信登录</a>
                          </li>
                          <li class="qq">
                            <i></i>
                            <a>QQ登录</a>
                          </li>
                          <li class="wb">
                            <i></i>
                            <a>微博登录</a>
                          </li>
                          <li class="wy">
                            <i></i>
                            <a>网易邮箱账号登录</a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="bottom">
                    <div class="agree">
                      <input type="checkbox" id="inputbox" />
                      <label for="inputbox">同意</label>
                      <a>《服务条款》《隐私策略》《儿童隐私政策》</a>
                    </div>
                    <div class="code" @click="codeBtn">
                      <img src="./img/code.png" />
                    </div>
                  </div>
                </div>

                <!-- 手机号登录 -->
                <div class="phologin" v-show="phoneLoginFt">
                  <div class="phmargin">
                    <div class="phcontain">
                      <input
                        type="text"
                        placeholder="请输入手机号"
                        class="ph"
                      />
                      <div v-show="passInput">
                        <input
                          type="text"
                          placeholder="请输入验证码"
                          class="cod"
                        />
                        <span>获取验证码</span>
                        <div class="passlogin">
                          <a @click="passInputBtn">密码登录</a>
                          <a>自动登录</a>
                        </div>
                      </div>

                      <div v-show="!passInput">
                        <input
                          type="text"
                          placeholder="请输入密码"
                          class="cod"
                          style="width: 100%"
                        />

                        <div class="passlogin">
                          <a @click="passInputBtn">验证码登录</a>
                          <a>自动登录</a>
                        </div>
                      </div>

                      <a class="loginbtn">登录</a>
                    </div>
                  </div>
                  <div class="alla">
                    <a @click="phoneMoreLoginBtn">其他方式登录</a>
                    <a>没有账号去注册</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        LoginIndex: true,
        everyLogin: false,
        LoginTF: false,
        phoneLoginFt: false,
        passInput: true,
      };
    },
    methods: {
      //导航栏登录按钮
      LoginBtn() {
        this.LoginTF = true;
      },
      //关闭按钮
      Close() {
        this.LoginTF = false;
      },
      //登录首页的更多登录方式
      moreLoginBtn() {
        this.LoginIndex = !this.LoginIndex;
        this.everyLogin = !this.everyLogin;
      },
      //手机登录
      phoneLoginBtn() {
        this.everyLogin = !this.everyLogin;
        this.phoneLoginFt = !this.phoneLoginFt;
      },

      //其他登录方式
      phoneMoreLoginBtn() {
        this.phoneLoginFt = !this.phoneLoginFt;
        this.everyLogin = !this.everyLogin;
      },

      //右下角二维码点击
      codeBtn() {
        this.everyLogin = !this.everyLogin;
        this.LoginIndex = !this.LoginIndex;
      },
      //密码登陆
      passInputBtn() {
        this.passInput = !this.passInput;
      },
    },
  };
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
            .input {
              box-sizing: border-box;
              height: 30px;
              padding-left: 30px;
              background: url(./img/header.png) no-repeat 0 -99px;
              border-radius: 32px;
              font-size: 12px;
              background-color: white;
            }
          }
          .login {
            .login-box {
              position: absolute;
              height: 400px;
              width: 550px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              background-color: white;
              z-index: 999999999;
              color: black;
              border: 1px solid #ddd;
              .title {
                height: 40px;
                line-height: 40px;
                background-color: #ddd;
                a {
                  color: black;
                  font-size: 14px;
                  margin-left: 20px;
                }
                .close {
                  float: right;
                  margin-right: 20px;
                }
              }

              .login-contain {
                margin-top: 30px;
                height: 250px;
                .LoginIndex {
                  .flex {
                    display: flex;
                    justify-content: center;
                    .img {
                      width: 125px;
                      height: 220px;
                      margin-left: 60px;
                      background: url(./img/login_qr.fe695c03.png);
                      background-size: 100%;
                    }

                    .right {
                      display: flex;
                      flex-direction: column;
                      width: 300px;
                      justify-content: center;
                      align-items: center;

                      img {
                        width: 150px;
                        height: 150px;
                        margin: 20px 0;
                      }
                      a {
                        color: black;
                      }
                    }
                  }

                  .morelogin {
                    margin-top: 45px;
                    text-align: center;
                    a {
                      color: black;
                      border-radius: 5px;
                      background: #ddd;
                      padding: 7px;
                    }
                  }
                }

                .moreLoginBox {
                  margin-top: 35px;
                  .moreLoginBox-flex {
                    display: flex;
                    .more-left {
                      margin-left: 50px;
                      width: 300px;
                      height: 270px;
                      img {
                        width: 225px;
                        height: 120px;
                      }

                      .phoneBox {
                        a {
                          display: inline-block;
                          width: 250px;
                          height: 30px;
                          line-height: 30px;
                          text-align: center;
                        }
                        .phonelogin {
                          background: cyan;
                          margin: 20px 0;
                        }
                        .phoneresgin {
                          background: rgb(117, 117, 117);
                        }
                      }
                    }

                    .more-right {
                      width: 250px;
                      height: 240px;

                      .icons {
                        ul {
                          height: 240px;
                          display: flex;
                          flex-direction: column;
                          justify-content: space-evenly;
                          align-items: flex-start;
                          li {
                            display: flex;
                            align-items: center;

                            i {
                              display: inline-block;
                              width: 38px;
                              height: 38px;
                            }

                            a {
                              margin-left: 20px;
                              color: black;
                            }
                          }

                          .wx {
                            i {
                              background: url(./img/icons.png) no-repeat -150px -670px;
                            }
                          }

                          .qq {
                            i {
                              background: url(./img/icons.png) no-repeat -190.5px -670px;
                            }
                          }
                          .wb {
                            i {
                              background: url(./img/icons.png) no-repeat -231px -670px;
                            }
                          }
                          .wy {
                            i {
                              background: url(./img/icons.png) no-repeat -271px -670px;
                            }
                          }
                        }
                      }
                    }
                  }

                  .bottom {
                    position: relative;
                    .agree {
                      margin-left: 50px;
                      display: flex;
                      align-items: center;
                      #inputbox {
                        margin-right: 5px;
                        border: 1px solid rgb(119, 28, 28);
                        width: 15px;
                        height: 15px;
                      }

                      a {
                        color: black;
                      }
                    }
                    .code {
                      position: absolute;
                      right: 0;
                      top: 3px;
                      img {
                        width: 52px;
                        height: 52px;
                      }
                    }
                  }
                }

                .phologin {
                  a {
                    color: black;
                  }
                  .phmargin {
                    height: 250px;
                    width: 300px;
                    margin: 30px auto;

                    .phcontain {
                      input {
                        margin-top: 20px;
                        box-sizing: border-box;
                        width: 100%;
                        color: black;
                        height: 40px;
                        border: 1px solid #dddd;
                        padding-left: 10px;
                      }
                      .cod {
                        width: 66%;
                        margin-right: 20px;
                      }
                      span {
                        border: 1px solid #ddd;
                        padding: 11px 10px;
                      }

                      .passlogin {
                        display: flex;
                        margin-top: 20px;
                        justify-content: space-between;
                      }
                      .loginbtn {
                        width: 100%;
                        display: inline-block;
                        margin-top: 15px;
                        background: rgb(87, 87, 241);
                        padding: 11px 0;
                        text-align: center;
                      }
                    }
                  }

                  .alla {
                    display: flex;
                    justify-content: space-around;
                  }
                }
              }
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
