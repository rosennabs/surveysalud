const db = require('../dbConnection');

const saveRelationship = async (relationship) => {
  const { program, fullname, organization, primary_perspective, engagement_activities, comments } = relationship;

  try {
    const promises = engagement_activities.map(async (engagement) => {
      const { engagement_date, engagement_method, hours_spent, dollar_gifted } =
        engagement;

      // Check if the record already exists
      const checkQuery = `
        SELECT * FROM relationships
        WHERE program = $1 AND fullname = $2 AND organization = $3 AND primary_perspective = $4 AND engagement_date = $5 AND engagement_method = $6 AND hours_spent = $7 AND dollar_gifted = $8 AND comments = $9
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
        comments
      ];

      const checkResult = await db.query(checkQuery, values);

      if (checkResult.rows.length === 0) {
        // If no existence, insert the new record

        const insertQuery = `
        INSERT INTO relationships (program, fullname, organization, primary_perspective, engagement_date, engagement_method, hours_spent, dollar_gifted, comments)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
        `;


        const result = await db.query(insertQuery, values);
        return result.rows[0];
      } else {
        // If exists, return the existing record
        return checkResult.rows[0];
      }
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