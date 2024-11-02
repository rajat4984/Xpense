import { ActionReducerMap } from "@ngrx/store";
import { globalReducer,globalStateInterface } from "./global/global.reducers";

export interface AppState{
    global:globalStateInterface,
}

export  const reducers:ActionReducerMap<AppState> = {
    global:globalReducer,
}