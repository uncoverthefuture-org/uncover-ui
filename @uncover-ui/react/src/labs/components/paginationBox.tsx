import React from "react";
import { Pagination } from "react-bootstrap"
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

export  interface PaginationBoxProps {
    count: number;
    total: number;
    curPage?: number;
    onChange?: (page: number) => void;
}
export const PaginationBox: React.FC<PaginationBoxProps> = ({
    count,
    total,
    curPage = 1,
    onChange = () => {}
}) => {
    return (
        <Pagination className="pagination-right d-flex justify-content-between align-items-center gap-2">
            <Pagination.Prev
                onClick={() => onChange(curPage - 1)}
                disabled={Boolean(curPage === 1)}
                className="pagination-btn"
            ><BsChevronLeft /></Pagination.Prev>
            {Array.from(
                { length: Math.ceil(total / count) },
                (_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={((index + 1) === curPage)}
                        onClick={() => onChange(index + 1)}
                        className="pagination-btn"
                        
                    >
                        {index + 1}
                    </Pagination.Item>
                )
            )}
            <Pagination.Next
                onClick={() => onChange(curPage + 1)}
                disabled={curPage === Math.ceil(total / count)}
                className="pagination-btn"
            >
                <BsChevronRight />
            </Pagination.Next>
        </Pagination>
    )
}