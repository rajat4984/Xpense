import { createReducer, on } from '@ngrx/store';
import { getUser } from './user.actions';

export interface userStateInterface {
  userId: string | null;
}

export  const userState: userStateInterface = {
    userId:null,
}


// export const userReducer = createReducer(
//     userState,
//     on(getuser)
// )
