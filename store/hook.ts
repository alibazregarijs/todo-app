import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from "react-redux";

import { AppDispatch, RootState } from "./store";

type DispatchFuntion = () => AppDispatch;

export const useTodoDispatch: DispatchFuntion = useDispatch;

export const useTodoSelector: TypedUseSelectorHook<RootState> = useSelector;
