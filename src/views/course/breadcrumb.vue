<template>
  <div v-if="model.program.name" class="row">
    <div class="col-md-12">
      <div class="breadcrumb-course">
        <span @click="gotToPrograms">{{ model.program.name }}</span>

        <span v-if="model.board.name">
          <span class="follow-icon"><i class="fa fa-chevron-right"></i></span>
          <span @click="updateWizard('wizard-step2')">{{
            model.board.name
          }}</span>
        </span>

        <span v-if="model.courseGroup.name">
          <span><i class="fa fa-chevron-right"></i></span>
          <span @click="updateWizard('wizard-step3')">{{
            model.courseGroup.name
          }}</span>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    model: null,
  },
  methods: {
    gotToPrograms() {
      this.$router.push({ name: "program" });
    },
    updateWizard(wizard) {
      this.$emit("onUpdateWizard", wizard);
    },
  },
};
</script>

<style>
</style>


