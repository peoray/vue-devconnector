<template>
  <div class="dashboard" v-if="profile">
    <div class="container">
      <template v-if="profile === 'null' || loading">
        <Spinner/>
      </template>
      <template v-else>
        <template v-if="profile && Object.keys(profile).length < 1 ">
          <div>
            <p class="lead text-muted">
              Welcome
              <router-link to="/profile">
                <a>{{ user.name }}</a>
              </router-link>
            </p>
            <p>You have not yet setup a profile, please add some info</p>
            <router-link tag="a" to="/create-profile" class="btn btn-lg btn-info">Create Profile</router-link>
          </div>
        </template>
        <template v-else>
          <div class="row">
            <div class="col-md-12">
              <h1 class="display-4">Dashboard</h1>
              <p class="lead text-muted">
                Welcome
                <router-link :to="`/profile/${profile.handle}`" tag="a">{{ user.name }}</router-link>
              </p>
              <!-- Dashboard Actions -->
              <div class="btn-group mb-4" role="group">
                <router-link to="/edit-profile" class="btn btn-light" tag="a">
                  <i class="fas fa-user-circle text-info mr-1"></i> Edit Profile
                </router-link>

                <router-link to="/add-experience" class="btn btn-light" tag="a">
                  <i class="fab fa-black-tie text-info mr-1"></i>
                  Add Experience
                </router-link>

                <router-link to="/add-education" class="btn btn-light" tag="a">
                  <i class="fas fa-graduation-cap text-info mr-1"></i>
                  Add Education
                </router-link>
              </div>

              <!-- Experience -->
              <div>
                <h4 class="mb-2">Experience Credentials</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                      <th/>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(experience) in profile.experience" :key="experience.id">
                      <td>{{ experience.company }}</td>
                      <td>{{ experience.title }}</td>
                      <td>
                        {{moment( experience.from).format('YYYY-MM-DD')}} -
                        <span>{{!experience.to ? " Now" : moment(' ' + experience.to).format('YYYY-MM-DD') }}</span>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          @click.prevent="deleteExperience(experience._id)"
                        >Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Education -->
              <div>
                <h4 class="mb-2">Education Credentials</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Years</th>
                      <th/>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(education) in profile.education" :key="education.id">
                      <td>{{ education.school }}</td>
                      <td>{{ education.degree }}</td>
                      <td>
                        {{ moment(education.from).format('YYYY-MM-DD') }} -
                        <span>{{!education.to ? "Now" : moment(education.to).format('YYYY-MM-DD') }}</span>
                      </td>
                      <td>
                        <button
                          class="btn btn-danger"
                          @click.prevent="deleteEducation(education._id)"
                        >Delete</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div style="margin-bottom: 60px;">
                <button class="btn btn-danger" @click="deleteAccount">Delete My Account</button>
              </div>
            </div>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<script>
import Spinner from './common/Spinner';
import { mapActions, mapState } from 'vuex';
export default {
  components: {
    Spinner
  },
  computed: {
    ...mapState(['profile', 'user', 'loading'])
  },
  methods: {
    ...mapActions(['getUserProfile']),
    deleteExperience(id) {
      this.$store.dispatch('deleteExperience', id);
    },
    deleteEducation(id) {
      this.$store.dispatch('deleteEducation', id);
    },
    deleteAccount() {
      this.$store.dispatch('deleteAccount');
    }
  },
  mounted() {
    this.getUserProfile();
  }
};
</script>

<style>
</style>
