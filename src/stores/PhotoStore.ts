// stores/PhotoStore.ts
import { makeAutoObservable } from 'mobx';

class PhotoStore {
  photos = [
    require('../assets/image1.jpg'),
    require('../assets/image2.jpg'),
    // Add more images as needed
  ];

  constructor() {
    makeAutoObservable(this);
  }
}

export default new PhotoStore();


// q57kiiBi0sFHoQanf1IaXLBvxquQnr6p1JgzCdn_l34
// 782368
// _bjzccol3amHOcD2DPNByv4o_ib9KwB24M0UrBlFPec