const Draggabilly = require('draggabilly');
// v-dialogDrag: 弹窗拖拽+水平方向伸缩+对角线拉伸
export default {
  bind(el,binding){
    let draggie = new Draggabilly( el, {
      containment: true
    });
  },
  inserted() {
  }
}
