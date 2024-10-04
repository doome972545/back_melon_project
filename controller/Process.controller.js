const connection = require('../config/db')

module.exports = {
    addHouse: async (req, res) => {
        const data = await req.body
        const user = await req.user
        const updatedAt = new Date();
        try {
            await connection.query(
                "INSERT INTO `melon_greenhouse`( `house_name`, `house_desc`, `planting_type_id`, `user_id`) VALUES (?,?,?,?)",
                [data.house_name, data.house_desc, data.planting_type_id, user.user_id],
                (err, result, field) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).send(err.message);
                    }
                    connection.query("UPDATE users SET update_data = ? WHERE id = ?",
                        [updatedAt, user.user_id], (err, result) => {
                            if (err) {
                                console.log(err)
                                return res.status(400).send(err.message);
                            }
                            return res.status(200).json({ message: "บันทึกโรงเรือนเรียบร้อย", data });
                        }
                    )
                }
            );
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getHouse: async (req, res) => {
        try {
            await connection.query(
                "SELECT hg.*,pt.planting_name FROM melon_greenhouse hg JOIN planting_type pt ON hg.planting_type_id = pt.planting_id WHERE user_id = ? ORDER BY hg.create_at ASC",
                [req.user.user_id], (err, result, field) => {
                    if (err) {
                        console.log(err)
                        return res.status(400).send(err.message);
                    }
                    connection.query("select COUNT(CASE WHEN status = 'start' THEN 1 END) AS start_melon_count from melon_greenhouse where user_id = ?",
                        [req.user.user_id], (err, resultSum) => {
                            return res.status(200).json({ data: result, sum: resultSum });
                        })
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getPlantingType: async (req, res) => {
        try {
            await connection.query("SELECT * FROM `planting_type`",
                (err, result, field) => {
                    if (err) throw new Error;
                    return res.status(200).json(result)
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getActivities: async (req, res) => {
        try {
            await connection.query("SELECT * FROM `activities`",
                (err, result, field) => {
                    if (err) throw new Error

                    return res.status(200).json(result)
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    saveActivities: async (req, res) => {
        const data = await req.body
        const user = await req.user
        const updatedAt = new Date();
        try {
            await connection.query("SELECT * FROM `activities_costs` WHERE `activities_id` = ? AND user_id = ? AND house_id =?",
                [data.activity_id, user.user_id, data.house_id], (err, result, field) => {
                    if (err) throw console.log(err)
                    if (result.length > 0) {
                        return res.status(200).json({ message: "ได้สร้างไปแล้ว" })
                    } else {
                        connection.query("INSERT INTO `activities_costs` (`user_id`, `activities_id`, `house_id`) VALUES (?,?,?)",
                            [user.user_id, data.activity_id, data.house_id], (err, result, field) => {
                                if (err) throw console.log(err)
                                connection.query("UPDATE users SET update_data = ? WHERE id = ?",
                                    [updatedAt, user.user_id], (err, result) => {
                                        if (err) {
                                            console.log(err)
                                            return res.status(400).send(err.message);
                                        }
                                        return res.status(200).json("บันทึกกิจกรรมเรียบร้อย")
                                    }
                                )
                            })
                    }
                }
            )


        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getActivitiesCosts: async (req, res) => {
        const house_id = await req.params.house_id
        const user = await req.user
        try {
            connection.query("SELECT acc.* , act.activity_name FROM activities_costs acc JOIN activities act ON acc.activities_id = act.activity_id WHERE user_id = ? AND house_id = ?  ORDER BY acc.activities_id",
                [user.user_id, house_id], (err, result, field) => {
                    if (err) throw console.log(err)
                    res.status(200).json(result)

                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    getList: async (req, res) => {
        const data = await req.body
        try {
            if (data.planting_type_id === 1) {
                await connection.query("SELECT c.cost_id, c.activities_id ,l.*  , c.cost_sand  \
                    FROM costs c JOIN list l ON c.list_id = l.list_id WHERE activities_id = ? AND cost_sand",
                    [data.activities_id], (err, result) => {
                        if (err) throw new Error
                        return res.status(200).json(result)
                    }
                )
            } else if (data.planting_type_id === 2) {
                await connection.query("SELECT c.cost_id, c.activities_id ,l.*  , c.cost_clay \
                    FROM costs c JOIN list l ON c.list_id = l.list_id WHERE activities_id = ? AND cost_clay",
                    [data.activities_id], (err, result) => {
                        if (err) throw new Error
                        return res.status(200).json(result)
                    }
                )
            } else if (data.planting_type_id === 3) {
                await connection.query("SELECT c.cost_id, c.activities_id ,l.*  , c.cost_pots  \
                    FROM costs c JOIN list l ON c.list_id = l.list_id WHERE activities_id = ? AND cost_pots",
                    [data.activities_id], (err, result) => {
                        if (err) throw new Error
                        return res.status(200).json(result)
                    }
                )
            } else if (data.planting_type_id === 4) {
                await connection.query("SELECT c.cost_id, c.activities_id ,l.*  , c.cost_bags  \
                    FROM costs c JOIN list l ON c.list_id = l.list_id WHERE activities_id = ? AND cost_bags",
                    [data.activities_id], (err, result) => {
                        if (err) throw new Error
                        return res.status(200).json(result)
                    }
                )
            }
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    add_melon_costs: async (req, res) => {
        const data = await req.body;
        const user = await req.user
        // console.log(data)
        // console.log(data)
        const updatedAt = new Date();
        const price = parseInt(data.cost)
        try {
            await connection.query("INSERT INTO `melon_costs_fv`( `user_id`, `house_id`, `activities_id`, `list_id`, `planting_type_id`, `cost`, `cost_type`) VALUES (?,?,?,?,?,?,?)",
                [user.user_id, data.selectActivities.house_id, data.selectActivities.activities_id, data.list_id, data.datahouse.planting_type_id, data.cost, data.cost_type,], (err, result) => {
                    if (err) throw console.log(err.message)
                    connection.query("SELECT `cost` FROM `melon_greenhouse` WHERE house_id = ?",
                        [data.selectActivities.house_id], (err, result) => {
                            if (err) throw console.log(err.message)
                            const cost = parseInt(result[0].cost) + parseInt(data.cost)
                            connection.query("UPDATE `melon_greenhouse` SET `cost`= ? , update_at = ? WHERE house_id = ?",
                                [cost, updatedAt, data.selectActivities.house_id], (err, result) => {
                                    if (err) throw console.log(err.message)
                                    connection.query("SELECT `cost_all` FROM `activities_costs` WHERE activities_costs_id = ?",
                                        [data.selectActivities.activities_costs_id], (err, result_cost_all) => {
                                            if (err) throw console.log(err.message)
                                            const cost_a = parseInt(result_cost_all[0].cost_all) + parseInt(data.cost)
                                            connection.query("UPDATE users SET update_data = ? WHERE id = ?",
                                                [updatedAt, user.user_id], (err, result) => {
                                                    if (err) {
                                                        console.log(err)
                                                        return res.status(400).send(err.message);
                                                    }
                                                    addChart.chart(data, user)
                                                    connection.query("UPDATE `activities_costs` SET `cost_all`= ? ,update_at=? WHERE activities_costs_id = ?",
                                                        [cost_a, updatedAt, data.selectActivities.activities_costs_id], (err, result) => {
                                                            if (err) throw console.log(err.message)
                                                            if (data.cost_type === 'cost_sand') {
                                                                connection.query("UPDATE `costs` SET `cost_sand` = ? WHERE list_id = ? AND activities_id = ?",
                                                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                                                        if (err) throw console.log(err.message)
                                                                        return res.status(200).json({ message: "success" })
                                                                    }
                                                                )
                                                            } else if (data.cost_type === 'cost_clay') {
                                                                connection.query("UPDATE `costs` SET `cost_clay`= ? WHERE list_id= ? AND activities_id=? ",
                                                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                                                        if (err) throw console.log(err.message)
                                                                        return res.status(200).json({ message: "success" })
                                                                    }
                                                                )
                                                            } else if (data.cost_type === 'cost_pots') {
                                                                connection.query("UPDATE `costs` SET `cost_pots`= ? WHERE list_id= ? AND activities_id=? ",
                                                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                                                        if (err) throw console.log(err.message)
                                                                        return res.status(200).json({ message: "success" })
                                                                    }
                                                                )
                                                            } else if (data.cost_type === 'cost_bags') {
                                                                connection.query("UPDATE `costs` SET `cost_bags`= ? WHERE list_id= ? AND activities_id=? ",
                                                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                                                        if (err) throw console.log(err.message)
                                                                        return res.status(200).json({ message: "success" })
                                                                    }
                                                                )
                                                            }
                                                        }
                                                    )
                                                }
                                            )
                                        }
                                    )
                                }
                            )
                        }
                    )
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    get_melon_costs: async (req, res) => {
        const data = await req.body
        const user = await req.user
        try {
            connection.query('SELECT mc.*,li.list_name FROM melon_costs_fv mc JOIN list li ON mc.list_id = li.list_id WHERE user_id = ? AND house_id = ? AND activities_id = ?',
                [user.user_id, data.selectActivities.house_id, data.selectActivities.activities_id],
                (err, listResult) => {
                    if (err) throw console.log(err.message)
                    // return res.status(200).json(result)
                    connection.query(
                        'SELECT SUM(cost) AS total_cost FROM melon_costs_fv WHERE user_id = ? AND house_id = ? AND activities_id = ?',
                        [user.user_id, data.selectActivities.house_id, data.selectActivities.activities_id],
                        (err, costResult) => {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).send("Error in calculating total cost");
                            }
                            return res.status(200).json({
                                list: listResult,
                                total_cost: costResult[0].total_cost
                            });
                        }
                    );
                }
            )
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    edit_melon_costs: async (req, res) => {
        const data = await req.body
        const updatedAt = new Date();
        const user = await req.user
        // console.log(data)
        try {
            // const [rows, fields] = await connection.query("SELECT * FROM melon_costs_fv WHERE mc_id");
            const price = parseInt(data.cost)
            await connection.query("UPDATE `melon_costs_fv` SET `cost`= ? , update_at = ? , cost_type = ?,list_id=? WHERE mc_id = ?",
                [price, updatedAt, data.cost_type, data.list_id, data.mc_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send(err.message);
                    }
                    connection.query("UPDATE users SET update_data = ? WHERE id = ?",
                        [updatedAt, user.user_id], (err, result) => {
                            if (err) {
                                console.log(err)
                                return res.status(400).send(err.message);
                            }
                            if (data.cost_type === 'cost_sand') {
                                connection.query("UPDATE `costs` SET `cost_sand` = ? WHERE list_id = ? AND activities_id = ?",
                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                        if (err) throw console.log(err.message)
                                        return res.status(200).json({ message: "success" })
                                    }
                                )
                            } else if (data.cost_type === 'cost_clay') {
                                connection.query("UPDATE `costs` SET `cost_clay`= ? WHERE list_id= ? AND activities_id=? ",
                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                        if (err) throw console.log(err.message)
                                        return res.status(200).json({ message: "success" })
                                    }
                                )
                            } else if (data.cost_type === 'cost_pots') {
                                connection.query("UPDATE `costs` SET `cost_pots`= ? WHERE list_id= ? AND activities_id=? ",
                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                        if (err) throw console.log(err.message)
                                        return res.status(200).json({ message: "success" })
                                    }
                                )
                            } else if (data.cost_type === 'cost_bags') {
                                connection.query("UPDATE `costs` SET `cost_bags`= ? WHERE list_id= ? AND activities_id=? ",
                                    [price, data.list_id, data.selectActivities.activities_id], (err, result) => {
                                        if (err) throw console.log(err.message)
                                        return res.status(200).json({ message: "success" })
                                    }
                                )
                            }
                        }
                    )
                    connection.query(
                        'SELECT SUM(cost) AS total_cost FROM melon_costs_fv WHERE user_id = ? AND house_id = ? AND activities_id = ?',
                        [data.user_id, data.selectActivities.house_id, data.selectActivities.activities_id],
                        (err, costResult) => {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).send("Error in calculating total cost");
                            }
                            connection.query("SELECT `cost_all` FROM `activities_costs` WHERE activities_costs_id = ?",
                                [data.selectActivities.activities_costs_id], (err, result_cost_all) => {
                                    if (err) throw console.log(err.message)
                                    connection.query("UPDATE `activities_costs` SET `cost_all`= ? ,update_at=? WHERE activities_costs_id = ?",
                                        [costResult[0].total_cost, updatedAt, data.selectActivities.activities_costs_id], (err, result) => {
                                            if (err) throw console.log(err.message)
                                        })
                                })
                        }
                    );
                    connection.query('SELECT SUM(cost) AS total_cost FROM melon_costs_fv WHERE user_id = ? AND house_id = ?',
                        [data.user_id, data.selectActivities.house_id], (err, sum_cost_greenhouse) => {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).send(err.message);
                            }
                            connection.query("SELECT `cost` FROM `melon_greenhouse` WHERE house_id = ?",
                                [data.selectActivities.house_id], (err, result) => {
                                    if (err) throw console.log(err.message)
                                    connection.query("UPDATE `melon_greenhouse` SET `cost`= ? , update_at = ? WHERE house_id = ?",
                                        [sum_cost_greenhouse[0].total_cost, updatedAt, data.selectActivities.house_id], (err, result) => {
                                            if (err) throw console.log(err.message)
                                        })
                                })
                        })
                    // return res.status(200).send("updated successfully")
                })

        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    delete_melon_costs: async (req, res) => {
        const data = await req.body
        const updatedAt = new Date();
        try {
            const price = parseInt(data.item.cost)
            await connection.query("DELETE FROM melon_costs_fv WHERE mc_id = ?",
                [data.item.mc_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send(err.message);
                    }
                }
            )
            await connection.query("SELECT cost FROM melon_greenhouse WHERE house_id = ?",
                [data.item.house_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send(err.message);
                    }
                    let sum = result[0].cost - price
                    connection.query("UPDATE `melon_greenhouse` SET `cost`= ? , update_at = ? WHERE house_id = ?",
                        [sum, updatedAt, data.item.house_id], (err, result) => {
                            if (err) throw console.log(err.message)
                        })
                })
            await connection.query("SELECT cost_all FROM activities_costs WHERE house_id = ? AND activities_id = ? AND user_id= ? ",
                [data.item.house_id, data.item.activities_id, data.item.user_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send(err.message);
                    }
                    let sum = result[0].cost_all - price
                    connection.query("UPDATE `activities_costs` SET `cost_all`= ? ,update_at=? WHERE activities_costs_id = ?",
                        [sum, updatedAt, data.selectActivities.activities_costs_id], (err, result) => {
                            if (err) throw console.log(err.message)
                            return res.status(200).json({ message: "successfully deleted" })
                        })
                })
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    end_process_for_greenhouse: async (req, res) => {
        const data = await req.body
        try {
            await connection.query("UPDATE `melon_greenhouse` SET status = ? WHERE house_id = ?",
                ["end", data.house_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send(err.message);
                    }
                    return res.status(200).send("changed status successfully")
                })
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },
    delete_greenhouse: async (req, res) => {
        const data = await req.body
        try {
            await connection.query("DELETE FROM melon_costs_fv WHERE house_id = ?",
                [data.house_id], (err, result) => {
                    if (err) {
                        console.log(err.message);
                        return res.status(500).send(err.message);
                    }
                    connection.query("DELETE FROM activities_costs WHERE house_id = ?",
                        [data.house_id], (err, result) => {
                            if (err) {
                                console.log(err.message);
                                return res.status(500).send(err.message);
                            }
                            connection.query("DELETE FROM melon_greenhouse WHERE house_id = ?",
                                [data.house_id], (err, result) => {
                                    if (err) {
                                        console.log(err.message);
                                        return res.status(500).send(err.message);
                                    }
                                    return res.status(200).send("deleted")
                                }
                            )
                        }
                    )
                })
        } catch (e) {
            console.log(e.message)
            return res.status(500).send("Internal Server Error")
        }
    },

}

const addChart = {
    chart: async (data, user) => {
        const thaiMonths = [
            "มกราคม",  // January
            "กุมภาพันธ์",  // February
            "มีนาคม",  // March
            "เมษายน",  // April
            "พฤษภาคม",  // May
            "มิถุนายน",  // June
            "กรกฎาคม",  // July
            "สิงหาคม",  // August
            "กันยายน",  // September
            "ตุลาคม",  // October
            "พฤศจิกายน",  // November
            "ธันวาคม"  // December
        ];
        // console.log(data)
        // console.log(user)
        const DateNow = new Date();
        const month = DateNow.getMonth() + 1;  // เดือนปัจจุบัน (เพิ่ม 1 เพราะ getMonth() นับจาก 0)
        const year = DateNow.getFullYear();  // ปีปัจจุบัน
        await connection.query(
            "SELECT * FROM chart WHERE cost_id = ? AND MONTH(created_at) = ? AND YEAR(created_at) = ?",
            [data.cost_id, month, year],
            (err, resultCost_id) => {
                if (err) {
                    console.log(err.message);
                    return reject("เกิดข้อผิดพลาดในการดึงข้อมูล");
                }
                // console.log(resultCost_id);
                var newCost = parseInt(data.cost);
                if (resultCost_id.length > 0) {
                    var oldCost = parseInt(resultCost_id[0].cost);
                    const sum = newCost + oldCost;
                    connection.query(
                        "UPDATE `chart` SET `cost`= ? ,update_at = ? WHERE cost_id = ? AND MONTH(created_at) = ? AND YEAR(created_at) = ?",
                        [sum, DateNow, data.cost_id, month, year],
                        (err, resultCost_id) => {
                            if (err) {
                                console.log(err.message);
                                return "เกิดข้อผิดพลาดในการอัปเดตข้อมูล";
                            }
                            return "อัปเดตข้อมูลเรียบร้อยแล้ว"
                            // resolve("อัปเดตข้อมูลเรียบร้อยแล้ว");
                        })
                } else {
                    connection.query("INSERT INTO `chart`(cost_id,cost,month,year) VALUES (?,?,?,?)",
                        [data.cost_id, newCost, thaiMonths[month - 1], year + 543], (err, result) => {
                            if (err) {
                                console.log(err.message);
                                return "เกิดข้อผิดพลาดในการบันทึกข้อมูล";
                            }
                            return "บันทึก chart ใหม่สำเร็จ"
                        }
                    )
                }
            })
    }
}