import { App, Stack } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { logGroups } from "./log_groups";

export class CloudwatchStack extends Stack {
	constructor(app: App) {
		super(app, CloudwatchStack.name, {});
		const builderFunction = builder(this).buildCloudwatchLogGroup;
		Object.values(logGroups).map((logGroup) => {
			logGroup.awsEntity = builderFunction(logGroup.configuration);
		});
	}
}
