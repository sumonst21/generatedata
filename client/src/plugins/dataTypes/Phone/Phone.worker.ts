import utils from '../../../utils';
import { DTWorkerOnMessage } from "~types/dataTypes";
import { generate } from './Phone.generate';

let workerUtilsLoaded = false;
export const onmessage = (e: DTWorkerOnMessage) => {
	if (!workerUtilsLoaded) {
		importScripts(e.data.workerUtilsUrl);
		workerUtilsLoaded = true;
	}

	postMessage(generate(e.data, utils));
};
