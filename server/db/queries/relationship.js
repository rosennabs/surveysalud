const db = require('../dbConnection');

const saveRelationship = async (relationship) => {
  const {
    program,
    fullname,
    organization,
    primary_perspective,
    engagement_activities,
    comments,
    reported_by,
  } = relationship;


  try {
    const promises = engagement_activities.map(async (engagement) => {
      const { engagement_date, engagement_method, hours_spent, dollar_gifted } =
        engagement;
      
    

      // Check if the record already exists
      const checkQuery = `
        SELECT * FROM relationships
        WHERE program = $1 AND LOWER(fullname) = LOWER($2) AND primary_perspective = $3 AND engagement_date = $4 AND engagement_method = $5 AND hours_spent = $6 AND dollar_gifted = $7 AND reported_by = $8;
      `;
      const checkValues = [
        program,
        fullname,
        primary_perspective,
        engagement_date,
        engagement_method,
        hours_spent,
        dollar_gifted,
        reported_by,
      ];

      
      const checkResult = await db.query(checkQuery, checkValues);


      if (checkResult.rows.length === 0) {
        // If no existence, insert the new record

        const insertQuery = `
        INSERT INTO relationships (program, fullname, organization, primary_perspective, engagement_date, engagement_method, hours_spent, dollar_gifted, comments, reported_by)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
        `;

        const insertValues = [
          program,
          fullname,
          organization,
          primary_perspective,
          engagement_date,
          engagement_method,
          hours_spent,
          dollar_gifted,
          comments,
          reported_by,
        ];


        const result = await db.query(insertQuery, insertValues);
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
      reported_by,
    };

    return response;

  }

  catch (error) {
    throw error;
  }
};


module.exports = { saveRelationship };