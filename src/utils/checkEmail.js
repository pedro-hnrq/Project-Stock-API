const modelUser = require('../model/user');
const modelOrganization = require('../model/organization');


class checkEmailExists {    
  async userEmail(email, organizationId, transaction) {
      const user = await modelUser.findOne(
          { where: { email, organizationId } },
          { transaction }
      );

      if (user) {
          const error = new Error("Email already exists in this organization");
          error.statusCode = 409; 
          throw error;
      }

      return true;
  }

  async organizationEmail(email, transaction) {
      const organization = await modelOrganization.findOne(
          { where: { email } },
          { transaction }
      );

      if (organization) {
          const error = new Error("Email already exists in another organization");
          error.statusCode = 409;
          throw error;
      }
  }
}

module.exports = new checkEmailExists();