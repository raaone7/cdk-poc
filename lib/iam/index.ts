import { App, Stack, StackProps } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { roles } from "./roles";
import { IRole } from "aws-cdk-lib/aws-iam";

export class IAMStack extends Stack {
	roles: Map<string, IRole> = new Map();
	constructor(app: App, props: StackProps) {
		super(app, IAMStack.name, props);
		const { buildIAMRole } = builder(this);
		roles.map((role) => {
			this.roles.set(role.ref, buildIAMRole(role));
		});
	}
}
