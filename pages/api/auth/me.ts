import { NextApiRequest, NextApiResponse } from "next";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(
    "--------------------------COINS-API--------------------------------"
  );
  if (process.env.NODE_ENV === "development") {
    return res.status(200).json({
      _id: "some_id",
      name: "Julian",
      points: 2310,
      createDate: "2021-02-26T19:46:18.528Z",
      redeemHistory: [],
      __v: 0,
    });
  }
}
