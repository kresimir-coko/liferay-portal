import {isObject} from 'metal';

const Util = Liferay.Util;

class PortletURL {
	static ACTION_PHASE = '1';

	static RENDER_PHASE = '0';

	static RESOURCE_PHASE = '2';

	static createActionURL = () =>
		new PorletURL(PortletURL.ACTION_PHASE);

	static createRenderURL = () =>
		new PorletURL(PortletURL.RENDER_PHASE);

	static createResourceURL = () =>
		new PorletURL(PortletURL.RESOURCE_PHASE);

	static createURL = (basePortletURL, params) =>
		new PorletURL(null, params, basePortletURL);

	constructor(lifecycle, params, basePortletURL) {
		this.params = {};

		this.reservedParams = {
			doAsGroupId: null,
			doAsUserId: null,
			doAsUserLanguageId: null,
			p_auth: null,
			p_auth_secret: null,
			p_f_id: null,
			p_j_a_id: null,
			p_l_id: null,
			p_l_reset: null,
			p_p_auth: null,
			p_p_cacheability: null,
			p_p_i_id: null,
			p_p_id: null,
			p_p_isolated: null,
			p_p_lifecycle: null,
			p_p_mode: null,
			p_p_resource_id: null,
			p_p_state: null,
			p_p_state_rcv: null,
			p_p_static: null,
			p_p_url_type: null,
			p_p_width: null,
			p_t_lifecycle: null,
			p_v_l_s_g_id: null,
			refererGroupId: null,
			refererPlid: null,
			saveLastPath: null,
			scroll: null
		};

		basePortletURL = basePortletURL ||
			`${themeDisplay.getPathMain()}/portal/layout?p_id=${themeDisplay.getPlid()}`;

		this.options = {
			basePortletURL,
			escaleXML: null,
			secure: null
		};

		if (isObject(params)) {
			Object.keys(params).map(key => {
				const item = params[key];

				if (Lang.isValue(item)) {
					if (this._isReservedParam(key)) {
						this.reservedParams[key] = item;
					}
					else {
						this.params[key] = item;
					}
				}
			});
		}

		if (lifecycle) {
			this.setLifecycle(lifecycle);
		}
	}

	/**
	 * @depreacted
	 */

	setCopyCurrentRenderParameters() {
		return this;
	}

	setDoAsGroupId(doAsGroupId) {
		this.reservedParams.doAsGroupId = doAsGroupId;
		return this;
	}

	setDoAsUserId(doAsUserId) {
		this.reservedParams.doAsUserId = doAsUserId;
	}

	/**
	 * @deprecated
	 */

	setEncrypt() {
		return this;
	}

	setEscapeXML(escapeXML) {
		this.options.escapeXML = escapeXML;
	}

	setLifecycle(lifecycle) {
		if (lifecycle === PortletURL.ACTION_PHASE) {
			this.reservedParams.p_auth = Liferay.authToken;
			this.reservedParams.p_p_lifecycle = PortletURL.ACTION_PHASE;
		}
		else if (lifecycle === PortletURL.RENDER_PHASE) {
			this.reservedParams.p_p_lifecycle = PortletURL.RENDER_PHASE;
		}
		else if (lifecycle === PortletURL.RESOURCE_PHASE) {
			this.reservedParams.p_p_lifecycle = PortletURL.RESOURCE_PHASE;
			this.reservedParams.p_p_cacheability = 'cacheLevelPage';
		}

		return this;
	}

	setName(name) {
		this.setParameter('javax.portlet.action', name);
	}

	setParameter(key, value) {
		if (this._isReservedParam(key)) {
			this.reservedParams[key] = value;
		}
		else {
			this.params[key] = value;
		}
		return this;
	}

	setParameters(parameters) {
		Object.keys(parameters).forEach(key => {
			this.setParameter(key, parameters[key]);
		});
		return this;
	}

	setPlid(plid) {
		this.reservedParams.p_l_id = plid;
		return this;
	}

	/**
	 * @deprecated
	 */

	setPortletConfiguration() {
		return this;
	}

	setPortletId(portletId) {
		this.reservedParams.p_p_id = portletId;
		return this;
	}

	setPortletMode(portletMode) {
		this.reservedParams.p_p_mode = portletMode;
		return this;
	}

	setResourceId(resourceId) {
		this.reservedParams.p_p_resource_id = resourceId;
		return this;
	}

	/*
	 * @deprecated since 7.2, unused
	 */

	setSecure(secure)  {
		this.options.secure = secure;
		return this;
	}

	setWindowState(windowState) {
		this.reservedParams.p_p_state = windowState;
		return this;
	}

	toString() {
		const resultURL = new A.Url(this.options.basePortletURL);

		const portletId = this.reservedParams.p_p_id || resultURL.getParameter('p_p_id');

		const namespacePrefix = Util.getPortletNamespace(portletId);

		Object.keys(this.reservedParams).map(key => {
			const item = this.reservedParams[key];

			if (Lang.isValue(item)) {
				resultURL.setParameter(key, item);
			}
		});

		Object.keys(this.params).map(key => {
			const item = this.params[key];

			if (Lang.isValue(item)) {
				resultURL.setParameter(`${namespacePrefix}${key}`, item);
			}
		});

		if (this.options.secure) {
			resultURL.setProtocol('https');
		}

		let value = resultURL.toString();

		if (this.options.escapeXML) {
			value = Lang.String.escapeHTML(value);
		}

		return value;
	}

	_isReservedParam(paramName) {
		return Object.keys(instance.reservedParams).includes(paramName);
	}
}

export default PortletURL;
export {PortletURL};
