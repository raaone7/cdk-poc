import { aws_iam } from "aws-cdk-lib";
import { IAMRole, IAMRoleConfiguration } from "../_core/types";

export const LambdaExecutionRole: IAMRoleConfiguration = {
	assumedBy: new aws_iam.ServicePrincipal("lambda.amazonaws.com"),
	roleName: "LambdaExecutionRole",
	managedPolicies: [
		aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AmazonS3ReadOnlyAccess"),
		aws_iam.ManagedPolicy.fromAwsManagedPolicyName("AWSLambda_FullAccess"),
	],
};

type IAMRoleCollection = Record<string, IAMRole>;
export const roles: IAMRoleCollection = {
	LambdaExecutionRole: {
		configuration: LambdaExecutionRole,
		awsEntity: null,
	},
};
