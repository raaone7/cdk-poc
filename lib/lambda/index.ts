import { App, Stack } from "aws-cdk-lib";
import { lambdas } from "./lambdas";
import { builder } from "../_core/builder";

export class LambdaStack extends Stack {
	constructor(app: App) {
		super(app, LambdaStack.name, {});
		const builderFunction = builder(this).buildLambdaFunction;
		Object.values(lambdas).map((lambda) => {
			lambda.awsEntity = builderFunction(lambda.configuration);
		});
	}
}
