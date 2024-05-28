const db = require("../dbConnection");

//Function to save KP data to db
const saveKnowledgeProduct = async (KP) => {
  const {
    program,
    title,
    date,
    type,
    language,
    other_languages,
    audience,
    purpose,
    comments,
  } = KP;

  try {
    const checkQuery = `
    SELECT * FROM knowledge_products
    WHERE program = $1 AND date = $2 AND type = $3 AND language = $4 AND other_languages = $5 AND audience = $6 AND purpose = $7;
    `;

    const checkValues = [
      program,
      date,
      type,
      language,
      other_languages,
      audience,
      purpose,
    ];

    
    const checkResult = await db.query(checkQuery, checkValues);

    if (checkResult.rows.length === 0) {
      const insertQuery = `
    INSERT INTO knowledge_products (program, title, date, type, language, other_languages, audience, purpose, comments)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;
      
      const insertValues = [
        program,
        title,
        date,
        type,
        language,
        other_languages,
        audience,
        purpose,
        comments,
      ];

      const result = await db.query(insertQuery, insertValues);
      return result.rows[0];
    } else {
      // If exists, return the existing record
      return checkResult.rows[0];
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { saveKnowledgeProduct };
