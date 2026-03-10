import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { setError, setLoading, syncInventory } from "../redux/inventorySlice";
import { onValue, ref } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export const useInventorySync = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setLoading());
        const inventoryRef = ref(db, 'inventory');

        const unsubscribe = onValue(inventoryRef, (snapshot) => {
            const data = snapshot.val();

            if (data) {
                const formattedData = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }))
                dispatch(syncInventory(formattedData))
            } else {
                dispatch(syncInventory([]))
            }
        }, (error) => {
            dispatch(setError(error.message))
        });

        return () => unsubscribe();
    }, [dispatch])
}