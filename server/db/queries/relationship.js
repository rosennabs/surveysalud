const db = require('../dbConnection');

const saveRelationship = async (relationship) => {
  const { program, fullname, organization, primary_perspective, engagement_activities, comments } = relationship;

  try {
    const promises = engagement_activities.map(async (engagement) => {
      const { engagement_date, engagement_method, hours_spent, dollar_gifted } =
        engagement;

      const query = `
        INSERT INTO relationships (program, fullname, organization, primary_perspective, engagement_date, engagement_method, hours_spent, dollar_gifted, comments)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;

      const values = [
        program,
        fullname,
        organization,
        primary_perspective,
        engagement_date,
        engagement_method,
        hours_spent,
        dollar_gifted,
        comments,
      ];

      const result = await db.query(query, values);
      return result.rows[0];
    });

    // Await all promises and get the results
    const engagementResults = await Promise.all(promises);

    // Extract engagement activities details for formatting the final response
    const engagementActivities = engagementResults.map((result) => {
      return {
        engagement_date: result.engagement_date,
        engagement_method: result.engagement_method,
        hours_spent: result.hours_spent,
        dollar_gifted: result.dollar_gifted
      };
    });

    //Construct the final response object
    const response = {
      program,
      fullname,
      organization,
      primary_perspective,
      engagement_activities: engagementActivities,
      comments,
    };

    return response;

  }

  catch (error) {
    throw error;
  }
};


module.exports = { saveRelationship };