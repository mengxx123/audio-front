<template>
    <my-page title="歌词格式转化" :page="page">
        <div class="common-container container">
            <textarea class="form-control" v-model="code" rows="6" placeholder="歌词"></textarea>
            <select class="form-control charset" v-model="type">
                <option value="lrc2json">LRC 转 JSON</option>
                <!-- <option value="krc2lrc">KRC 转 LRC</option> -->
            </select>
            <div class="btns">
                <ui-raised-button class="btn" primary label="转化" @click="convert" />
            </div>
            <textarea class="form-control" v-model="result" rows="6" placeholder="结果" disabled v-if="result"></textarea>
        </div>
    </my-page>
</template>

<script>
    // import krc2lrc from '../util/krc'
    const lrcParser = require('lrc-parser')

    export default {
        data () {
            return {
                type: 'lrc2json',
                // code: '',
                code: `[ar: Camila Cabello, Young Thug]
[ti: Havana]
[al: Havana (Single)]
[length: 03:36]
[00:00.00]Song: Havana
[00:02.00]Singer: Camila Cabello, Young Thug
[00:04.00]
[00:08.86]Havana ooh na-na (ayy)
[00:11.56]Half of my heart is in Havana 
[00:14.11]Ooh-na-na (ayy ayy)
[00:16.03]He took me back 
[00:17.25]To East Atlanta na-na-na
[00:19.95]
[00:20.60]All of my heart is in Havana (ayy)
[00:23.51]There's somethin' 'bout his manners
`,
                charset: 'utf-8',
                result: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            to: '/subtitle/convert/help',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
            },
            convert() {
                if (!this.code) {
                    alert('请输入内容')
                    return
                }
                switch (this.type) {
                    case 'lrc2json':
                        let json = lrcParser(this.code)
                        this.result = JSON.stringify(json, null, 4)
                        break
                    // case 'krc2lrc':
                    //     this.result = krc2lrc(this.code)
                    //     break
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
textarea.form-control {
    height: auto;
}
.form-control {
    display: block;
    width: 100%;
    max-width: 400px;
    height: 33px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42;
    color: #55595c;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 2px;
    outline: none;
}
.charset {
    margin-top: 16px;
}
.btns {
    margin-top: 16px;
    margin-bottom: 16px;
    .btn {
        margin-right: 8px;
        margin-bottom: 8px;
    }
}
</style>
