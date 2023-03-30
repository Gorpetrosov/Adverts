<template>
    <q-item v-ripple>
        <q-item-section avatar>
            <q-badge color="teal" :label="advertise?.serviceType" />
            <q-badge color="green" :label="advertise?.city.name" />
            <q-item-section>
            <q-badge color="orange" :label="advertise?.user.name" />
            <q-badge color="orange" :label="advertise?.date.toLocaleString()" />
            </q-item-section>
        </q-item-section>
        <q-item-section class="cursor-pointer" clickable @click="showPost(advertise?.id)">
            <h3 class="fa-underline">{{advertise.header}}</h3>
            <p>{{advertise?.post}}</p>
        </q-item-section>
        <q-item-section side>
            <q-btn v-if="user.id === advertise.user.id && showActions" @click="removePost(advertise.id)" style="background: #FF0080; color: white" label="Delete" />
            <q-btn v-if="user.id === advertise.user.id && showActions" @click="editPost(advertise.id)" style="background: #0040ff; color: white" label="Edit" />
        </q-item-section>
    </q-item>
    <q-separator spaced inset />
</template>

<script lang="ts" setup>
import {toRefs} from 'vue'
import {storeToRefs} from "pinia";
import {useUserStore} from "@/stores/user";

const {user} = storeToRefs(useUserStore());

const props = defineProps({
    advertise: {
        type: Object,
        required: true
    },
    showActions: {
        type: Boolean,
        default: false
    }
})
const { advertise, showActions } = toRefs(props)
const emit = defineEmits(['edit', 'delete', 'show'])

function showPost(id: number){
    emit('show', id)
}
function removePost(id: number){
    emit('delete', id)
}
function editPost(id: number){
    emit('edit', id)
}
</script>

<style scoped>

</style>