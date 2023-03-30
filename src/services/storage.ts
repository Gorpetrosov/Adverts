import type { IAdvert } from '@/types/avdert';
import type {IUser} from "@/types/user";

const itemNames = {
  adverts: 'adverts',
  user: 'user',
};

export const getAdverts = (): IAdvert[] => {
  const json = localStorage.getItem(itemNames.adverts);
  const adverts = json ? JSON.parse(json) : [];
  return adverts as IAdvert[];
};

export const updateAdverts = (adverts: IAdvert[]): void => {
  localStorage.setItem(itemNames.adverts, JSON.stringify(adverts));
}

//Store "auth" user info into localStorage....,btw not good practise
export const storeUser = (user: IUser): void => {
  localStorage.setItem(itemNames.user, JSON.stringify(user))
}

//Get "auth" user info into localStorage
export const getUser = (): IUser =>{
  const json = localStorage.getItem(itemNames.user);
  const user = json ? JSON.parse(json) : null;
  return user as IUser;
}