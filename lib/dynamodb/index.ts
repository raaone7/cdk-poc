import { App, Stack, StackProps } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { tables } from "./tables";
import { Table } from "aws-cdk-lib/aws-dynamodb";

export class DynamoDBStack extends Stack {
	tables: Map<string, Table> = new Map();
	constructor(app: App, props: StackProps) {
		super(app, DynamoDBStack.name, props);
		const { buildDynamoDBTable } = builder(this);
		tables.map((table) => {
			const t = buildDynamoDBTable(table);
			this.tables.set(table.ref, t);
		});
	}
}
