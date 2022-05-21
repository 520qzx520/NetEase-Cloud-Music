import{_ as m,a as v,g as y,o as h,c as u,b as a,t as n,F as k,d as f,h as _,p as w,f as D,n as o,w as I,i as U}from"../index-e6aff8d6.js";const L={data(){return{imgURl:"",name:"",nickname:"",userImg:"",description:"",trackslist:"",createTime:""}},mounted(){var t=this;this.eventHub.$on("getUserPlayIdfirst",function(s){t.getUsePlayListDetail(s)}),this.eventHub.$on("getUserPlayId",s=>{this.getUsePlayListDetail(this.$route.query.id)})},methods:{async getUsePlayListDetail(t){let s=localStorage.getItem("COOKIE"),e=(await v.getUsePlayListDetail(t,s)).data.playlist;this.playlist=e.tracks,this.imgURl=e.coverImgUrl,this.userImg=e.creator.avatarUrl,this.name=e.name,this.nickname=e.creator.nickname,this.description=e.description,this.trackslist=e.tracks,this.createTime=e.createTime,this.name=this.name.replace(this.nickname,"\u6211")},async getUrl(t,s){await this.$store.dispatch("GetMusicData/getMusicUrl",t),await this.$store.dispatch("GetMusicData/getSongDetail",t),await this.$store.dispatch("GetMusicData/getMusicLyric",t),this.eventHub.$emit("goData","Go");let l=this.$refs.play.querySelectorAll("i");for(let e=0;e<l.length;e++)l[e].classList.remove("active");s.target.className+=" active"},async getLrc(t){this.$router.push(`/playmusic/${t}`),await this.$store.dispatch("GetMusicData/getMusicLyric",t),await this.$store.dispatch("GetMusicData/getSongDetail",t),this.eventHub.$emit("goLyric","Lyric")},goSingeriId(t){this.$router.push({path:"singerdatil",name:"singerdatil",params:{id:t}})},cutString(t){return t?t.length>8?t.substring(0,8)+"...":t:""},timeHandel(t){let s=this.timeAdd0(parseInt(t/6e4%60)),l=this.timeAdd0(parseInt(t/1e3%60));return`${s} : ${l}`},timeAdd0(t){return t<10?`0${t}`:t},formatData(t){let s=new Date(t),l=this.timeAdd0(s.getFullYear()),e=this.timeAdd0(s.getMonth()+1),c=this.timeAdd0(s.getDate());return`${l}-${e}-${c}`}}},$=t=>(w("data-v-1e147197"),t=t(),D(),t),S={class:"right"},b={class:"right-margin"},C={class:"right-img"},M=["src"],P={class:"right-sub"},A=["src"],G={class:"usertext"},H={class:"usertext"},R=_('<div class="icon" data-v-1e147197><a class="play" data-v-1e147197><i class="play-icon" data-v-1e147197></i><span data-v-1e147197>\u64AD\u653E</span></a><a class="add" data-v-1e147197></a><a class="dis" data-v-1e147197><span data-v-1e147197>\u6536\u85CF</span></a><a class="share" data-v-1e147197><span data-v-1e147197> \u5206\u4EAB </span></a><a class="download" data-v-1e147197><span data-v-1e147197>\u4E0B\u8F7D</span></a><a class="comment" data-v-1e147197><span data-v-1e147197>\u8BA8\u8BBA</span></a></div>',1),N={class:"margin-list"},T=$(()=>a("div",{class:"title"},[a("h2",null,"\u6B4C\u66F2\u5217\u8868"),a("p",null,"100\u9996\u6B4C\u64AD\u653E\uFF1A"),a("span",null,"4912770560 \u6B21")],-1)),z={class:"list",ref:"play"},B=_('<ul class="header" data-v-1e147197><li class="w1" data-v-1e147197></li><li class="w2" data-v-1e147197>\u6807\u9898</li><li class="w3" data-v-1e147197>\u65F6\u957F</li><li class="w4" data-v-1e147197>\u6B4C\u624B</li></ul>',1),F={key:0},V=["onClick"],q=["onClick"],E=["onClick"];function O(t,s,l,e,c,d){const p=y("lazy");return h(),u("div",null,[a("div",S,[a("div",b,[a("div",C,[a("img",{src:c.imgURl},null,8,M)]),a("div",P,[a("div",null,[a("h3",null,n(c.name),1),a("img",{src:c.userImg,class:"userimg"},null,8,A),a("span",G,n(c.nickname),1),a("span",H,"\u521B\u5EFA\u65F6\u95F4: "+n(d.formatData(c.createTime)),1),R])])]),a("div",N,[T,a("div",z,[B,(h(!0),u(k,null,f(c.trackslist,(r,i)=>(h(),u("ul",{key:r.id,class:o({pad2:i>3,"list-contain":!0,background:i%2!==0})},[a("li",{class:o({height:i>3,w1:!0,pd1:!0})},n(i+1),3),a("li",{class:o({height:i>3,w2:!0})},[i<4?I((h(),u("img",F,null,512)),[[p,r.al.picUrl]]):U("",!0),a("i",{class:o({bf:!0,bf1:i<4}),onClick:g=>d.getUrl(r.id,g)},null,10,V),a("span",{class:o({pad2:i>3,height:i>3}),onClick:g=>d.getLrc(r.id)},n(d.cutString(r.name)),11,q)],2),a("li",{class:o({height:i>3,w3:!0})},n(d.timeHandel(r.dt)),3),a("li",{class:o({height:i>3,w4:!0}),onClick:g=>d.goSingeriId(r.ar[0].id)},n(r.ar[0].name),11,E)],2))),128))],512)])])])}var Y=m(L,[["render",O],["__scopeId","data-v-1e147197"]]);export{Y as default};