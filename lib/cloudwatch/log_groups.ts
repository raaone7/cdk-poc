import { LogGroupConfiguration } from "../_core/types";

export const AddressServiceLogGroup: LogGroupConfiguration = {
	ref: "AddressService",
	logGroupName: "AddressService",
};

export const logGroups: LogGroupConfiguration[] = [AddressServiceLogGroup];
