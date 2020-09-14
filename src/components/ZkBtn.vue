<template>
    <a href="javascript:;" zk-btn v-on="listeners" :zk-btn-disabled="disabled"><slot></slot></a>
</template>
<script>
export default {
    props: {
        //按钮功能key
        auth: {
            type: [String, Array],
            default: function () {
                return null;
            },
        },
        // 是否禁用
        zkDisabled: {
            type: Boolean,
            default: function () {
                return false;
            },
        },
    },
    computed: {
        // 绑定传入事件
        listeners: function () {
            // 若设置禁用则禁用全部事件
            if (this.disabled == true) {
                return null;
            } else {
                return this.$listeners;
            }
        },
        // 是否禁用
        disabled: function () {
            // console.log(this,this.auth);
            // 检查是否有该功能权限
            // let hasAuth = true;
            // if (this.auth) hasAuth = auth.check(this.auth);
            // if (!hasAuth || this.zkDisabled) {
            //     return true;
            // } else {
            //     return false;
            // }
            return false;
        },
    },
    created() {
        // this.$nextTick(()=>{
        // alert(this.$el);
        // this.$el.addEventListener('touchstart', function() {},false);
        // })
    },
};
</script>