import{E as p}from"../el-select/el-select.8325e87a.js";import{_ as u,a as _,g as y,o as n,c as r,b as t,F as v,d as m,e as S,n as C,w as f,t as o,p as z,f as P,h as k}from"../index-e6aff8d6.js";const L={name:"searchPlaylist",data(){return{total:100,pageSize:52,pageNo:1,playlist:[],emitShow:!0}},mounted(){this.eventHub.$on("getPlayList",a=>{this.getDataForSearchPlayList()})},methods:{async getDataForSearchPlayList(){let a=await _.getDataForSearch(this.$route.params.keywords,this.$route.params.type,this.pageSize,(this.pageNo-1)*this.pageSize);console.log(a),this.total=a.data.result.playlistCount,this.playlist=a.data.result.playlists,this.emitShow&&(this.$emit("on-child",this.total),this.emitShow=!1,console.log("playlist"))},handleSizeChange(a){this.pageSize=a,this.getDataForSearchPlayList()},handleCurrentChange(a){this.pageNo=a,this.getDataForSearchPlayList()},getUser(a){this.$router.push({name:"singerdatil",params:{id:a}})},getPlayList(a){this.$router.push({name:"playlist",params:{id:a}})},cutString(a,i){return a?a.length>i?a.substring(0,i)+"...":a:""}},unmounted(){this.eventHub.$off("getPlayList"),console.log(22)}},b=a=>(z("data-v-c5849504"),a=a(),P(),a),w={class:"search-song"},D={class:"search-song-list"},N={ref:"play"},F={class:"songname pa"},I=b(()=>t("i",{class:"play"},null,-1)),V=["onClick"],x=k('<div class="disp" data-v-c5849504><div class="icon" data-v-c5849504><i class="i1" data-v-c5849504></i><i class="i2" data-v-c5849504></i><i class="i3" data-v-c5849504></i><i class="i4" data-v-c5849504></i></div></div>',1),U={class:"singername pa fl"},B=["onClick"],E={class:"songtime pa fl"};function H(a,i,$,j,l,s){const c=p,d=y("lazy");return n(),r("div",w,[t("div",D,[t("ul",N,[(n(!0),r(v,null,m(l.playlist,(e,h)=>(n(),r("li",{key:e.id,class:C({bg:h%2==0})},[t("div",F,[I,f(t("img",null,null,512),[[d,e.coverImgUrl]]),t("span",{onClick:g=>s.getPlayList(e.id)},o(s.cutString(e.name,16)),9,V),x]),t("div",U,o(e.trackCount)+"\u9996",1),t("div",{class:"singerabulm pa fl",onClick:g=>s.getUser(e.creator.userId)}," by \u300A"+o(s.cutString(e.creator.nickname,8))+"\u300B ",9,B),t("div",E,o(e.playCount)+"\u6B21\u64AD\u653E",1)],2))),128))],512),S(c,{background:"",onSizeChange:s.handleSizeChange,onCurrentChange:s.handleCurrentChange,modelValue:l.pageNo,"onUpdate:modelValue":i[0]||(i[0]=e=>l.pageNo=e),"page-size":l.pageSize,layout:"prev, pager, next",total:l.total,class:"pagination"},null,8,["onSizeChange","onCurrentChange","modelValue","page-size","total"])])])}var G=u(L,[["render",H],["__scopeId","data-v-c5849504"]]);export{G as default};
