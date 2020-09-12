import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout'
import ProLayout from '@ant-design-vue/pro-layout'
import defaultSettings from './defaultSettings';
// import RightContent from '@/components/GlobalHeader/RightContent.vue';
import GlobalFooter from '@/components/GlobalFooter';
import { Icon, Menu, Dropdown } from 'ant-design-vue';

import './index.less';
import '@/components/SelectLang/index.less';


// import { i18nRender } from '@/locales'
const props = {
    /** 导航菜单 */
    navMenus: {
        type: Array,
        default: () => []
    },
    /** 当前用户信息和操作菜单 */
    currentUser: {
        type: Object,
        // name:'',
        // menus:[]
        default: () => {
            return {
                name: '测试',
                imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
                menus:[
                    {
                        label:'个人设置',
                        icon:'setting',
                        onClick(){
                            console.log(123123);
                        }
                    },
                    {
                        label:'退出登录',
                        icon:'setting',
                        onClick(){
                            console.log(123123);
                        }
                    }
                ]
            }
        }
    },
    /** 待选语言 */
    langs: {
        type:Array,
        default:()=>[
            {
                label:'简体中文',
                icon:'🇨🇳',
                onClick(){
                    console.log('简体中文');
                }
            },
            {
                label:'English',
                icon:'🇺🇸',
                onClick(){
                    console.log('English');
                }
            }
        ]
    }
}
export default {
    name: 'ZkBasicLayout',
    components: {
        //   SettingDrawer,
        //   RightContent,
        GlobalFooter,
        ProLayout,
        Icon, 
        Menu, 
        Dropdown
    },
    props,
    data() {
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
            isMobile: false,
            /** 当前选中的语言 */
            currentLang: null
        }
    },
    computed: {
        // menus(){
        //     return this.nav
        // }
    },
    created() {
        if (this.langs) {
            // 默认使用第一个语言项作为默认语言
            this.currentLang = this.langs[0].label;
        }
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
        },

        renderDefRightContentRender() {
            const wrpCls = {
                'ant-pro-global-header-index-right': true,
                [`ant-pro-global-header-index-${(this.isMobile || this.settings.layout !== 'topmenu') ? 'light' : this.settings.theme}`]: true
            }
            if (this.currentUser && this.currentUser.name) {

                if (!this.currentUser.menus) this.currentUser.menus = []; 
                const menus = this.currentUser.menus.map((item, index) => (
                    <Menu.Item key={index} onClick={() => item.onClick && item.onClick()}>
                        { item.icon && <Icon type={ item.icon } />}
                        { item.label }
                    </Menu.Item>
                ));
                
                if(menus.length>1){
                    // 多项菜单最后一项添加间隔符
                    const val = menus.pop();
                    menus.push(<a-menu-divider/>);
                    menus.push(val);
                }

                return (
                    <div class={ wrpCls }>
                        <Dropdown placement="bottomRight" class="ant-pro-global-header-index-action">
                            <span class="ant-pro-account-avatar">
                                <a-avatar size="small" src={this.currentUser.imgUrl} class="antd-pro-global-header-index-avatar" />
                                <span>{ this.currentUser.name }</span>
                            </span>
                            { 
                                menus.length>0&& ( 
                                    <template slot='overlay'>
                                        <Menu class="ant-pro-drop-down menu head-right-content-dropdown" selected-keys={[]}>
                                            { menus }
                                        </Menu>
                                    </template>
                                )
                            }
                        </Dropdown>
                        <Dropdown placement="bottomRight" class="ant-pro-global-header-index-action">
                            <span class='ant-pro-drop-down'>
                                <Icon type="global" title='图标'/>
                            </span>
                            {
                                this.langs&&(
                                    <template slot='overlay'>
                                        <Menu class={['menu', 'ant-pro-header-menu']} selectedKeys={ [this.currentLang] }>
                                            {this.langs.map(item => (
                                            <Menu.Item key={item.label} onClick={()=>{
                                                this.currentLang = item.label;
                                                item.onClick && item.onClick();
                                            }}>
                                                <span role="img" aria-label={item.label}>
                                                {item.icon}
                                                </span>{' '}
                                                {item.label}
                                            </Menu.Item>
                                            ))}
                                        </Menu>
                                    </template>
                                )
                            }
                        </Dropdown>
                    </div>
                )
            } else {
                return (
                    <div class={ wrpCls }>
                        <span>
                            <a-spin size="small" style={{ marginLeft: '8px', marginRight: '8px' }} />
                        </span>
                    </div>
                )
            }

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
        props = Object.assign(this.settings, props);
        return (
            <pro-layout {...{ props }} >
                {/* <setting-drawer :settings="settings" @change="handleSettingChange" /> */}
                {this.$slots['rightContentRender']||(<template slot='rightContentRender'>{this.renderDefRightContentRender()}</template>)}
                {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
                <router-view />
                {/* <template slot="footerRender"><GlobalFooter /></template> */}
                <template slot="footerRender">
                    <global-footer />
                </template>
            </pro-layout>
        )
    },


}
