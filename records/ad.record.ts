import {AdEntity, NewAdEntity, SimpleAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";
import {v4 as uuid} from "uuid";

type AdRecordResults = [AdEntity[], FieldPacket[]]


export class AdRecord implements AdEntity {
    public id: string;
    public name: string;
    public description: string;
    public price: number;
    public url: string;
    public lat: number;
    public lon: number;

    constructor(obj: NewAdEntity) {
        if (!obj.name || obj.name.length > 100) {
            throw new ValidationError('Nazwa ogloszenia nie moze byc pusta ani przekraczac 100 znakow');
        }

        if (obj.description.length > 1024) {
            throw new ValidationError('Opis ogloszenia nie moze przekraczac 1024 znakow');
        }

        if (obj.price < 0 || obj.price > 9999999) {
            throw new ValidationError('Cena nie moze byc mniejsza niz 0 ani wieksza niz 9 999 999');
        }

        //@TODO: check if URL is valid
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Adres url (link) ogloszenia nie moze byc pusty ani przekraczac dlugosci 100 znakow');
        }

        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Nie mozna zlokalizowac ogloszenia');
        }

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.lat = obj.lat;
        this.lon = obj.lon;
    }

    async insert(): Promise<void> {
        if (!this.id) {
            this.id = uuid();
        } else {
            throw new Error("Object already exists on data base");
        }

        await pool.execute("INSERT INTO `ads` (`id`, `name`,`description`, `price`, `url`, `lat`, `lon`) VALUES (:id, :name, :description, :price, :url, :lat, :lon)", this);
    }

    static async getOne(id: string): Promise<AdRecord> | null {
        const [result] = await pool.execute("SELECT * FROM `ads` WHERE `id` =:id", {
            id,
        }) as AdRecordResults;

        return result.length === 0 ? null : new AdRecord(result[0])
    }

    static async findAll(name: string): Promise<SimpleAdEntity[]> {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE `name` LIKE :search", {
            search: `%${name}%`,
        }) as AdRecordResults;

        return results.map(result => {
            const {id, lat, lon} = result
            return {id, lat, lon}
        });
    }


}