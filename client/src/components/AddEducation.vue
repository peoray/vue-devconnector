<template>
  <div class="add-education">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <router-link to="/dashboard" tag="a" class="btn btn-light">Go back</router-link>
          <h1 class="display-4 text-center">Add Your Education</h1>
          <p class="lead text-center">Add any school, bootcamp, etc that you have attended</p>
          <small class="d-block pb-3">* = required field</small>
          <form action="login.html">
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="* School Or Bootcamp"
                name="school"
                v-model="school"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.school">{{errors.school}}</div>

            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="* Degree Or Certificate"
                name="degree"
                v-model="degree"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.degree">{{errors.degree}}</div>

            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Field Of Study"
                name="fieldofstudy"
                v-model="fieldofstudy"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.fieldofstudy">{{errors.fieldofstudy}}</div>

            <h6>From Date</h6>
            <div class="form-group">
              <input type="date" class="form-control form-control-lg" name="from" v-model="from">
            </div>
            <div class="invalid-feedback" v-if="errors.from">{{errors.from}}</div>

            <h6>To Date</h6>
            <div class="form-group">
              <input
                type="date"
                class="form-control form-control-lg"
                name="to"
                v-model="to"
                :disabled="disabled"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.to">{{errors.to}}</div>

            <div class="form-check mb-4">
              <input
                class="form-check-input"
                type="checkbox"
                name="current"
                value
                id="current"
                @click="onCheck"
              >
              <label class="form-check-label" for="current">Current Job</label>
            </div>
            <div class="form-group">
              <textarea
                class="form-control form-control-lg"
                placeholder="Program Description"
                name="description"
                v-model="description"
              ></textarea>
              <div class="invalid-feedback" v-if="errors.description">{{errors.description}}</div>

              <small class="form-text text-muted">Tell us about your experience and what you learned</small>
            </div>
            <input
              type="submit"
              class="btn btn-info btn-block mt-4"
              value="Submit"
              @click.prevent="addEducation"
            >
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      school: '',
      degree: '',
      fieldofstudy: '',
      from: '',
      to: '',
      description: '',
      current: false,
      disabled: false
    };
  },
  computed: {
    ...mapState(['errors'])
  },
  methods: {
    onCheck() {
      this.disabled = !this.disabled;
      this.current = !this.current;
    },
    addEducation() {
      const data = {
        school: this.school,
        degree: this.degree,
        fieldofstudy: this.fieldofstudy,
        from: this.from,
        to: this.to,
        description: this.description
      };
      this.$store.dispatch('addEducation', data);
    }
  }
};
</script>

<style>
</style>
