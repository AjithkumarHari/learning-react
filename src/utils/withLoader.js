import { useLoader } from '../context/LoaderContext';

export const useWithLoader = () => {
    const { showLoader, hideLoader } = useLoader();

    const withLoader = async (asyncFn) => {
        try {
            showLoader();
            const result = await asyncFn();
            hideLoader();
            return result;
        } catch (error) {
            hideLoader();
            throw error; // Let the caller handle it
        }
    };

    return withLoader;
};