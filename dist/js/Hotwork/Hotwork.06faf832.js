import{_,a as p,g as v,o,c as n,b as t,F as y,d as S,h as u,n as w,a5 as m,t as c,w as f,p as $,f as k}from"../index-e6aff8d6.js";const D={data(){return{hotSongs:[]}},mounted(){this.getSongerSongList()},methods:{async getSongerSongList(){let a=await p.getSongerSongList(this.$route.params.id);this.hotSongs=a.data.hotSongs,console.log(a.data)},async getLyric(a){this.$router.push(`/playmusic/${a}`),await this.$store.dispatch("GetMusicData/getSongDetail",a),await this.$store.dispatch("GetMusicData/getMusicLyric",a),this.eventHub.$emit("goLyric","Lyric")},async getUrl(a,s){await this.$store.dispatch("GetMusicData/getMusicUrl",a),await this.$store.dispatch("GetMusicData/getMusicLyric",a),await this.$store.dispatch("GetMusicData/getSongDetail",a),this.eventHub.$emit("goData","Go"),this.bagHandel(s)},bagHandel(a){let s=this.$refs.play.querySelectorAll("i");for(let i=0;i<s.length;i++)s[i].className="";a.target.className="active"},cutString(a){return a?a.length>8?a.substring(0,8)+"...":a:""},timeHandel(a){let s=this.timeAdd0(parseInt(a/6e4%60)),i=this.timeAdd0(parseInt(a/1e3%60));return`${s} : ${i}`},timeAdd0(a){return a<9?`0${a}`:a}}},L=a=>($("data-v-046e647a"),a=a(),k(),a),b={class:"hotwork"},H={class:"margin-list"},M=u('<div class="title" data-v-046e647a><div class="btns" data-v-046e647a><a title="\u64AD\u653E" class="play" data-v-046e647a><i class="ply" data-v-046e647a></i><span data-v-046e647a>\u64AD\u653E</span></a><a class="add" data-v-046e647a></a><a class="dis" data-v-046e647a><span data-v-046e647a>\u6536\u85CF\u5168\u90E8\u70ED\u95E8</span></a></div></div>',1),G={class:"list",ref:"play"},I=u('<ul class="header" data-v-046e647a><li class="w1" data-v-046e647a></li><li class="w2" data-v-046e647a>\u6807\u9898</li><li class="w3" data-v-046e647a>\u65F6\u957F</li><li class="w4" data-v-046e647a>\u6B4C\u624B</li></ul>',1),C=["onClick"],N=L(()=>t("i",null,null,-1)),A=["onClick"],U={class:"w3"},x={class:"w4"};function z(a,s,i,B,h,l){const g=v("lazy");return o(),n("div",b,[t("div",H,[M,t("div",G,[I,(o(!0),n(y,null,S(h.hotSongs,(e,r)=>(o(),n("ul",{key:e.id,class:w({pad2:r>3,"list-contain":!0,background:r%2!==0})},[t("li",{class:"w1 pd1",onClick:d=>l.getUrl(e.id,d)},[m(c(r+1)+" ",1),N],8,C),t("li",{class:"w2",onClick:d=>l.getLyric(e.id)},[f(t("img",null,null,512),[[g,e.al.picUrl]]),t("span",null,c(l.cutString(e.name)),1)],8,A),t("li",U,c(l.timeHandel(e.dt)),1),t("li",x,c(l.cutString(e.ar[0].name)),1)],2))),128))],512)])])}var F=_(D,[["render",z],["__scopeId","data-v-046e647a"]]);export{F as default};
