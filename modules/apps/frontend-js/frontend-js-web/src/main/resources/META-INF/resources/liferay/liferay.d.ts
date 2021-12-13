/**
 * Copyright (c) 2000-present Liferay, Inc. All rights reserved.
 *
 * This library is free software; you can redistribute it and/or modify it under
 * the terms of the GNU Lesser General Public License as published by the Free
 * Software Foundation; either version 2.1 of the License, or (at your option)
 * any later version.
 *
 * This library is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU Lesser General Public License for more
 * details.
 */

declare module Liferay {
	namespace Address {

		// This is declaring a type for `Liferay.Address.getCountries()`.

		export function getCountries(callback: () => void): Promise<any>;

		export function getRegions(
			callback: () => void,
			selectKey: string,
		): Promise<any>;
	}

	namespace Util {
		export function fetch(
			resource: string | Request,
			init?: Object,
		): Promise<any>;

		export function formatStorage(size: number, options?: Object): string;

		export function formatXML(content: string, options?: Object): string;
	}
}
