const connection = require('../config/db')

module.exports = {
    getUsers: async (req, res) => {
        try {
            const result = await connection.query("SELECT u.id, u.firstName, u.lastName, u.fullName,u.update_data,u.profile_info, u.phone, u.status,u.create_At, COUNT(m.user_id) AS melon_count, SUM(m.cost) AS total_cost, COUNT(CASE WHEN m.status = 'start' THEN 1 END) AS active_melon_count ,COUNT(CASE WHEN m.status = 'end' THEN 1 END) AS inactive_melon_count  FROM users u LEFT JOIN melon_greenhouse m ON u.id = m.user_id WHERE u.status != 'admin' GROUP BY u.id, u.firstName, u.lastName, u.fullName, u.phone, u.status, u.create_At; ",
                (err, result) => {
                    if (err) throw console.log(err.message)
                    const ids = result.map(user => user.id)
                    // console.log(ids)
                    const user_id = ids.map(id => id.toString())
                    return res.status(200).json(result)
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getUserAllhouse: async (req, res) => {
        const data = await req.body
        try {
            await connection.query(
                "SELECT hg.*,pt.planting_name FROM melon_greenhouse hg JOIN planting_type pt ON hg.planting_type_id = pt.planting_id WHERE user_id = ? ORDER BY hg.create_house_at ASC",
                [data.user_id], (err, result, field) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).send(err.message);
                    }
                    return res.status(200).json({ data: result });
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getUserActivities: async (req, res) => {
        const data = await req.body
        try {
            connection.query("SELECT acc.* , act.activity_name FROM activities_costs acc JOIN activities act ON acc.activities_id = act.activity_id WHERE user_id = ? AND house_id = ?  ORDER BY acc.activities_id",
                [data.user_id, data.house_id], (err, result, field) => {
                    if (err) throw console.log(err)
                    // console.log(result)
                    return res.status(200).json(result)
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getListCostsAdmin: (req, res) => {
        const data = req.body;
        try {
            // Query สำหรับการดึงข้อมูล list
            connection.query(
                'SELECT mc.*, li.list_name FROM melon_costs_fv mc JOIN list li ON mc.list_id = li.list_id WHERE user_id = ? AND house_id = ? AND activities_id = ?',
                [data.user_id, data.selectActivities.house_id, data.selectActivities.activities_id],
                (err, listResult) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send("Error in retrieving list");
                    }

                    // Query สำหรับการดึงข้อมูล total cost
                    connection.query(
                        'SELECT SUM(cost) AS total_cost FROM melon_costs_fv WHERE user_id = ? AND house_id = ? AND activities_id = ?',
                        [data.user_id, data.selectActivities.house_id, data.selectActivities.activities_id],
                        (err, costResult) => {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).send("Error in calculating total cost");
                            }

                            // ส่งข้อมูลกลับไปที่ client
                            return res.status(200).json({
                                list: listResult,
                                total_cost: costResult[0].total_cost
                            });
                        }
                    );
                }
            );
        } catch (e) {
            console.log(e.message);
            return res.status(500).send("Internal Server Error");
        }
    },
    approveUser: async (req, res) => {
        const data = await req.body
        try {
            await connection.query("UPDATE users SET status = ? WHERE id = ?",
                ["farmer", data.id], (err, result) => {
                    if (err) return res.status(500).send("Internal Server Error");
                    return res.status(200).send("delete from users")
                }
            )
        } catch (e) {
            console.log(e.message);
            return res.status(500).send("Internal Server Error");
        }
    }

}