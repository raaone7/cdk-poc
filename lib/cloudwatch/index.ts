import { App, Stack } from "aws-cdk-lib";
import { logGroups } from "./log_groups";
import { builder } from "../_core/builder";

export class CloudwatchStack extends Stack {
	constructor(app: App) {
		super(app, CloudwatchStack.name, {});
		const builderFunction = builder(this).buildCloudwatchLogGroup;
		Object.values(logGroups).map((logGroup) => {
			logGroup.awsEntity = builderFunction(logGroup.configuration);
		});
	}
}
