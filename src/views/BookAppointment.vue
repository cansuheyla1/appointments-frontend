
<template>
    <label>Uygun Saatler</label>
    <input type="date" v-model="selectedDate" required>

    <p v-if="loading">Yükleniyor...</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>

    <ul v-if="availableSlots && availableSlots.length">
        <li v-for="slot in availableSlots" :key="slot">
            <button @click="selectedTime = slot" :class="{selected: selectedTime === slot}">
                {{ slot }}
            </button>
        </li>
    </ul>
    <p v-else-if="selectedDate && !loading && !errorMessage">Bu tarih için uygun saat bulunamadı.</p>

    <p v-if="selectedTime">Seçilen saat: {{ selectedTime }}</p>

    <div v-if="selectedTime">
        <label>Ad Soyad: </label>
        <input type="text" v-model="name" required>
        <label>Email: </label>
        <input type="text" v-model="email" required>
        <label>Not: </label>
        <textarea name="not" v-model="note"></textarea>
    </div>
    <p v-if="successMessage">{{ successMessage }}</p>

    <button @click="createAppointment" :disabled="!selectedTime || loading || !selectedDate || !name || !email">
        Randevu Oluştur
    </button>
</template>

<script>
import { ref, watch } from 'vue'
import api from '@/services/api'

export default {
    setup() {
        let selectedDate = ref('')
        let selectedTime = ref('')
        let availableSlots = ref([])
        let loading = ref(false)
        let errorMessage = ref('')

        let name = ref('')
        let email = ref('')
        let note = ref('')
        let successMessage = ref('')

        const fetchSlots = () => {
            errorMessage.value = ''
            loading.value = true
            availableSlots.value = []
            console.log("API BASE:", api.defaults.baseURL);

            api.get("/appointments/slots", { params: { date: selectedDate.value } })
  .then(res => {
    console.log("selectedDate:", selectedDate.value);
    console.log("slots:", res.data); // backend ne gönderiyor göreceğiz

    availableSlots.value = res.data;
  })
  .catch(err => {
    console.log("slots error:", err.response?.status, err.response?.data);
  })
  .finally(() => {
    loading.value = false;
  });

        }

        watch(selectedDate, () => {
            fetchSlots()
        })

        const createAppointment = () => {
            errorMessage.value = ''
            successMessage.value = ''
            api.post("/appointments", {
                name: name.value,
                email: email.value,
                note: note.value,
                date: selectedDate.value,
                time: selectedTime.value
            })
            .then(() => {
                successMessage.value = "Randevu oluşturuldu."
                selectedTime.value = ''
                note.value = ''
                fetchSlots()
            })
            .catch(err => {
                if (err.response?.status == 409) { 
                    errorMessage.value = "Bu saat dolu. Lütfen başka bir saat seçiniz." }
                else { errorMessage.value = "Randevu oluşturulamadı." }
                fetchSlots()
            })
        }


        return {selectedDate, availableSlots, loading, errorMessage, selectedTime, 
            name, email, note, successMessage, createAppointment}
    }
}
</script>

<style>
.selected {
    background:gold;
    color: black;
}
</style>
