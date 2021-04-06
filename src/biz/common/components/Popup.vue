<template>
    <transition name="popup">
        <div class="popup" v-if="isShow">{{title}}</div>
    </transition>
</template>

<style lang="less" scoped>
    @import "~src/common/less/common.less";
    .popup {
        margin:0 auto;
        position: absolute;
        top:30/@b;
        left:50%;
        transform: translateX(-50%);
        width: 350/@b;
        height: 60/@b;
        line-height: 60/@b;
        background: #333;
        color:#ffffff;
        font-size: 32/@base;
        text-align: center;
        border-radius: 6/@base;
        font-weight: bold;
    }
    .popup-enter{
        opacity: 0;
        top:0;
    }
    .popup-enter-active{
        transition: all 1s;
    }
    .popup-enter-to{
        opacity: 1;
        top:30/@b;
    }
    .popup-leave{
        opacity: 1;
        top:30/@b;
    }
    .popup-leave-active{
        transition: all 1s;
    }
    .popup-leave-to{
        opacity: 0;
        top:0;     
    }
</style>

<script>
export default {
    data: () => ({
        title : '注册失败',
        isShow : false
    }),
    methods:{
        toast(config){
            let {
                title,
                time
            } = config || {
                title : '一个toast',
                time : 1000
            };
            this.isShow = true ;
            this.title = title.length > 8 ? title.substring(0,8) + '...' : title;
            setTimeout(()=> this.isShow = false,time);
        }
    }
}
</script>