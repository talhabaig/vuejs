<template>
  <div class="">
    <section>
      <!-- v-if="this.selectedCourseSOS.id > 0" -->
      <courseDetail></courseDetail>
    </section>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {
  course as courseStoreKeys,
  courseDetail as courseDetailStoreKeys,
} from "../../../store/keys";
//import detail from "../detail";
export default {
  components: {
    //courseDetail: detail,
    courseDetail: () => import("../detail"),
  },
  data() {
    return {};
  },
  watch: {
    $route(to, from) {
      //     if (process.env.VUE_ENV === "client") {
      //       this.getCourseDetail();
      //     }
    },
  },
  computed: {
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(
      courseDetailStoreKeys.namespace,
      courseDetailStoreKeys.getters
    ),
  },
  serverPrefetch() {},
  asyncData({ store, route }) {
    return Promise.resolve();
    //detail exam async
    // return store.dispatch(
    //   courseDetailStoreKeys.namespace +
    //     "/" +
    //     courseDetailStoreKeys.actions.get_CourseDetail,
    //   {
    //     data: {
    //       SOSId: route.query.s,
    //       CourseGroupId: route.query.g,
    //     },
    //     config: {
    //       loader: {
    //         show: true,
    //       },
    //     },
    //   }
    // );
  },
  methods: {
    // ...mapActions(
    //   courseDetailStoreKeys.namespace,
    //   courseDetailStoreKeys.actions
    // ),
    // getCourseDetail() {
    //   return this.get_CourseDetail({
    //     data: {
    //       SOSId: this.$route.query.s,
    //       CourseGroupId: this.$route.query.g,
    //     },
    //   })
    //     .then((response) => {})
    //     .catch((ex) => {
    //       this.$alertError(ex.message);
    //     });
    // },
  },
};
</script>
