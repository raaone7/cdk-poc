import { aws_iam, aws_lambda, aws_logs } from "aws-cdk-lib";
import { LambdaConfiguration, LambdaFunction } from "../_core/types";
import { roles } from "../iam/roles";
import { logGroups } from "../cloudwatch/log_groups";

export const AddressService: LambdaConfiguration = {
	functionName: "AddressService",
	code: new aws_lambda.InlineCode(`export const handler = () => {return "Ok";}`),
	role: roles.LambdaExecutionRole.awsEntity as aws_iam.Role,
	logGroup: logGroups.AddressServiceLogGroup.awsEntity as aws_logs.LogGroup,
};

type LambdaFunctionCollection = Record<string, LambdaFunction>;
export const lambdas: LambdaFunctionCollection = {
	AddressService: {
		configuration: AddressService,
		awsEntity: null,
	},
};
