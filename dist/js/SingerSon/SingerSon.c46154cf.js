import{_ as n,a as l,r as d,o as u,c as m,b as e,t as _,e as c}from"../index-e6aff8d6.js";const g={data(){return{artist:{},imgurl:"",name:"",ID:""}},mounted(){this.getSingerDetail(),this.ID=this.$route.params.id},methods:{async getSingerDetail(){let t=await l.getSingerDetail(this.$route.params.id),s=t.data.data.artist;this.imgurl=s.cover,this.name=s.name,console.log(t)},goMv(t){this.$router.push({name:"singerdatilmv",query:{id:t}})},goAblum(t){this.$router.push({name:"singerdatilablum",query:{id:t}})},goHotWork(t){this.$router.push({name:"singerdatilhotwork",query:{id:t}})},goRecommed(t){this.$router.push({name:"singerdatilrecommend",query:{id:t}})}}},v={class:"singerDetail"},h={class:"flex"},p={class:"left-contain"},$={class:"margin"},f={class:"title"},k=["src"],y={class:"nav"},S={class:"router"};function D(t,s,x,C,o,i){const a=d("router-view");return u(),m("div",v,[e("div",h,[e("div",p,[e("div",$,[e("div",f,[e("h3",null,_(o.name),1),e("img",{src:o.imgurl},null,8,k)]),e("ul",y,[e("li",{onClick:s[0]||(s[0]=r=>i.goHotWork(this.$route.params.id))},"\u70ED\u95E8\u4F5C\u54C1"),e("li",{onClick:s[1]||(s[1]=r=>i.goAblum(this.$route.params.id))},"\u6240\u6709\u4E13\u8F91"),e("li",{onClick:s[2]||(s[2]=r=>i.goMv(this.$route.params.id))},"\u76F8\u5173MV"),e("li",{onClick:s[3]||(s[3]=r=>i.goRecommed(this.$route.params.id))},"\u827A\u4EBA\u4ECB\u7ECD")]),e("div",S,[c(a)])])])])])}var q=n(g,[["render",D],["__scopeId","data-v-f22823e4"]]);export{q as default};