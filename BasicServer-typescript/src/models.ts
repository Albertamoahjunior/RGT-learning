import {z} from 'zod';

//model for users
export interface User{
  id: number;
  name: string;
  age: number;
}


export const UserSchema = z.object(
  {
    id: z.number(),
    name: z.string(),
    age: z.number()
  }
)

export type users = {
  id: number;
  name: string;
  age: number;
}
