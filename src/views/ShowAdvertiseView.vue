<template>
    <div class="q-pa-lg q-gutter-y-lg">
        <div v-if="advertise" class="q-pa-md row items-start q-gutter-lg">
            <q-card class="my-card" flat bordered>
                <q-img
                        src="https://cdn.quasar.dev/img/parallax2.jpg"
                />

                <q-card-section>
                    <div class="text-overline text-orange-9">{{ advertise.serviceType }}</div>
                    <div class="text-h5 q-mt-sm q-mb-xs">{{ advertise.header }}</div>
                    <div class="text-caption text-grey">
                        {{advertise.post}}
                    </div>
                    <div class="text-overline text-primary">{{ advertise.date.toLocaleString() }}</div>
                    <div class="text-overline text-orange">{{ advertise.city.name }}</div>
                    <div class="text-overline text-orange">Author: {{ advertise.user.name }}</div>
                </q-card-section>

                <q-card-actions>
                    <q-btn @click="redirectBack" flat color="primary" label="Go Back"/>
                </q-card-actions>
            </q-card>
        </div>
        <div v-else class="q-pa-md row items-start q-gutter-md">
                   Out of Data
        </div>

        </div>
</template>

<script lang="ts" setup>
import {computed} from "vue"
import { useRouter, useRoute } from 'vue-router'
import {useAdvertiseStore} from "@/stores/advertise";
import type {IAdvert} from "@/types/avdert";


const router = useRouter();
const route = useRoute();
const advertiseId = Number(route.params.id);


const advertiseList = useAdvertiseStore();
/**
 * If there will be real request to server there would not be this logic
 */
const advertise = computed(() => advertiseList.getAdvertisesById(advertiseId) as IAdvert);

/**
 * If there will be real request to server there would not be this logic
 */
 if(!advertise.value){
     advertiseList.getAdvertises();
 }
function redirectBack() {
    router.back();
}
</script>

<style scoped>

</style>