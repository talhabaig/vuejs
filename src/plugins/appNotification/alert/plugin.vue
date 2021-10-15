<template>
  <div>
    <b-alert
      v-if="this.model.Message !== undefined"
      class="message-box-app"
      :show="dismissCountDown"
      dismissible
      :variant="this.model.Type"
      @dismissed="dismissCountDown = 0"
      @dismiss-count-down="countDownChanged"
    >
      <h4>
        <i :class="messageIcon"></i>
        {{ messageHeading }}
      </h4>
      <div v-html="this.model.Message"></div>
    </b-alert>
  </div>
</template>
<script>
import { appNotification } from "../../../store/keys";
import { AlertTypeEnum } from "./constants";
import AlertModel from "../../../models/app/alertModel";
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      dismissSecs: 30,
      dismissCountDown: 0,
      messageHeading: "",
      messageIcon: "",
    };
  },
  watch: {
    model(newAlertModel) {
      if (newAlertModel.Message !== "") {
        this.dismissCountDown = this.dismissSecs;
        this.appMessageBody();
      }
    },
  },
  mounted() {},
  computed: {
    ...mapGetters("alert", ["model"]),
  },
  methods: {
    ...mapActions("alert", ["clear"]),
    countDownChanged(dismissCountDown) {
      this.dismissCountDown = dismissCountDown;
      if (this.dismissCountDown === 0) {
        this.clear();
      }
    },
    appMessageBody() {
      switch (this.model.Type) {
        case "danger":
          this.messageHeading = "ERROR";
          this.messageIcon = "far fa-times-circle";
          break;
        case "success":
          this.messageHeading = "SUCCESS";
          this.messageIcon = "far fa-check-circle";
          break;
        case "warning":
          this.messageHeading = "WARNING";
          this.messageIcon = "far fa-exclamation-circle";
          break;
      }
    },
  },
};
</script>
<style scoped>
.top-alert-bar {
  position: fixed;
  width: 100%;
  z-index: 999;
  top: 0;
  text-align: center;
}
.alert {
  position: fixed;
  z-index: 99999999;
  width: 100%;
  top: 2px;
}
</style>





