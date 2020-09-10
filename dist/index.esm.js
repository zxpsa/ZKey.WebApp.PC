import 'vue';
import ProLayout from '@ant-design-vue/pro-layout';
import { Modal } from 'ant-design-vue';
import { i18nRender } from '@/locales';
import i18nMixin from '@/store/i18n-mixin';

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
  name: 'AvatarDropdown',
  props: {
    currentUser: {
      type: Object,
      default: () => null
    },
    menu: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    handleToCenter () {
      this.$router.push({ path: '/account/center' });
    },
    handleToSettings () {
      this.$router.push({ path: '/account/settings' });
    },
    handleLogout (e) {
      Modal.confirm({
        title: this.$t('layouts.usermenu.dialog.title'),
        content: this.$t('layouts.usermenu.dialog.content'),
        onOk: () => {
          // return new Promise((resolve, reject) => {
          //   setTimeout(Math.random() > 0.5 ? resolve : reject, 1500)
          // }).catch(() => console.log('Oops errors!'))
          return this.$store.dispatch('Logout').then(() => {
            this.$router.push({ name: 'login' });
          })
        },
        onCancel () {}
      });
    }
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
  return _vm.currentUser && _vm.currentUser.name
    ? _c(
        "a-dropdown",
        {
          attrs: { placement: "bottomRight" },
          scopedSlots: _vm._u(
            [
              {
                key: "overlay",
                fn: function() {
                  return [
                    _c(
                      "a-menu",
                      {
                        staticClass: "ant-pro-drop-down menu",
                        attrs: { "selected-keys": [] }
                      },
                      [
                        _vm.menu
                          ? _c(
                              "a-menu-item",
                              {
                                key: "center",
                                on: { click: _vm.handleToCenter }
                              },
                              [
                                _c("a-icon", { attrs: { type: "user" } }),
                                _vm._v("\n        个人中心\n      ")
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.menu
                          ? _c(
                              "a-menu-item",
                              {
                                key: "settings",
                                on: { click: _vm.handleToSettings }
                              },
                              [
                                _c("a-icon", { attrs: { type: "setting" } }),
                                _vm._v("\n        个人设置\n      ")
                              ],
                              1
                            )
                          : _vm._e(),
                        _vm._v(" "),
                        _vm.menu ? _c("a-menu-divider") : _vm._e(),
                        _vm._v(" "),
                        _c(
                          "a-menu-item",
                          { key: "logout", on: { click: _vm.handleLogout } },
                          [
                            _c("a-icon", { attrs: { type: "logout" } }),
                            _vm._v("\n        退出登录\n      ")
                          ],
                          1
                        )
                      ],
                      1
                    )
                  ]
                },
                proxy: true
              }
            ],
            null,
            false,
            2101302817
          )
        },
        [
          _c(
            "span",
            { staticClass: "ant-pro-account-avatar" },
            [
              _c("a-avatar", {
                staticClass: "antd-pro-global-header-index-avatar",
                attrs: {
                  size: "small",
                  src:
                    "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
                }
              }),
              _vm._v(" "),
              _c("span", [_vm._v(_vm._s(_vm.currentUser.name))])
            ],
            1
          )
        ]
      )
    : _c(
        "span",
        [
          _c("a-spin", {
            style: { marginLeft: 8, marginRight: 8 },
            attrs: { size: "small" }
          })
        ],
        1
      )
};
var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;

  /* style */
  const __vue_inject_styles__ = undefined;
  /* scoped */
  const __vue_scope_id__ = "data-v-2f149ef2";
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

const locales = ['zh-CN', 'zh-TW', 'en-US', 'pt-BR'];
const languageLabels = {
  'zh-CN': '简体中文',
  'zh-TW': '繁体中文',
  'en-US': 'English',
  'pt-BR': 'Português'
};
// eslint-disable-next-line
const languageIcons = {
  'zh-CN': '🇨🇳',
  'zh-TW': '🇭🇰',
  'en-US': '🇺🇸',
  'pt-BR': '🇧🇷'
};

const SelectLang = {
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-drop-down'
    }
  },
  name: 'SelectLang',
  mixins: [i18nMixin],
  render () {
    const { prefixCls } = this;
    const changeLang = ({ key }) => {
      this.setLang(key);
    };
    const langMenu = (
      <Menu class={['menu', 'ant-pro-header-menu']} selectedKeys={[this.currentLang]} onClick={changeLang}>
        {locales.map(locale => (
          <Menu.Item key={locale}>
            <span role="img" aria-label={languageLabels[locale]}>
              {languageIcons[locale]}
            </span>{' '}
            {languageLabels[locale]}
          </Menu.Item>
        ))}
      </Menu>
    );
    return (
      <Dropdown overlay={langMenu} placement="bottomRight">
        <span class={prefixCls}>
          <Icon type="global" title={i18nRender('navBar.lang')} />
        </span>
      </Dropdown>
    )
  }
};

//

var script$1 = {
  name: 'RightContent',
  components: {
    AvatarDropdown: __vue_component__,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {}
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.currentUser = {
        name: 'Serati Ma'
      };
    }, 1500);
  }
};

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    { class: _vm.wrpCls },
    [
      _c("avatar-dropdown", {
        class: _vm.prefixCls,
        attrs: { menu: _vm.showMenu, "current-user": _vm.currentUser }
      }),
      _vm._v(" "),
      _c("select-lang", { class: _vm.prefixCls })
    ],
    1
  )
};
var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;

  /* style */
  const __vue_inject_styles__$1 = undefined;
  /* scoped */
  const __vue_scope_id__$1 = undefined;
  /* module identifier */
  const __vue_module_identifier__$1 = undefined;
  /* functional template */
  const __vue_is_functional_template__$1 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$1 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$1, staticRenderFns: __vue_staticRenderFns__$1 },
    __vue_inject_styles__$1,
    __vue_script__$1,
    __vue_scope_id__$1,
    __vue_is_functional_template__$1,
    __vue_module_identifier__$1,
    false,
    undefined,
    undefined,
    undefined
  );

// import { i18nRender } from '@/locales'
const props = {
    /** 导航菜单 */
    navMenus:{
        type:Array,
        default:()=>[]
    }
};
var index = {
    name: 'ZkBasicLayout',
    components: {
        //   SettingDrawer,
          RightContent: __vue_component__$1,
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
        props = Object.assign(this.settings,props);
        
        // 设置默认右侧内容
        if (!this.$slots['rightContentRender']) {
            this.$slots.rightContentRender = (
                <right-content top-menu={this.settings.layout === 'topmenu'} is-mobile={this.isMobile} theme={this.settings.theme} />
            );
        }
        // 设置默认底部内容
        if (!this.$slots['footerRender']) {
            this.$slots.rightContentRender = (
                <global-footer />
            );
        }
        return (
            <pro-layout {...{ props }} >
                {/* <setting-drawer :settings="settings" @change="handleSettingChange" /> */}
                {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
                <router-view />
            </pro-layout>
        )
    }
};

export { index as ZkBasicLayout };
