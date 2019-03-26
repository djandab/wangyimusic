<template>
	<div>
		<div v-show="show" class="home">
			<div class="musiclist-title">歌单</div>
			<div class="music-box">
				<div @click="gedans(it.id)" class="music-list" v-for="(it,i) in gedan" :key="i">
					<img :src="it.coverImgUrl" /> {{it.title}}
				</div>
			</div>
			<div @click="moregedan" class="more">查看更多>></div>
			<div class="hotge">
				<div class="musiclist-title">热歌榜</div>
				<div class="updowm">{{hotge.songListDescription}}</div>
				<div @click="listen(i,it.url,it.name,it.id,it.pic,it.singer,it.time)" class="music" v-for="(it,i) in hotge.songs" :key="i">
					<div><img class="music-pic" :src="it.pic"></div>
					<div class="music-xinxi">
						<div class="name">{{it.name}}</div>
						<div class="autor">{{it.singer}}</div>
						<div class="iconfont icon-bofang bofang"></div>
					</div>
				</div>
			</div>

		</div>


	</div>
</template>

<script>
	export default {
		name: 'home',
		props: ['show', 'sousuo'],
		data() {
			return {
				gedan: [],
				more: 1,
				hotge: [],
			}
		},
		methods: {		
			listen(i,url,name,id,pic,singer,time){
				this.$emit('listen',{i,url,name,id,pic,singer,time,arrs:this.hotge.songs})
			},
			moregedan() {
				this.more++;
				this.$indicator.open({
					text: '加载中...',
					spinnerType: 'snake'
				});
				this.$http.get('api/music/netease/hotSongList', {
					params: {
						key: 579621905,
						cat: '全部',
						limit: 9 * this.more,
						offset: 0
					}
				}).then(res => {
					console.log(res.data.data)
					this.gedan = res.data.data
					this.$indicator.close();
				})
			},
			gedans(id) {
				this.$emit('gedans', id)
			}
		},
		mounted() {
			// https://api.bzqll.com/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0

			// 热门歌单 https://api.bzqll.com/music/netease/hotSongList?key=579621905&cat=全部&limit=100&offset=0

			//https://api.bzqll.com/music/netease/songListCategory?key=579621905
			this.$http.get('api/music/netease/hotSongList', {
				params: {
					key: 579621905,
					cat: '全部',
					limit: 9,
					offset: 0
				}
			}).then(res => {
				console.log(res.data.data)
				this.gedan = res.data.data
			})
			// 专辑详情https://api.bzqll.com/music/netease/album?key=579621905&id=32311
			//音乐详情 https://api.bzqll.com/music/netease/song?key=579621905&id=526307800
			//用户歌单https://api.bzqll.com/music/netease/userSongList?key=579621905&uid=115119971
			//获取音乐播放地址 https://api.bzqll.com/music/netease/url?key=579621905&id=526307800&br=999000
			//热门歌单 https://api.bzqll.com/music/netease/songList?key=579621905&id=3778678&limit=10&offset=0
			//音乐详情https://api.bzqll.com/music/netease/song?key=579621905&id=526307800
			this.$http.get('api/music/netease/songList', {
				params: {
					key: 579621905,
					id: 3778678,
					offset: 0,
					limit: 10
				}
			}).then(res => {
				this.hotge = res.data.data
				console.log(res.data.data)
			})
			//			this.$http.get('api/music/netease/album', {
			//				params: {
			//					key: 579621905,
			//					id: 32311,
			//
			//				}
			//			}).then(res => {
			//
			//				console.log(res.data)
			//			})

		}
	}
</script>
<style>
	.gedan-header {
		display: flex;
		background: rgba(48, 48, 48, .5);
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	
	.gedan-header>div:first-of-type>img {
		width: 130px;
		height: 130px;
	}
	
	.gedan-header>div:last-of-type>div {
		color: white;
		text-align: left;
		margin-left: 10px;
		line-height: 20px;
		padding-right: 10px;
	}
	
	.musiclist-title {
		margin-top: 10px;
		margin-bottom: 10px;
		color: #939393;
		border-left: 2px solid #D43C33;
		text-align: left;
		padding-left: 10px;
	}
	
	.music-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
	}
	
	.music-list {
		width: 30%;
		font-size: .75rem;
		text-align: left;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		overflow: hidden;
		margin-top: 10px;
	}
	
	.music-list>img {
		width: 100%;
	}
	
	.more {
		text-align: right;
		margin-top: 20px;
		padding-right: 20px;
	}
	
	.updowm {
		font-size: .23rem;
	}
	
	.music {
		padding-left: 10px;
		padding-top: 15px;
		padding-bottom: 15px;
		display: flex;
	}
	
	.music-pic {
		width: 3rem;
		border-radius: 50%;
		height: 3rem;
	}
	
	.name {
		width: 80%;
		margin-top: 5px;
		text-align: left;
		margin-left: 10px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.autor {
		text-align: left;
		margin-left: 10px;
		font-size: .75rem;
		color: #939393;
		margin-top: 5px;
	}
	
	.music-xinxi {
		border-bottom: .1px solid #CCCCCC;
		width: 80%;
		position: relative;
	}
	
	.bofang {
		position: absolute;
		font-size: 1.5rem;
		right: 10px;
		top: 10px;
	}
	
	.jianjie {
		padding-top: 10px;
		padding-left: 5px;
		padding-right: 5px;
		padding-bottom: 5px;
		border-bottom: 1px solid #CCCCCC;
	}
	
	.jianjie>span {
		font-size: 18px;
	}
	
	.jianjie {
		text-align: left;
		font-size: 13px;
		color: #939393;
		line-height: 20px;
	}
</style>