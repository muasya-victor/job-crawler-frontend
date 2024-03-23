<template>
  <div class="flex flex-row gap-2 items-center w-full  justify-center">
    <loading class="h-4 w-4 animate-spin"></loading>
    <p>{{custom_text}} ...</p>
  </div>
</template>

<script>
import { Loading } from "@element-plus/icons-vue"

export default {
  name: "BaseLoader",
  components: { Loading },
  props : {
    custom_text: {
      type: String,
      default: 'Give it a moment'
    }
  }
};
</script>

<style scoped></style>
