import { aws_iam } from "aws-cdk-lib";
import { IAMRoleConfiguration } from "../_core/types";

const useAWSManagedPolicy = aws_iam.ManagedPolicy.fromAwsManagedPolicyName;

export const LambdaExecutionRole: IAMRoleConfiguration = {
	ref: "LambdaExecution",
	assumedBy: new aws_iam.ServicePrincipal("lambda.amazonaws.com"),
	roleName: "LambdaExecution",
	managedPolicies: [
		useAWSManagedPolicy("AmazonDynamoDBFullAccess"),
		useAWSManagedPolicy("CloudWatchLogsFullAccess"),
	],
};

export const roles: IAMRoleConfiguration[] = [LambdaExecutionRole];
