import { useQuery } from '@tanstack/react-query';
import useAxiosPrivate from '@/hooks/useAxiosPrivate';
import axiosDefault from '../axios';

// ######################### Get All Categories #########################
async function getCategories() {
  const { data } = await axiosDefault({
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
  const { data } = await axiosDefault({
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

export function useGetUsers() {
  const axiosPrivate = useAxiosPrivate();

  return useQuery({
    queryKey: ['get-users'],
    queryFn: async () => {
      const { data } = await axiosPrivate({ url: '/users' });
      return data;
    },
  });
}
