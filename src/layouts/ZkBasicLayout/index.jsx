import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import ProLayout from '@ant-design-vue/pro-layout'
import defaultSettings from './defaultSettings';
import RightContent from '@/components/GlobalHeader/RightContent.vue';
import GlobalFooter from '@/components/GlobalFooter';



// import { i18nRender } from '@/locales'
const props = {
    /** 导航菜单 */
    navMenus:{
        type:Array,
        default:()=>[]
    }
}
export default {
    name: 'ZkBasicLayout',
    components: {
        //   SettingDrawer,
          RightContent,
        //   GlobalFooter,
        ProLayout
    },
    props,
    data () {
      return {
        // base
        // 侧栏收起状态
        collapsed: false,
        title: defaultSettings.title,
        settings: {
          // 布局类型
          layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
          // 定宽: true / 流式: falseFluid` or `Fixed
          contentWidth: defaultSettings.layout === 'sidemenu' ? 'Fluid' : 'Fixed',
          // 主题 'dark' | 'light'
          theme: defaultSettings.navTheme,
          // 主色调
          primaryColor: defaultSettings.primaryColor,
          fixedHeader: defaultSettings.fixedHeader,
          fixSiderbar: defaultSettings.fixSiderbar,
          colorWeak: defaultSettings.colorWeak,
          hideHintAlert: false,
          hideCopyButton: false
        },
        // 媒体查询
        query: {},

        // 是否手机模式
        isMobile: false
      }
    },
    computed: {
        // menus(){
        //     return this.nav
        // }
    },
    created() {
        // const routes = this.mainMenu.find(item => item.path === '/')
        // this.menus = (routes && routes.children) || []
        // // 处理侧栏收起状态
        // this.$watch('collapsed', () => {
        //     this.$store.commit(SIDEBAR_TYPE, this.collapsed)
        // })
        // this.$watch('isMobile', () => {
        //     this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile)
        // })
    },
    mounted() {
        const userAgent = navigator.userAgent
        if (userAgent.indexOf('Edge') > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed
                setTimeout(() => {
                    this.collapsed = !this.collapsed
                }, 16)
            })
        }

        // first update color
        // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
        if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
            // updateTheme(this.settings.primaryColor)
        }
    },
    methods: {
        //   i18nRender,
        handleMediaQuery(val) {
            this.query = val
            if (this.isMobile && !val['screen-xs']) {
                this.isMobile = false
                return
            }
            if (!this.isMobile && val['screen-xs']) {
                this.isMobile = true
                this.collapsed = false
                this.settings.contentWidth = false
                // this.settings.fixSiderbar = false
            }
        },
        handleCollapse(val) {
            this.collapsed = val
        },
        handleSettingChange({ type, value }) {
            console.log('type', type, value)
            type && (this.settings[type] = value)
            switch (type) {
                case 'contentWidth':
                    this.settings[type] = value === 'Fixed'
                    break
                case 'layout':
                    if (value === 'sidemenu') {
                        this.settings.contentWidth = false
                    } else {
                        this.settings.fixSiderbar = false
                        this.settings.contentWidth = true
                    }
                    break
            }
        },
        logoRender() {
            return '<a>13</a>'
            // return <LogoSvg />
        }
    },

    render() {
        let props = {
            title: this.title,
            menus: this.navMenus,
            collapsed: this.collapsed,
            mediaQuery: this.query,
            isMobile: this.isMobile,
            handleCollapse: this.handleCollapse,
            handleMediaQuery: this.handleMediaQuery
        }
        props = Object.assign(this.settings,props);
        
        // 设置默认右侧内容
        if (!this.$slots['rightContentRender']) {
            this.$slots.rightContentRender = (
                <right-content top-menu={this.settings.layout === 'topmenu'} is-mobile={this.isMobile} theme={this.settings.theme} />
            )
        }
        // 设置默认底部内容
        if (!this.$slots['footerRender']) {
            this.$slots.rightContentRender = (
                <global-footer />
            )
        }
        return (
            <pro-layout {...{ props }} >
                {/* <setting-drawer :settings="settings" @change="handleSettingChange" /> */}
                {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
                <router-view />
            </pro-layout>
        )
    }
}