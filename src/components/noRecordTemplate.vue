<template>
  <div class="generic-box">
    <div class="generic-box-content text-center">
      <div class="no-record-found">
        <i v-if="showAvatar == 'true'" class="fal fa-frown no-record-icon"></i>
        <template v-if="message">{{ message }}</template>
        <template v-else>No record found</template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["message", "showAvatar"]
};
</script>

<style scoped>
.no-record-found{
  padding-bottom : 20px;
}
</style>
