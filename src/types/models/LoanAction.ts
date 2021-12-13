// Auto-generated , DO NOT EDIT
import {Entity} from "@subql/types";
import assert from 'assert';

import {
    KVData,
} from '../interfaces'


export class LoanAction implements Entity {

    constructor(id: string) {
        this.id = id;
    }


    public id: string;

    public accountId?: string;

    public type?: string;

    public subType?: string;

    public data?: KVData[];

    public extrinsicId?: string;

    public timestamp?: Date;


    async save(): Promise<void>{
        let id = this.id;
        assert(id !== null, "Cannot save LoanAction entity without an ID");
        await store.set('LoanAction', id.toString(), this);
    }
    static async remove(id:string): Promise<void>{
        assert(id !== null, "Cannot remove LoanAction entity without an ID");
        await store.remove('LoanAction', id.toString());
    }

    static async get(id:string): Promise<LoanAction | undefined>{
        assert((id !== null && id !== undefined), "Cannot get LoanAction entity without an ID");
        const record = await store.get('LoanAction', id.toString());
        if (record){
            return LoanAction.create(record);
        }else{
            return;
        }
    }



    static create(record){
        let entity = new LoanAction(record.id);
        Object.assign(entity,record);
        return entity;
    }
}
