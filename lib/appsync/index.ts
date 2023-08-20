import { App, Stack, StackProps } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { apis } from "./apis";
import { Table } from "aws-cdk-lib/aws-dynamodb";
import { IFunction } from "aws-cdk-lib/aws-lambda";

type AppsyncParams = {
	lambdas: Map<string, IFunction>;
	tables: Map<string, Table>;
};

export class AppsyncStack extends Stack {
	constructor(app: App, props: StackProps, params: AppsyncParams) {
		super(app, AppsyncStack.name, props);
		const { buildAppsyncAPI } = builder(this);
		apis.map((api) => {
			buildAppsyncAPI(api, params.lambdas, params.tables);
		});
	}
}
