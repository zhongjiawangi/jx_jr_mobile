import servies from '@/utils/register';

export const test = (data) => servies('post', '/test', data)