import {defineStore} from "pinia";
import type {IAdvert} from "@/types/avdert";
import {addAdvertApi, getAdvertsApi, removeAdvertApi, searchAdvertApi} from "@/api/advApi";
import type {ISearch} from "@/types/search";

export const useAdvertiseStore = defineStore( "advertise", {
    state: () => ({
        advertises: [] as IAdvert[],
        advertisesBySearch: [] as IAdvert[],
    }),
    getters: {
        // In real project it should be an action with request to server, and if there would not be any record matching to the id then it should redirect to 404
        getAdvertisesByUserId: (state) => (id: number): [] | IAdvert[] => state.advertises.filter((item: IAdvert) => item.user.id === id),
        // In real project it should be an action with request to server, and if there would not be any record matching to the id then it should redirect to 404
        getAdvertisesById: (state) => (id: number): undefined | IAdvert => state.advertises.find((item: IAdvert) => item.id === id),
    },
    actions: {
        async getAdvertises(): Promise<void> {
            try {
                this.advertises = this.advertisesBySearch =  await getAdvertsApi();
            }catch (e) {
                console.error(e)
            }
        },
        async removeAdvertise(id: number) {
           try {
               await removeAdvertApi(id);
           }catch (e) {
               console.error(e)
           }
        },
        async editAdvertise(id: number) {
            // this.advertises = await getUserApi();
        },
        async addAdvertise(adv: IAdvert) {
             try {
                 await addAdvertApi(adv);
                 return adv
             }catch (e) {
                 console.error(e)
             }
        },
        async searchAdvertise(searchObj: ISearch): Promise<void> {
            try {
                this.advertisesBySearch = await searchAdvertApi(searchObj);
                console.log({dd: this.advertisesBySearch})
            }catch (e) {
                console.error(e)
            }
        }
    }
})