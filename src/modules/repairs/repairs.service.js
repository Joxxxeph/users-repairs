import { User } from "../users/users.model.js"
import { Repair } from "./repairs.model.js"


export class RepairService {
    static async findAll(){
        return await Repair.findAll({
            where: {
                status: ['pending', 'completed']
            },
            include: {
                model: User
            }
        })
    }

    static async findOne(id, status = 'pending'){
        return await Repair.findOne({
            where: {
                id,
                status: status
            }
        })
    }

    static async create(data){
        return await Repair.create(data)
    }

    static async update(repair){
        return await repair.update({ status: 'completed' })
    }

    static async delete(repair){
        return await repair.update({ status: 'cancelled' })
    }
}
