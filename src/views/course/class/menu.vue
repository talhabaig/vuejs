<template>
  <section>
    <ul>
      <!-- <li class="header_subMenuTitle">Engineering</li> -->
      <li
        v-on:click="updateSelectedClass(item)"
        class="header_subMenuItem"
        v-for="(item, index) in classes"
        :key="index"
      >
        <a :title="item.Name" href="javascript:void(0)">{{ item.Name }}</a>
      </li>
    </ul>

    <loader id="menuClassLoader"></loader>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { appConstants } from "../../../common/constants";
import {
  classes as classesStoreKeys,
  course as courseStoreKeys
} from "../../../store/keys";

export default {
  //props: ["name"],
  // Client-side only
  mounted() {
    this.getClasses();
  },
  computed: {
    ...mapGetters(classesStoreKeys.namespace, classesStoreKeys.getters),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters)
  },
  // Server-side only
  async serverPrefetch() {
    return this.getClasses();
  },
  methods: {
    ...mapActions(classesStoreKeys.namespace, classesStoreKeys.actions),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),
    getClasses() {
      return this.get_Classes({
        config: {
          loader: {
            show: true,
            id: "menuClassLoader"
          }
        }
      });
    },
    updateSelectedClass(item) {
      // if (this.selectedCourseInfo.program.id == item.ProgramId) {
      //   return;
      // }
      this.reset_SelectedCourseInfo({});
      this.update_SelectedClass({
        data: {
          program: { id: item.ProgramId, name: item.Name },
          programCategory: {
            id: appConstants.enums.programCategory.Class,
            name: ""
          }
        },
        config: {
          loader: {
            show: false
          }
        }
      })
        .then(response => {
          this.RouteTo(
            "/class/" +
              this.RemoveSpecialChars(item.Name) +
              "-" +
              item.ProgramId
          );
        })
        .catch(ex => {
          this.$alertError(ex.message);
        });
    }
  }
};
</script>
