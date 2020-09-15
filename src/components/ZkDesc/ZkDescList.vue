<template>
  <div :class="['desc-list', size, layout === 'vertical' ? 'vertical': 'horizontal']">
    <div v-if="title" class="title">{{ title }}</div>
    <a-row>
      <slot></slot>
    </a-row>
  </div>
</template>

<script>
import { Col,Row } from 'ant-design-vue'

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
}
        // <Row>

const responsive = {
  1: { xs: 24 },
  2: { xs: 24, sm: 12 },
  3: { xs: 24, sm: 12, md: 8 },
  4: { xs: 24, sm: 12, md: 6 }
}

export default {
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
}
</script>

<style lang="scss">

  .desc-list {

    .title {
      color: rgba(0,0,0,.85);
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 16px;
    }

    .term {
      color: rgba(0,0,0,.85);
      display: table-cell;
      line-height: 20px;
      vertical-align: middle;
      // margin-right: 8px;
      padding-bottom: 16px;
      white-space: nowrap;
      text-align: right;
      &:not(:empty):after {
        content: ":";
        margin: 0 8px 0 2px;
        position: relative;
        top: -.5px;
      }
    }

    .content-tag {
      color: rgba(0,0,0,.65);
      display: table-cell;
      min-height: 22px;
      line-height: 22px;
      padding-bottom: 16px;
      margin-top: 0;
      // width: 100%;
      &:empty {
        content: ' ';
        height: 38px;
        padding-bottom: 16px;
      }
    }

    &.small {

      .title {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        font-weight: normal;
        margin-bottom: 12px;
      }
      .term, .content-tag {
        padding-bottom: 8px;
      }
    }

    &.large {
      .term, .content-tag {
        padding-bottom: 16px;
      }

      .title {
        font-size: 16px;
      }
    }

    &.vertical {
      .term {
        padding-bottom: 8px;
      }
      .term, .content-tag {
        display: block;
      }
    }
  }
</style>
