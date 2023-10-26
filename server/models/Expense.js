const db = require('../config/db');

class Expense {
    constructor (title, amount, envelopeId) {
        this.title = title;
        this.amount = amount;
        this.envelopeId = envelopeId;
    }

    async save() {
        let sql = `
        INSERT INTO expenses(
            title,
            amount,
            envelopeId
        )
        VALUES(
            '${this.title}',
            '${this.amount}',
            '${this.envelopeId}'
        )
        `;

        return await db.execute(sql);
    }

    static async getExpensesbyEnvelopeId(envelopeId) {
        let sql = `SELECT * FROM expenses WHERE envelopeId = ${envelopeId};`;
        return await db.execute(sql);
    }

    static async findAll() {
        let sql = `SELECT * FROM expenses;`;
        return await db.execute(sql);
    }

    static async findById(id) {
        let sql = `SELECT * FROM expenses WHERE id = ${id};`;
        return await db.execute(sql);
    }

    static async update (id,title,amount) {
        let sql = `
        UPDATE expenses
        SET title = '${title}',
        amount = ${amount}
        WHERE id = ${id};
        `;
        await db.execute(sql);
        let sql2 = `SELECT * FROM expenses WHERE id = ${id};`;
        return await db.execute(sql2);
    }

    static async delete (id) {
        let sql = `
        DELETE FROM expenses
        WHERE id = ${id};
        `;
        return await db.execute(sql);
    }
};

module.exports = Expense;