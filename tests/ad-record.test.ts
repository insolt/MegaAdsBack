import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Mike Born',
    description: 'Person',
    url: 'https://onet.pl',
    lat: 70,
    lon: 8,
    price: 0,
}

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Mike Born');
    expect(ad.description).toBe('Person');
})

test('Validates invalid price', () => {
    expect(() => new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('Cena nie moze byc mniejsza niz 0 ani wieksza niz 9 999 999');
})

// @TODO: check all validations