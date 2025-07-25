// ImageStore.ts
import { makeAutoObservable, runInAction } from 'mobx';
import axios from 'axios';

class ImageStore {
  images: { id: string; uri: string; urif: string }[] = [];
  page: number = 1;
  isLoading: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  resetImages() {
    this.images = [];
    this.page = 1;
  }

  async fetchImages() {
    if (this.isLoading) return;

    this.isLoading = true;
    try {
      const response = await axios.get('https://api.unsplash.com/photos/random', {
        params: {
          client_id: 'q57kiiBi0sFHoQanf1IaXLBvxquQnr6p1JgzCdn_l34',
          count: 20,
        },
      });

      const newImages = response.data.map((img: any) => ({
        id: img.id,
        uri: img.urls.small,
        urif: img.urls.full,
      }));

      runInAction(() => {
        this.images = [...this.images, ...newImages];
        this.page += 1;
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
      console.error('Error fetching images from Unsplash:', error);
    }
  }
}

const imageStore = new ImageStore();
export default imageStore;
