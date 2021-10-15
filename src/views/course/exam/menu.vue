<template>
  <section>
    <ul v-for="(sosCategory, index) in sosCategories" :key="index">
      <li class="header_subMenuTitle">
        {{ sosCategory.CourseGroupCategoryName }}
      </li>
      <li
        @click="updateSelectedSOS(sosCategory, exam)"
        class="header_subMenuItem"
        v-for="(exam, index) in sosCategory.Exams"
        :key="index"
      >
        <a :title="exam.SOSName" href="javascript:void(0)">{{
          exam.SOSName
        }}</a>
      </li>
    </ul>
    <loader id="menuExamLoader"></loader>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { appConstants } from "../../../common/constants";
import {
  exam as examStoreKeys,
  course as courseStoreKeys,
} from "../../../store/keys";

export default {
  //props: ["name"],
  // Client-side only
  mounted() {
    this.getExams();
  },
  computed: {
    ...mapGetters(examStoreKeys.namespace, examStoreKeys.getters),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
  },
  // Server-side only
  async serverPrefetch() {
    return this.getExams();
  },
  methods: {
    ...mapActions(examStoreKeys.namespace, examStoreKeys.actions),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    getExams() {
      return this.get_Exams({
        config: {
          loader: {
            show: true,
            id: "menuExamLoader",
          },
        },
      });
    },
    updateSelectedSOS(sosCategory, exam) {
      this.update_SelectedExam({
        data: {
          program: { id: exam.ProgramId, name: "" },
          sos: { id: exam.SOSId, name: exam.SOSName },
          programCategory: {
            id: appConstants.enums.programCategory.Exam,
            name: "",
          },
          courseGroup: { id: exam.CourseGroupId, name: "" },
          sosCategory: {
            id: sosCategory.CourseGroupCategoryId,
            name: sosCategory.CourseGroupCategoryName,
          },
        },
        config: {
          loader: {
            show: false,
          },
        },
      })
        .then((response) => {
          //alert(item.Name);
          this.RouteTo(
            "/exam/detail/" +
              this.RemoveSpecialChars(exam.SOSName) +
              "?s=" +
              this.selectedCourseInfo.sos.id +
              "&g=" +
              this.selectedCourseInfo.courseGroup.id
          );
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
  },
};
</script>
