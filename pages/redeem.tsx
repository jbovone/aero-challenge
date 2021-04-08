import { CSSObject } from "@emotion/css";
import styled from "@emotion/styled";
import { GetStaticProps } from "next";
import { Dispatch, useState } from "react";
import Card from "../components/Card";
import View from "../components/normalizers/View";
import { NextBtn, Paginator } from "../components/Paginator";
import PillButton from "../components/PillButton";
import Separator from "../components/Separator";
import Typography from "../components/Typography";
import { colors } from "../constants/colors";
import { usePagination } from "../hooks/usePagination";
import mock from "../mockData.json";
import { apiService, toMapProduct } from "../service/service";
import { flex, wrap } from "../utils/flex";
import { media } from "../utils/media";
import { useSorted } from "../hooks/useSorted";
import Head from "next/head";
import { motion } from "framer-motion";
import Header from "../components/Header";

interface redeem {
  products: Product[];
  user: user;
  cart: Product[];
  appDispatch: Dispatch<action>;
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

const ControlsContainer = styled.section({
  ...flex("flex-start"),
  paddingTop: "80px",

  ...media(1240, {
    ...wrap("space-evenly", "space-evenly"),
  }),
});

const NamedButtonPannel = styled.div({
  ...flex("flex-start"),
  flex: 1,
  minHeight: "20vh",

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
    justifyContent: "space-between",
    height: 230,
    marginBottom: 40,
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
  position: "relative",
  justifyContent: "center",
  minHeight: "50vh",
  gridTemplateColumns: "repeat(4, 22%)",
  ...media(1240, {
    gridTemplateColumns: "repeat(3, 30%)",
  }),
  ...media(810, {
    gridTemplateColumns: "repeat(2, 47%)",
  }),
  ...media(520, {
    gridTemplateColumns: "repeat(1, 97%)",
  }),
});

const Footer = styled.section({
  ...flex("space-between", "center"),
  margin: "30px auto !important",

  "&>*": {
    ...flex(),
  },
  ...media(1240, {
    minHeight: 260,
    ...wrap("space-evenly", "space-evenly"),
    "div:nth-of-type(1)": {
      order: 1,
      width: "100%",
    },
  }),
  ...media(740, {
    marginBottom: "20px",
    "div:nth-of-type(2), div:nth-of-type(3)": {
      width: "100%",
    },
  }),
});

const ViewStyles: CSSObject = {
  "&>section": {
    width: "80%",
    margin: "auto",
  },
  ...media(1240, {
    "&>section": {
      width: "95%",
    },
  }),
};

const Reedem: React.FC<redeem> = ({ products, user, cart, appDispatch }) => {
  const { redeemHistory, points } = user;
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [page, setPage] = useState<number>(1);
  const { activeOrder, assorted, setOrderBy, orderTypes } = useSorted(products);
  const pagination = usePagination(itemsPerPage, assorted);

  const ProductCounter: React.FC = () => {
    const ProductCounterContainer = styled.div({
      marginRight: 10,
      paddingRight: 15,
      borderRight: `solid 1px ${colors.fontSecondary}`,
      whiteSpace: "nowrap",
      maxWidth: 250,
    });
    return (
      <ProductCounterContainer>
        <Typography variant="h3">
          {pagination[page - 1].length * page} of {products.length} products
        </Typography>
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
        <ControlsContainer>
          <ProductCounter />

          <NamedButtonPannel>
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
                redeemed={redeemHistory.some((item) => item.id === product.id)}
                bagged={cart.some((item) => item.id === product.id)}
                product={product}
                points={points}
                setRedeem={() =>
                  appDispatch({ type: "addToCart", payload: product })
                }
              />
            </motion.div>
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
        <Separator mb={70} />
      </View>
    </>
  );
};

export default Reedem;
