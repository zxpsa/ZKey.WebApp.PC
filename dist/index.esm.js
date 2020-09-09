import { SettingDrawer, updateTheme } from '@ant-design-vue/pro-layout';
import { i18nRender } from '@/locales';
import 'vuex';
import { SIDEBAR_TYPE, TOGGLE_MOBILE_TYPE } from '@/store/mutation-types';
import defaultSettings from '@/config/defaultSettings';
import RightContent from '@/components/GlobalHeader/RightContent';
import GlobalFooter from '@/components/GlobalFooter';

//

var script = {
    name: 'BasicLayout',
    components: {
        SettingDrawer,
        RightContent,
        GlobalFooter
    },
    data() {
        return {
            // base
            menus: [],
            // 侧栏收起状态
            collapsed: false,
            title: defaultSettings.title,
            settings: {
                // 布局类型
                layout: defaultSettings.layout, // 'sidemenu', 'topmenu'
                // 定宽: true / 流式: false
                contentWidth: defaultSettings.layout === 'sidemenu' ? false : defaultSettings.contentWidth === 'Fixed',
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
        // ...mapState({
        //   // 动态主路由
        //   mainMenu: state => state.permission.addRouters
        // })
        mainMenu: [
            {
                key: '',
                name: 'index',
                path: '',
                component: 'BasicLayout',
                redirect: '/dashboard',
                meta: {
                    title: '首页'
                },
                children: [{
                    name: 'index1',
                    path: '/dashboard',
                    // component: BasicLayout,
                    redirect: '/dashboard',
                    meta: {
                        title: '首页1'
                    },
                }]
            }
        ]
    },
    created() {
        const routes = this.mainMenu.find(item => item.path === '/');
        this.menus = (routes && routes.children) || [];
        // 处理侧栏收起状态
        this.$watch('collapsed', () => {
            this.$store.commit(SIDEBAR_TYPE, this.collapsed);
        });
        this.$watch('isMobile', () => {
            this.$store.commit(TOGGLE_MOBILE_TYPE, this.isMobile);
        });
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
        if (process.env.NODE_ENV !== 'production' || process.env.VUE_APP_PREVIEW === 'true') {
            updateTheme(this.settings.primaryColor);
        }
    },
    methods: {
        i18nRender,
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
            // return <LogoSvg />
            return 'a'
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
  return _c(
    "pro-layout",
    _vm._b(
      {
        attrs: {
          title: _vm.title,
          menus: _vm.menus,
          collapsed: _vm.collapsed,
          mediaQuery: _vm.query,
          isMobile: _vm.isMobile,
          handleMediaQuery: _vm.handleMediaQuery,
          handleCollapse: _vm.handleCollapse,
          logo: _vm.logoRender,
          i18nRender: _vm.i18nRender
        },
        scopedSlots: _vm._u([
          {
            key: "rightContentRender",
            fn: function() {
              return [
                _c("right-content", {
                  attrs: {
                    "top-menu": _vm.settings.layout === "topmenu",
                    "is-mobile": _vm.isMobile,
                    theme: _vm.settings.theme
                  }
                })
              ]
            },
            proxy: true
          },
          {
            key: "footerRender",
            fn: function() {
              return [_c("global-footer")]
            },
            proxy: true
          }
        ])
      },
      "pro-layout",
      _vm.settings,
      false
    ),
    [
      _c("setting-drawer", {
        attrs: { settings: _vm.settings },
        on: { change: _vm.handleSettingChange }
      }),
      _vm._v(" "),
      _vm._v(" "),
      _vm._v(" "),
      _c("router-view")
    ],
    1
  )
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

export { __vue_component__ as ZkBasicLayout };
