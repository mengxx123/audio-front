<template>
    <my-page title="Mp3 信息查看" :page="page">
        <div class="common-container container">
            <form action="http://localhost:1026/net/files" method="post" enctype="multipart/form-data">
                <div class="form-group">
                    <input id="file" type="file" name="logo" class="from-control">
                </div>
                <div class="tip">仅支持 MP3 格式。</div>
                <ui-raised-button class="btn" label="查看" primary @click="upload" />
                <div v-if="result">
                    <ui-article>
                        <table>
                            <tr>
                                <th>标题（title）</th>
                                <td>{{ result.title }}</td>
                            </tr>
                            <tr>
                                <th>作者（artist）</th>
                                <td>{{ result.tags.artist }}</td>
                            </tr>
                            <tr>
                                <th>专辑（album）</th>
                                <td>{{ result.tags.album }}</td>
                            </tr>
                        </table>
                    </ui-article>
                </div>
            </form>
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {domain} from '@/config'
    const ClipboardJS = window.ClipboardJS
    const jsmediatags = require("jsmediatags")

    // jsmediatags.read("https://nodeapi.yunser.com/img/1546245801991.mp3", {
    //     onSuccess: function(tag) {
    //         console.log('onSuccess', tag);
    //     },
    //     onError: function(error) {
    //         console.log('error', error);
    //     }
    // })

    export default {
        data () {
            return {
                result: null,
                results: [],
                results2: [],
                qrcodeSrc: '',
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'help',
                            href: 'https://project.yunser.com/products/0beb77f00cd111e9a211a9bae959484b',
                            target: '_blank',
                            title: '帮助'
                        }
                    ]
                }
            }
        },
        mounted() {
            this.initClipboard()
        },
        methods: {
            view() {
                window.open(this.result, '_blank')
            },
            initClipboard() {
                this.clipboard = new ClipboardJS('.btn')
                this.clipboard.on('success', e => {
                    this.$message({
                        type: 'success',
                        text: '复制成功'
                    })
                    console.info('Action:', e.action);
                    console.info('Text:', e.text);
                    console.info('Trigger:', e.trigger);
                    e.clearSelection();
                })
                this.clipboard.on('error', e => {
                    console.error('Action:', e.action);
                    console.error('Trigger:', e.trigger);
                })
            },
            upload() {
                let file = document.getElementById('file').files[0]
                jsmediatags.read(file, {
                    onSuccess: tag => {
                        console.log('onSuccess', tag);
                        this.result = {
                            tags: tag.tags,
                            title: tag.tags.title
                        }
                    },
                    onError: function(error) {
                        console.log('error', error);
                    }
                })
            },
            make() {
                this.$http.get(domain.api2 + '/audio/join?url=' + encodeURIComponent(this.results2.join(',')))
                    .then(response=>{
                        console.log(response.data);
                        let result = response.data
                        if (!result.match(/^http/)) {
                            result = domain.api2 + result
                        }
                        this.result = result
                    })   
            },
            qrcode() {
                this.qrcodeSrc = 'https://nodeapi.yunser.com/qrcode?content=' + encodeURIComponent(this.result)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .tip {
        margin-top: 16px;
        color: #999;
    }
    .btn {
        margin-top: 16px;
        margin-bottom: 16px;
    }
    .btns {
        .btn {
            margin-right: 8px;
        }
    }
    .qrcode {
        display: block;
        width: 160px;
        height: 160px;
        margin: 0 auto;
        border: 1px solid rgba(0, 0, 0, .12);
    }
    .container {
        max-width: 800px;
    }
</style>
