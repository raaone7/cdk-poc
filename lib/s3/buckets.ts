import { S3Configuration } from "../_core/types";
export const LambdaBuildsBucket: S3Configuration = {
	ref: "LambdaBuilds",
	bucketName: "lambda-builds-2023",
};

export const buckets: S3Configuration[] = [LambdaBuildsBucket];
