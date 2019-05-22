<template>
    <my-page title="音频" :page="page">
        <div class="common-container container">
            <app-list :data="groups" />
        </div>
    </my-page>
</template>

<script>
    /* eslint-disable */
    export default {
        data () {
            return {
                groups: [
                    {
                        name: '基本',
                        apps: [
                            {
                                name: '播放器',
                                desc: '',
                                icon: '/static/img/audio.svg',
                                to: 'viewer'
                            },
                            {
                                name: '录音',
                                desc: '',
                                icon: '/static/img/audio.svg',
                                to: 'xxx',
                                href: 'https://demo2.yunser.com/record/',
                                target: '_blank'
                            },
                        ]
                    },
                    {
                        name: '格式转化',
                        apps: [
                            {
                                name: '文字转音频',
                                desc: '',
                                icon: '/static/img/text_to_audio.svg',
                                to: '/text2audio'
                            },
                            {
                                name: '音频转文字',
                                desc: '',
                                icon: '/static/img/audio_to_text.svg',
                                to: 'xxx',
                                href: 'https://util.yunser.com/audio_to_text/',
                                target: '_blank'
                            },
                            // {
                            //     name: '音频转文字',
                            //     desc: '',
                            //     icon: '/static/img/audio_to_text.svg',
                            //     to: '/audio2text'
                            // },
                            {
                                name: '格式转化',
                                desc: '',
                                icon: '/static/img/audio_convert.svg',
                                to: '/formatConvert'
                            }
                        ]
                    },
                    {
                        name: '编辑',
                        apps: [
                            {
                                name: '音频剪辑',
                                desc: '',
                                icon: '/static/img/audio.svg',
                                to: 'xxx',
                                href: 'https://audio-editor.yunser.com/',
                                target: '_blank'
                            },
                            {
                                name: '音频拼接',
                                desc: '',
                                icon: '/static/img/audio.svg',
                                to: '/join'
                            },
                            {
                                name: 'Mp3 信息查看',
                                desc: '',
                                icon: '/static/img/audio.svg',
                                to: '/mp3'
                            }
                        ]
                    },
                    {
                        name: '歌词',
                        apps: [
                            {
                                name: '歌词格式转化',
                                desc: '',
                                icon: '/static/img/audio_to_text.svg',
                                to: '/lyric/convert'
                            }
                        ]
                    }
                ],
                page: {
                    menu: [
                        {
                            type: 'icon',
                            icon: 'search',
                            href: 'https://search.yunser.com?utm_source=audio',
                            target: '_blank',
                            title: '搜索'
                        },
                        {
                            type: 'icon',
                            icon: 'apps',
                            href: 'https://app.yunser.com?utm_source=audio',
                            target: '_blank',
                            title: '应用'
                        }
                    ]
                }
            }
        }
    }
</script>
