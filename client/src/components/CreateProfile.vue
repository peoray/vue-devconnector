<template>
  <div class="create-profile">
    <div class="container">
      <div class="row">
        <div class="col-md-8 m-auto">
          <a href="dashboard.html" class="btn btn-light">Go Back</a>
          <h1 class="display-4 text-center">Create Your Profile</h1>
          <p class="lead text-center">Let's get some information to make your profile stand out</p>
          <small class="d-block pb-3">* = required field</small>
          <form @submit.prevent="createProfile">
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="* Profile handle"
                name="handle"
                v-model="handle"
              >
              <div class="invalid-feedback" v-if="errors.handle">{{errors.handle}}</div>

              <small
                class="form-text text-muted"
              >A unique handle for your profile URL. Your full name, company name, nickname, etc (This CAN'T be changed later)</small>
            </div>
            <div class="form-group">
              <select class="form-control form-control-lg" name="status" v-model="status">
                <option value="0">* Select Professional Status</option>
                <option value="Developer">Developer</option>
                <option value="Junior Developer">Junior Developer</option>
                <option value="Senior Developer">Senior Developer</option>
                <option value="Manager">Manager</option>
                <option value="Student or Learning">Student or Learning</option>
                <option value="Instructor">Instructor or Teacher</option>
                <option value="Intern">Intern</option>
                <option value="Other">Other</option>
              </select>
              <div class="invalid-feedback" v-if="errors.status">{{errors.status}}</div>

              <small class="form-text text-muted">Give us an idea of where you are at in your career</small>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Company"
                name="company"
                v-model="company"
              >
              <div class="invalid-feedback" v-if="errors.company">{{errors.company}}</div>

              <small class="form-text text-muted">Could be your own company or one you work for</small>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Website"
                name="website"
                v-model="website"
              >
              <div class="invalid-feedback" v-if="errors.website">{{errors.website}}</div>

              <small class="form-text text-muted">Could be your own or a company website</small>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Location"
                name="location"
                v-model="location"
              >
              <small class="form-text text-muted">City & state suggested (eg. Boston, MA)</small>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Skills"
                name="skills"
                v-model="skills"
              >
              <div class="invalid-feedback" v-if="errors.skills">{{errors.skills}}</div>

              <small
                class="form-text text-muted"
              >Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
            </div>
            <div class="form-group">
              <input
                type="text"
                class="form-control form-control-lg"
                placeholder="Github Username"
                name="githubusername"
                v-model="githubusername"
              >
              <div class="invalid-feedback" v-if="errors.githubusername">{{errors.githubusername}}</div>

              <small
                class="form-text text-muted"
              >If you want your latest repos and a Github link, include your username</small>
            </div>
            <div class="form-group">
              <textarea
                class="form-control form-control-lg"
                placeholder="A short bio of yourself"
                name="bio"
                v-model="bio"
              ></textarea>
              <div class="invalid-feedback" v-if="errors.bio">{{errors.bio}}</div>

              <small class="form-text text-muted">Tell us a little about yourself</small>
            </div>

            <div class="mb-3">
              <button
                type="button"
                class="btn btn-light"
                @click="displaySocialInputs = !displaySocialInputs"
              >Add Social Network Links</button>
              <span class="text-muted">Optional</span>
            </div>
            <template v-if="displaySocialInputs">
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-twitter"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  v-model="twitter"
                >
              </div>
              <div class="invalid-feedback" v-if="errors.twitter">{{errors.twitter}}</div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-facebook"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Facebook Page URL"
                  name="facebook"
                  v-model="facebook"
                >
              </div>
              <div class="invalid-feedback" v-if="errors.facebook">{{errors.facebook}}</div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-linkedin"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  v-model="linkedin"
                >
              </div>
              <div class="invalid-feedback" v-if="errors.linkedin">{{errors.linkedin}}</div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-youtube"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="YouTube Channel URL"
                  name="youtube"
                  v-model="youtube"
                >
              </div>
              <div class="invalid-feedback" v-if="errors.youtube">{{errors.youtube}}</div>

              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text">
                    <i class="fab fa-instagram"></i>
                  </span>
                </div>
                <input
                  type="text"
                  class="form-control form-control-lg"
                  placeholder="Instagram Page URL"
                  name="instagram"
                  v-model="instagram"
                >
              </div>
              <div class="invalid-feedback" v-if="errors.instagram">{{errors.instagram}}</div>
            </template>

            <input type="submit" value="Submit" class="btn btn-info btn-block mt-4">
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
      displaySocialInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: ''
    };
  },
  computed: {
    ...mapState(['errors'])
  },
  methods: {
    createProfile() {
      const data = {
        handle: this.handle,
        company: this.company,
        website: this.website,
        location: this.location,
        status: this.status,
        skills: this.skills,
        githubusername: this.githubusername,
        bio: this.bio,
        twitter: this.twitter,
        facebook: this.facebook,
        linkedin: this.linkedin,
        youtube: this.youtube,
        instagram: this.instagram
      };
      console.log(data);
      this.$store.dispatch('createProfile', data);
    }
  }
};
</script>

<style>
</style>
