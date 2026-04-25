import { ref } from 'vue';

export function usePagination(defaultSize: number = 12) {
    const page = ref(0);
    const size = ref(defaultSize);
    const totalElements = ref(0);
    const totalPages = ref(0);

    const changePage = async (newPage: number) => {
        page.value = newPage;
    }

    const changeSize = (newSize: number) => {
        size.value = newSize;
        page.value = 0;
    };

    const setPaginationData = (elements: number, pages: number)=>{
        totalElements.value = elements;
        totalPages.value = pages
    }

    return {
        page,
        size,
        totalElements,
        totalPages,
        changePage,
        changeSize,
        setPaginationData
    }

}