import {AdRecord} from "../records/ad.record";

test('AdRecord returns data from database for single entry.', async () => {

    const ad = await AdRecord.getOne('abcd')

    expect(ad).toBeDefined();
    expect(ad.id).toBe('abcd');
    expect(ad.name).toBe('Mike Born');

})

test('AdRecords returns null from database for non-existing entry', async () => {

    const ad = await AdRecord.getOne('---')

    expect(ad).toBeNull();
})