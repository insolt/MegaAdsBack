import {AdRecord} from "../records/ad.record";
import {pool} from "../utils/db";
import {AdEntity} from "../types";

afterAll(async () => {
    await pool.end();
})

const defaultObject = {
    name: 'Mike Born',
    description: 'Person',
    url: 'https://onet.pl',
    lat: 70,
    lon: 8,
    price: 0,
};

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
})

test('AdRecords.insert returns new UUID.', async () => {
    const ad = await new AdRecord(defaultObject);
    await ad.insert();
    expect(ad.id).toBeDefined();
    expect(typeof ad.id).toBe('string');
})

test('AdRecords.insert returns new UUID.', async () => {
    const ad = await new AdRecord(defaultObject);
    await ad.insert();

    const foundAd = await AdRecord.getOne(ad.id);

    expect(foundAd).toBeDefined();
    expect(foundAd).not.toBeNull();
    expect(foundAd.id).toBe(ad.id);
})