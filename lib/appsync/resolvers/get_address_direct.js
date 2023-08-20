import { util } from "@aws-appsync/utils";

export function request(ctx) {
	const { args } = ctx;
	const query = {
		expression: "#userId = :userId",
		expressionNames: {
			"#userId": "userId",
		},
		expressionValues: {
			":userId": args.userId,
		},
	};
	let filter;
	if (args.suburb || args.postCode) {
		filter = {
			expression: "",
			filterExpressionNames: {},
			filterExpressionValues: {},
		};
	}
	if (args.suburb) {
		if (filter.expression) {
			filter.expression += " AND ";
		}
		filter.expression += "#suburb = :suburb";
		filter.filterExpressionNames["#suburb"] = "suburb";
		filter.filterExpressionValues[":suburb"] = args.suburb;
	}
	if (args.postCode) {
		if (filter.expression) {
			filter.expression += " AND ";
		}
		filter.expression += "#postCode = :postCode";
		filter.filterExpressionNames["#postCode"] = "postCode";
		filter.filterExpressionValues[":postCode"] = args.postCode;
	}
	return {
		operation: "Query",
		index: "userId-createdAt-index",
		scanIndexForward: false,
		limit: 100, // Can be removed, hardcoded to 100 as of now
		query,
		filter,
	};
}

export function response(ctx) {
	const { result, error } = ctx;
	if (error) {
		return util.appendError(error.message, error.type, result);
	}
	const output = [];
	result.items.forEach((item) => {
		output.push({
			userId: item.userId,
			id: item.id,
			line1: item.address.line1,
			line2: item.address.line2,
			suburb: item.address.suburb,
			state: item.address.state,
			postCode: item.address.postCode,
			countryCode: item.address.countryCode,
		});
	});
	return output;
}
