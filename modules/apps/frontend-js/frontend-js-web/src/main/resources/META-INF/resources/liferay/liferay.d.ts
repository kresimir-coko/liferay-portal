export function getCountries(callback: () => void): Promise<any>;

export function getRegions(
	callback: () => void,
	selectKey: string
): Promise<any>;

export function fetch(resource: string | Request, init?: Object): Promise<any>;

export function formatStorage(size: number, options?: Object): string;

export function formatXML(content: string, options?: Object): string;
