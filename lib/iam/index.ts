import { App, Stack } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { roles } from "./roles";

export class IAMStack extends Stack {
	constructor(app: App) {
		super(app, IAMStack.name, {});
		const builderFunction = builder(this).buildIAMRole;
		Object.values(roles).map((role) => {
			role.awsEntity = builderFunction(role.configuration);
		});
	}
}
