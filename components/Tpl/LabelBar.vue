<template lang="pug">
  .label-bar(
    class="flex flex-row items-center mx-2"
  )
    h2(
      class=""
    )
      slot(
        name="label"
      )
    .spacer(
      class="flex-grow"
    )
    .tools(
      class="flex flex-row items-center gap-4"
    )
      slot(
        name="tools"
      )
</template>
<styles lang="less">

</styles>
