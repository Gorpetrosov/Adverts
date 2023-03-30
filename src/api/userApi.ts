import type {IUser} from "@/types/user";
import {getUser, storeUser} from "@/services/storage";
import {usersMock} from "@/api/mocks/usersMock";

function  getUserApi(): Promise<IUser> {
    const storageUser = getUser();
    if(!storageUser) {
        storeUser(usersMock.find((user: IUser) => user.id === 3) as IUser);
        return  Promise.resolve(getUser());
    }
    return  Promise.resolve(storageUser);
}
export  {
    getUserApi
}