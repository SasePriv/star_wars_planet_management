import { Pagination, Form } from 'react-bootstrap';
import './style.css'

export interface CustomPaginationProps {
    total: number;
    current: number;
    onChangePage: (page: number) => void;
    pageSize: number;
    onChangePageSize: (size: number) => void;
}

function CustomPagination({ total, current, onChangePage, onChangePageSize, pageSize }: CustomPaginationProps) {
    const items: JSX.Element[] = [];

    if (current > 1) {
        items.push(<Pagination.Prev key="prev" onClick={() => onChangePage(current -1)}/>)
    }

    for (let page = 1; page <= total; page ++) {
        items.push(
            <Pagination.Item key={page} data-page={page} active={page === current} onClick={() => onChangePage(page)}>
                {page}
            </Pagination.Item>
        )
    }

    if (current < total) {
        items.push(<Pagination.Next key="next" onClick={() => onChangePage(current +1)} />)
    }

    return(
        <div className="pagination">
            <Pagination >
                {items}
            </Pagination>
            {items.length > 0 && <Form.Select
                onChange={
                    (e: React.ChangeEvent<HTMLSelectElement>) => onChangePageSize(Number(e.currentTarget.value))
                }
                className="page-size"
                size="sm"
                aria-label="Select page size"
                value={pageSize}
            >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="30">30</option>
            </Form.Select>}
        </div>
    )
}

export default CustomPagination;