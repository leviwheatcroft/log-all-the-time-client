<template lang="pug">
  .item-selected(
    class="rounded m-1 p-1 pl-2 h-8 flex-shrink min-w-0 flex flex-row items-center"
    :style="{ backgroundColor: asRgb(item.name) }"
  )
    span.name(
      class="overflow-hidden overflow-ellipsis whitespace-nowrap flex-shrink"
    ) {{ item.name }}
    icon(
      v-if="clickItemRemove"
      extraClasses="cursor-pointer w-4 h-4 mr-1"
      name="x"
      @click="clickItemRemove(item)"
    )
</template>
<script>
import {
  asRgb
} from '../../../lib/colors'

const ItemSelected = {
  data () {
    return {}
  },
  props: {
    item: {
      type: Object
    },
    clickItemRemove: {
      type: Function
    }
  },
  methods: {
    asRgb
  }
}

export default ItemSelected
</script>
<style scoped lang="less">
/deep/ svg.icon {
  top: -0.0675rem;
}
</style>
