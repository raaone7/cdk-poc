import { App, Stack } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { apis } from "./apis";

export class AppSyncStack extends Stack {
	constructor(app: App) {
		super(app, AppSyncStack.name, {});
		const builderFunction = builder(this).buildAppSyncAPI;
		Object.values(apis).map((api) => {
			api.awsEntity = builderFunction(api.configuration);
		});
	}
}
