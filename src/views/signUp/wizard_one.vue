<template>
  <section class="course-wizard online-course-details registration-form">
    <div class="page-header">
      <h3>Entry Test Pre Test</h3>
      <p>Registration</p>
    </div>
    <section class="details-section">
      <div class="container">
        <div class="row">
          <div class="col-md-3"></div>
          <div class="col-md-6">
            <div class="row">
              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.fullName.$error }"
              >
                <input
                  id="name"
                  placeholder="Name"
                  class="form-control display-inline"
                  v-model.trim="$v.model.form.fullName.$model"
                  maxlength="100"
                  type="text"
                />
                <div class="invalid-feedback" v-if="$v.model.form.fullName.$error">
                  <span v-if="$v.model.form.fullName.$error">Name is required</span>
                </div>
              </div>
              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.gender.$error }"
              >
                <div class="">
                  <input
                    class="custom-radio"
                    name="Gender"
                    type="radio"
                    v-model="$v.model.form.gender.$model"
                    value="Male"
                    id="rdoMale"
                  />
                  <label class="custom-radio-label pr-4" for="rdoMale"
                    >Male</label
                  >
                  <input
                    class="custom-radio"
                    name="Gender"
                    type="radio"
                    v-model="$v.model.form.gender.$model"
                    value="Female"
                    id="rdoFemale"
                  />
                  <label class="custom-radio-label" for="rdoFemale"
                    >Female</label
                  >
                </div>
                <div class="invalid-feedback">
                  <span v-if="$v.model.form.gender.$error"
                    >Gender is required</span
                  >
                </div>
              </div>

              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.academicClass.$error }"
              >
                <b-form-select
                  class="form-control"
                  v-model="$v.model.form.academicClass.$model"
                  :options="jsonData.Class"
                ></b-form-select>
               
                <div class="invalid-feedback">
                  <span v-if="$v.model.form.academicClass.$error"
                    >Class is required</span
                  >
                </div>
              </div>
              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.marks.$error }"
              >
                <input
                  id="marks"
                  v-model="$v.model.form.marks.$model"
                  placeholder="Marks Obtained"
                  class="form-control display-inline"
                  type="number"
                />
                <div class="invalid-feedback" v-if="$v.model.form.marks.$error">
                  <span v-if="!$v.model.form.marks.maxValue"
                    >Maximum length is
                    {{ $v.model.form.marks.$params.maxValue.max }}</span
                  >
                  <span v-else>Marks is required</span>
                </div>
              </div>
              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.institute.$error }"
              >
                <input
                  id="institute"
                  v-model="$v.model.form.institute.$model"
                  placeholder="Institute"
                  maxlength="100"
                  class="form-control display-inline"
                  type="text"
                />
                <div class="invalid-feedback">
                  <span v-if="$v.model.form.institute.$error"
                    >Institute is required</span
                  >
                </div>
              </div>
              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.board.$error }"
              >
                <input
                  id="board"
                  v-model="$v.model.form.board.$model"
                  placeholder="Board"
                  maxlength="50"
                  class="form-control display-inline"
                  type="text"
                />
                <div class="invalid-feedback">
                  <span v-if="$v.model.form.board.$error"
                    >Board is required</span
                  >
                </div>
              </div>
              <div
                class="form-group col-md-12 mb-form"
                :class="{ invalid: $v.model.form.city.$error }"
              >
                <b-form-select
                  class="form-control"
                  sort-by="text"
                  sort-desc.sync="Ascending"
                  v-model="$v.model.form.city.$model"
                  :options="sortedCity"
                ></b-form-select>
                <div class="invalid-feedback">
                  <span v-if="$v.model.form.city.$error">City is required</span>
                </div>
                <div class="text-info italic">City of residence or nearest city</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="login mt20">
      <button type="button" class="btn trial-btn" @click="signUp()">
        Next
      </button>
    </div>
  </section>
</template>  
<script>
import json from "../../services/cityData.json";
import { mapGetters, mapActions } from "vuex";
import { signUp as signUpStoreKeys } from "../../store/keys";
import { required, maxValue } from "vuelidate/lib/validators";

const validations = {
  model: {
    form: {
      fullName: {
        required,
      },
      board: {
        required,
      },
      gender: {
        required,
      },
      academicClass: {
        required,
      },
      marks: {
        required,
        maxValue: maxValue(10000),
      },
      institute: {
        required,
      },
      city: {
        required,
      },
    },
  },
};

export default {
  data() {
    return {
      model: {
        form: {
          fullName: null,
          board: null,
          gender: "Male",
          academicClass: null,
          marks: "",
          institute: null,
          city: null,
        },
      },
      jsonData: json,
    };
  },
metaInfo: {
    title: "SIGNUP | KIPS LMS",
    // meta: [
    //   {
    //     name: "description",
    //     content:
    //       "Epiloge is about connecting in your field of interest. Our vision is to help people share their knowledge, work, projects, papers and ideas and build their network through what they do rather where they live, study or work.",
    //   },
    //   {
    //     property: "og:title",
    //     content: "Epiloge - Build your network in your field of interest",
    //   },
    // ],
    titleTemplate: "",
    htmlAttrs: {
      lang: "en",
      amp: true
    }
  },
  computed: {
    sortedCity: function () {
      return this.jsonData.City.sort((p1, p2) => {
        let sortDirection = "asc";
        let modifier = 1;
        if (sortDirection === "desc") modifier = -1;
        if (p1.text < p2.text) return -1 * modifier;
        if (p1.text > p2.text) return 1 * modifier;
        return 0;
      });
    },
  },
  validations,
  created() {},
  methods: {
    ...mapActions(signUpStoreKeys.namespace, signUpStoreKeys.actions),
    signUp() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sign_Up({
          data: this.model,
          config: {
            loader: {
              show: true,
            },
          },
        })
          .then((response) => {
            window.location.href = `${process.env.VUE_APP_PORTAL_URL}/invoice/checkOut`;
          })
          .catch((ex) => {
            this.$alertError(ex.message);
          });
      }
    },
  },
};
</script>
<style scoped>
.invalid-feedback{
  margin-top: 2.5px;
  display: block;
}
</style>

