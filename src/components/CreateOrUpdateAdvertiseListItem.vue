<template>
    <div class="q-pa-md q-gutter-y-md">
        <div class="q-pa-md q-gutter-sm" style="width: 500px">
            <q-dialog v-model="newPostModalProps" persistent>
                <q-card>
                    <h6 class="text-orange text-center q-mt-5">Create your own post {{user.name}}</h6>
                    <q-card-section class="row items-center">
                        <div class="q-pa-md">

                            <q-form
                                    class="q-gutter-md"
                            >
                                <q-select
                                    v-model="modalValue.city" :options="cities"
                                    option-label="name"
                                    option-value="id"
                                    label=" Choose City" />
                                <q-select
                                    v-model="modalValue.serviceType" :options="services"
                                    label="Choose Service" />
                                <q-input
                                        filled
                                        v-model="modalValue.header"
                                        label="Header "
                                        hint="Write header"
                                        lazy-rules
                                        :rules="[ val => val.length > 0 || 'Please type header Name']"
                                />

                                <q-input
                                    filled
                                    v-model="modalValue.post"
                                    label="Post "
                                    hint="Write post"
                                    lazy-rules
                                    :rules="[ val => val.length > 0 || 'Please type post']"
                                />
                            </q-form>

                        </div>
                    </q-card-section>

                    <q-card-actions align="right">
                        <q-btn flat type="reset" class="q-ml-sm" label="Cancel" color="primary" @click="hideModal"/>
                        <q-btn flat type="submit" label="Save Post" color="primary" @click="submitModal"/>
                    </q-card-actions>
                </q-card>
            </q-dialog>
        </div>
    </div>
</template>

<script setup lang="ts">
import {computed, ref, toRefs} from "vue";
import { storeToRefs } from 'pinia'
import type {IAdvert} from "@/types/avdert";
import {useUserStore} from "@/stores/user";
import {citiesMock} from "@/api/mocks/cityMock";
import {AdvertServiceType} from "@/enums/advertServiceType";

const props = defineProps({
    newPostModalProps: {
        type: Boolean,
        default: false
    },
    editModalProps: {
        type: Object,
        required: false,
        default: null
    }
})
const cities = ref(citiesMock);
const services = ref(Object.values(AdvertServiceType) as [key: string]);
const userState = useUserStore();
const { user } = storeToRefs(userState);
const { newPostModalProps, editModalProps } = toRefs(props);
const emit = defineEmits(['close', 'submit']);
const modalValue= ref(editModalProps.value ? {...editModalProps.value } : generateInitialValue() as IAdvert || {});
function hideModal() {
    emit('close', false)
    if(!editModalProps.value){
        modalValue.value = generateInitialValue()
    }
}

function submitModal() {
    if(modalValue.value.post.length < 1 || modalValue.value.header.length < 1){
       return false
    }else{
        emit('submit', modalValue.value)
        modalValue.value = generateInitialValue();
    }
}

function generateInitialValue(): IAdvert {
    const date = new Date();
    return {
        id: Number(date.getTime()),
        user: {...user.value},
        date: date,
        city: citiesMock[0],
        serviceType: AdvertServiceType.barber,
        header: "",
        post: ""
    }
}
</script>

<style scoped>

</style>