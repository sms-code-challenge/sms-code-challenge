<template>
  <div id="app">
    <div class="container p-5">
      <img class="img-fluid" alt="SMS digital logo" src="./assets/logo.png">
    </div>
    <div class="container">
      <h1 class="mb-5">Code Challenge</h1>
      <b-form class="mb-5">
        <b-row>
          <b-col>
            <label for="start-date">Start Date</label>
            <b-form-datepicker id="start-date" v-model="filters.start_date"></b-form-datepicker>
          </b-col>
          <b-col>
            <label for="end-date">End Date</label>
            <b-form-datepicker id="end-date" v-model="filters.end_date"></b-form-datepicker>
          </b-col>
        </b-row>
      </b-form>
      <b-table
        small
        striped
        hover
        :busy="isBusy"
        :items="items"
        filter="custom"
        :filter-function="filter"
        :fields="fields"
        :sort-by.sync="sortBy"
        :sort-desc.sync="sortDesc"
        responsive="sm"
      >
        <template v-slot:table-busy>
          <div class="text-center text-danger my-2">
            <b-spinner class="align-middle mr-2"></b-spinner>
            <strong>Loading Data…</strong>
          </div>
        </template>
        <template v-slot:cell(start_date)="data">
          {{ formatDate(data.value) }}
        </template>
        <template v-slot:cell(end_date)="data">
          {{ formatDate(data.value) }}
        </template>
        <template v-slot:cell(status)="data">
          <b-badge variant="primary">{{ data.value }}</b-badge>
        </template>
        <template v-slot:cell(color)="data">
          <code :style="'color: ' + data.value">{{ data.value }}</code>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      filters: {
        start_date: null,
        end_date: null,
      },
      isBusy: false,
      sortBy: 'city_name',
      sortDesc: false,
      fields: [
        { key: 'city_name', sortable: true },
        { key: 'start_date', sortable: true },
        { key: 'end_date', sortable: true },
        { key: 'price', sortable: true },
        { key: 'status', sortable: true },
        { key: 'color', sortable: true },
      ],
      items: [],
    };
  },
  mounted() {
    this.isBusy = true;
    axios
      .get('/api/cities')
      .then((response) => {
        this.items = response.data.map((city) => ({
          city_name: city.name,
          start_date: moment(city.start_date),
          end_date: moment(city.end_date),
          price: city.price,
          status: city.status,
          color: city.color,
        }));
        this.isBusy = false;
      });
  },
  methods: {
    formatDate(m) {
      return m.format('MM/DD/YYYY');
    },
    filter(row) {
      const filterStartDate = this.filters.start_date;
      if (filterStartDate && row.start_date.isBefore(filterStartDate)) {
        return false;
      }
      const filterEndDate = this.filters.end_date;
      if (filterEndDate && row.end_date.isAfter(filterEndDate)) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style>
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
