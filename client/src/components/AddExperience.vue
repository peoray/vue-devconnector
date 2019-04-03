<template>
  <div class="section add-experience">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <router-link to="/dashboard" tag="a" class="btn btn-light">Go back</router-link>
          <h1 class="display-4 text-center">Add Your Experience</h1>
          <p
            class="lead text-center"
          >Add any developer/programming positions that you have had in the past</p>
          <small class="d-block pb-3">* = required field</small>
          <form>
            <!-- <form> -->
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="* Job Title"
                name="title"
                v-model="title"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.title">{{errors.title}}</div>

            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="* Company"
                name="company"
                v-model="company"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.company">{{errors.company}}</div>

            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Location"
                name="location"
                v-model="location"
              >
            </div>
            <div class="invalid-feedback" v-if="errors.location">{{errors.location}}</div>

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
                id="current"
                @click="onCheck"
              >
              <label class="form-check-label" for="current">Current Job</label>
            </div>
            <div class="form-group">
              <textarea
                class="form-control form-control-lg"
                placeholder="Job Description"
                name="description"
                v-model="description"
              ></textarea>
              <small class="form-text text-muted">Some of your responsabilities, etc</small>
            </div>
            <div class="invalid-feedback" v-if="errors.description">{{errors.description}}</div>

            <input
              type="submit"
              value="Submit"
              class="btn btn-info btn-block mt-4"
              @click.prevent="addExperience"
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
      title: '',
      company: '',
      location: '',
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
    addExperience() {
      const data = {
        title: this.title,
        company: this.company,
        location: this.location,
        from: this.from,
        to: this.to,
        description: this.description
      };
      this.$store.dispatch('addExperience', data);
    }
  }
};
</script>

<style>
</style>
