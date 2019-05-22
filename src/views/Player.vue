<template>
    <my-page title="播放器">
        <div class="common-container container">
            <div class="video-box">
                <!--  autoplay controls  -->
                <audio id="audio"  >
                    <!-- <source src="horse.ogg" type="audio/ogg"> -->
                    <source :src="audioSrc" type="audio/mpeg">
                    您的浏览器不支持 audio 元素。
                </audio>
                
                <ui-icon-button class="play" icon="play_arrow" @click="_play" v-if="!playState.playing" />
                <ui-icon-button class="play" icon="pause" @click="_pause" v-if="playState.playing" />
                <br>
                <div class="progress-box">
                    <ui-slider class="progress" v-model="playState.progress"
                        :display-value="false" :min="0" :max="100" :step="0.01" @change="onChange" />
                    <div class="progress-text">
                        {{ playState.current }}
                        /
                        {{ playState.total }}
                    </div>
                </div>
            </div>
            <div class="file-box" v-if="isSelect">
                <ui-raised-button label="重新选择音频" secondary @click="reset" />
            </div>
            <div class="file-box" v-if="!isSelect">
                <input class="file" id="file" type="file" @change="fileChange" />
                <br>
                <ui-text-field v-model="url" label="视频链接" />
                <br>
                <ui-raised-button label="播放" primary @click="play" />
            </div>

            <ui-checkbox class="repeat" v-model="repeat" label="重复播放片段" />
            <div class="repeat-time" v-if="repeat">
                <ui-text-field v-model="startTime" label="开始时间" />
                <ui-text-field v-model="endTime" label="结束时间" />
            </div>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {apiDomain} from '../config'

    export default {
        data () {
            return {
                repeat: false,
                startTime: '0:02',
                endTime: '0:03',
                isSelect: false,
                playState: {
                    playing: false,
                    current: '0:00',
                    total: '4:00',
                    progress: 0
                },
                playVisible: false,
                loading: false,
                url: 'https://nodeapi.yunser.com/img/1546151148509.mp3',
                playerOptions: null,
                audioSrc: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/help'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.audio = document.getElementById('audio')
            // this.audio.playbackRate = 0.5
            this.audio.addEventListener('play', e => {
                console.log('onplay')
                this.playState.playing = true
            })
            this.audio.addEventListener('pause', e => {
                console.log('pause')
                this.playState.playing = false
            })
            this.audio.addEventListener('ended', e => {
                console.log('ended')
                this.playState.playing = false
            })
            this.audio.addEventListener('abort', e => {
                console.log('onabort')
            })
            this.audio.addEventListener('error', e => {
                console.log('onerror')
            })
            this.audio.addEventListener('timeupdate', e => {
                function secondToText(second) {
                    let minute = Math.floor(parseInt(second) / 60)
                    let s = parseInt(second) % 60
                    if (s < 10) {
                        s = '0' + s
                    }
                    return minute + ':' + s
                }
                this.playState.total = secondToText(e.target.duration)
                this.total = e.target.duration
                this.playState.current = secondToText(e.target.currentTime)
                this.playState.progress = e.target.currentTime / e.target.duration * 100
                console.log('ontimeupdate', e.target.duration, e.target.currentTime)

                function getSecond(text) {
                    let arr = text.split(':')
                    return parseInt(arr[0]) * 60 + parseInt(arr[1])
                }
                let startSecond = getSecond(this.startTime)
                let endSecond = getSecond(this.endTime)
                console.log(startSecond, endSecond)
                if (this.repeat && e.target.currentTime < startSecond) {
                    this.audio.currentTime = startSecond
                }
                if (this.repeat && e.target.currentTime > endSecond) {
                    this.audio.currentTime = startSecond
                }
            })

            let data = this.$route.query.data
            if (data) {
                this.isSelect = true
                this.audioSrc = data
                this.playAudio(this.audioSrc)
            }
        },
        methods: {
            make() {
                if (!this.text) {
                    this.$message({
                        type: 'danger',
                        text: '请输入文字'
                    })
                    return
                }
                this.loading = true
                this.result = null
                this.$http.get(`/audio/text2audio?text=${this.text}&volume=${this.volume}&pitch=${this.pitch}&speed=${this.speed}&person=${this.person}`).then(
                    response => {
                        let data = response.data
                        console.log(data)
                        this.result = apiDomain + data
                        this.loading = false
                    },
                    response => {
                        console.log(response)
                        this.loading = false
                    })
            },
            reset() {
                this.isSelect = false
            },
            play() {
                this.isSelect = true
                console.log('this.url', this.url)
                this.audioSrc = this.url
                this.playAudio(this.url)
            },
            playAudio(src) {
                this.playVisible = true
                this.audioSrc = src
                this.audio && this.audio.load()
                this.audio && this.audio.play()
                this.playerOptions = {
                    // videojs options
                    // muted: true,
                    width: 638,
                    height: 359,
                    language: 'zh-CN',
                    playbackRates: [0.5, 0.75, 1.0, 1.25, 1.5, 2.0],
                    autoplay: true,
                    sources: [{
                        type: 'video/mp4',
                        // src: "https://cdn.theguardian.tv/webM/2015/07/20/150716YesMen_synd_768k_vp8.webm"
                        src: src
                    }]
                }
                // this.$refs.player.play()
                if (!this.isInitAudio) {
                    this.isInitAudio = true
                    
                }
            },
            _play() {
                this.audio.play()
            },
            _pause() {
                this.audio.pause()
            },
            fileChange(e) {
                console.log('cahnge')
                let file = e.target.files[0]
                if (!file) {
                    return
                }
                let url = window.URL.createObjectURL(file)
                this.playAudio(url)
            },
            onChange(value) {
                console.log('value', value, this)
                // this.audio.fastSeek(this.total * value / 100)
                // audio.currentTime = 0;
                this.audio.currentTime = this.total * value / 100
            }
        }
    }
</script>

<style lang="scss" scoped>
.container {
    max-width: 400px;
}
.video-box {
    width: 300px;
    height: 300px;
    border: 1px solid rgba(0, 0, 0, .12);
    margin: 0 auto 16px 0;
    .play {
        display: block;
        margin: 100px auto 80px auto;
        box-shadow: 0 1px 6px rgba(0,0,0,.117647), 0 1px 4px rgba(0,0,0,.117647);
    }
    .progress-box {
        display: flex;
        align-items: center;
        padding: 0 16px;
    }
    .progress {
        flex-grow: 1;
        margin-bottom: 0;
    }
    .progress-text {
        width: 98px;
        margin-left: 16px;
    }
}
.label {
    display: block;
    margin-bottom: 8px;
    color: rgba(0,0,0,.54);
    font-size: 14px;
}
.slider {
    margin-bottom: 0;
    width: 256px;
}
.btns {
    margin-bottom: 16px;
}
.result-box {
    /* margin-top: 16px; */
}
.repeat {
    margin-top: 16px;
    margin-bottom: 16px;
}
.repeat-time {
}
</style>
