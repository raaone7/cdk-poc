import { App, Stack, StackProps } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { lambdas } from "./lambdas";
import { IRole } from "aws-cdk-lib/aws-iam";
import { LogGroup } from "aws-cdk-lib/aws-logs";
import { IFunction } from "aws-cdk-lib/aws-lambda";

type LambdaParams = {
	roles: Map<string, IRole>;
	logGroups: Map<string, LogGroup>;
};

export class LambdaStack extends Stack {
	lambdas: Map<string, IFunction> = new Map();
	constructor(app: App, props: StackProps, params: LambdaParams) {
		super(app, LambdaStack.name, props);
		const { buildLambdaFunction } = builder(this);
		Object.values(lambdas).map((lambda) => {
			const role = params.roles.get(lambda.role) as IRole;
			const logGroup = params.logGroups.get(lambda.logGroup) as LogGroup;
			const b = buildLambdaFunction(lambda, role, logGroup);
			this.lambdas.set(lambda.ref, b);
		});
	}
}
