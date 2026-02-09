
<template>
    <label>Email: </label>
    <input type="email" v-model="emailInput" required>
    <button @click="fetchAppointments" :disabled="!emailInput">Listele</button>

    <div v-if="appointments.length">
        <div v-for="a in appointments" :key="a.id">
            <p>{{ a.date }} - {{ a.time }} ({{ a.status }})</p>
            <button v-if="a.status === 'booked'" @click="handleCancel(a)">İptal Et</button>
        </div>
    </div>
    <div v-else-if="hasSearched && !loading"> 
        <p>Bu email için randevu bulunmamakta.</p>
    </div>
    <p v-if="successMessage">{{ successMessage }}</p>
</template>

<script>
import {ref} from 'vue'
import api from '@/services/api'

export default {
    setup() {
        let emailInput = ref('')
        let appointments = ref([])
        let loading = ref(false)
        let successMessage = ref('')
        let hasSearched = ref(false)

        const fetchAppointments = () => {
            hasSearched.value = true 
            loading.value = true
            appointments.value = []
            api.get("/appointments", {params: {email: emailInput.value}})
            .then(res => {
                appointments.value = res.data
                loading.value = false
            })
            .catch(err => {
                loading.value = false
                console.log(err)
            })
        }
        const handleCancel = (a) => {
            api.delete("/appointments/" + a.id)
            .then(() => {
                successMessage.value = 'Randevunuz iptal edilmiştir.'
                fetchAppointments()
            })
            .catch(err => console.log(err))
        }

        return {appointments, emailInput, loading, fetchAppointments, handleCancel, hasSearched}
    }
}
</script>

<style>

</style>