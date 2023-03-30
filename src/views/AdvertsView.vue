<template>
    <div class="q-pa-md q-gutter-y-md">
      <filter-advertise-list @emit-reset="emitForSearchItems" @emit-filter="searchForAdvertiseItems" />
    </div>
    <div class="q-pa-md q-gutter-y-md">
        <q-list bordered separator>
            <AdvertiseListItem v-for="(advertise, index) in advertises" :key="index"
                                @show="showItem" :advertise="advertise"/>
        </q-list>
    </div>
</template>

<script lang="ts" setup>
import AdvertiseListItem from "@/components/AdvertiseListItem.vue";
import FilterAdvertiseList from "@/components/FilterAdvertiseList.vue";
import {useAdvertiseStore} from "@/stores/advertise";
import {onMounted} from "vue";
import {useRouter} from "vue-router";
import {storeToRefs} from "pinia";
import type {ISearch} from "@/types/search";


onMounted(async () => {
    await advertiseList.getAdvertises();
})
const advertiseList = useAdvertiseStore();
const router = useRouter()

const { advertisesBySearch: advertises } = storeToRefs(advertiseList);

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

async function searchForAdvertiseItems(searchObj: ISearch) {
  await advertiseList.searchAdvertise(searchObj)
}

function emitForSearchItems() {
    advertiseList.advertisesBySearch = advertiseList.advertises
}
</script>

<style scoped>

</style>