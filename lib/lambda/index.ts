import { App, Stack } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { lambdas } from "./lambdas";

export class LambdaStack extends Stack {
	constructor(app: App) {
		super(app, LambdaStack.name, {});
		const builderFunction = builder(this).buildLambdaFunction;
		Object.values(lambdas).map((lambda) => {
			lambda.awsEntity = builderFunction(lambda.configuration);
		});
	}
}
