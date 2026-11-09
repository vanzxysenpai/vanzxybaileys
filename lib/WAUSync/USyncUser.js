export class USyncUser {
    withId(id) {
        this.id = id;
        return this;
    }
    withLid(lid) {
        this.lid = lid;
        return this;
    }
    withPhone(phone) {
        this.phone = phone;
        return this;
    }
    withUsername(username) {
        this.username = username;
        return this;
    }
    withUsernameKey(usernameKey) {
        this.usernameKey = usernameKey;
        return this;
    }
    withType(type) {
        this.type = type;
        return this;
    }
    withPersonaId(personaId) {
        this.personaId = personaId;
        return this;
    }
    // Vanz@Port (v2.0.3) --- nexustech: fields used by Picture/Business/Sidelist protocols
    withPictureId(pictureId) {
        this.pictureId = pictureId;
        return this;
    }
    withVerifiedNameSerial(serial) {
        this.verifiedNameSerial = serial;
        return this;
    }
    withBusinessProfileTag(tag) {
        this.businessProfileTag = tag;
        return this;
    }
    withSidelistDelete(del = true) {
        this.sidelistDelete = del;
        return this;
    }
}
