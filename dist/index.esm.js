import ProLayout, { SettingDrawer, GlobalFooter, PageHeaderWrapper } from '@ant-design-vue/pro-layout';
import { Icon, Menu, Dropdown, Select, Table, Col, Row } from 'ant-design-vue';

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

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the `TypeError` message for "Functions" methods. */
var FUNC_ERROR_TEXT = 'Expected a function';

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match property names within property paths. */
var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
    reIsPlainProp = /^\w*$/,
    reLeadingDot = /^\./,
    rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match backslashes in property paths. */
var reEscapeChar = /\\(\\)?/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Symbol = root.Symbol,
    splice = arrayProto.splice;

/* Built-in method references that are verified to be native. */
var Map = getNative(root, 'Map'),
    nativeCreate = getNative(Object, 'create');

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.get` without support for default values.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @returns {*} Returns the resolved value.
 */
function baseGet(object, path) {
  path = isKey(path, object) ? [path] : castPath(path);

  var index = 0,
      length = path.length;

  while (object != null && index < length) {
    object = object[toKey(path[index++])];
  }
  return (index && index == length) ? object : undefined;
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `value` to a path array if it's not one.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {Array} Returns the cast property path array.
 */
function castPath(value) {
  return isArray(value) ? value : stringToPath(value);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Checks if `value` is a property name and not a property path.
 *
 * @private
 * @param {*} value The value to check.
 * @param {Object} [object] The object to query keys on.
 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
 */
function isKey(value, object) {
  if (isArray(value)) {
    return false;
  }
  var type = typeof value;
  if (type == 'number' || type == 'symbol' || type == 'boolean' ||
      value == null || isSymbol(value)) {
    return true;
  }
  return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
    (object != null && value in Object(object));
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Converts `string` to a property path array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the property path array.
 */
var stringToPath = memoize(function(string) {
  string = toString(string);

  var result = [];
  if (reLeadingDot.test(string)) {
    result.push('');
  }
  string.replace(rePropName, function(match, number, quote, string) {
    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
  });
  return result;
});

/**
 * Converts `value` to a string key if it's not a string or symbol.
 *
 * @private
 * @param {*} value The value to inspect.
 * @returns {string|symbol} Returns the key.
 */
function toKey(value) {
  if (typeof value == 'string' || isSymbol(value)) {
    return value;
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Creates a function that memoizes the result of `func`. If `resolver` is
 * provided, it determines the cache key for storing the result based on the
 * arguments provided to the memoized function. By default, the first argument
 * provided to the memoized function is used as the map cache key. The `func`
 * is invoked with the `this` binding of the memoized function.
 *
 * **Note:** The cache is exposed as the `cache` property on the memoized
 * function. Its creation may be customized by replacing the `_.memoize.Cache`
 * constructor with one whose instances implement the
 * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
 * method interface of `delete`, `get`, `has`, and `set`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to have its output memoized.
 * @param {Function} [resolver] The function to resolve the cache key.
 * @returns {Function} Returns the new memoized function.
 * @example
 *
 * var object = { 'a': 1, 'b': 2 };
 * var other = { 'c': 3, 'd': 4 };
 *
 * var values = _.memoize(_.values);
 * values(object);
 * // => [1, 2]
 *
 * values(other);
 * // => [3, 4]
 *
 * object.a = 2;
 * values(object);
 * // => [1, 2]
 *
 * // Modify the result cache.
 * values.cache.set(object, ['a', 'b']);
 * values(object);
 * // => ['a', 'b']
 *
 * // Replace `_.memoize.Cache`.
 * _.memoize.Cache = WeakMap;
 */
function memoize(func, resolver) {
  if (typeof func != 'function' || (resolver && typeof resolver != 'function')) {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  var memoized = function() {
    var args = arguments,
        key = resolver ? resolver.apply(this, args) : args[0],
        cache = memoized.cache;

    if (cache.has(key)) {
      return cache.get(key);
    }
    var result = func.apply(this, args);
    memoized.cache = cache.set(key, result);
    return result;
  };
  memoized.cache = new (memoize.Cache || MapCache);
  return memoized;
}

// Assign cache to `_.memoize`.
memoize.Cache = MapCache;

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Gets the value at `path` of `object`. If the resolved value is
 * `undefined`, the `defaultValue` is returned in its place.
 *
 * @static
 * @memberOf _
 * @since 3.7.0
 * @category Object
 * @param {Object} object The object to query.
 * @param {Array|string} path The path of the property to get.
 * @param {*} [defaultValue] The value returned for `undefined` resolved values.
 * @returns {*} Returns the resolved value.
 * @example
 *
 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
 *
 * _.get(object, 'a[0].b.c');
 * // => 3
 *
 * _.get(object, ['a', '0', 'b', 'c']);
 * // => 3
 *
 * _.get(object, 'a.b.c', 'default');
 * // => 'default'
 */
function get(object, path, defaultValue) {
  var result = object == null ? undefined : baseGet(object, path);
  return result === undefined ? defaultValue : result;
}

var lodash_get = get;

var STable = {
  data () {
    return {
      needTotalList: [],

      selectedRows: [],
      selectedRowKeys: [],

      localLoading: false,
      localDataSource: [],
      localPagination: Object.assign({}, this.pagination)
    }
  },
  props: Object.assign({}, Table.props, {
    rowKey: {
      type: [String, Function],
      default: 'key'
    },
    data: {
      type: Function,
      required: true
    },
    pageNum: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    showSizeChanger: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: 'default'
    },
    /**
     * alert: {
     *   show: true,
     *   clear: Function
     * }
     */
    alert: {
      type: [Object, Boolean],
      default: null
    },
    rowSelection: {
      type: Object,
      default: null
    },
    /** @Deprecated */
    showAlertInfo: {
      type: Boolean,
      default: false
    },
    showPagination: {
      type: String | Boolean,
      default: 'auto'
    },
    /**
     * enable page URI mode
     *
     * e.g:
     * /users/1
     * /users/2
     * /users/3?queryParam=test
     * ...
     */
    pageURI: {
      type: Boolean,
      default: false
    }
  }),
  watch: {
    'localPagination.current' (val) {
      this.pageURI && this.$router.push({
        ...this.$route,
        name: this.$route.name,
        params: Object.assign({}, this.$route.params, {
          pageNo: val
        })
      });
      // change pagination, reset total data
      this.needTotalList = this.initTotalList(this.columns);
      this.selectedRowKeys = [];
      this.selectedRows = [];
    },
    pageNum (val) {
      Object.assign(this.localPagination, {
        current: val
      });
    },
    pageSize (val) {
      Object.assign(this.localPagination, {
        pageSize: val
      });
    },
    showSizeChanger (val) {
      Object.assign(this.localPagination, {
        showSizeChanger: val
      });
    }
  },
  created () {
    const { pageNo } = this.$route.params;
    const localPageNum = this.pageURI && (pageNo && parseInt(pageNo)) || this.pageNum;
    this.localPagination = ['auto', true].includes(this.showPagination) && Object.assign({}, this.localPagination, {
      current: localPageNum,
      pageSize: this.pageSize,
      showSizeChanger: this.showSizeChanger
    }) || false;
    this.needTotalList = this.initTotalList(this.columns);
    this.loadData();
  },
  methods: {
    /**
     * 表格重新加载方法
     * 如果参数为 true, 则强制刷新到第一页
     * @param Boolean bool
     */
    refresh (bool = false) {
      bool && (this.localPagination = Object.assign({}, {
        current: 1, pageSize: this.pageSize
      }));
      this.loadData();
    },
    /**
     * 加载数据方法
     * @param {Object} pagination 分页选项器
     * @param {Object} filters 过滤条件
     * @param {Object} sorter 排序条件
     */
    loadData (pagination, filters, sorter) {
      this.localLoading = true;
      const parameter = Object.assign({
        pageNo: (pagination && pagination.current) ||
          this.showPagination && this.localPagination.current || this.pageNum,
        pageSize: (pagination && pagination.pageSize) ||
          this.showPagination && this.localPagination.pageSize || this.pageSize
      },
      (sorter && sorter.field && {
        sortField: sorter.field
      }) || {},
      (sorter && sorter.order && {
        sortOrder: sorter.order
      }) || {}, {
        ...filters
      }
      );
      const result = this.data(parameter);
      // 对接自己的通用数据接口需要修改下方代码中的 r.pageNo, r.totalCount, r.data
      // eslint-disable-next-line
      if ((typeof result === 'object' || typeof result === 'function') && typeof result.then === 'function') {
        result.then(r => {
          this.localPagination = this.showPagination && Object.assign({}, this.localPagination, {
            current: r.pageNo, // 返回结果中的当前分页数
            total: r.totalCount, // 返回结果中的总记录数
            showSizeChanger: this.showSizeChanger,
            pageSize: (pagination && pagination.pageSize) ||
              this.localPagination.pageSize
          }) || false;
          // 为防止删除数据后导致页面当前页面数据长度为 0 ,自动翻页到上一页
          if (r.data.length === 0 && this.showPagination && this.localPagination.current > 1) {
            this.localPagination.current--;
            this.loadData();
            return
          }

          // 这里用于判断接口是否有返回 r.totalCount 且 this.showPagination = true 且 pageNo 和 pageSize 存在 且 totalCount 小于等于 pageNo * pageSize 的大小
          // 当情况满足时，表示数据不满足分页大小，关闭 table 分页功能
          try {
            if ((['auto', true].includes(this.showPagination) && r.totalCount <= (r.pageNo * this.localPagination.pageSize))) {
              this.localPagination.hideOnSinglePage = true;
            }
          } catch (e) {
            this.localPagination = false;
          }
          this.localDataSource = r.data; // 返回结果中的数组数据
          this.localLoading = false;
        });
      }
    },
    initTotalList (columns) {
      const totalList = [];
      columns && columns instanceof Array && columns.forEach(column => {
        if (column.needTotal) {
          totalList.push({
            ...column,
            total: 0
          });
        }
      });
      return totalList
    },
    /**
     * 用于更新已选中的列表数据 total 统计
     * @param selectedRowKeys
     * @param selectedRows
     */
    updateSelect (selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
      this.selectedRowKeys = selectedRowKeys;
      const list = this.needTotalList;
      this.needTotalList = list.map(item => {
        return {
          ...item,
          total: selectedRows.reduce((sum, val) => {
            const total = sum + parseInt(lodash_get(val, item.dataIndex));
            return isNaN(total) ? 0 : total
          }, 0)
        }
      });
    },
    /**
     * 清空 table 已选中项
     */
    clearSelected () {
      if (this.rowSelection) {
        this.rowSelection.onChange([], []);
        this.updateSelect([], []);
      }
    },
    /**
     * 处理交给 table 使用者去处理 clear 事件时，内部选中统计同时调用
     * @param callback
     * @returns {*}
     */
    renderClear (callback) {
      if (this.selectedRowKeys.length <= 0) return null
      return (
        <a style="margin-left: 24px" onClick={() => {
          callback();
          this.clearSelected();
        }}>清空</a>
      )
    },
    renderAlert () {
      // 绘制统计列数据
      const needTotalItems = this.needTotalList.map((item) => {
        return (<span style="margin-right: 12px">
          {item.title}总计 <a style="font-weight: 600">{!item.customRender ? item.total : item.customRender(item.total)}</a>
        </span>)
      });

      // 绘制 清空 按钮
      const clearItem = (typeof this.alert.clear === 'boolean' && this.alert.clear) ? (
        this.renderClear(this.clearSelected)
      ) : (this.alert !== null && typeof this.alert.clear === 'function') ? (
        this.renderClear(this.alert.clear)
      ) : null;

      // 绘制 alert 组件
      return (
        <a-alert showIcon={true} style="margin-bottom: 16px">
          <template slot="message">
            <span style="margin-right: 12px">已选择: <a style="font-weight: 600">{this.selectedRows.length}</a></span>
            {needTotalItems}
            {clearItem}
          </template>
        </a-alert>
      )
    }
  },

  render () {
    const props = {};
    const localKeys = Object.keys(this.$data);
    const showAlert = (typeof this.alert === 'object' && this.alert !== null && this.alert.show) && typeof this.rowSelection.selectedRowKeys !== 'undefined' || this.alert;

    Object.keys(Table.props).forEach(k => {
      const localKey = `local${k.substring(0, 1).toUpperCase()}${k.substring(1)}`;
      if (localKeys.includes(localKey)) {
        props[k] = this[localKey];
        return props[k]
      }
      if (k === 'rowSelection') {
        if (showAlert && this.rowSelection) {
          // 如果需要使用alert，则重新绑定 rowSelection 事件
          props[k] = {
            ...this.rowSelection,
            selectedRows: this.selectedRows,
            selectedRowKeys: this.selectedRowKeys,
            onChange: (selectedRowKeys, selectedRows) => {
              this.updateSelect(selectedRowKeys, selectedRows);
              typeof this[k].onChange !== 'undefined' && this[k].onChange(selectedRowKeys, selectedRows);
            }
          };
          return props[k]
        } else if (!this.rowSelection) {
          // 如果没打算开启 rowSelection 则清空默认的选择项
          props[k] = null;
          return props[k]
        }
      }
      this[k] && (props[k] = this[k]);
      return props[k]
    });
    const table = (
      <a-table {...{ props, scopedSlots: { ...this.$scopedSlots } }} onChange={this.loadData} onExpand={ (expanded, record) => { this.$emit('expand', expanded, record); } }>
        { Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>)) }
      </a-table>
    );

    return (
      <div class="table-wrapper">
        { showAlert ? this.renderAlert() : null }
        { table }
      </div>
    )
  }
};

var InputTypeEnum;
(function (InputTypeEnum) {
    InputTypeEnum[InputTypeEnum["TIME"] = 0] = "TIME";
    InputTypeEnum[InputTypeEnum["SWITCH"] = 1] = "SWITCH";
    InputTypeEnum[InputTypeEnum["DATE"] = 2] = "DATE";
    InputTypeEnum[InputTypeEnum["TEXT"] = 3] = "TEXT";
    InputTypeEnum[InputTypeEnum["DATE_TIME"] = 4] = "DATE_TIME";
    InputTypeEnum[InputTypeEnum["PERCENTAGE_SLIDER"] = 5] = "PERCENTAGE_SLIDER";
    InputTypeEnum[InputTypeEnum["SELECT"] = 6] = "SELECT";
    InputTypeEnum[InputTypeEnum["CHECKBOX"] = 7] = "CHECKBOX";
    InputTypeEnum[InputTypeEnum["FILE"] = 8] = "FILE";
    InputTypeEnum[InputTypeEnum["IMAGE"] = 9] = "IMAGE";
    InputTypeEnum[InputTypeEnum["PASSWORD"] = 10] = "PASSWORD";
    InputTypeEnum[InputTypeEnum["RADIO"] = 11] = "RADIO";
    InputTypeEnum[InputTypeEnum["RESET"] = 12] = "RESET";
    InputTypeEnum[InputTypeEnum["SUBMIT"] = 13] = "SUBMIT";
    InputTypeEnum[InputTypeEnum["NUMBER"] = 14] = "NUMBER";
})(InputTypeEnum || (InputTypeEnum = {}));

//
var script = {
    name: "ZkList",
    components: {
        STable,
        ZkSelect
    },
    props:Object.assign({},STable.props,{
        /** 列表类型 0. 普通 1. min 型 */
        type:{
            type:Number,
            default:0
        },
        title:{
            type:String,
            default:null
        },
        searchs: {
            type: Array,
            default: ()=>[]
        },
        data: {
            type: Function,
            required: false
        }
    }),
    created(){
       this.createSearchsOpt();
    },
    data() {
        return {
            InputTypeEnum,
            // 高级搜索 展开/关闭
            advanced: false,
            val:null,
            sourceData:(parameter)=>{
                const queryParams = this.searchsOpt.reduce((res,item)=>{
                    if (typeof item.value !== "undefined") res[item.dataIndex] = item.value;
                    return res;
                },{});
                // queryParams.val = this.val;
                return this.data(queryParams,parameter);
            },
            /** 是否使用默认表格,未传入表格则使用默认的 */
            useDefaultTable:!this.$slots.table,
            /** 搜索选项配置 */
            searchsOpt:[],
            /** 搜索默认值 */
            searchsDefaultVal:{}
        }
    },
    computed: {
        tableSlots(){
            return this.columns.filter(item=>item.scopedSlots&&item.scopedSlots.customRender)
        },
        bodyStyleVal(){
            if (this.type == 1) {
                return {
                    padding:0
                }
            }else {
                return {}
            }
        },
        searchCol(){
            return {
                md:this.type==1?8:6,
                sm:24
            }
        },
        searchBtns(){
            return {
                md:!this.advanced && this.searchCol.md || 24,
                sm: 24
            }
        }
    },
    methods: {
        toggleAdvanced() {
            this.advanced = !this.advanced;
        },
        createSearchsOpt(){
            this.searchsOpt = this.searchs.map(item=>{
                this.searchsDefaultVal[item.dataIndex] = item.value||null; 
                return {
                    title:item.title,
                    dataIndex : item.dataIndex,
                    type:item.type,
                    options:item.options,
                    value:item.value||null,
                    placeholder:null
                };
            });
        },
        refresh(params){
            // params
            this.$refs.table.refresh(params);
        },
        reset(){
            this.searchsOpt.forEach(item => {
                item.value = this.searchsDefaultVal[item.dataIndex];
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
  return _c(
    "a-card",
    {
      staticClass: "zk zk-list",
      attrs: {
        title: _vm.title,
        bordered: false,
        "body-style": _vm.bodyStyleVal
      }
    },
    [
      _c(
        "div",
        { staticClass: "table-page-search-wrapper" },
        [
          _c(
            "a-form",
            { attrs: { layout: "inline" } },
            [
              _c(
                "a-row",
                { attrs: { gutter: 48 } },
                [
                  _vm._l(_vm.searchsOpt, function(item, index) {
                    return _c(
                      "a-col",
                      _vm._b(
                        {
                          directives: [
                            {
                              name: "show",
                              rawName: "v-show",
                              value:
                                (_vm.type == 1 && index < 2) ||
                                (_vm.type == 0 && index < 3) ||
                                _vm.advanced,
                              expression:
                                "(type==1&&index<2)||(type==0&&index<3)||advanced"
                            }
                          ],
                          key: item.dataIndex
                        },
                        "a-col",
                        _vm.searchCol,
                        false
                      ),
                      [
                        item.scopedSlots
                          ? _vm._t(item.scopedSlots.customRender, null, {
                              item: item
                            })
                          : _vm._e(),
                        _vm._v(" "),
                        !item.scopedSlots
                          ? _c(
                              "a-form-item",
                              { attrs: { label: item.title } },
                              [
                                !item.type ||
                                item.type == _vm.InputTypeEnum.TEXT
                                  ? _c("a-input", {
                                      model: {
                                        value: item.value,
                                        callback: function($$v) {
                                          _vm.$set(item, "value", $$v);
                                        },
                                        expression: "item.value"
                                      }
                                    })
                                  : item.type == _vm.InputTypeEnum.NUMBER
                                  ? _c("a-input-number", {
                                      staticStyle: { width: "100%" },
                                      model: {
                                        value: item.value,
                                        callback: function($$v) {
                                          _vm.$set(item, "value", $$v);
                                        },
                                        expression: "item.value"
                                      }
                                    })
                                  : item.type == _vm.InputTypeEnum.DATE
                                  ? _c("a-date-picker", {
                                      staticStyle: { width: "100%" },
                                      attrs: {
                                        placeholder:
                                          item.placeholder || "请选择时间",
                                        "show-time": false,
                                        "value-format": "YYYY-MM-DD",
                                        format: "YYYY-MM-DD"
                                      },
                                      model: {
                                        value: item.value,
                                        callback: function($$v) {
                                          _vm.$set(item, "value", $$v);
                                        },
                                        expression: "item.value"
                                      }
                                    })
                                  : item.type == _vm.InputTypeEnum.DATE_TIME
                                  ? _c("a-date-picker", {
                                      staticStyle: { width: "100%" },
                                      attrs: {
                                        placeholder:
                                          item.placeholder || "请选择时间",
                                        "show-time": true,
                                        "value-format": "YYYY-MM-DD HH:mm:ss",
                                        format: "YYYY-MM-DD HH:mm:ss"
                                      },
                                      model: {
                                        value: item.value,
                                        callback: function($$v) {
                                          _vm.$set(item, "value", $$v);
                                        },
                                        expression: "item.value"
                                      }
                                    })
                                  : item.type == _vm.InputTypeEnum.TIME
                                  ? _c("a-time-picker", {
                                      staticStyle: { width: "100%" },
                                      attrs: {
                                        "value-format": "HH:mm:ss",
                                        format: "HH:mm:ss",
                                        placeholder:
                                          item.placeholder || "请选择时间"
                                      },
                                      model: {
                                        value: item.value,
                                        callback: function($$v) {
                                          _vm.$set(item, "value", $$v);
                                        },
                                        expression: "item.value"
                                      }
                                    })
                                  : item.type == _vm.InputTypeEnum.SELECT
                                  ? _c("zk-select", {
                                      attrs: {
                                        placeholder:
                                          item.placeholder || "请选择...",
                                        options: item.options
                                      },
                                      model: {
                                        value: item.value,
                                        callback: function($$v) {
                                          _vm.$set(item, "value", $$v);
                                        },
                                        expression: "item.value"
                                      }
                                    })
                                  : _vm._e()
                              ],
                              1
                            )
                          : _vm._e()
                      ],
                      2
                    )
                  }),
                  _vm._v(" "),
                  _vm.searchsOpt.length > 0
                    ? _c("a-col", _vm._b({}, "a-col", _vm.searchBtns, false), [
                        _c(
                          "span",
                          {
                            staticClass: "table-page-search-submitButtons",
                            style:
                              (_vm.advanced && {
                                float: "right",
                                overflow: "hidden"
                              }) ||
                              {}
                          },
                          [
                            _c(
                              "a-button",
                              {
                                attrs: { type: "primary" },
                                on: {
                                  click: function($event) {
                                    return _vm.refresh(true)
                                  }
                                }
                              },
                              [_vm._v("查询")]
                            ),
                            _vm._v(" "),
                            _c(
                              "a-button",
                              {
                                staticStyle: { "margin-left": "8px" },
                                on: {
                                  click: function($event) {
                                    return _vm.reset()
                                  }
                                }
                              },
                              [_vm._v("清空")]
                            ),
                            _vm._v(" "),
                            _vm.searchsOpt.length > 3
                              ? _c(
                                  "a",
                                  {
                                    staticStyle: { "margin-left": "8px" },
                                    on: { click: _vm.toggleAdvanced }
                                  },
                                  [
                                    _vm._v(
                                      "\n                            " +
                                        _vm._s(_vm.advanced ? "收起" : "展开") +
                                        "\n                            "
                                    ),
                                    _c("a-icon", {
                                      attrs: {
                                        type: _vm.advanced ? "up" : "down"
                                      }
                                    })
                                  ],
                                  1
                                )
                              : _vm._e()
                          ],
                          1
                        )
                      ])
                    : _vm._e()
                ],
                2
              )
            ],
            1
          )
        ],
        1
      ),
      _vm._v(" "),
      _vm.$slots.operBtns
        ? _c("div", { staticClass: "table-operator" }, [_vm._t("operBtns")], 2)
        : _vm._e(),
      _vm._v(" "),
      _vm._t("table"),
      _vm._v(" "),
      _vm.useDefaultTable
        ? _c(
            "s-table",
            _vm._b(
              {
                ref: "table",
                attrs: {
                  name: "zk-list-table",
                  size: "default",
                  showPagination: "auto",
                  data: _vm.sourceData
                },
                scopedSlots: _vm._u(
                  [
                    _vm._l(_vm.tableSlots, function(item) {
                      return {
                        key: item.scopedSlots.customRender,
                        fn: function(record) {
                          return [
                            _vm._t(
                              item.scopedSlots.customRender,
                              null,
                              null,
                              record
                            )
                          ]
                        }
                      }
                    })
                  ],
                  null,
                  true
                )
              },
              "s-table",
              _vm.$props,
              false
            )
          )
        : _vm._e()
    ],
    2
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

//
//
//

var script$1 = {
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

/* script */
const __vue_script__$1 = script$1;

/* template */
var __vue_render__$1 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "a",
    _vm._g(
      {
        attrs: {
          href: "javascript:;",
          "zk-btn": "",
          "zk-btn-disabled": _vm.disabled
        }
      },
      _vm.listeners
    ),
    [_vm._t("default")],
    2
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

//
//
//
//
//
//
//
//
//

// import Modal from 'ant-design-vue/es/modal/Modal';
const sizeMaping = {
    xs: 320,
    sm: 480,
    md: 640,
    lg: 800,
    xl: 960,
    xxl: 1280
};
var script$2 = {
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
        };
        const btns = [];
        const hasOk = this.$listeners.ok ? true : false;
        btns.push(<a-button style={{ marginRight: '8px' }} onClick={() => this.$emit('cancel')}>{hasOk ? '取消' : '关闭'}</a-button>);
        if (hasOk) {
            btns.push(<a-button type="primary" onClick={ handleOk }>{ this.okText }</a-button>);
        }
        if (props.width >= sizeMaping['lg']) {
            //   <a-spin spinning={this.loading}>
            //             {Object.keys(this.$slots).map(name => (<template slot={name}>{this.$slots[name]}</template>))}
            //         </a-spin>
            props.headerStyle = {
                //  height:'100%',
            };
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
};

/* script */
const __vue_script__$2 = script$2;
/* template */

  /* style */
  const __vue_inject_styles__$2 = undefined;
  /* scoped */
  const __vue_scope_id__$2 = undefined;
  /* module identifier */
  const __vue_module_identifier__$2 = undefined;
  /* functional template */
  const __vue_is_functional_template__$2 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$2 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$2,
    __vue_script__$2,
    __vue_scope_id__$2,
    __vue_is_functional_template__$2,
    __vue_module_identifier__$2,
    false,
    undefined,
    undefined,
    undefined
  );

//

const Item = {
  name: 'DetailListItem',
  props: {
    term: {
      type: String,
      default: '',
      required: false
    },
    labelCol:{
      type: Object,
      default:()=> ({ span:5 }),
      required: false
    },
    contentCol:{
      type: Object,
      default:function(){
       return {
         span:24-this.labelCol.span
       }
      },
      required: false
    }
  },
  inject: {
    col: {
      type: Number
    }
  },
  render () {
    let termStyleObj = {};
    if (this.labelCol.span==0) {
      termStyleObj.display="none";
    }
    return (
      <Col {...{ props: responsive[this.col] }}>
        <Row>
          <Col class="term" {...{ 
            props: this.labelCol,
            style:termStyleObj
          }}>{this.$props.term}</Col>
          <Col class="content-tag" {...{ props: this.contentCol }}>{this.$slots.default}</Col>
        </Row>
      </Col>
    )
  }
};
        // <Row>

const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
};

var script$3 = {
  name: 'DetailList',
  Item: Item,
  components: {
    Col,
    Row
  },
  props: {
    title: {
      type: String,
      default: '',
      required: false
    },
    col: {
      type: Number,
      required: false,
      default: 3
    },
    size: {
      type: String,
      required: false,
      default: 'large'
    },
    layout: {
      type: String,
      required: false,
      default: 'horizontal'
    }
  },
  provide () {
    return {
      col: this.col > 4 ? 4 : this.col
    }
  }
};

/* script */
const __vue_script__$3 = script$3;
/* template */
var __vue_render__$2 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c(
    "div",
    {
      class: [
        "desc-list",
        _vm.size,
        _vm.layout === "vertical" ? "vertical" : "horizontal"
      ]
    },
    [
      _vm.title
        ? _c("div", { staticClass: "title" }, [_vm._v(_vm._s(_vm.title))])
        : _vm._e(),
      _vm._v(" "),
      _c("a-row", [_vm._t("default")], 2)
    ],
    1
  )
};
var __vue_staticRenderFns__$2 = [];
__vue_render__$2._withStripped = true;

  /* style */
  const __vue_inject_styles__$3 = undefined;
  /* scoped */
  const __vue_scope_id__$3 = undefined;
  /* module identifier */
  const __vue_module_identifier__$3 = undefined;
  /* functional template */
  const __vue_is_functional_template__$3 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$3 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$2, staticRenderFns: __vue_staticRenderFns__$2 },
    __vue_inject_styles__$3,
    __vue_script__$3,
    __vue_scope_id__$3,
    __vue_is_functional_template__$3,
    __vue_module_identifier__$3,
    false,
    undefined,
    undefined,
    undefined
  );

const ZkDescList = __vue_component__$3;
const ZkDescItem = __vue_component__$3.Item;

//
//
//
//
//
//


var script$4 = {
  name: 'BlankLayout'
};

/* script */
const __vue_script__$4 = script$4;
/* template */
var __vue_render__$3 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("div", [_c("router-view")], 1)
};
var __vue_staticRenderFns__$3 = [];
__vue_render__$3._withStripped = true;

  /* style */
  const __vue_inject_styles__$4 = undefined;
  /* scoped */
  const __vue_scope_id__$4 = "data-v-8f64d25e";
  /* module identifier */
  const __vue_module_identifier__$4 = undefined;
  /* functional template */
  const __vue_is_functional_template__$4 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$4 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$3, staticRenderFns: __vue_staticRenderFns__$3 },
    __vue_inject_styles__$4,
    __vue_script__$4,
    __vue_scope_id__$4,
    __vue_is_functional_template__$4,
    __vue_module_identifier__$4,
    false,
    undefined,
    undefined,
    undefined
  );

//
var script$5 = {
  name: 'PageView',
  components:{
    PageHeaderWrapper
  }
};

/* script */
const __vue_script__$5 = script$5;

/* template */
var __vue_render__$4 = function() {
  var _vm = this;
  var _h = _vm.$createElement;
  var _c = _vm._self._c || _h;
  return _c("page-header-wrapper", [_c("router-view")], 1)
};
var __vue_staticRenderFns__$4 = [];
__vue_render__$4._withStripped = true;

  /* style */
  const __vue_inject_styles__$5 = undefined;
  /* scoped */
  const __vue_scope_id__$5 = undefined;
  /* module identifier */
  const __vue_module_identifier__$5 = undefined;
  /* functional template */
  const __vue_is_functional_template__$5 = false;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$5 = /*#__PURE__*/normalizeComponent(
    { render: __vue_render__$4, staticRenderFns: __vue_staticRenderFns__$4 },
    __vue_inject_styles__$5,
    __vue_script__$5,
    __vue_scope_id__$5,
    __vue_is_functional_template__$5,
    __vue_module_identifier__$5,
    false,
    undefined,
    undefined,
    undefined
  );

var script$6 = {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  },
  render () {
    const { $route: { meta }, $store: { getters } } = this;
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    );
    const notKeep = (
      <router-view />
    );
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
    if (!getters.multiTab && !meta.keepAlive) {
      return notKeep
    }
    return this.keepAlive || getters.multiTab || meta.keepAlive ? inKeep : notKeep
  }
};

/* script */
const __vue_script__$6 = script$6;

/* template */

  /* style */
  const __vue_inject_styles__$6 = undefined;
  /* scoped */
  const __vue_scope_id__$6 = undefined;
  /* module identifier */
  const __vue_module_identifier__$6 = undefined;
  /* functional template */
  const __vue_is_functional_template__$6 = undefined;
  /* style inject */
  
  /* style inject SSR */
  
  /* style inject shadow dom */
  

  
  const __vue_component__$6 = /*#__PURE__*/normalizeComponent(
    {},
    __vue_inject_styles__$6,
    __vue_script__$6,
    __vue_scope_id__$6,
    __vue_is_functional_template__$6,
    __vue_module_identifier__$6,
    false,
    undefined,
    undefined,
    undefined
  );

export { __vue_component__$4 as BlankLayout, InputTypeEnum, __vue_component__$5 as PageView, __vue_component__$6 as RouteView, index as ZkBasicLayout, __vue_component__$1 as ZkBtn, ZkDescItem, ZkDescList, __vue_component__ as ZkList, __vue_component__$2 as ZkModal, ZkSelect };
