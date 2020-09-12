import { Select } from 'ant-design-vue'; 

export default {
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
}