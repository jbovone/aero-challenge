import { SetStateAction, useState, useEffect } from "react";
import { GetStaticProps } from "next";
import Card from "../components/Card";
import View from "../components/normalizers/View";
import { flex, wrap } from "../utils/flex";
import mock from "../mockData.json";
import Typography from "../components/Typography";
import { apiService, toMapProduct } from "../service/service";
import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import PillButton from "../components/PillButton";
import { usePagination } from "../hooks/usePagination";
import PaginationIcon from "../components/svg/PaginationIcon";
import Button from "../components/normalizers/Button";
import Separator from "../components/Separator";
import { colors } from "../constants/colors";
import { Input, Select } from "../components/FancyInputs";

interface redeem {
  products: Product[];
  setToCart: React.Dispatch<SetStateAction<Product[]>>;
}

export const getStaticProps: GetStaticProps = async (props) => {
  if (process.env.NODE_ENV === "development") {
    return {
      props: {
        products: toMapProduct(mock),
      },
    };
  }
  const products = toMapProduct(await apiService("/products", "GET"));
  return {
    props: {
      products,
    },
  };
};

const orderTypes: orderBy[] = ["Most Recent", "Lowest Price", "Highest Price"];

const ControlsContainer = styled.section({
  ...flex("flex-start"),
  padding: "35px 0",
  paddingTop: "60px",
  "&>*": {
    margin: "0 .7em",
  },
  ".sort": {
    ...flex("flex-start"),
    flex: 1,
    "&>*": {
      margin: "0 .7em",
    },
  },
});
const ProductsViewer = styled.section({
  ...flex("flex-start"),
  ...wrap(),
  padding: 20,
});
const VSeparator = styled.div({
  height: "50px",
  width: "0.5px",
  margin: 2,
  background: colors.fontSecondary,
});
const ViewStyles: CSSObject = {
  "&>section": {
    width: "88%",
    margin: "auto",
  },
};

const Reedem: React.FC<redeem> = ({ products, setToCart }) => {
  const [orderBy, setOrderBy] = useState<orderBy>("Most Recent");
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const pagination = usePagination(itemsPerPage, products);
  const ProductCounter: React.FC = () => (
    <>
      <Typography variant="h2">
        {pagination[page - 1].length * page} of {products.length} products
      </Typography>
      <VSeparator />
    </>
  );
  const NextBtn = ({ right }: { right: boolean }) => (
    <Button
      disabled={right ? page === pagination.length : page === 1}
      onClick={() => (right ? setPage((i) => i + 1) : setPage((i) => i - 1))}
    >
      <PaginationIcon left={!right} />
    </Button>
  );

  useEffect(() => {
    setPage(() => 1);
  }, [itemsPerPage]);

  function handlePageChange(value: string | "") {
    if (!value) return;
    if (isPageValid(value)) {
      setPage(() => parseInt(value));
    }
  }
  function isPageValid(value: string) {
    return Boolean(
      parseInt(value) >= 1 && parseInt(value) <= pagination.length
    );
  }

  return (
    <View cssProps={ViewStyles}>
      <ControlsContainer>
        <ProductCounter />
        <div className="sort">
          <Typography color={colors.fontSecondary} variant="h2">
            Sort by :
          </Typography>
          {orderTypes.map((type, i) => (
            <PillButton
              key={i}
              onClick={(e) => {
                setOrderBy(() => type);
                e.currentTarget.blur();
              }}
              title={type}
              active={type === orderBy}
            />
          ))}
        </div>
        <NextBtn right={true} />
      </ControlsContainer>
      <Separator />
      <ProductsViewer>
        {pagination[page - 1].map((product, i) => (
          <Card
            product={product}
            setToCart={setToCart}
            key={product.id}
            order={
              {
                "Most Recent": i,
                "Lowest Price": product.cost,
                "Highest Price": -product.cost,
              }[orderBy]
            }
          />
        ))}
      </ProductsViewer>
      <ControlsContainer>
        <ProductCounter />
        <div className="sort">
          <NextBtn right={false} />
          <Typography>Go to page</Typography>
          <Input
            onChange={handlePageChange}
            initialState={String(page)}
            imperativeSetValue={String(page)}
          />
          <Typography>of {pagination.length}</Typography>
          <NextBtn right={true} />
        </div>
        <Typography>Showing</Typography>
        <Select
          values={[4, 8, 12, 16]}
          setValue={setItemsPerPage}
          value={String(itemsPerPage)}
        />
        <Typography>Products per Page</Typography>
      </ControlsContainer>
      <Separator />
    </View>
  );
};

export default Reedem;
