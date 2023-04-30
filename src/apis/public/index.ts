import { useQuery } from '@tanstack/react-query';
import { axiosInstance } from '@/middlewares/apiClient';

// ######################### Get All Categories #########################
async function getCategories() {
  const { data } = await axiosInstance({
    url: '/categories',
    method: 'GET',
  });
  return data;
}

export const useGetCategories = () => {
  return useQuery({
    queryKey: ['get-categories'],
    queryFn: getCategories,
  });
};

// ######################### Get All Brands #########################
async function getBrands() {
  const { data } = await axiosInstance({
    url: '/brands',
    method: 'GET',
  });
  return data;
}

export const useGetBrands = () => {
  return useQuery({
    queryKey: ['get-brands'],
    queryFn: getBrands,
  });
};
