import {defineStore} from "pinia";
import type {IUser} from "@/types/user";
import {getUserApi} from "@/api/userApi"

export const useUserStore = defineStore( "user", {
    state: () => ({
        user: {} as IUser,
    }),
    getters: {
        getAuthUser: (state) => (): IUser => state.user

    },
    actions: {
        async getAuth() {
            this.user = await getUserApi();
        }
    }
})