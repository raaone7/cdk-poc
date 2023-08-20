import { util } from "@aws-appsync/utils";

export function request(ctx) {
	const { args } = ctx;
	return {
		operation: "Invoke",
		payload: {
			action: "addAddress",
			payload: {
				userId: args.input.userId,
				address: args.input,
			},
		},
	};
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
	const data = body.data.addressDBItem;
	return {
		userId: data.userId,
		id: data.id,
		line1: data.address.line1,
		line2: data.address.line2,
		suburb: data.address.suburb,
		state: data.address.state,
		postCode: data.address.postCode,
		countryCode: data.address.countryCode,
	};
}
