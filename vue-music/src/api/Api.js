import requests from "./requests"


const  api= {
    //获取封面banner资源 /banner?type=0
// export const reqBanner = ()=>request({url:'/banner?type=0',method:'GET'});
    getBanner(){
        return requests.get('/banner?type=0')
    },

    // 获取热门推荐 /personalized?limit=8
// export const reqPersonalized = (limit)=>request({url:`/personalized?limit=${limit}`,method:'GET'});
    getHotDecomment(limit){
        return requests.get(`/personalized?limit=${limit}`)
    },
//http://iwenwiki.com:3000
//    limit=10,offset=0,area,type)=>request({url:`/top/album?offset=${offset}&limit=${limit}&area=${area}&type=${type}`
    getNewSong( limit,offset,area,type){
        return requests.get(`http://music.cyrilstudio.top/top/album?offset=${offset}&limit=${limit}&area=${area}&type=${type}`)
    },

// 获取歌单分类 /playlist/catlist
// export const reqCatList = ()=>request({url:'/playlist/catlist',methods:'GET'});
    getCatList(){
        return requests.get('/playlist/catlist')

    },

    // 获取所有榜单 /toplist
// export const reqTopList = ()=>request({url:'/toplist',method:'GET'});

getTopList(){
    return requests.get('/toplist')
},

// 获取歌曲详情 /song/detail?ids=
// export const reqSong = (ids)=>request({url:`/song/detail?ids=${ids}`,method:'GET'});
getSong(ids){
    return requests.get(`/song/detail?ids=${ids}`)
},

// /playlist/detail?id=${id}

getPlayList(id){
    return requests.get(`/playlist/detail?id=${id} `)
},

// 热门歌手 /top/artists?offset=0&limit=30
//  (limit=50,offset=0)=>request({url:`/top/artists?offset=${offset}&limit=${limit}`,method:'GET'});
getSinger(offset,limit){
    return requests.get(`/top/artists?offset=${offset}&limit=${limit} `)
},

// 最热主播榜 /dj/toplist/popular?limit=30
//  reqDjTopList = (limit = 30)=>request({url:`/dj/toplist/popular?limit=${limit}`,method:'GET'});

getDjTopList(limit){
    return requests.get(`/dj/toplist/popular?limit=${limit}`)
},

// playListCat = (limit=50,order='new',cat='全部',offset=0) =>
//  request({url:`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`,method:'GET'});

getPlayListCat(limit,order,cat,offset){
    return requests.get(`/top/playlist?limit=${limit}&order=${order}&cat=${cat}&offset=${offset}`)
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
    return requests.get(`/artist/list?type=${type}&area=${area}&initial=${initial}&limit=${limit}&offset=${offset}`)
},


// 获取歌单评论 
// PlayList = (id,limit=20,offset=0)=>request({url:`/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});
getPlayListComment(id,limit,offset){
    return  requests.get(`/comment/playlist?id=${id}&limit=${limit}&offset=${offset}`)
},


// 获取歌曲评论 /comment/music?id=186016&limit=1
// export const reqCommentMusic = (id,limit=20,offset = 0)=>request({url:`/comment/music?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});

getMusicComment(id,limit,offset){
    return requests.get(`/comment/music?id=${id}&limit=${limit}&offset=${offset}`)
},

// 获取音乐url /song/url
// export const reqSongUrl = (id)=>request({url:`/song/url?id=${id}`,method:'GET'});
getMusicUrl (id){
    return requests.get(`/song/url?id=${id}`)
},

// 获取歌词 /lyric?id=33894312
// export const reqlyric = (id)=>request({url:`/lyric?id=${id}`,method:'get'});
getMusicLyric(id){
    return requests.get(`/lyric?id=${id}`)
},

// 获取歌手详情 /artist/detail
// export const reqArtistDetail = (id)=>request({url:`/artist/detail?id=${id}`,method:'GET'});
getSingerDetail(id){
    return requests.get(`/artist/detail?id=${id}`)
},

// 获取歌手单曲 /artists
// export const reqArtist = (id)=>request({url:`/artists?id=${id}`,method:'GET'});

getSongerSongList(id){
    return requests.get(`http://121.4.92.135:3000/artists?id=${id}`)
},

// // 获取歌手专辑 /artist/album
// export const reqArtistAlbum = (id,limit=12,offset=0)=>request({url:`/artist/album?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});

getSongerAlbum(id,limit,offset){
    return requests.get(`/artist/album?id=${id}&limit=${limit}&offset=${offset}`)
},
// // 获取歌手mv /artist/mv
// export const reqArtistMv = (id)=>request({url:`/artist/mv?id=${id}`,method:'GET'});
getSongerMv(id){
    return requests.get(`/artist/mv?id=${id}`)

},
// // 获取歌手描述 /artist/desc
// export const reqArtistDesc = (id) =>request({url:`/artist/desc?id=${id}`,method:'GET'});

getSongerDeec(id){
    return requests.get(`/artist/desc?id=${id}`)
},
//搜索
userSearch(keywords){
    return requests.get(`/search/suggest?keywords=${keywords}`)
},

// 搜索 /cloudsearch()
// (keywords,type,limit=30,offset=0) =>  request({url:`/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`,method:'GET'});

getDataForSearch(keywords,type,limit,offset){
    return requests.get(`/cloudsearch?keywords=${keywords}&type=${type}&limit=${limit}&offset=${offset}`)
},
// 获取专辑内容 /album
// export const reqAlbums = (id)=>request({url:`/album?id=${id}`,method:'GET'});
getAlbumsSong(id){
    return requests.get(`/album?id=${id}`)

},

// 获取专辑评论 /comment/album
// export const reqCommentAlbum = (id,limit=20,offset=0)=>request({url:`/comment/album?id=${id}&limit=${limit}&offset=${offset}`,method:'GET'});
getAlbumSongComment(id,limit,offset){
    return requests.get(`/comment/album?id=${id}&limit=${limit}&offset=${offset}`)
},



// //获取二维码key  /login/qr/key
// export const reqLoginQrKey = ()=>request({url:'/login/qr/key',method:'GET'});

getCodeKey(){
    return requests.get(`/login/qr/key`)
},


// //二维码生成接口 /login/qr/create/login/qr/create?key=
// export const reqLoginQrCreate = (key)=>request({url:`/login/qr/create?key=${key}`,method:"POST"});

getCodeCreate(key){
    return requests.post(`/login/qr/create?key=${key}`)
},

// //二维码检测扫描状态接口 /login/qr/check?key=
// export const reqLoginQrCheck = (key)=>request({url:`/login/qr/check?key=${key}`,method:'POST'});

getCodeCheck(key){
    return requests.post(`/login/qr/check?key=${key}`)
},

//发送验证码给手机 /captcha/sent?phone=
//  reqSent = (phone)=>request({url:`/captcha/sent?phone=${phone}`,method:'POST'});

getSentCode(phone){
    return requests.post(`/captcha/sent?phone=${phone}`)
},


// //校验验证码 /captcha/verify?phone=?captcha=?
//  reqVerify = (phone,captcha)=>request({url:`/captcha/verify?phone=${phone}&captcha=${captcha}`,method:'GET'});
getPhoneCheck(phone,captcha){
    return requests.get(`/captcha/verify?phone=${phone}&captcha=${captcha}`)
},

// //手机登录（验证码）/login/cellphone?phone=&captcha=
// = (phone,num)=> request({url:`/login/cellphone?phone=${phone}&captcha=${num}`,method:'POST'});
getPhoneLogin(phone,num){
    return requests.post(`/login/cellphone?phone=${phone}&captcha=${num}`)
},

//手机登录（密码） /login/cellphone?phone=&password=
// request({url:`/login/cellphone?phone=${phone}&password=${num}`,method:'POST'});
getPhonePasswordLogin(phone,num){
    return requests.post(`/login/cellphone?phone=${phone}&password=${num}`)
},
//用户账号信息
getAccout(cookie){
    return requests.post(`/user/account?cookie=${cookie}`)
},


// 获取用户歌单 /user/playlist?uid=
// export const reqUserPlayList = (uid,cookie)=>request({url:`/user/playlist?uid=${uid}&cookie=${cookie}`});

getUserPlayList(uid,cookie){
    return requests.get(`/user/playlist?uid=${uid}&cookie=${cookie}`)
},
// 获取登录后用户歌单详情 /playlist/detail
// export const reqPlayListDetail =(id,cookie)=>request({url:`/playlist/detail?id=${id}&cookie=${cookie}`,method:'GET'});

getUsePlayListDetail(id,cookie){
    return requests.get(`/playlist/detail?id=${id}&cookie=${cookie}`)
},

getFriendEvents(pagesize,cookie,lasttime){
    return requests.get(`/event?pagesize=${pagesize}&cookie=${cookie}&lasttime=${lasttime}`)
},

// 获取用户详情 /user/detail
// export const reqUserDetail = (uid,cookie) => request({url:`/user/detail?uid=${uid}&cookie=${cookie}`,method:'GET'});
getUSerDetail(uid,cookie){
    return requests.get(`/user/detail?uid=${uid}&cookie=${cookie}`)
},

// mv 地址
// 说明 : 调用此接口 , 传入 mv id,可获取 mv 播放地址

// 必选参数 : id: mv id

// 可选参数 : r: 分辨率,默认 1080,可从 /mv/detail 接口获取分辨率列表

// 接口地址 : /mv/url

// 调用例子 :

// /mv/url?id=5436712 /mv/url?id=10896407&r=10800

getMvUrl(id){
    return requests.get(`/mv/url?id=${id}`)
},

// 获取视频播放地址
// 说明 : 调用此接口 , 传入视频 id,可获取视频播放地址

// 必选参数 : id: 视频 的 id

// 接口地址 : /video/url


getVideoUrl(id){
    return requests.get(`/video/url?id=${id}`)
},

// 必选参数 : id: 视频的 id

// 可选参数 : limit: 取出评论数量 , 默认为 20

// offset: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值

// before: 分页参数,取上一页最后一项的 time 获取下一页数据(获取超过 5000 条评论的时候需要用到)

// 接口地址 : /comment/video

// 调用例子 : /comment/video?id=89ADDE33C0AAE8EC14B99F6750DB954D
// }
// 视频评论
getVdioComment(id,limit,offset){
    return requests.get(`/comment/video?id=${id}&limit=${limit}&offset=${offset}`)
},

//mv评论
// /comment/mv?id=5436712
getMvComment(id,limit,offset){
    return requests.get(`/comment/mv?id=${id}&limit=${limit}&offset=${offset}`)
},

// 获取 mv 点赞转发评论数数据
// 说明 : 调用此接口 , 传入 mvid ( 在搜索音乐的时候传 type=1004 获得 ) , 可获取对应 MV 点赞转发评论数数据

// 必选参数 : mvid: mv 的 id

// 接口地址 : /mv/detail/info

// 调用例子 : /mv/detail/info?mvid=5436712
getMvDetail(id){
    return requests.get(`/mv/detail/info?mvid=${id}`)
},

// 获取视频点赞转发评论数数据
// 说明 : 调用此接口 , 传入 vid ( 视频 id ) , 可获取对应视频点赞转发评论数数据 必选参数 : vid: 视频 id

// 接口地址 : /video/detail/info

// 调用例子 : /video/detail/info?vid=89ADDE33C0AAE8EC14B99F6750DB954D

getVdioDetail(id){
    return requests.get(` /video/detail/info?vid=${id}`)
},
// 获取电台分类 /dj/catelist
// export const reqCateList = ()=>request({url:'/dj/catelist',method:'GET'});
getDjCateList(){
    return requests.get(`/dj/catelist`)
},
// 电台个性推荐
// 说明 : 调用此接口,可获取电台个性推荐列表 可选参数 :

// limit : 返回数量,默认为 6,总条数最多 6 条

// 接口地址 : /dj/personalize/recommend

// 调用例子 : /dj/personalize/recommend?limit=5

getDjPerRecommend(limit){
    return requests.get(`/dj/program/toplist/hours?limit=${limit}`)
},


// 获取推荐电台节目 /program/recommend
// export const reqPorgramRecommend = ()=>request({url:'/program/recommend',methods:'GET'});
getPorgramRecommend(){
    return requests.get(`/program/recommend`)
},

// 电台 - 节目榜
// 说明 : 登录后调用此接口 , 可获得电台节目榜

// 可选参数 :

// limit : 返回数量 , 默认为 100

// offset : 偏移数量，用于分页 , 如 :( 页数 -1)*100, 其中 100 为 limit 的值 , 默认为 0

// 接口地址 : /dj/program/toplist

// 调用例子 : /dj/program/toplist?limit=1

getDjProgramTopList(limit){
    return requests.get(`/dj/personalize/recommend`)
}

}

export default api