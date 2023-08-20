import { util } from "@aws-appsync/utils";

export function request(ctx) {
	const { args } = ctx;
	const requestData = {
		operation: "Invoke",
		payload: {
			action: "getAddress",
			payload: {
				userId: args.userId,
			},
		},
	};
	if (args.suburb) requestData.payload.suburb = args.suburb;
	if (args.postCode) requestData.payload.postCode = args.postCode;
	return requestData;
}

export function response(ctx) {
	const { result, error } = ctx;
	if (error) {
		return util.appendError(error.message, error.type, result);
	}
	const body = JSON.parse(result.body);
	if (result.statusCode !== 200) {
		return util.appendError(body.message, body.code, body);
	}
	const data = body.data;
	return data.addresses;
}
