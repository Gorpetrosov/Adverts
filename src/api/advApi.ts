import { getAdverts, updateAdverts } from '@/services/storage';
import type { IAdvert } from '@/types/avdert';
import { advertListMock } from '@/api/mocks/advMock';
import type { ISearch } from "@/types/search";


 function getAdvertsApi(): Promise<IAdvert[]> {
    const storageAdverts = getAdverts();

    if (storageAdverts.length > 0) {
      return Promise.resolve(storageAdverts);
    }

    updateAdverts(advertListMock);

    return Promise.resolve(advertListMock);
  }
 function addAdvertApi(advert: IAdvert): Promise<void> {
    const adverts = getAdverts();

    adverts.push(advert);
    updateAdverts(adverts);
    return Promise.resolve();
  }
  function removeAdvertApi(advertId: number): Promise<void> {
    let storageAdverts = getAdverts();

     storageAdverts = storageAdverts.filter((advertise: IAdvert) => advertise.id !== advertId)
     updateAdverts(storageAdverts);
    return Promise.resolve();
  }

  function searchAdvertApi(searchObj: ISearch): Promise<IAdvert[]> {
      const storageAdverts = getAdverts();
      return Promise.resolve(storageAdverts.filter((adv: IAdvert) => adv.city.name === searchObj.city.name && adv.serviceType === searchObj.serviceType))
  }

  export {
    getAdvertsApi, addAdvertApi, removeAdvertApi, searchAdvertApi
  }
