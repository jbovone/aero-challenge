import React, { SetStateAction } from "react";
import { Input, Select } from "./FancyInputs";
import Button from "./normalizers/Button";
import PaginationIcon from "./svg/PaginationIcon";
import Typography from "./Typography";

interface PaginatorProps {
  totalPages: number;
  curentPage: number;
  itemsPerPage: number;
  setPage: React.Dispatch<SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<SetStateAction<number>>;
}
interface nextBtnProps {
  right: boolean;
  setPage: React.Dispatch<SetStateAction<number>>;
  isLastPage: boolean;
  isFirstPage: boolean;
}

export const NextBtn: React.FC<nextBtnProps> = ({
  right,
  setPage,
  isFirstPage,
  isLastPage,
}) => (
  <Button
    disabled={right ? isLastPage : isFirstPage}
    onClick={() => (right ? setPage((i) => i + 1) : setPage((i) => i - 1))}
  >
    <PaginationIcon left={!right} />
  </Button>
);

export const Paginator: React.FC<PaginatorProps> = ({
  setPage,
  totalPages,
  curentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  function handlePageChange(value: string | "") {
    if (!value) return;
    if (isPageValid(value)) {
      setPage(() => parseInt(value));
    }
  }
  function isPageValid(page: string) {
    return Boolean(parseInt(page) >= 1 && parseInt(page) <= totalPages);
  }
  return (
    <>
      <div>
        <NextBtn
          setPage={setPage}
          right={false}
          isLastPage={curentPage === totalPages}
          isFirstPage={curentPage === 1}
        />
        <Typography>Go to page</Typography>
        <Input
          onChange={handlePageChange}
          initialState={String(curentPage)}
          imperativeSetValue={String(curentPage)}
        />
        <Typography>of {totalPages}</Typography>
        <NextBtn
          setPage={setPage}
          right={true}
          isLastPage={curentPage === totalPages}
          isFirstPage={curentPage === 1}
        />
      </div>
      <div>
        <Typography>Showing</Typography>
        <Select
          values={[4, 8, 12, 16]}
          setValue={(itemsPerPage) => {
            setItemsPerPage(itemsPerPage);
            setPage(() => 1);
          }}
          value={String(itemsPerPage)}
        />
        <Typography>Products per Page</Typography>
      </div>
    </>
  );
};
