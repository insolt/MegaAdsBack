import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

afterAll(async () => {
    await pool.end();
})

test('AdRecord returns data from database for single entry.', async () => {

    const ad = await AdRecord.getOne('abcd')

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abcd');
    expect(ad.name).toBe('Mike Born');
})


test('AdRecords.getOne returns null from database for non-existing entry.', async () => {
    const ad = await AdRecord.getOne('---')

    expect(ad).toBeNull();
})


test('AdRecords.findAll returns array of found entries.', async () => {
    const ads = await AdRecord.findAll('')

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecords.findAll returns an array of found entries when searching for "i" in name.', async () => {
    const ads = await AdRecord.findAll('i')

    expect(ads).not.toEqual([]);
    expect(ads[0].id).toBeDefined();
})

test('AdRecords.findAll returns an empty array when searching for not-existing element.', async () => {
    const ads = await AdRecord.findAll('$')

    expect(ads).toEqual([]);
})

test('AdRecords.findAll returns small amount of data.', async () => {
    const ads = await AdRecord.findAll('')

    expect((ads[0] as AdEntity).price).toBeUndefined();
    expect((ads[0] as AdEntity).description).toBeUndefined();
    expect((ads[0] as AdEntity).name).toBeUndefined();
    expect((ads[0] as AdEntity).url).toBeUndefined();
})