const db = require('../config/db');

class Envelope {
    constructor (title, budget) {
        this.title = title;
        this.budget = budget;
    }

    async save() {
        let sql = `
        INSERT INTO envelopes(
            title,
            budget
        )
        VALUES(
            '${this.title}',
            '${this.budget}'
        )
        `;

        return await db.execute(sql);
    }


    static async findAll() {
        let sql = `SELECT * FROM envelopes;`;
        return await db.execute(sql);
    }

    static async findById(id) {
        let sql = `SELECT * FROM envelopes WHERE id = ${id};`;
        return await db.execute(sql);
    }

    static async update (id,title,budget) {
        let sql = `
        UPDATE envelopes
        SET title = '${title}',
        budget = ${budget}
        WHERE id = ${id};
        `;
        await db.execute(sql);
        let sql2 = `SELECT * FROM envelopes WHERE id = ${id};`;
        return await db.execute(sql2);
    }

    static async delete (id) {
        let sql = `
        DELETE FROM envelopes
        WHERE id = ${id};
        `;
        return await db.execute(sql);
    }

    static async transfer (id1,id2, amount) {
        let envelope1 = await Envelope.findById(id1);
        let envelope2 = await Envelope.findById(id2);
        await Envelope.update(id1,envelope1[0][0].title,Number(envelope1[0][0].budget)-Number(amount));
        await Envelope.update(id2,envelope2[0][0].title,Number(envelope2[0][0].budget)+Number(amount));
        let sql = `SELECT * FROM envelopes;`;
        return await db.execute(sql);
    }

   
};

module.exports = Envelope;