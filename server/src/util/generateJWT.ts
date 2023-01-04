import jsonwebtoken from "jsonwebtoken";
import { User } from "../@types/user";
import { PRIVATE_KEY } from "../middleware/auth";

export default function (user: User) {
  const token = jsonwebtoken.sign(
    {
      user: JSON.stringify({
        name: user.name,
        email: user.email,
        id: user.id,
      }),
    },
    PRIVATE_KEY,
    { expiresIn: "12h" }
  );

  return token;
}
