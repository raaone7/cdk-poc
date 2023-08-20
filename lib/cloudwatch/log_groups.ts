import { LogGroup, LogGroupConfiguration } from "../_core/types";

const AddressServiceLogGroup: LogGroupConfiguration = {
	logGroupName: "AddressService",
};

type LogGroupCollection = Record<string, LogGroup>;
export const logGroups: LogGroupCollection = {
	AddressServiceLogGroup: {
		configuration: AddressServiceLogGroup,
		awsEntity: null,
	},
};
