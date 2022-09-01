type UserError = {
  message: string;
};

export interface Response<model> {
  userErrors: UserError[];
  data?: model;
}
