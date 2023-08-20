import { aws_lambda } from "aws-cdk-lib";
import { LambdaConfiguration } from "../_core/types";
import { LambdaExecutionRole } from "../iam/roles";
import { AddressServiceLogGroup } from "../cloudwatch/log_groups";

export const AddressService: LambdaConfiguration = {
	ref: "AddressService",
	functionName: "AddressService",
	code: new aws_lambda.InlineCode(`export const handler = () => {return "Ok";}`),
	role: LambdaExecutionRole.ref,
	logGroup: AddressServiceLogGroup.ref,
};

export const lambdas: LambdaConfiguration[] = [AddressService];
