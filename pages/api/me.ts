import { NextApiRequest, NextApiResponse } from "next";
import { apiService } from "../../service/service";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(
    "--------------------------AUTH-API--------------------------------"
  );

  return apiService("/user/me", "GET")
    .then((apiRes) => res.send(apiRes))
    .catch(() => res.status(404).end());
}
