import 'vue';
import ProLayout, { GlobalFooter } from '@ant-design-vue/pro-layout';
import { Icon, Menu, Dropdown } from 'ant-design-vue';

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

//

var script = {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
};

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
        createInjectorSSR = createInjector;
        createInjector = shadowMode;
        shadowMode = false;
    }
    // Vue.extend constructor export interop.
    const options = typeof script === 'function' ? script.options : script;
    // render functions
    if (template && template.render) {
        options.render = template.render;
        options.staticRenderFns = template.staticRenderFns;
        options._compiled = true;
        // functional template
        if (isFunctionalTemplate) {
            options.functional = true;
        }
    }
    // scopedId
    if (scopeId) {
        options._scopeId = scopeId;
    }
    let hook;
    if (moduleIdentifier) {
        // server build
        hook = function (context) {
            // 2.3 injection
            context =
                context || // cached call
                    (this.$vnode && this.$vnode.ssrContext) || // stateful
                    (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
            // 2.2 with runInNewContext: true
            if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                context = __VUE_SSR_CONTEXT__;
            }
            // inject component styles
            if (style) {
                style.call(this, createInjectorSSR(context));
            }
            // register component module identifier for async chunk inference
            if (context && context._registeredComponents) {
                context._registeredComponents.add(moduleIdentifier);
            }
        };
        // used by ssr in case component is cached and beforeCreate
        // never gets called
        options._ssrRegister = hook;
    }
    else if (style) {
        hook = shadowMode
            ? function (context) {
                style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
            }
            : function (context) {
                style.call(this, createInjector(context));
            };
    }
    if (hook) {
        if (options.functional) {
            // register for functional component in vue file
            const originalRender = options.render;
            options.render = function renderWithStyleInjection(h, context) {
                hook.call(context);
                return originalRender(h, context);
            };
        }
        else {
            // inject component registration as beforeCreate hook
            const existing = options.beforeCreate;
            options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
        }
    }
    return script;
}

/* script */
const __vue_script__ = script;

/* template */
var __vue_render__ = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("global-footer", {
    staticClass: "footer custom-render",
    scopedSlots: _vm._u([
      {
        key: "links",
        fn: function() {
          return [
            _c(
              "a",
              {
                attrs: {
                  href: "https://www.github.com/vueComponent/pro-layout",
                  target: "_blank"
                }
              },
              [_vm._v("Pro Layout")]
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                attrs: {
                  href:
                    "https://www.github.com/vueComponent/ant-design-vue-pro",
                  target: "_blank"
                }
              },
              [_vm._v("Github")]
            ),
            _vm._v(" "),
            _c(
              "a",
              {
                attrs: {
                  href: "https://www.github.com/sendya/",
                  target: "_blank"
                }
              },
              [_vm._v("@Sendya")]
            )
          ]
        },
        proxy: true
      },
      {
        key: "copyright",
        fn: function() {
          return [
            _c(
              "a",
              {
                attrs: {
                  href: "https://github.com/vueComponent",
                  target: "_blank"
                }
              },
              [_vm._v("vueComponent")]
            )
          ]
        },
        proxy: true
      }
    ])
  })
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = undefined;
  /* module identifier */
  const __vue_module_identifier__ = undefined;
  /* functional template */
  const __vue_is_functional_template__ = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__ = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
    __vue_inject_styles__,
    __vue_script__,
    __vue_scope_id__,
    __vue_is_functional_template__,
    __vue_module_identifier__,
    false,
    undefined,
    undefined,
    undefined
  );

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
};
var index = {
    name: 'ZkBasicLayout',
    components: {
        //   SettingDrawer,
        //   RightContent,
        GlobalFooter: __vue_component__,
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
                return (
                    <div class={ wrpCls }>
                        <Dropdown placement="bottomRight" class="ant-pro-global-header-index-action">
                            <span class="ant-pro-account-avatar">
                                <a-avatar size="small" src={this.currentUser.imgUrl} class="antd-pro-global-header-index-avatar" />
                                <span>{ this.currentUser.name }</span>
                            </span>
                            { 
                                this.currentUser.menus&& ( 
                                    <template slot='overlay'>
                                        <Menu class="ant-pro-drop-down menu head-right-content-dropdown" selected-keys={[]}>
                                            {
                                                this.currentUser.menus.map((item, index) => (
                                                    <Menu.Item key={index} onClick={() => item.onClick && item.onClick()}>
                                                        { item.icon && <Icon type={ item.icon } />}
                                                        { item.label }
                                                    </Menu.Item>
                                                ))
                                            }
                                        </Menu>
                                    </template>
                                )
                            }
                        </Dropdown>
                        <Dropdown placement="bottomRight">
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
        };
        props = Object.assign(this.settings, props);
        // 设置默认底部内容
        if (!this.$slots['footerRender']) ;
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


};

export { index as ZkBasicLayout };
