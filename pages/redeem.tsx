import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import { GetStaticProps } from "next";
import { Dispatch, useState, useEffect } from "react";
import Card from "../components/Card";
import View from "../components/normalizers/View";
import { NextBtn, Paginator } from "../components/Paginator";
import PillButton from "../components/PillButton";
import Separator from "../components/Separator";
import Typography from "../components/Typography";
import { colors } from "../constants/colors";
import { usePagination } from "../hooks/usePagination";
import { apiService, toMapProduct } from "../service/service";
import { flex } from "../utils/flex";
import { media } from "../utils/media";
import { useSorted } from "../hooks/useSorted";
import Head from "next/head";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Error from "next/error";

interface redeem {
  products: Product[];
  user: user;
  cart: Product[];
  isAuth: boolean;
  appDispatch: Dispatch<action>;
}

export const getStaticProps: GetStaticProps = async (props) => {
  const products = toMapProduct(await apiService("/products", "GET"));
  return {
    props: {
      products,
    },
  };
};

const ButtonPannel = styled.div({
  ...flex("flex-start"),
  minHeight: 120,
  marginTop: 40,
  ...media(890, {
    flexDirection: "column",
    justifyContent: "space-between",
    height: 230,
    marginBottom: 40,
    ">*": {
      width: "80%",
    },
    h2: {
      alignSelf: "flex-start",
    },
  }),
});

const ProductsViewer = styled.section({
  display: "grid",
  gap: "2em",
  justifyContent: "center",
  minHeight: "50vh",
  gridTemplateColumns: "repeat(4, 23.5%)",
  ...media(1440, {
    gridTemplateColumns: "repeat(3, 30%)",
  }),
  ...media(810, {
    gridTemplateColumns: "repeat(2, 45%)",
  }),
  ...media(520, {
    gridTemplateColumns: "repeat(1, minMax(270px, 68%))",
  }),
});

const ProductCounterContainer = styled.div({
  padding: "5px 20px",
  ...flex("center", "center", "column"),
  flexWrap: "wrap",
  whiteSpace: "nowrap",
});

const ViewStyles: CSSObject = {
  "&>*": {
    width: "80%",
    margin: "auto",
  },
  ...media(1240, {
    "&>*": {
      width: "95%",
    },
  }),
};

const Reedem: React.FC<redeem> = ({
  products,
  user,
  cart,
  appDispatch,
  isAuth,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const { activeOrder, assorted, setOrderBy, orderTypes } = useSorted(products);
  const pagination = usePagination(itemsPerPage, assorted);

  if (!isAuth) return <Error statusCode={404} />;

  const ProductCounter: React.FC = () => {
    return (
      <ProductCounterContainer>
        <Typography
          variant="h4"
          cssProps={{
            borderRight: `solid 1px ${colors.fontSecondary}`,
            padding: "5px 18px",
            alignSelf: "flex-end",
          }}
        >
          {pagination[page - 1].length * page} of {products.length} products
        </Typography>
        <Separator width="100%" mt={20} mb={40} />
      </ProductCounterContainer>
    );
  };

  return (
    <>
      <Header />
      <View cssProps={ViewStyles}>
        <Head>
          <title>Redeem your Points</title>
          <link rel="icon" href="/images/icons/aerolab-logo.svg" />
        </Head>
        <ButtonPannel>
          <Typography color="fontSecondary" variant="h3">
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
              active={type === activeOrder}
            />
          ))}
        </ButtonPannel>
        <ProductCounter />
        <ProductsViewer>
          {pagination[page - 1].map((product, i) => (
            <motion.div
              initial="fade"
              layout
              key={product.id}
              animate={{
                opacity: 1,
                y: 0,
              }}
            >
              <Card
                bagged={cart.some((item) => item.id === product.id)}
                product={product}
                points={user.points}
                setRedeem={() =>
                  appDispatch({ type: "addToCart", payload: product })
                }
              />
            </motion.div>
          ))}
        </ProductsViewer>
        <Paginator
          curentPage={page}
          {...{ itemsPerPage, setItemsPerPage, setPage }}
          totalPages={pagination.length}
        />
        <ProductCounter />
      </View>
    </>
  );
};

export default Reedem;
