import { css, CSSObject, SerializedStyles } from "@emotion/react";
import React, {
  SetStateAction,
  SyntheticEvent,
  useState,
  useEffect,
} from "react";
import { flex } from "../utils/flex";
import { media } from "../utils/media";
import { Input, Select } from "./FancyInputs";
import Button from "./normalizers/Button";
import PaginationIcon from "./svg/PaginationIcon";
import Typography from "./Typography";

interface PaginatorProps {
  totalPages: number;
  currentPage: number;
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
  currentPage,
  itemsPerPage,
  setItemsPerPage,
}) => {
  const [value, setValue] = useState("1");
  useEffect(() => {
    if (currentPage !== Number(value)) {
      setValue(() => String(currentPage));
    }
  }, [currentPage]);

  function handlePageChange(value: string | "") {
    setValue(() => (value.length > 1 ? value[value.length - 1] : value));
    if (isPageValid(value)) {
      setPage(() => parseInt(value));
    }
  }

  function isPageValid(page: string) {
    return Boolean(parseInt(page) >= 1 && parseInt(page) <= totalPages);
  }
  const inputStyle: CSSObject = {
    maxWidth: 45,
    textAlign: "center",
  };
  const style = css({
    ...flex("space-evenly", "center"),
    padding: 20,
    "&>div": {
      ...flex(),
      margin: "20px 10px",
    },
    ...media(760, {
      ...flex("space-evenly", "center", "column"),
    }),
  });

  return (
    <div css={style}>
      <div>
        <NextBtn
          setPage={setPage}
          right={false}
          isLastPage={currentPage === totalPages}
          isFirstPage={currentPage === 1}
        />
        <Typography>Go to page</Typography>
        <Input
          onChange={({
            currentTarget: { value },
          }: SyntheticEvent<HTMLInputElement>) => handlePageChange(value)}
          value={value}
          cssProps={inputStyle}
        />
        <Typography>of {totalPages}</Typography>
        <NextBtn
          setPage={setPage}
          right={true}
          isLastPage={currentPage === totalPages}
          isFirstPage={currentPage === 1}
        />
      </div>
      <div>
        <Typography>Showing</Typography>
        <Select
          values={[4, 5, 8, 10, 12, 16]}
          setValue={(itemsPerPage) => {
            setItemsPerPage(itemsPerPage);
            setPage(() => 1);
          }}
          value={String(itemsPerPage)}
        />
        <Typography>Products per Page</Typography>
      </div>
    </div>
  );
};
