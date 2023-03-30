<template>
    <div class="q-pa-md">
<!--        @update:model-value="val => { filterCities(val) }"-->
        <q-select
                v-model="searchValue.country" :options="countries"
                option-label="name"
                option-value="id"
                label=" Choose Country"/>
        <q-select
                v-model="searchValue.city" :options="cities"
                option-label="name"
                option-value="country"
                label=" Choose City"/>
        <q-select
                v-model="searchValue.serviceType" :options="serviceTypes"
                label=" Choose Service type"/>
        <q-btn push color="purple" @click="emitFilter" label="Search"/>
        <q-btn push color="green" @click="emitReset" label="Reset"/>
    </div>
</template>

<script lang="ts" setup>
import type {ISearch} from "@/types/search";
import {ref} from "vue";
import {Country} from "@/enums/countries";
import {citiesMock} from "@/api/mocks/cityMock";
import type {ICity} from "@/types/city";
import {AdvertServiceType} from "@/enums/advertServiceType";
import type {countryListByKeyValue} from "@/types/advertiseItemProp";

const emit = defineEmits(['emitFilter', 'emitReset'])
const cities = ref(citiesMock as ICity[]);
const countries = ref(convertEnumToKeyValueObject() as countryListByKeyValue[]);
const serviceTypes = ref(Object.values(AdvertServiceType) as [key: string]);
const searchValue = ref(initSearchValue() as ISearch)
function emitFilter() {
    emit('emitFilter', searchValue.value as ISearch)
}

function initSearchValue(): ISearch {
    return {
        city: cities.value[0],
        country: countries.value[0],
        serviceType: serviceTypes.value[0],
    }
}

function convertEnumToKeyValueObject(): countryListByKeyValue[] {
    const countryList: Array<countryListByKeyValue> = [];
     for(const city  of cities.value) {
         if(!countryList.find((country: countryListByKeyValue) => country.id === Number(city.country))){
             countryList.push({
                 id: Number(city.country),
                 name: Country[city.country].toUpperCase(),
                 key: Country[city.country],
             } as countryListByKeyValue)
         }
     }
    return  countryList;
}

function emitReset() {
    emit('emitReset', true)
}

/**
 * @param val
 * here can be filter options by country and city
 */
// function filterCities(val: countryListByKeyValue){
//     cities.value = cities.value.filter((city: ICity) => city.country === val.id)
//     searchValue.value.city = cities.value[0];
// }

</script>

<style scoped>

</style>