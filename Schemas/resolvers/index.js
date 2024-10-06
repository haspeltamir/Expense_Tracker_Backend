import { mergeResolvers } from "@graphql-tools/merge";

import usersResolver from "./user.resolver.js";
import transactionsResolver from "./transaction.resolver.js";

const mergedResolvers = mergeResolvers([usersResolver, transactionsResolver]);

export default mergedResolvers;
