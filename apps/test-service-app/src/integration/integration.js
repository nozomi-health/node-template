const ApiError = require('@node-template/shared/exceptions/ApiError');

const config = require('../config/config');

class Integration {
  static async getData() {
    const response = await fetch(`${config.integration.integrationUrl}/stuff`, {
      method: 'GET',
      headers: {
        'api-key': config.integration.integrationApiKey,
      },
    });

    if (!response.ok) {
      throw ApiError.BadRequest('Error getting stuff');
    }

    const result = await response.json();
    return result;
  }
}

module.exports = Integration;
