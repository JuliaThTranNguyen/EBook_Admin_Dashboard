import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { RootStatetype } from "../redux/store"

const useAppSelector: TypedUseSelectorHook<RootStatetype> = useSelector;

export default useAppSelector;