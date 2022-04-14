import api from '../../api/Api'

const GetMusicData = {

  namespaced: true,//开启命名空间

  state: {
    id: 0,
    url: '',
    lyric:{},
    singer:'',
    songname:'',
    picUrl:'',
    searchtoatl:0 //搜索总数
    // musicDetail:[],

  },

  actions: {
    //获取音频url
    async getMusicUrl (context, id) {
      let res = await api.getMusicUrl(id)
      let url = res.data.data[0].url
      //  console.log(res.data)
      context.commit('GETMUSICURL', url)
    },
    //获取歌词
    async getMusicLyric (context, id) {
      let res = await api.getMusicLyric(id)
      let lyric = res.data.lrc.lyric
      console.log(res.data)
      //格式化
      var lrcs = lyric.split('\n')
      //
      let obj = {}
      //匹配规则,匹配出前面的时间
      let reg = /\[.*?\]/g;
      for(let i = 0; i < lrcs.length; i++){
        let lrcResult = lrcs[i].match(reg);  
        if(!lrcResult) continue //过滤不规则，比如空格，空字符串
        //用空字符串，替换歌词前面的时间，返回歌词
        let content = lrcs[i].replace(lrcResult,'')

        //处理时间
        let time = lrcResult[0]  //每次循环都得到歌词时间，但是我们只要最后一句歌词时间即可，因为不知道什么时候结束，所以只能循环到最后一句歌词
        let minute = parseInt(time.match(/\[\d*/i).toString().slice(1))//匹配并处理得到，分
        let sec = parseInt(time.match(/\:\d*/).toString().slice(1))//秒
        let totalTime = minute * 60 + sec // 每一句的时间，最后一句的才是总时间
        obj[totalTime] = content  //得到，时间，对应歌词

      }
      lyric = obj
      // console.log(lyric)
      context.commit('GETMUSICLYRIC', lyric)

    },
    //歌曲详情（歌名。歌曲，img）
    async getSongDetail(context,id){
      let res = await api.getSong(id)
      let data = res.data.songs[0]
      let arr=[data.name,data.al.picUrl,data.ar[0].name]
      console.log(arr)
      context.commit('GETSONGDETAIL',arr)
    }


  },

  mutations: {
    //保存url
    GETMUSICURL (state, value) {
      state.url = value
    },
    // 保存歌词
    GETMUSICLYRIC (state, value) {
      state.lyric = value
    }, 
    //歌曲详情
    GETSONGDETAIL(state,data){
      state.songname=data[0]
      state.picUrl=  data[1]
      state.singer= data[2]
      // state.musicDetail = data
    
    },

    //搜索总数
    GETSEARCHTOTAL(state,value){
      state.searchtoatl=value
     
      // state.musicDetail = data
    
    }
  },
}




export default GetMusicData