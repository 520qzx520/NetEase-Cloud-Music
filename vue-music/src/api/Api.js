import axios from "axios"


const api = {
    //获取封面banner资源 /banner?type=0
// export const reqBanner = ()=>request({url:'/banner?type=0',method:'GET'});
    getBanner(){
        return axios.get('api/banner?type=0')
    },

    // 获取热门推荐 /personalized?limit=8
// export const reqPersonalized = (limit)=>request({url:`/personalized?limit=${limit}`,method:'GET'});
    getHotDecomment(limit){
        return axios.get(`api/personalized?limit=${limit}`)
    },

//    limit=10,offset=0,area,type)=>request({url:`/top/album?offset=${offset}&limit=${limit}&area=${area}&type=${type}`
    getNewSong( limit,offset,area,type){
        return axios.get(`http://iwenwiki.com:3000/top/album?offset=${offset}&limit=${limit}&area=${area}&type=${type}`)
    },

// 获取歌单分类 /playlist/catlist
// export const reqCatList = ()=>request({url:'/playlist/catlist',methods:'GET'});
    getCatList(){
        return axios.get('api/playlist/catlist')

    },

    // 获取所有榜单 /toplist
// export const reqTopList = ()=>request({url:'/toplist',method:'GET'});

getTopList(){
    return axios.get('api/toplist')
},

// 获取歌曲详情 /song/detail?ids=
// export const reqSong = (ids)=>request({url:`/song/detail?ids=${ids}`,method:'GET'});
getSong(ids){
    return axios.get(`api/song/detail?ids=${ids}`)
},

// /playlist/detail?id=${id}

getPlayList(id){
    return axios.get(`api/playlist/detail?id=${id} `)
},

// 热门歌手 /top/artists?offset=0&limit=30
//  (limit=50,offset=0)=>request({url:`/top/artists?offset=${offset}&limit=${limit}`,method:'GET'});
getSinger(offset,limit){
    return axios.get(`api/top/artists?offset=${offset}&limit=${limit} `)
},

// 最热主播榜 /dj/toplist/popular?limit=30
//  reqDjTopList = (limit = 30)=>request({url:`/dj/toplist/popular?limit=${limit}`,method:'GET'});

getDjTopList(limit){
    return axios.get(`api/dj/toplist/popular?limit=${limit}`)
},

// playListCat = (limit=50,order='new',cat='全部',offset=0) =>
//  request({url:`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`,method:'GET'});

getPlayListCat(limit,order,cat,offset){
    return axios.get(`api/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`)
},

// 歌手分类列表 artist/list
// limit : 返回数量 , 默认为 30
// offset : 偏移数量，用于分页 , 如 : 如 :( 页数 -1)*30, 其中 30 为 limit 的值 , 默认为 0 
// initial: 按首字母索引查找参数,如 /artist/list?type=1&area=96&initial=b 返回内容将以 name 字段开头为 b 或者拼音开头为 b 为顺序排列, 热门传-1,#传 0
// type 取值:
//  (type=-1,area=-1,initial=-1,limit=30,offset=0)=>request
// ({url:`artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`,method:'GET'});
//

getSingerList(type,area,initial,limit,offset){
    return axios.get(`api/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`)
},


// 获取歌单评论 
// PlayList = (id,limit=20,offset=0)=>request({url:`/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});
getPlayListComment(id,limit,offset){
    return  axios.get(`api/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`)
},


// 获取歌曲评论 /comment/music?id=186016&limit=1
// export const reqCommentMusic = (id,limit=20,offset = 0)=>request({url:`/comment/music?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});

getMusicComment(id,limit,offset){
    return axios.get(`api/comment/music?id=${id}&limit=${limit}&offset=${offset}`)
},

// 获取音乐url /song/url
// export const reqSongUrl = (id)=>request({url:`/song/url?id=${id}`,method:'GET'});
getMusicUrl (id){
    return axios.get(`api/song/url?id=${id}`)
},

// 获取歌词 /lyric?id=33894312
// export const reqlyric = (id)=>request({url:`/lyric?id=${id}`,method:'get'});
getMusicLyric(id){
    return axios.get(`api/lyric?id=${id}`)
},

// 获取歌手详情 /artist/detail
// export const reqArtistDetail = (id)=>request({url:`/artist/detail?id=${id}`,method:'GET'});
getSingerDetail(id){
    return axios.get(`api/artist/detail?id=${id}`)
},

// 获取歌手单曲 /artists
// export const reqArtist = (id)=>request({url:`/artists?id=${id}`,method:'GET'});

getSongerSongList(id){
    return axios.get(`api/artists?id=${id}`)
},

// // 获取歌手专辑 /artist/album
// export const reqArtistAlbum = (id,limit=12,offset=0)=>request({url:`/artist/album?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});

getSongerAlbum(id,limit,offset){
    return axios.get(`api/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
},
// // 获取歌手mv /artist/mv
// export const reqArtistMv = (id)=>request({url:`/artist/mv?id=${id}`,method:'GET'});
getSongerMv(id){
    return axios.get(`api/artist/mv?id=${id}`)

},
// // 获取歌手描述 /artist/desc
// export const reqArtistDesc = (id) =>request({url:`/artist/desc?id=${id}`,method:'GET'});

getSongerDeec(id){
    return axios.get(`api/artist/desc?id=${id}`)
},
//搜索
userSearch(keywords){
    return axios.get(`api/search/suggest?keywords=${keywords}`)
},

// 搜索 /cloudsearch()
// (keywords,type,limit=30,offset=0) =>  request({url:`/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,method:'GET'});

getDataForSearch(keywords,type,limit,offset){
    return axios.get(`api/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`)
},
// 获取专辑内容 /album
// export const reqAlbums = (id)=>request({url:`/album?id=${id}`,method:'GET'});
getAlbumsSong(id){
    return axios.get(`api/album?id=${id}`)

},

// 获取专辑评论 /comment/album
// export const reqCommentAlbum = (id,limit=20,offset=0)=>request({url:`/comment/album?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});
getAlbumSongComment(id,limit,offset){
    return axios.get(`api/comment/album?id=${id}&limit=${limit}&offset=${offset}`)
}


}

export default api