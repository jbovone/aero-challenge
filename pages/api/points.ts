import { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "../../service/service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log(
    "--------------------------points-API--------------------------------"
  );
  console.log(req.body, "BODY");

  const codes = {
    1000: ["1FG2", "YF9L"],
    5000: ["ARLM", "12ND"],
    7500: ["3DFG", "AKHF"],
  }; //lets similulate some table queries, lets keep it simple.

  const {
    code,
    points,
  }: { points: "1000" | "5000" | "7500"; code: string } = req.body.data;

  if (
    code.length !== 4 ||
    !Object.keys(codes).includes(points + "") ||
    !codes[points].includes(code + "")
  ) {
    return res.status(400).end();
  }

  apiService("/user/points", "POST", { amount: points })
    .then((apiRes) => {
      if (apiRes.isAxiosError) {
        return res.status(404).end();
      }
      res.status(200).end();
    })
    .catch(() => res.status(404).end());
}
