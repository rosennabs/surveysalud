const db = require('../dbConnection');

//Function to save KP data to db
const saveKnowledgeProduct = async (KP) => {
  const { program, title, date, type, language, other_languages, audience, purpose, comments } = KP;

  try {
    const query = `
    INSERT INTO knowledge_products (program, title, date, type, language, other_languages, audience, purpose, comments)
    VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *;
    `;

    const values = [program, title, date, type, language, other_languages, audience, purpose, comments];

    const result = await db.query(query, values);
    return result.rows[0];
  }
  catch (error) {
    throw error;
  }
};

module.exports = {saveKnowledgeProduct};