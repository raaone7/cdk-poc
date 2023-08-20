import { App, Stack, StackProps } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { logGroups } from "./log_groups";
import { LogGroup } from "aws-cdk-lib/aws-logs";

export class CloudwatchStack extends Stack {
	logGroups: Map<string, LogGroup> = new Map();
	constructor(app: App, props: StackProps) {
		super(app, CloudwatchStack.name, props);
		const { buildCloudwatchLogGroup } = builder(this);
		logGroups.forEach((logGroup) => {
			const l = buildCloudwatchLogGroup(logGroup);
			this.logGroups.set(logGroup.logGroupName, l);
		});
	}
}
