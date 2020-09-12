<style lang="scss">
    .zk-modal{
        .ant-drawer-body{
            height: calc( 100% - 55px);
            overflow: auto;
            padding-bottom: 64px;
        }
    }
</style>
<script>
// import Modal from 'ant-design-vue/es/modal/Modal';
const sizeMaping = {
    xs: 320,
    sm: 480,
    md: 640,
    lg: 800,
    xl: 960,
    xxl: 1280
}
export default {
    name: 'ZkModal',
    props: {
        title: {
            type: String
        },
        size: {
            type: String,
            default: () => 'md'
        },
        visible: {
            type: Boolean,
            default: () => false
        },
        /** 传输中遮罩层 */
        loading:{
            type: Boolean,
            default: () => false
        },
        okText:{
            type:String,
            default:()=>'确定'
        }
    },
    render() {
        const width = sizeMaping[this.size];
        const props = Object.assign({}, {
            visible: this.visible,
            title: this.title,
            width: width
        });
        const handleOk = ()=>{
            // 在传输中则阻止 ok 事件触发
            if (this.loading)return;
            this.$emit('ok');
        }
        const btns = [];
        const hasOk = this.$listeners.ok ? true : false;
        btns.push(<a-button style={{ marginRight: '8px' }} onClick={() => this.$emit('cancel')}>{hasOk ? '取消' : '关闭'}</a-button>);
        if (hasOk) {
            btns.push(<a-button type="primary" onClick={ handleOk }>{ this.okText }</a-button>)
        }
        if (props.width >= sizeMaping['lg']) {
            //   <a-spin spinning={this.loading}>
            //             {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
            //         </a-spin>
            props.headerStyle = {
                //  height:'100%',
            }
            // props.bodyStyle={
            //     // height:'calc( 100% - 55px)',
            //     // overflow: 'auto'
            // }
            return (
                <a-drawer {...{ props }} wrapClassName="zk-modal" onClose={() => this.$emit('cancel')}>
                    {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
                    {
                        this.$slots.footer ? this.$slots.footer : (
                                <div style={{
                                    position: 'absolute',
                                    bottom: 0,
                                    width: '100%',
                                    borderTop: '1px solid #e8e8e8',
                                    padding: '10px 16px',
                                    textAlign: 'center',
                                    left: 0,
                                    background: '#fff',
                                    borderRadius: '0 0 4px 4px',
                                    zIndex:1000
                                }}>
                                    {btns}
                                </div>
                        )
                    }
                </a-drawer>
            )
        } else {
            return (
                <a-modal {...{ props }} onCancel={() => this.$emit('cancel')} okText="确定">
                    <a-spin spinning={this.loading}>
                        {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
                    </a-spin>
                    {
                        this.$slots.footer ? this.$slots.footer : (
                            <template slot="footer">
                                <div style="text-align: center;">
                                    {btns}
                                </div>
                            </template>
                        )
                    }
                </a-modal>
            );
        }
    }
}
</script>