import ProLayout, { SettingDrawer, GlobalFooter } from '@ant-design-vue/pro-layout';
import { Icon, Menu, Dropdown, Select } from 'ant-design-vue';

/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 *
 * storageOptions: {} - Vue-ls 插件配置项 (localStorage/sessionStorage)
 *
 */

var defaultSettings = {
  navTheme: 'dark', // theme for nav menu
  primaryColor: '#52C41A', // primary color of ant design
  layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
  contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
  fixedHeader: false, // sticky header
  fixSiderbar: false, // sticky siderbar
  colorWeak: false,
  menu: {
    locale: true
  },
  title: 'Ant Design Pro',
  pwa: false,
  iconfontUrl: '',
  production: process.env.NODE_ENV === 'production' && process.env.VUE_APP_PREVIEW !== 'true'
};

const props = {
    /** 导航菜单 */
    navMenus: {
        type: Array,
        default: () => []
    },
    /** 当前用户信息和操作菜单 */
    currentUser: {
        type: Object,
        required:true
        // name:'',
        // menus:[]
        // default: () => {
        //     return {
        //         name: '测试',
        //         imgUrl: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        //         menus: [
        //             {
        //                 label: '个人设置',
        //                 icon: 'setting',
        //                 onClick() {
        //                     console.log(123123);
        //                 }
        //             },
        //             {
        //                 label: '退出登录',
        //                 icon: 'setting',
        //                 onClick() {
        //                     console.log(123123);
        //                 }
        //             }
        //         ]
        //     }
        // }
    },
    /** 待选语言 */
    langs: {
        type: Array,
        default: () => [
            // {
            //     label: '简体中文',
            //     icon: '🇨🇳',
            //     onClick() {
            //         console.log('简体中文');
            //     }
            // },
            // {
            //     label: 'English',
            //     icon: '🇺🇸',
            //     onClick() {
            //         console.log('English');
            //     }
            // }
        ]
    },
    /** 版权声明 */
    copyright: {
        type: String
    }
};
var index = {
    name: 'ZkBasicLayout',
    components: {
        SettingDrawer, GlobalFooter, ProLayout, Icon, Menu, Dropdown
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
                contentWidth:  'Fluid' ,
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
        const userAgent = navigator.userAgent;
        if (userAgent.indexOf('Edge') > -1) {
            this.$nextTick(() => {
                this.collapsed = !this.collapsed;
                setTimeout(() => {
                    this.collapsed = !this.collapsed;
                }, 16);
            });
        }

        // first update color
        // TIPS: THEME COLOR HANDLER!! PLEASE CHECK THAT!!
        if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') ;
    },
    methods: {
        //   i18nRender,
        handleMediaQuery(val) {
            this.query = val;
            if (this.isMobile && !val['screen-xs']) {
                this.isMobile = false;
                return
            }
            if (!this.isMobile && val['screen-xs']) {
                this.isMobile = true;
                this.collapsed = false;
                this.settings.contentWidth = false;
                // this.settings.fixSiderbar = false
            }
        },
        handleCollapse(val) {
            this.collapsed = val;
        },
        handleSettingChange({ type, value }) {
            console.log('type', type, value);
            type && (this.settings[type] = value);
            switch (type) {
                case 'contentWidth':
                    this.settings[type] = value === 'Fixed';
                    break
                case 'layout':
                    if (value === 'sidemenu') {
                        this.settings.contentWidth = false;
                    } else {
                        this.settings.fixSiderbar = false;
                        this.settings.contentWidth = true;
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
            };
            if (this.currentUser && this.currentUser.name) {

                if (!this.currentUser.menus) this.currentUser.menus = [];
                const menus = this.currentUser.menus.map((item, index) => (
                    <Menu.Item key={index} onClick={() => item.onClick && item.onClick()}>
                        { item.icon && <Icon type={item.icon} />}
                        { item.label}
                    </Menu.Item>
                ));

                if (menus.length > 1) {
                    // 多项菜单最后一项添加间隔符
                    const val = menus.pop();
                    menus.push(<a-menu-divider />);
                    menus.push(val);
                }

                return (
                    <div class={wrpCls}>
                        <Dropdown placement="bottomRight" class="ant-pro-global-header-index-action">
                            <span class="ant-pro-account-avatar">
                                <a-avatar size="small" src={this.currentUser.imgUrl} class="antd-pro-global-header-index-avatar" />
                                <span>{this.currentUser.name}</span>
                            </span>
                            {
                                menus.length > 0 && (
                                    <template slot='overlay'>
                                        <Menu class="ant-pro-drop-down menu head-right-content-dropdown" selected-keys={[]}>
                                            {menus}
                                        </Menu>
                                    </template>
                                )
                            }
                        </Dropdown>
                        <Dropdown placement="bottomRight" class="ant-pro-global-header-index-action">
                            <span class='ant-pro-drop-down'>
                                <Icon type="global" title='图标' />
                            </span>
                            {
                                this.langs && (
                                    <template slot='overlay'>
                                        <Menu class={ ['menu', 'ant-pro-header-menu'] } selectedKeys={[this.currentLang]}>
                                            { this.langs.map(item => (
                                                <Menu.Item key={item.label} onClick={() => {
                                                    this.currentLang = item.label;
                                                    item.onClick && item.onClick();
                                                }}>
                                                    <span role="img" aria-label={item.label}>
                                                        {item.icon}
                                                    </span>{' '}
                                                    {item.label}
                                                </Menu.Item>
                                            )) }
                                        </Menu>
                                    </template>
                                )
                            }
                        </Dropdown>
                    </div>
                )
            } else {
                return (
                    <div class={wrpCls}>
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
        };
        props = Object.assign(this.settings, props);
        // @change="handleSettingChange" 
        return (
            <pro-layout {...{ props }} >
                <SettingDrawer settings={this.settings} />
                {this.$slots['rightContentRender'] || (<template slot='rightContentRender'>{this.renderDefRightContentRender()}</template>)}
                {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
                <router-view />
                {this.$slots['footerRender'] || (
                    <template slot="footerRender">
                        <GlobalFooter>
                            <template slot="links">
                                <span></span>
                            </template>
                            <template slot="copyright"><span>{this.copyright}</span></template>
                        </GlobalFooter>
                    </template>
                )}
            </pro-layout>
        )
    }
};

var ZkSelect = {
    name: 'ZkSelect',
    components:{
        Select
    },
    props: {
        value: {
            type: [String, Number, Boolean],
            default: null
        },

        options: {
            type: [Array, Function],
            default: () => []
        },

        disabled: {
            type: Boolean,
            default: false
        },

        placeholder: {
            type: [String, Object]
        }
    },
    data() {
        return {
            optionsData: []
        }
    },
    watch: {
        options(newVal, oldVal) {
            console.log('options变化');
            if (newVal instanceof Array) {
                console.log('options变化');
            }
        }
    },
    created() {
        if (this.options instanceof Array) {
            this.optionsData = this.options;
        } else {
            this.options().then((result) => {
                this.optionsData = result;
            });
        }
    },
    render() {
        const props = Object.keys(this.$props).reduce((res, key) => {
            res[key] = this[key];
            return res;
        }, {});
        delete props.option;
        props.options = this.optionsData;
        return (
            <a-select {...{ props }} onChange={(value, option) => this.$emit('input', value, option)}></a-select>
        )
    },
    methods: {
        refresh() {
            if (this.options instanceof Array) return Promise.resolve();
            return this.options().then((res) => {
                this.optionsData = res;
            });
        }
    }
};

export { index as ZkBasicLayout, ZkSelect };
