import { Cloudinary } from '@cloudinary/url-gen';
import axios from 'axios';

export const uploadToCloudinary = async (image) => {
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'zanntruongg',
    },
  });
};
