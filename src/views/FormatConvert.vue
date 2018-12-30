<template>
    <my-page title="格式转化">
        <form action="http://localhost:1026/net/files" method="post" enctype="multipart/form-data">
            <div class="form-group">
                <input id="file" type="file" name="logo" class="from-control" @change="fileChange($event)">
            </div>
            <ui-select-field v-model="toFormat" label="转换格式">
                <ui-menu-item :title="format" :value="format" v-for="format in formats" :key="format"/>
            </ui-select-field>
            <div class="btns">
                <ui-raised-button class="btn" label="转换" primary @click="upload" />
            </div>
            <div class="ui-loading" v-if="loading">
                <ui-circular-progress :size="24"/>
            </div>
            <div class="result-box" v-if="result">
                {{ result }}
                <br>
                <!-- <a :href="result" download>下载</a> -->
                <a href="#" @click.prevent="download">点击下载</a>
            </div>
        </form>
    </my-page>
</template>

<script>
    /* eslint-disable */
    import {apiDomain} from '../config'

    export default {
        data () {
            return {
                loading: false,
                toFormat: 'mp3',
                text: '',
                volume: 5,
                pitch: 5,
                speed: 5,
                person: 0,
                result: '',
                allFormats: ['mp3', 'wav', 'amr'],
                formats: ['mp3', 'wav', 'amr', 'pcm'],
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
            // this.toFormat = 'mp3'
        },
        methods: {
            download() {
                window.open(this.result)
            },
            fileChange(e) {
                let file = e.target.files[0]
                if (!file) {
                    return
                }

                let arr = file.name.split('.')
                let ext = arr[arr.length - 1]
                if (ext !== 'mp3' && ext !== 'wav' && ext !== 'amr') {
                    this.$message({
                        type: 'danger',
                        text: '请选择正确的文件格式（mp3、wav、amr）'
                    })
                    return
                }

            },
            upload() {
                let file = document.getElementById('file').files[0];
                if (!file) {
                    this.$message({
                        type: 'danger',
                        text: '请选择音频文件'
                    })
                    return
                }
                this.loading = true
                this.result = null
                let param = new FormData(); //创建form对象
                param.append('logo',file,file.name);//通过append向form对象添加数据
                param.append('chunk','0');//添加form表单中其他数据
                console.log(param.get('file')); //FormData私有类对象，访问不到，可以通过get判断值是否传进去

                let arr = file.name.split('.')
                let ext = arr[arr.length - 1]
                console.log('格式' + ext, this.toFormat)
                if (ext === this.toFormat) {
                    this.$message({
                        type: 'danger',
                        text: '转换格式不能和原格式相同'
                    })
                    return
                }
                let config = {
                    headers:{'Content-Type':'multipart/form-data'}
                };  //添加请求头
                this.$http.post(apiDomain + '/net/files',param,config)
                .then(response=>{
                    console.log(response.data);
                    let result = response.data.data.path.replace('public', '').replace(/\\/g, '/').replace(/^\//, '')
                    console.log('结果')
                    console.log(result)
                    this.$http.get(`/audio/convert?path=${result}&from=${ext}&to=${this.toFormat}`).then(
                        response => {
                            let data = response.data
                            console.log('结果2')
                            console.log(data)
                            this.result = apiDomain + '/' + data
                            this.loading = false
                        },
                        response => {
                            console.log(response)
                            this.loading = false
                        })
                },
                    response => {
                        console.log(response)
                        this.loading = false
                    })        
            }
        }
    }
</script>

<style scoped>
.form-group {
    margin-bottom: 16px;
}
.btns {
    margin-top: 16px;
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
.result-box {
    margin-top: 16px;
}
.btn {
    margin-bottom: 16px;
}
</style>
