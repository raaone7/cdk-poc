import { App, Stack } from "aws-cdk-lib";
import { tables } from "./tables";
import { builder } from "../_core/builder";

export class DynamoDBStack extends Stack {
	constructor(app: App) {
		super(app, DynamoDBStack.name, {});
		const builderFunction = builder(this).buildDynamoDBTable;
		Object.values(tables).map((table) => {
			table.awsEntity = builderFunction(table.configuration);
		});
	}
}
