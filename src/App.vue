<template>
  <nav>
    <router-link :to="{ name: 'BookAppointment' }">Randevu al - </router-link>
    <router-link :to="{ name: 'MyAppointments' }">Randevularım</router-link>
  </nav>
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
