<template>
    <a-card :title="title" :bordered="false" class="zk zk-list" :body-style="bodyStyleVal">
        <div class="table-page-search-wrapper">
            <a-form layout="inline">
                <a-row :gutter="48">
                    <a-col v-bind="searchCol" v-for="(item,index) in searchsOpt" :key="item.dataIndex" v-show="(type==1&&index<2)||(type==0&&index<3)||advanced">
                        <slot v-if="item.scopedSlots" :name="item.scopedSlots.customRender" :item="item"></slot>
                        <a-form-item :label="item.title" v-if="!item.scopedSlots">
                            <a-input v-if="!item.type || item.type == InputTypeEnum.TEXT" v-model="item.value"/>
                            <a-input-number v-else-if="item.type == InputTypeEnum.NUMBER" v-model="item.value"  style="width: 100%"/>
                            <a-date-picker v-else-if="item.type == InputTypeEnum.DATE" v-model="item.value" style="width: 100%" :placeholder="item.placeholder||'请选择时间'" :show-time="false" :value-format="'YYYY-MM-DD'" :format="'YYYY-MM-DD'"/>
                            <a-date-picker v-else-if="item.type == InputTypeEnum.DATE_TIME" v-model="item.value" style="width: 100%" :placeholder="item.placeholder||'请选择时间'" :show-time="true" :value-format="'YYYY-MM-DD HH:mm:ss'" :format="'YYYY-MM-DD HH:mm:ss'"/>
                            <a-time-picker v-else-if="item.type == InputTypeEnum.TIME" v-model="item.value" style="width: 100%" :value-format="'HH:mm:ss'" :format="'HH:mm:ss'" :placeholder="item.placeholder||'请选择时间'"/>
                            <zk-select v-else-if="item.type == InputTypeEnum.SELECT" v-model="item.value" :placeholder="item.placeholder||'请选择...'" :options="item.options"></zk-select>
                        </a-form-item>
                    </a-col>
                    <a-col v-bind="searchBtns" v-if="searchsOpt.length>0">
                        <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                            <a-button type="primary" @click="refresh(true)">查询</a-button>
                            <a-button style="margin-left: 8px" @click="reset()">清空</a-button>
                            <a @click="toggleAdvanced" style="margin-left: 8px" v-if="searchsOpt.length>3">
                                {{ advanced ? '收起' : '展开' }}
                                <a-icon :type="advanced ? 'up' : 'down'" />
                            </a>
                        </span>
                    </a-col>
                </a-row>
            </a-form>
        </div>

        <div class="table-operator" v-if="$slots.operBtns">
            <slot name="operBtns"></slot>
        </div>
        <slot name="table"></slot>
        <s-table
            ref="table"
            name="zk-list-table"
            size="default"
            v-bind="$props"
            :showPagination="'auto'"
            :data="sourceData"
            v-if="useDefaultTable"
        >
           <template v-for="item in tableSlots" v-slot:[item.scopedSlots.customRender]="record">
                <slot :name="item.scopedSlots.customRender" v-bind="record"></slot>
           </template>
        </s-table>
    </a-card>
</template>

<script>
import { STable } from "@/components";
import { InputTypeEnum } from './enum';
import moment from 'moment';
import ZkSelect from './ZkSelect';
export default {
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
                },{})
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
            }else{
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
}
</script>