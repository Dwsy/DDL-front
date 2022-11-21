<template>
  <div>
    1
    <img id="test" ref="test" src="" alt="" />
    2
  </div>
</template>

<script setup lang="ts">
import { getUploadPictureBase64AndAudit } from "~/composables/utils/picture";
import { onMounted, ref } from "vue";

const test = ref();
onMounted(async () => {
  const ImgBase64 = await getUploadPictureBase64AndAudit(
    "https://qiniu.dwsy.link/ddl/7b726f1d1ea14e8ab14e3b0ff5cae24e.jpg?imageslim"
  );
  if (ImgBase64) {
    test.value.src = ImgBase64;
  } else {
    test.value.src = "";
  }
  // test.value.src = ImgBase64
});
</script>

<style></style>
