import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import { GetStaticProps } from "next";
import { SetStateAction, useEffect, useState } from "react";
import Card from "../components/Card";
import View from "../components/normalizers/View";
import { NextBtn, Paginator } from "../components/Paginator";
import PillButton from "../components/PillButton";
import Separator from "../components/Separator";
import Typography from "../components/Typography";
import { colors } from "../constants/colors";
import { dialogDispatch } from "../constants/dialogs";
import { usePagination } from "../hooks/usePagination";
import mock from "../mockData.json";
import { apiService, toMapProduct } from "../service/service";
import { flex, wrap } from "../utils/flex";
import { media } from "../utils/media";

interface redeem {
  products: Product[];
  setToCart: React.Dispatch<SetStateAction<Product[]>>;
  setDialog: React.Dispatch<SetStateAction<dialogProps>>;
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
  paddingTop: "80px",
  "&>*": {
    marginBottom: 40,
  },
  ...media(1240, {
    ...wrap("space-evenly", "space-evenly"),
  }),
});

const NamedButtonPannel = styled.div({
  ...flex("flex-start"),
  flex: 1,
  ...media(1240, {
    flex: "unset",
    width: "100%",
    order: -1,
    ">*": {
      width: "50%",
    },
  }),
  ...media(890, {
    flexDirection: "column",
    h2: {
      alignSelf: "flex-start",
    },
  }),
  ...media(680, {
    ">*": {
      width: "80%",
    },
  }),
});

const ProductsViewer = styled.section({
  display: "grid",
  gap: "2em",
  gridTemplateColumns: "repeat(4, auto)",
  ...media(1240, {
    gridTemplateColumns: "repeat(3, auto)",
  }),
  ...media(810, {
    gridTemplateColumns: "repeat(2, auto)",
  }),
  ...media(520, {
    gridTemplateColumns: "repeat(1, auto)",
  }),
});

const Footer = styled.section({
  ...flex("space-between", "center"),
  margin: "50px auto !important",
  "&>*": {
    ...flex(),
  },
  ...media(1240, {
    ...wrap(),
    "div:first-child": {
      order: 1,
    },
    "div:nth-of-type(1)": {
      marginTop: "120px",
    },
  }),
  ...media(740, {
    marginBottom: "20px !important",
    "div:nth-of-type(2), div:nth-of-type(3)": {
      width: "100%",
    },
  }),
});

const ViewStyles: CSSObject = {
  "&>section": {
    width: "88%",
    margin: "auto",
  },
  ...media(1240, {
    "&>section": {
      width: "95%",
    },
  }),
};

const Reedem: React.FC<redeem> = ({ products, setToCart, setDialog }) => {
  const [orderBy, setOrderBy] = useState<orderBy>("Most Recent");
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const pagination = usePagination(itemsPerPage, products);
  const ProductCounter: React.FC = () => (
    <div
      style={{
        marginRight: "1em",
        borderRight: `solid 1px ${colors.fontSecondary}`,
      }}
    >
      <Typography variant="h2">
        {pagination[page - 1].length * page} of {products.length} products
      </Typography>
    </div>
  );

  useEffect(() => {
    setPage(() => 1);
  }, [itemsPerPage]);

  return (
    <View cssProps={ViewStyles}>
      <ControlsContainer>
        <ProductCounter />

        <NamedButtonPannel>
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
        </NamedButtonPannel>

        <NextBtn
          setPage={setPage}
          right={true}
          isLastPage={page === pagination.length}
          isFirstPage={page === 1}
        />
      </ControlsContainer>
      <Separator mb={40} />
      <ProductsViewer>
        {pagination[page - 1].map((product, i) => (
          <Card
            product={product}
            setRedeem={() => {
              setToCart((products) => [...products, product]);
              setDialog(() => ({
                id: dialogDispatch.addToBag,
                title: product.name,
              }));
            }}
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
      <Footer>
        <ProductCounter />
        <Paginator
          curentPage={page}
          {...{ itemsPerPage, setItemsPerPage, setPage }}
          totalPages={pagination.length}
        />
      </Footer>
      <Separator mb={100} />
    </View>
  );
};

export default Reedem;
