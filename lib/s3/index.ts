import { App, Stack, StackProps, aws_s3 } from "aws-cdk-lib";
import { builder } from "../_core/builder";
import { buckets } from "./buckets";

export class S3Stack extends Stack {
	buckets: Map<string, aws_s3.IBucket> = new Map();
	constructor(app: App, props: StackProps) {
		super(app, S3Stack.name, props);
		const { buildS3Bucket } = builder(this);
		buckets.map((bucket) => {
			this.buckets.set(bucket.ref, buildS3Bucket(bucket));
		});
	}
}
