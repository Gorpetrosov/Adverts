<template>
    <div class="q-pa-md q-gutter-y-md">
    <q-banner rounded class="bg-orange text-white">
        <template v-slot:action>
            <q-chip>
                Hello {{ user.name }}
            </q-chip>
            <q-chip>
                <q-avatar>
                    <img src="https://picsum.photos/200/300" alt="user avatar">
                </q-avatar>
            </q-chip>
        </template>
    </q-banner>
        <q-banner dense class="bg-transparent text-secondary">
            Missing for Adverts? Just crate it!!!
            <template v-slot:action>
                <q-btn flat class="glossy" @click="openNewPostModal" color="secondary" label="Add new post "/>
            </template>
        </q-banner>
        <create-or-update-advertise-list-item  :new-post-modal-props="newPostModal" @close="closeModal" @submit="submitModal" />
    </div>
    <div class="q-pa-md q-gutter-y-md">
        <q-list bordered separator>
            <AdvertiseListItem v-for="(advertise, index) in advertises" :key="index" :show-actions="true" @delete="deleteItem"
                               @edit="editItem" @show="showItem" :advertise="advertise"/>
        </q-list>
    </div>
</template>

<script lang="ts" setup>
import {computed, onMounted, ref} from "vue";
import {useUserStore} from "@/stores/user";
import {useAdvertiseStore} from "@/stores/advertise";
import { useRouter } from 'vue-router'
import AdvertiseListItem from "@/components/AdvertiseListItem.vue";
import CreateOrUpdateAdvertiseListItem from "@/components/CreateOrUpdateAdvertiseListItem.vue";
import type {IAdvert} from "@/types/avdert";

const userState = useUserStore();
const advertiseList = useAdvertiseStore();
onMounted(async () => {
    await userState.getAuth();
    await advertiseList.getAdvertises();
    console.log('mounted')

});
const user = computed(() => userState.getAuthUser());
const newPostModal = ref(false);
const advertises = computed(() => advertiseList.getAdvertisesByUserId(user.value.id));
const router = useRouter()

/**
 * @param id
 */
async function deleteItem(id: number) {
    try {
        await advertiseList.removeAdvertise(id)
        await advertiseList.getAdvertises();

    } catch (e) {
        console.error(e)
    }
}

function editItem(e: any) {
    console.log('edit', e)
}

/**
 * @param id
 */
function showItem(id: number) {
    router.push({
        name: 'advert',
        params: {
            id: id
        }
    })
}

/**
 * Show modal for advertise
 */
function openNewPostModal() {
    newPostModal.value = true;
}

/**
 *
 * @param hide
 */
function closeModal(hide: boolean){
    newPostModal.value = hide;
}

async function submitModal(adv: IAdvert){
   try {
       await advertiseList.addAdvertise(adv);
       await advertiseList.getAdvertises();
       newPostModal.value = false;
   }catch (e) {
       console.error(e)
   }
}

</script>

<style scoped>

</style>