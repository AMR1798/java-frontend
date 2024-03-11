
interface Sort {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
}

interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: true;
    unpaged: true;
}



interface Paginate<T> {
    content: T[];
    pageable: Pageable;
    totalElements: number;
    last: boolean;
    totalPage: number;
    size: 20;
    number: number;
    sort: Sort;
    numberOfElements: number;
    first: boolean;
    empty: boolean;
}

export { Paginate }