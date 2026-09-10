import { BaseBuilder, generateWAMessageFromContent, prepareWAMessageMedia, generateMessageIDV2, crypto } from './shared.js';
import { proto } from '../../WAProto/index.js';

/**
 * Location message builder — static pin via the existing `message.location`
 * shorthand (see Utils/messages.js, `hasNonNullishProperty(message, 'location')`),
 * or a live/moving location. There is no `liveLocation` shorthand in
 * `generateWAMessageContent` yet, so the live path goes through the `raw: true`
 * escape hatch (same file, top of `generateWAMessageContent`) with a hand-built
 * `liveLocationMessage`.
 */
class Location extends BaseBuilder {
	#client;

	/** @param {import('../../WAProto/index.js').WASocket} client Active Baileys socket (must expose `sendMessage`). */
	constructor(client) {
		super();
		if (!client) throw new Error('Socket is required');
		this.#client = client;

		this._lat;
		this._lng;
		this._name;
		this._address;
		this._url;
		this._thumbnail;
		this._live = false;
		this._accuracy;
		this._speed;
		this._degrees;
		this._caption;
		this._sequence;
		this._timeOffset;
	}

	/** Set the pin's coordinates. Required. */
	setCoordinates(lat, lng) {
		if (typeof lat !== 'number' || typeof lng !== 'number') throw new TypeError('setCoordinates(lat, lng) requires two numbers');
		this._lat = lat;
		this._lng = lng;
		return this;
	}

	/** Place name shown above the address (static location only). */
	setName(name) {
		this._name = name;
		return this;
	}

	/** Address line shown under the name (static location only). */
	setAddress(address) {
		this._address = address;
		return this;
	}

	/** External map URL attached to the pin (static location only). */
	setUrl(url) {
		this._url = url;
		return this;
	}

	/** Raw jpeg thumbnail bytes for the map preview. */
	setThumbnail(buffer) {
		this._thumbnail = buffer;
		return this;
	}

	/** Switch between a static pin (default) and a live/moving location. */
	setLive(isLive = true) {
		this._live = isLive;
		return this;
	}

	/** GPS accuracy radius in meters (live location only). */
	setAccuracy(meters) {
		this._accuracy = meters;
		return this;
	}

	/** Current speed in meters/second (live location only). */
	setSpeed(mps) {
		this._speed = mps;
		return this;
	}

	/** Heading in degrees clockwise from magnetic north (live location only). */
	setDegrees(degreesClockwiseFromMagneticNorth) {
		this._degrees = degreesClockwiseFromMagneticNorth;
		return this;
	}

	/** Caption text shown with a live location update. */
	setCaption(text) {
		this._caption = text;
		return this;
	}

	/** Ordinal of this update within a live-location session — bump it on each subsequent send so clients render the latest pin instead of stacking old ones. */
	setSequence(n) {
		this._sequence = n;
		return this;
	}

	/** Seconds since the live-location session started. */
	setTimeOffset(n) {
		this._timeOffset = n;
		return this;
	}

	/** @returns {Record<string, any>} The `sendMessage()`-shaped payload, without sending it. */
	build() {
		if (typeof this._lat !== 'number' || typeof this._lng !== 'number') {
			throw new Error('Location requires setCoordinates(lat, lng)');
		}

		if (!this._live) {
			return {
				location: {
					degreesLatitude: this._lat,
					degreesLongitude: this._lng,
					...(this._name !== undefined && { name: this._name }),
					...(this._address !== undefined && { address: this._address }),
					...(this._url !== undefined && { url: this._url }),
					...(this._thumbnail !== undefined && { jpegThumbnail: this._thumbnail }),
				},
			};
		}

		return {
			raw: true,
			liveLocationMessage: proto.Message.LiveLocationMessage.create({
				degreesLatitude: this._lat,
				degreesLongitude: this._lng,
				...(this._accuracy !== undefined && { accuracyInMeters: this._accuracy }),
				...(this._speed !== undefined && { speedInMps: this._speed }),
				...(this._degrees !== undefined && { degreesClockwiseFromMagneticNorth: this._degrees }),
				...(this._caption !== undefined && { caption: this._caption }),
				...(this._sequence !== undefined && { sequenceNumber: this._sequence }),
				...(this._timeOffset !== undefined && { timeOffset: this._timeOffset }),
				...(this._thumbnail !== undefined && { jpegThumbnail: this._thumbnail }),
			}),
		};
	}

	/** Build and send via the socket's `sendMessage()`. Call again with a higher `setSequence()` to push live-location updates. */
	async send(jid, options = {}) {
		return this.#client.sendMessage(jid, this.build(), options);
	}
}

export { Location };
