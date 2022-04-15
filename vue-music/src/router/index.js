import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'
import Music from '../views/Music/Music.vue'


const router = createRouter({
	history: createWebHashHistory(),
	linkActiveClass: 'active',

	routes: [

		{
			path: '/',
			name: 'Home',
			component: Home,
			redirect: '/music',
			children: [
				{
					name: 'music',
					path: 'music',
					component: Music,


				},
				// 我的音乐
				{
					name: 'mymusic',
					path: 'mymusic',
					component: () => import('../views/MyMusic/MyMusic.vue'),
					redirect: { name: 'MyMusicPlist' },
					children:[
						{
							name:'MyMusicPlist',
							path:'mymusicplist',
							component:() => import('../views/MyMusic/RightPlayList/RightPlayList.vue')
						}
					]

				},
				// 我的关注
				{
					name: 'fouceon',
					path: 'fouceon',
					component: () => import('../views/FouceOn/FouceOn.vue')
				},

				//搜索
				{
					name: 'search',
					path: 'search',
					component: () => import('../views/Search/Search.vue'),
					redirect: { name: 'searchSong' },
					meta: {
						keepAlive: true
					},
					children: [
						{	//搜索下的专辑
							name: 'searchAblum',
							path: 'ablum/:type/:keywords?',
							component: () => import('../views/Search/Ablum/Ablum.vue'),
							meta: {
								keepAlive: true
							}
						},
						{
							//搜索下的歌单
							name: 'searchPlaylist',
							path: 'playlist/:type/:keywords?',
							component: () => import('../views/Search/PlayList/PlayList.vue'),
							meta: {
								keepAlive: true
							}
						},
						{
							// 搜索小的歌手
							name: 'searchSinger',
							// name: 'hotwork',
							path: 'singer/:type/:keywords?',
							component: () => import('../views/Search/Singer/Singer.vue'),
							meta: {
								keepAlive: true
							}
						},
						{
							// 搜索下的单曲
							name: 'searchSong',
							path: 'song/:type?/:keywords?',
							component: () => import('../views/Search/Song/Song.vue'),
							meta: {
								keepAlive: true
							}
						},

						{
							// 搜索下的视频mv
							name: 'searchMv',
							path: 'mv/:type/:keywords?',
							component: () => import('../views/Search/Mv/Mv.vue'),
							meta: {
								keepAlive: true
							}
						}

					]
				},
				// 热门
				{
					name: 'hotsong',
					path: 'hotsong',
					component: () => import('../views/HotSong/HotSong.vue')
				},
				// 新歌
				{
					name: 'newsong',
					path: 'newsong',
					component: () => import('../views/NewSong/NewSong.vue')
				},
				//排行榜
				{
					name: 'topsong',
					path: 'topsong/:id?',
					component: () => import('../views/TopSong/TopSong.vue'),
					// children:[
					// 	{
					// 		path: '/topsong/:id',

					// 	}
					// ]
				},
				//播放列表
				{
					name: 'playlist',
					path: 'playlist/:id',
					component: () => import('../views/PlayList/PlayList.vue')


				},

				//歌手列表
				{
					name: 'singer',
					path: 'singer',
					component: () => import('../views/Singer/Singer.vue'),
				},

				{
					//歌手详情
					name: 'singerdatil',
					path: 'singerdatil/:id',
					component: () => import('../views/Singer/SingerSon/SingerSon.vue'),
					redirect: { name: 'singerdatilhotwork' },
					children: [

						{
							// 歌手页面的mv
							name: "singerdatilmv",
							path: 'mv',
							component: () => import('../views/Singer/SingerSon/Mv/Mv.vue'),
						},
						{
							// 歌手页面的专辑
							name: 'singerdatilablum',
							path: 'ablum',
							component: () => import('../views/Singer/SingerSon/Album/Album.vue'),

						},
						{
							// 歌手页面的热门作品
							name: 'singerdatilhotwork',
							path: 'hotwork',

							component: () => import('../views/Singer/SingerSon/Hotwork/Hotwork.vue'),
						},
						{
							// 歌手详情
							name: 'singerdatilrecommend',
							path: 'recommend',
							component: () => import('../views/Singer/SingerSon/Recommend/Recommend.vue'),
						}

					]

				},

				{
					//歌手页面下的专辑的歌曲
					name: 'singerablumsong',
					path: 'albumsong',///:ids
					component: () => import('../views/Singer/SingerSon/Album/AlbumSong/AlbumSong.vue'),
				},


				//播放音乐
				{
					name: 'playmusic',
					path: 'playmusic/:id',
					component: () => import('../views/PlayMusic/PlayMusic.vue')
				}



			],
		},




	],
})
//路由导航守卫
// router.beforeEach((to, from, next) => {
//     if (to.path == "/login") next()
//     let userInfo =sessionStorage.userInfo;
//     if (!userInfo) next("/login");
//     next();

// });
// router.beforeEach((to, from, next) => {
// 	if (to.path === '/login' || '/test' || '/changePassword') return next()

// 	const tokenStr = window.sessionStorage.getItem('token')
// 	if (!tokenStr) return next('/login')
// 	next()
// })

export default router
