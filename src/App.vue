<template>
	<div id="app">
		<div v-if="zongarr[num]" ref="bfq" class="bofangqi">
			<div class="iconfont icon-iconfontjiantou fan" @click="fan"></div>
			<div @touchstart.stop='start' @touchmove.stop='move' @touchend.stop='end' class="planting">
				<div>{{zongarr[num].name}}</div>
				<div class="tu-box">
					<img class="tu" :src="zongarr[num].pic" />
				</div>
				<div class="title">{{zongarr[num].singer}}</div>
				<div class="title">
					<div v-for="(it,i) in ciarr" :key="i" :class="gecione == i ? 'acts':'noact'">
						{{it}}
					</div>
				</div>
			</div>
			<div @click="bofan2" class="iconfont icon-bofang gdbofan" :class="on2?'acs':''"></div>
			<div @touchstart.stop='start' @touchmove.stop='move' @touchend.stop='end' class="gundonggeci" ref="gd">

				<div v-for="(it,i) in ciarr" :key="i" ref="s">
					{{it}}
				</div>
			</div>
			<div class="dian">
				<div :class="on==0?'ac':''"></div>
				<div :class="on==1?'ac':''"></div>
			</div>
			<div class="kongzi">
				<div @click="prwn" class="iconfont icon-shangyishou"></div>
				<div @click.stop="paurse" class="but-bf iconfont" :class="bofan? 'icon-zanting':'icon-bofang' "></div>
				<div @click="next" class="iconfont icon-xiayishou"></div>
			</div>
			<div class="jindutiao"></div>
		</div>
		<audio ref='music' id='music' :src="url" autoplay></audio>
		<div class="header">
			<div class="iconfont icon-icon-test logo">网易云音乐</div>
			<div @click="shousuo" class="iconfont icon-sousuo sousuo"></div>
		</div>
		<div v-show="show" class="nav">
			<router-link :class="one?'active':''" class="nav-list" to="/">推荐音乐</router-link>
		</div>
		<div v-show="sousuo" class="inpu">
			<div class="return" @click="returns">
				返回
			</div>
			<div class="sousuobox">
				<div class="iconfont icon-sousuo so"></div>
				<input ref="ent" @keydown.enter="sou" placeholder="搜索歌曲，歌手，专辑" class="sou" />
			</div>
			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
				<div @click="listens(i,it.url,it.name,it.id,it.pic,it.singer,it.time)" class="music" v-for="(it,i) in souarr" :key="i">

					<div><img class="music-pic" :src="it.pic"></div>
					<div class="music-xinxi">
						<div class="name">{{it.name}}</div>
						<div class="autor">{{it.singer}}</div>
						<div class="iconfont icon-bofang bofang"></div>
					</div>

				</div>
			</div>
		</div>
		<div class="gedna" v-show="gedanxianqing">
			<div style="padding-bottom: 5px;" class="return" @click="returnss">
				返回
			</div>
			<div class="gedan-header">
				<div>
					<img :src="hotMusic.songListPic" />
				</div>
				<div>
					<div>{{hotMusic.songListName}}</div>
				</div>
			</div>
			<div class="jianjie">
				<span>简介:</span> {{hotMusic.songListDescription}}
			</div>
			<div @click="listens(i,it.url,it.name,it.id,it.pic,it.singer,it.time)" class="music" v-for="(it,i) in hotMusic.songs" :key="i">
				<div><img class="music-pic" :src="it.pic"></div>
				<div class="music-xinxi">
					<div class="name">{{it.name}}</div>
					<div class="autor">{{it.singer}}</div>
					<div class="iconfont icon-bofang bofang"></div>
				</div>
			</div>
		</div>
		<div @click="bofangqi" ref="but" class="but">
			<div class="but-pic">
				<img :src="pic" />
			</div>
			<div class="but-cont">
				<div class="but-name">{{name}} <span>{{singer}}</span></div>

				<div v-for="(it,i) in ciarr" :key="i" :class="gecione == i ? 'act':'noact'">
					{{it}}
				</div>
			</div>
			<div @click.stop="paurse" class="but-bf iconfont" :class="bofan? 'icon-zanting':'icon-bofang' ">

			</div>
		</div>

		<router-view @listen='listen' @gedans="gedans" :show='show' :sousuo="sousuo"></router-view>

	</div>
</template>

<script>
	var x, X, y, Y
	var body = document.getElementsByTagName('body')
	export default {
		name: 'App',
		data() {
			return {
				sousuo: false,
				show: true,
				one: true,
				souarr: [],
				i: 1,
				loading: false,
				gedanxianqing: false,
				hotMusic: [],
				url: '',
				pic: '',
				name: '',
				singer: '',
				time: '',
				id: '',
				bofan: true,
				geciarr: [],
				ciarr: [],
				timearr: [],
				gecione: 0,
				ding: null,
				zongarr: [],
				num: 0,
				on: 0,
				ding2: null,
				on2: false,
				data1: 0,
				data2: 0,
				ding3: null,
				top: 0,
				ding4: null,
				ti: 0
			}
		},
		methods: {
			next() {
				this.gecione = 0
				this.timearr = []
				this.ciarr = []
				console.log(this.zongarr)
				this.num++;
				this.url = this.zongarr[this.num].url
				this.pic = this.zongarr[this.num].pic
				this.name = this.zongarr[this.num].name
				this.singer = this.zongarr[this.num].singer
				this.time = this.zongarr[this.num].time
				this.id = this.zongarr[this.num].id
				this.$http.get('api/music/netease/lrc', {
					params: {
						id: this.id,
						key: 579621905
					}
				}).then(res => {
					var arr = [];
					var time = [];
					var arr2 = [];
					var arr3 = [];
					var arr4 = [];
					var arr5 = [];
					var arr6 = [];
					this.geciarr = res.data
					var a = this.geciarr.split(/\n/)
					for(let i = 0; i < a.length; i++) {
						if(a[i].length < 13) {
							a.splice(i, 1)
						}
					}

					for(let i = 0; i < a.length; i++) {
						arr = a[i].split(']')
						time.push(arr[0])
						this.ciarr.push(arr[1])
					}
					for(let i = 0; i < a.length; i++) {
						let a = time[i].split('[')
						arr2.push(a[1])
					}
					for(let i = 0; i < a.length; i++) {
						if(arr2[i] == undefined) {
							break
						}
						let a = arr2[i].split('.')
						arr3.push(a[0])
					}

					for(let i = 0; i < arr3.length; i++) {
						let a = arr3[i].split(':')
						arr4.push(a[0])
					}

					for(let i = 0; i < arr4.length; i++) {
						arr5.push(parseInt(arr4[i]) * 60)
					}

					for(let i = 0; i < arr3.length; i++) {
						arr6.push(parseInt(arr3[i].substr(arr3[i].length - 2)))
					}
					for(let i = 0; i < arr6.length; i++) {
						this.timearr.push(arr6[i] + arr5[i])
					}
					for(let i = 0; i < this.timearr.length; i++) {
						if(isNaN(this.timearr[i])) {
							this.timearr[i] = 0
						}
					}
					console.log(this.timearr)
					console.log(this.ciarr)
				})
			},
			prwn() {
				this.gecione = 0
				this.timearr = []
				this.ciarr = []
				console.log(this.zongarr)
				this.num--;
				this.url = this.zongarr[this.num].url
				this.pic = this.zongarr[this.num].pic
				this.name = this.zongarr[this.num].name
				this.singer = this.zongarr[this.num].singer
				this.time = this.zongarr[this.num].time
				this.id = this.zongarr[this.num].id
				this.$http.get('api/music/netease/lrc', {
					params: {
						id: this.id,
						key: 579621905
					}
				}).then(res => {
					var arr = [];
					var time = [];
					var arr2 = [];
					var arr3 = [];
					var arr4 = [];
					var arr5 = [];
					var arr6 = [];
					this.geciarr = res.data
					var a = this.geciarr.split(/\n/)
					for(let i = 0; i < a.length; i++) {
						if(a[i].length < 13) {
							a.splice(i, 1)
						}
					}

					for(let i = 0; i < a.length; i++) {
						arr = a[i].split(']')
						time.push(arr[0])
						this.ciarr.push(arr[1])
					}
					for(let i = 0; i < a.length; i++) {
						let a = time[i].split('[')
						arr2.push(a[1])
					}
					for(let i = 0; i < a.length; i++) {
						if(arr2[i] == undefined) {
							break
						}
						let a = arr2[i].split('.')
						arr3.push(a[0])
					}

					for(let i = 0; i < arr3.length; i++) {
						let a = arr3[i].split(':')
						arr4.push(a[0])
					}

					for(let i = 0; i < arr4.length; i++) {
						arr5.push(parseInt(arr4[i]) * 60)
					}

					for(let i = 0; i < arr3.length; i++) {
						arr6.push(parseInt(arr3[i].substr(arr3[i].length - 2)))
					}
					for(let i = 0; i < arr6.length; i++) {
						this.timearr.push(arr6[i] + arr5[i])
					}
					for(let i = 0; i < this.timearr.length; i++) {
						if(isNaN(this.timearr[i])) {
							this.timearr[i] = 0
						}
					}
					console.log(this.timearr)
					console.log(this.ciarr)
				})
				
			},
			bofan2() {
				clearInterval(this.ding2)
				clearInterval(this.ding3)
				this.on2 = false
				for(let i = 0; i < this.timearr.length; i++) {
					this.$refs.s[i].style.color = ''
					if(i <= parseInt(this.$refs.gd.scrollTop / 34.5)) {
						this.$refs.s[i].style.color = 'green'
					}
				}
				let vm = this
				this.$refs.music.currentTime = this.timearr[parseInt(this.$refs.gd.scrollTop / 34.5)]
				this.ding2 = setInterval(function() {

					vm.ti = parseInt(vm.$refs.music.currentTime)
					for(let i = 0; i < vm.timearr.length; i++) {

						if(vm.timearr[i] == vm.ti) {
							vm.ti = -1
							vm.ding4 = setInterval(() => {
								vm.top += 2
								vm.$refs.gd.scrollTop = vm.top + (i * 34.5)
								console.log(vm.top += 2)
								if(vm.top >= 32) {
									vm.top = 0
									clearInterval(vm.ding4)
								}

							}, 20)

						}
					}

				}, 1000)
			},
			fan() {
				if(this.on == 1) {
					this.on = 0
				}
				this.$refs.gd.style.left = 100 + '%'

				this.$refs.bfq.style.top = 100 + '%'
				this.$refs.bfq.style.height = 0 + '%'
				this.$refs.bfq.style.transaction = 'all .5s'
				body[0].style.overflow = ''
			},
			start() {
				this.data1 = 0
				this.data2 = 0
				clearInterval(this.ding3)
				y = event.changedTouches[0].pageY;
				x = event.changedTouches[0].pageX;
			},
			move() {
				if(this.on == 1) {
					if(Math.abs(y - Y) > (X - x)) {
						if(Math.abs(y - Y) > 20) {
							this.on2 = true
							clearInterval(this.ding2)
						}
					}

				}

				Y = event.changedTouches[0].pageY;
				X = event.changedTouches[0].pageX;
			},
			end() {

				if(this.on == 0) {

					if(x - X > 30) {
						this.on = 1
						this.$refs.gd.style.left = 0 + 'px'

					}
				} else if(this.on == 1) {
					if(Math.abs(y - Y) > (X - x)) {
						if(Math.abs(y - Y) > 20) {
							clearInterval(this.ding2)
							this.on2 = true
							this.date1 = Date.parse(new Date())
							console.log(this.date1)
							this.ding3 = setInterval(() => {
								this.date2 = Date.parse(new Date())
								console.log(this.date2 - this.date1)
								if(this.date2 - this.date1 >= 2000) {
									clearInterval(this.ding3)
									this.data1 = 0
									this.data2 = 0
									let vm = this
									this.ding2 = setInterval(function() {

										vm.ti = parseInt(vm.$refs.music.currentTime)
										for(let i = 0; i < vm.timearr.length; i++) {

											if(vm.timearr[i] == vm.ti) {
												vm.ti = -1
												vm.ding4 = setInterval(() => {
													vm.top += 2
													vm.$refs.gd.scrollTop = vm.top + (i * 34.5)
													console.log(vm.top += 2)
													if(vm.top >= 32) {
														vm.top = 0
														clearInterval(vm.ding4)
													}

												}, 20)

											}
										}

									}, 1000)
									this.on2 = false
								}
							}, 1000)
						}
					}

					if(Math.abs(y - Y) < (X - x) && (X - x) > 100) {
						this.on = 0
						this.on2 = false
						this.$refs.gd.style.left = 100 + '%'

					}
				}

			},
			bofangqi() {
				body[0].style.overflow = 'hidden'
				this.$refs.bfq.style.height = 100 + '%'
				this.$refs.bfq.style.top = 0 + '%'
			},
			paurse() {
				if(this.bofan == true) {
					this.bofan = false
					this.$refs.music.pause()
				} else {
					this.bofan = true
					this.$refs.music.play()
				}
			},
			listens(i, url, name, id, pic, singer, time) {
				if(this.sousuo == true) {
					this.zongarr = this.souarr
					console.log(i)
					console.log(this.zongarr)
					this.num = i
				} else if(this.gedanxianqing == true) {
					this.zongarr = this.hotMusic.songs
					this.num = i
					console.log(i)
					console.log(this.zongarr)
				}
				this.gecione = 0
				this.timearr = []
				this.ciarr = []
				this.url = url
				this.pic = pic
				this.name = name
				this.singer = singer
				this.time = time
				this.id = id
				this.$refs.but.style.height = 50 + 'px'
				this.$http.get('api/music/netease/lrc', {
					params: {
						id: id,
						key: 579621905
					}
				}).then(res => {
					var arr = [];
					var time = [];
					var arr2 = [];
					var arr3 = [];
					var arr4 = [];
					var arr5 = [];
					var arr6 = [];
					this.geciarr = res.data
					var a = this.geciarr.split(/\n/)
					for(let i = 0; i < a.length; i++) {
						if(a[i].length < 13) {
							a.splice(i, 1)
						}
					}

					for(let i = 0; i < a.length; i++) {
						arr = a[i].split(']')
						time.push(arr[0])
						this.ciarr.push(arr[1])
					}
					for(let i = 0; i < a.length; i++) {
						let a = time[i].split('[')
						arr2.push(a[1])
					}
					for(let i = 0; i < a.length; i++) {
						if(arr2[i] == undefined) {
							break
						}
						let a = arr2[i].split('.')
						arr3.push(a[0])
					}

					for(let i = 0; i < arr3.length; i++) {
						let a = arr3[i].split(':')
						arr4.push(a[0])
					}

					for(let i = 0; i < arr4.length; i++) {
						arr5.push(parseInt(arr4[i]) * 60)
					}

					for(let i = 0; i < arr3.length; i++) {
						arr6.push(parseInt(arr3[i].substr(arr3[i].length - 2)))
					}
					for(let i = 0; i < arr6.length; i++) {
						this.timearr.push(arr6[i] + arr5[i])
					}
					for(let i = 0; i < this.timearr.length; i++) {
						if(isNaN(this.timearr[i])) {
							this.timearr[i] = 0
						}
					}
					console.log(this.timearr)
					console.log(this.ciarr)
					let vm = this

					clearInterval(this.ding)
					clearInterval(this.ding2)
					this.ding = setInterval(function() {
						for(let i = 0; i < vm.timearr.length; i++) {
							if(vm.timearr[i] <= vm.$refs.music.currentTime && vm.timearr[i + 1] > vm.$refs.music.currentTime) {
								vm.gecione = i
								vm.$refs.s[i].style.color = 'green'
							}
						}

					}, 1000)
					this.ding2 = setInterval(function() {

						vm.ti = parseInt(vm.$refs.music.currentTime)
						for(let i = 0; i < vm.timearr.length; i++) {

							if(vm.timearr[i] == vm.ti) {
								vm.ti = -1
								vm.ding4 = setInterval(() => {
									vm.top += 2
									vm.$refs.gd.scrollTop = vm.top + (i * 34.5)
									console.log(vm.top += 2)
									if(vm.top >= 32) {
										vm.top = 0
										clearInterval(vm.ding4)
									}

								}, 20)

							}
						}

					}, 1000)
				})
			},
			listen({
				i,
				url,
				name,
				id,
				pic,
				singer,
				time,
				arrs
			}) {
				this.num = i
				this.zongarr = arrs
				this.gecione = 0
				this.timearr = []
				this.ciarr = []
				this.url = url
				this.pic = pic
				this.name = name
				this.singer = singer
				this.time = time
				this.id = id
				this.$refs.but.style.height = 50 + 'px'
				//https://api.bzqll.com/music/netease/lrc?id=515453363&key=579621905
				this.$http.get('api/music/netease/lrc', {
					params: {
						id: id,
						key: 579621905
					}
				}).then(res => {
					var arr = [];
					var time = [];
					var arr2 = [];
					var arr3 = [];
					var arr4 = [];
					var arr5 = [];
					var arr6 = [];
					this.geciarr = res.data
					var a = this.geciarr.split(/\n/)
					for(let i = 0; i < a.length; i++) {
						if(a[i].length < 13) {
							a.splice(i, 1)
						}
					}

					for(let i = 0; i < a.length; i++) {
						arr = a[i].split(']')
						time.push(arr[0])
						this.ciarr.push(arr[1])
					}
					for(let i = 0; i < a.length; i++) {
						let a = time[i].split('[')
						arr2.push(a[1])
					}
					for(let i = 0; i < a.length; i++) {
						if(arr2[i] == undefined) {
							break
						}
						let a = arr2[i].split('.')
						arr3.push(a[0])
					}

					for(let i = 0; i < arr3.length; i++) {
						let a = arr3[i].split(':')
						arr4.push(a[0])
					}

					for(let i = 0; i < arr4.length; i++) {
						arr5.push(parseInt(arr4[i]) * 60)
					}

					for(let i = 0; i < arr3.length; i++) {
						arr6.push(parseInt(arr3[i].substr(arr3[i].length - 2)))
					}
					for(let i = 0; i < arr6.length; i++) {
						this.timearr.push(arr6[i] + arr5[i])
					}
					for(let i = 0; i < this.timearr.length; i++) {
						if(isNaN(this.timearr[i])) {
							this.timearr[i] = 0
						}
					}
					console.log(this.timearr)
					console.log(this.ciarr)
					let vm = this

					clearInterval(this.ding)
					clearInterval(this.ding2)
					this.ding = setInterval(function() {
						for(let i = 0; i < vm.timearr.length; i++) {
							if(vm.timearr[i] <= vm.$refs.music.currentTime && vm.timearr[i + 1] > vm.$refs.music.currentTime) {
								vm.gecione = i
								vm.$refs.s[i].style.color = 'green'
							}
						}

					}, 1000)
					this.ding2 = setInterval(function() {

						vm.ti = parseInt(vm.$refs.music.currentTime)
						for(let i = 0; i < vm.timearr.length; i++) {

							if(vm.timearr[i] == vm.ti) {
								vm.ti = -1
								vm.ding4 = setInterval(() => {
									vm.top += 2
									vm.$refs.gd.scrollTop = vm.top + (i * 34.5)
									console.log(vm.top += 2)
									if(vm.top >= 32) {
										vm.top = 0
										clearInterval(vm.ding4)
									}

								}, 20)

							}
						}

					}, 1000)

				})
				let vm = this
				this.$refs.music.onended = function() {
					vm.next()
				};
			},
			gedans(id) {
				this.gedanxianqing = true
				console.log(id)
				this.show = false
				this.$http.get('api/music/netease/songList', {
					params: {
						key: 579621905,
						id: id,
						offset: 0
					}
				}).then(res => {
					console.log(res.data.data)
					this.hotMusic = res.data.data
				})
			},
			shousuo() {
				this.gedanxianqing = false
				this.show = false
				this.sousuo = true
			},
			returns() {
				this.show = true
				this.sousuo = false
				this.gedanxianqing = false
			},
			returnss() {
				this.gedanxianqing = false
				this.show = true
				this.sousuo = false
			},
			loadMore() {
				this.i++
					if(this.souarr.length == 0 || this.i > 3) {
						this.loading = false;
					} else {
						this.loading = true;
						setTimeout(() => {
							this.$http.get('api/music/netease/search', {
								params: {
									key: 579621905,
									s: this.$refs.ent.value,
									type: 'song',
									limit: 30 * this.i,
									offset: 0
								}
							}).then(res => {
								this.souarr = res.data.data
							})
							this.loading = false;
						}, 500);
					}

			},
			sou() {
				this.i = 1
				console.log(this.$refs.ent.value)
				this.$http.get('api/music/netease/search', {
					params: {
						key: 579621905,
						s: this.$refs.ent.value,
						type: 'song',
						limit: 30,
						offset: 0
					}
				}).then(res => {
					console.log(res.data.data)
					this.souarr = res.data.data

				})
			}
		}

	}
</script>
<style>
	.box {
		background: white;
	}
	
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
	}
	
	#nav {
		padding: 30px;
	}
	
	#nav a {
		font-weight: bold;
		color: #2c3e50;
	}
	
	#nav a.router-link-exact-active {
		color: #42b983;
	}
	
	.header {
		background: #d43c33;
		height: 50px;
		display: flex;
		align-items: center;
	}
	
	.sousuo {
		color: white;
		text-align: right;
		width: 50%;
		padding-right: 20px;
	}
	
	.logo {
		width: 50%;
		color: white;
		font-size: 1.2rem;
		line-height: 50px;
		text-align: left;
		padding-left: 20px;
	}
	
	.nav {
		display: flex;
		padding-top: 10px;
		padding-left: 10px;
		border-bottom: 1px solid #e6e6e6;
	}
	
	.nav-list {
		text-decoration: none;
		color: #cccccc;
		padding-bottom: 10px;
	}
	
	.active {
		color: #D43C33;
		border-bottom: 2px solid #D43C33;
	}
	
	.sou {
		width: 80%;
		border: 1px solid #939393;
		border-radius: 20px;
		height: 25px;
		padding-left: 30px;
		margin-top: 20px;
		outline-style: none;
	}
	
	.sousuobox {
		position: relative;
	}
	
	.so {
		position: absolute;
		top: 27px;
		left: 30px;
	}
	
	.return {
		padding-top: 10px;
		text-align: left;
		margin-left: 10px;
	}
	
	.but {
		transition: all .5s;
		position: fixed;
		bottom: 0px;
		height: 0px;
		z-index: 2;
		background: white;
		border-top: 1px solid #CCCCCC;
		width: 100%;
		display: flex;
	}
	
	.but-pic>img {
		width: 50px;
		height: 50px;
	}
	
	.but-cont {
		width: 70%;
		text-align: left;
		padding-left: 10px;
		padding-top: 5px;
	}
	
	.but-name {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	
	.but-name>span {
		font-size: 13px;
	}
	
	.but-bf {
		font-size: 35px;
		line-height: 50px;
		padding-right: 5px;
	}
	
	.act {
		margin-top: 10px;
		font-size: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 80%;
		display: block;
	}
	
	.noact {
		display: none;
	}
	
	.bofangqi {
		position: fixed;
		z-index: 6;
		background: white;
		height: 0;
		width: 100%;
		top: 100%;
		transition: all .5s;
		overflow: hidden;
	}
	/*.planting {
		height: 70%;
	}*/
	
	.fan {
		font-size: 18px !important;
		text-align: left;
		padding-left: 20px;
		padding-top: 10%;
	}
	
	.tu-box {
		padding-top: 10%;
		display: flex;
		justify-content: center;
	}
	
	.tu-box>img {
		width: 250px;
		height: 250px;
		border-radius: 50%;
		animation: mymove 10s linear infinite;
	}
	
	.title {
		margin-top: 10%;
		width: 100%;
		text-align: center;
	}
	
	@keyframes mymove {
		from {
			transform: rotateZ(0deg);
		}
		to {
			transform: rotateZ(360deg);
		}
	}
	
	.acts {
		text-align: center;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 13px;
	}
	
	.a>div {
		height: 500px;
	}
	
	.a>div>.two {
		overflow-y: scroll;
	}
	
	.dian {
		margin-top: 20px;
		justify-content: center;
		display: flex;
	}
	
	.dian>div {
		width: 10px;
		height: 10px;
		background: rgba(0, 0, 0, .5);
		border-radius: 50%;
	}
	
	.dian>div:last-of-type {
		margin-left: 10px;
	}
	
	.ac {
		background: black!important;
	}
	
	.gundonggeci {
		line-height: 35px;
		font-size: 14px;
		position: fixed;
		height: 60%;
		top: 11%;
		background: white;
		overflow-y: scroll;
		overflow-x: hidden;
		width: 100%;
		left: 100%;
		transition: all .3s;
	}
	
	.gundonggeci>div {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		padding-left: 30px;
		padding-right: 30px;
	}
	
	.gundonggeci>div:first-of-type {
		margin-top: 50%;
	}
	
	.gundonggeci>div:last-of-type {
		margin-bottom: 72%;
	}
	
	.acs {
		display: block!important;
	}
	
	.gdbofan {
		position: fixed;
		top: 35%;
		right: 10px;
		z-index: 10;
		display: none;
		font-size: 18px;
	}
	
	.kongzi {
		display: flex;
		justify-content: center;
	}
	
	.kongzi>div {
		font-size: 35px!important;
	}
	
	.kongzi>div:nth-of-type(2) {
		margin-left: 20px;
		margin-right: 20px;
	}
</style>