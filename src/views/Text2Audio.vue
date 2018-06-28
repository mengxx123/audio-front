<template>
    <my-page title="文字转 MP3">
        <ui-text-field v-model="text" multiLine :rows="4" :rowsMax="4" hintText="请输入文字" />
        <br>
        <label class="label">类型</label>
        <br>
        <ui-radio class="radio" v-model="person" label="女声" name="group" nativeValue="0"/>
        <br>
        <ui-radio class="radio" v-model="person" label="男声" name="group" nativeValue="1"/>
        <br>
        <ui-radio class="radio" v-model="person" label="男声（情感）" name="group" nativeValue="3"/>
        <br>
        <ui-radio class="radio" v-model="person" label="女声（情感）" name="group" nativeValue="4"/>
        <!-- <ui-text-field v-model.number="person" label="类型（0、1、3、4）" /> -->
        <br>
        <label class="label">音量</label>
        <ui-slider class="slider" v-model="volume" :min="0" :max="15" :step="1" />
        <br>
        <label class="label">音调</label>
        <ui-slider class="slider" v-model="pitch" :min="0" :max="9" :step="1" />
        <br>
        <label class="label">语速</label>
        <ui-slider class="slider" v-model="volume" :min="0" :max="9" :step="1" />
        <!-- <ui-text-field v-model.number="speed" label="语速（0-9）" /> -->
        <br>
        <div class="btns">
            <ui-raised-button label="生成" primary @click="make" />
        </div>
        <br>
        <div class="ui-loading" v-if="loading">
            <ui-circular-progress :size="24"/>
        </div>
        <div class="result-box" v-if="result">
            {{ result }}
            <br>
            <!-- <a :href="result" download>下载</a> -->
            <a href="#" @click.prevent="download">点击下载</a>
        </div>
    </my-page>
</template>

<script>
    import {apiDomain} from '../config'

    export default {
        data () {
            return {
                loading: false,
                text: '',
                volume: 5,
                pitch: 5,
                speed: 5,
                person: 0,
                result: '',
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
            download() {
                window.open(this.result)
            }
        }
    }
</script>

<style scoped>
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
</style>
