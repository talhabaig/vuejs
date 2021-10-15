<template>
  <div class="">
    <!-- <section v-if="this.selectedCourseSOS.id > 0"> -->
    <courseDetail></courseDetail>
    <!-- </section> -->
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  course as courseStoreKeys,
  courseDetail as courseDetailStoreKeys,
} from "../../../store/keys";
// import detail from "../detail";
export default {
  components: {
    courseDetail: () => import("../detail"),
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
  },
  asyncData({ store, route }) {
    return Promise.resolve();
  },
  serverPrefetch() {},
  methods: {},
};
</script>
