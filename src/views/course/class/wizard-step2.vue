<template>
  <section>
    <div class="row">
      <div class="col-md-12">
        <div class="generic-wizard-heading">Select Your Board</div>
        <p class="generic-wizard-subheading">
          Click on the tabs below to select your respective board.
          <br />
          Don’t worry you are just a few clicks away.
        </p>
      </div>
    </div>
    <div v-if="boardList && selectedClassBoard">
      <div
        class="board-box"
        :class="{ highlight: selectedClassBoard.BoardId == board.BoardId }"
        v-for="(board, index) in boardList"
        :key="index"
        @click="updateSelectedClassBoard(board)"
      >
        <span
          :class="{ highlightfa: selectedClassBoard.BoardId == board.BoardId }"
        >
          <i class="fa fa-check-circle"></i>
        </span>
        <div class="course-icon">
          <img height="51" :src="board.Icon" />
        </div>
        <div class="board-box-head">
          {{ board.Name }}
        </div>
      </div>
      <div>
        <button
          @click="UpdateNextWizard()"
          class="wizard-btn active-btn btn btn-next"
          :disabled="isNextButtonDisabled"
        >
          Next
        </button>
      </div>
    </div>
    <!-- <p>{{ selectedCourseInfo }}</p> -->
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  board as boardStoreKeys,
  course as courseStoreKeys,
  classes as classesStoreKeys,
} from "../../../store/keys";
import { appConstants } from "../../../common/constants";
import breadcrumb from "../breadcrumb.vue";

export default {
  components: {
    breadcrumb,
  },
  data() {
    return {
      isNextButtonDisabled: true,
      boardList: [],
      selectedClassBoard: null,
    };
  },
  // Client-side only
  mounted() {
    this.getClassBoards();
  },
  destroyed() {
    // this.resetBoards();
  },
  watch: {
    $route(to, from) {
      if (process.env.VUE_ENV === "client") {
        this.getClassBoards();
      }
    },
  },
  computed: {
    ...mapGetters(boardStoreKeys.namespace, boardStoreKeys.getters),
    ...mapGetters(courseStoreKeys.namespace, courseStoreKeys.getters),
    ...mapGetters(classesStoreKeys.namespace, classesStoreKeys.getters),
  },
  // Server-side only
  serverPrefetch() {},
  methods: {
    ...mapActions(boardStoreKeys.namespace, boardStoreKeys.actions),
    ...mapActions(courseStoreKeys.namespace, courseStoreKeys.actions),

    getClassBoards() {
      this.isNextButtonDisabled = true;
      return this.get_ClassBoards({
        data: {
          ProgramId: this.selectedProgram.id,
        },
        config: {
          loader: {
            show: true,
          },
        },
      })
        .then((response) => {
          this.boardList = response.Boards;
          this.updateSelectedClassBoard(
            this.selectedCourseInfo.board.id === 0
              ? response.Boards[0]
              : response.Boards.find((board) => {
                  return board.BoardId === this.selectedCourseInfo.board.id;
                })
          );

          this.update_SelectedClassBoard({
            data: {
              id: 0,
              name: "",
            },
          });

          this.update_SelectedCourseGroup({
            data: {
              id: 0,
              name: "",
            },
          });
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
    updateSelectedClassBoard(board) {
      this.selectedClassBoard = board;
      this.isNextButtonDisabled = false;
    },
    UpdateNextWizard() {
      this.update_SelectedClassBoard({
        data: {
          id: this.selectedClassBoard.BoardId,
          name: this.selectedClassBoard.Name,
        },
        config: {
          loader: {
            show: false,
          },
        },
      })
        .then((response) => {
          this.$emit("onUpdateWizard", "wizard-step3");
        })
        .catch((ex) => {
          this.$alertError(ex.message);
        });
    },
  },
};
</script>
